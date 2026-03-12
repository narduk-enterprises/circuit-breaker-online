#!/usr/bin/env node

/**
 * Circuit Breaker Sales — WooCommerce Product Scraper
 *
 * Scrapes all products from circuitbreaker.com using their WooCommerce sitemaps.
 * Downloads product data, specs, and full-resolution images.
 *
 * Usage: node scraper/scrape.mjs
 */

import * as cheerio from 'cheerio'
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs'
import { resolve, dirname, extname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const PUBLIC = resolve(ROOT, 'public')
const DATA_DIR = resolve(PUBLIC, 'data')
const IMAGES_DIR = resolve(PUBLIC, 'images', 'products')
const PROGRESS_FILE = resolve(__dirname, '.progress.json')

const BASE_URL = 'https://www.circuitbreaker.com'
const SITEMAPS = [`${BASE_URL}/product-sitemap1.xml`, `${BASE_URL}/product-sitemap2.xml`]

const DELAY_MS = 300
const MAX_RETRIES = 3

// ---- Progress Tracking ----
function loadProgress() {
  if (existsSync(PROGRESS_FILE)) {
    return JSON.parse(readFileSync(PROGRESS_FILE, 'utf-8'))
  }
  return { scrapedUrls: [], products: [] }
}

function saveProgress(progress) {
  writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2))
}

// ---- Fetch with Retries ----
async function fetchWithRetry(url, retries = MAX_RETRIES) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10000)
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; CBS-Scraper/1.0)',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        signal: controller.signal,
      })
      clearTimeout(timeout)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return response
    } catch (err) {
      if (attempt === retries) throw err
      const backoff = Math.pow(2, attempt) * 500
      console.log(`  ⚠ Retry ${attempt}/${retries} for ${url} (waiting ${backoff}ms)`)
      await sleep(backoff)
    }
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

// ---- Sitemap Parsing ----
async function discoverProductUrls() {
  const urls = []
  for (const sitemapUrl of SITEMAPS) {
    try {
      console.log(`📡 Fetching sitemap: ${sitemapUrl}`)
      const res = await fetchWithRetry(sitemapUrl)
      const xml = await res.text()
      const $ = cheerio.load(xml, { xmlMode: true })

      $('url > loc').each((_, el) => {
        const loc = $(el).text().trim()
        if (loc && !loc.includes('/product-category/')) {
          urls.push(loc)
        }
      })
      console.log(`  Found ${urls.length} product URLs so far`)
    } catch (err) {
      console.log(`  ⚠ Skipping sitemap ${sitemapUrl}: ${err.message}`)
    }
  }
  return [...new Set(urls)]
}

// ---- Product Page Parsing ----
function parseProductPage(html, url) {
  const $ = cheerio.load(html)

  // Name
  const name =
    $('h1.product_title').text().trim() ||
    $('h1.entry-title').text().trim() ||
    $('h1').first().text().trim()

  if (!name) return null

  // SKU
  const sku = $('.sku_wrapper .sku').text().trim() || $('.product_meta .sku').text().trim() || ''

  // Description
  const description =
    $('.woocommerce-product-details__short-description').html()?.trim() ||
    $('#tab-description .woocommerce-Tabs-panel--description').html()?.trim() ||
    $('.woocommerce-Tabs-panel--description').html()?.trim() ||
    $('.entry-content').html()?.trim() ||
    ''

  // Category from breadcrumbs or meta
  let category = ''
  const breadcrumbs = $('.woocommerce-breadcrumb a, .breadcrumb a')
  if (breadcrumbs.length > 1) {
    category = breadcrumbs
      .eq(breadcrumbs.length - 1)
      .text()
      .trim()
    if (category.toLowerCase() === name.toLowerCase()) {
      category = breadcrumbs
        .eq(breadcrumbs.length - 2)
        .text()
        .trim()
    }
  }
  if (!category || category === 'Home' || category === 'Shop') {
    category = $('.posted_in a').first().text().trim() || 'Uncategorized'
  }

  // WooCommerce attributes
  const attributes = {}
  $('table.woocommerce-product-attributes tr, table.shop_attributes tr').each((_, row) => {
    const label = $(row)
      .find('th, .woocommerce-product-attributes-item__label')
      .text()
      .trim()
      .toLowerCase()
    const value = $(row).find('td, .woocommerce-product-attributes-item__value').text().trim()
    if (label && value) attributes[label] = value
  })

  const manufacturer = attributes['manufacturer'] || attributes['brand'] || ''
  const model = attributes['model'] || attributes['model number'] || ''
  const condition = attributes['condition'] || ''
  const warranty = attributes['warranty'] || ''

  // Images
  const images = []
  const seenImages = new Set()

  // Main product image
  $('div.woocommerce-product-gallery__image img, .wp-post-image').each((_, img) => {
    let src = $(img).attr('data-large_image') || $(img).attr('data-src') || $(img).attr('src') || ''
    src = stripThumbnailSuffix(src)
    if (src && !seenImages.has(src)) {
      seenImages.add(src)
      images.push(src)
    }
  })

  // Gallery images
  $('div.woocommerce-product-gallery__image a').each((_, a) => {
    let href = $(a).attr('href') || ''
    href = stripThumbnailSuffix(href)
    if (href && !seenImages.has(href) && isImageUrl(href)) {
      seenImages.add(href)
      images.push(href)
    }
  })

  // Slug
  const slug = new URL(url).pathname.replace(/^\//, '').replace(/\/$/, '').split('/').pop() || ''

  return {
    name,
    slug,
    sku,
    description: cleanHtml(description),
    category,
    manufacturer,
    model,
    condition,
    warranty,
    images: [], // will be populated after download
    sourceImages: images,
    sourceUrl: url,
  }
}

function stripThumbnailSuffix(url) {
  return url.replace(/-\d+x\d+(\.\w+)$/, '$1')
}

function isImageUrl(url) {
  const ext = extname(new URL(url).pathname).toLowerCase()
  return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)
}

function cleanHtml(html) {
  if (!html) return ''
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
}

// ---- Image Download ----
async function downloadImages(product) {
  const slug = product.slug
  const imgDir = resolve(IMAGES_DIR, slug)
  mkdirSync(imgDir, { recursive: true })

  const localPaths = []
  for (let i = 0; i < product.sourceImages.length; i++) {
    const imgUrl = product.sourceImages[i]

    // Skip placeholder images and malformed URLs
    if (imgUrl.includes('product-image-placeholder') || imgUrl.includes('www.www.')) {
      continue
    }

    const ext = extname(new URL(imgUrl).pathname) || '.jpg'
    const filename = `${i}${ext}`
    const localPath = `/images/products/${slug}/${filename}`
    const filePath = resolve(imgDir, filename)

    if (existsSync(filePath)) {
      localPaths.push(localPath)
      continue
    }

    try {
      const res = await fetchWithRetry(imgUrl)
      const buffer = Buffer.from(await res.arrayBuffer())
      writeFileSync(filePath, buffer)
      localPaths.push(localPath)
      await sleep(100)
    } catch (err) {
      console.log(`    ⚠ Failed to download image: ${imgUrl} — ${err.message}`)
    }
  }

  return localPaths
}

// ---- Main ----
async function main() {
  console.log('🔧 Circuit Breaker Sales — Product Scraper')
  console.log('==========================================\n')

  mkdirSync(DATA_DIR, { recursive: true })
  mkdirSync(IMAGES_DIR, { recursive: true })

  const progress = loadProgress()
  console.log(`📊 Progress: ${progress.products.length} products already scraped\n`)

  // Discover URLs
  const allUrls = await discoverProductUrls()
  console.log(`\n📦 Total product URLs discovered: ${allUrls.length}`)

  const pending = allUrls.filter((url) => !progress.scrapedUrls.includes(url))
  console.log(`📋 Remaining to scrape: ${pending.length}\n`)

  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < pending.length; i++) {
    const url = pending[i]
    const progress_pct = (((i + 1) / pending.length) * 100).toFixed(1)
    console.log(`[${i + 1}/${pending.length}] (${progress_pct}%) ${url}`)

    try {
      const res = await fetchWithRetry(url)
      const html = await res.text()
      const product = parseProductPage(html, url)

      if (product) {
        // Download images
        const localImages = await downloadImages(product)
        product.images = localImages
        delete product.sourceImages

        progress.products.push(product)
        successCount++
        console.log(`  ✅ ${product.name} (${localImages.length} images)`)
      } else {
        console.log(`  ⏭ Skipped (no valid product data)`)
      }

      progress.scrapedUrls.push(url)
      saveProgress(progress)
    } catch (err) {
      console.log(`  ❌ Error: ${err.message}`)
      errorCount++
      progress.scrapedUrls.push(url)
      saveProgress(progress)
    }

    await sleep(DELAY_MS)
  }

  // Save final products JSON
  const outputPath = resolve(DATA_DIR, 'products.json')
  writeFileSync(outputPath, JSON.stringify(progress.products, null, 2))

  // Generate categories summary
  const categoryMap = {}
  for (const p of progress.products) {
    if (!categoryMap[p.category]) {
      categoryMap[p.category] = {
        name: p.category,
        slug: p.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        count: 0,
      }
    }
    categoryMap[p.category].count++
  }
  const categories = Object.values(categoryMap).sort((a, b) => b.count - a.count)
  writeFileSync(resolve(DATA_DIR, 'categories.json'), JSON.stringify(categories, null, 2))

  console.log('\n==========================================')
  console.log(`✅ Scraping complete!`)
  console.log(`   Products: ${progress.products.length}`)
  console.log(`   New this run: ${successCount}`)
  console.log(`   Errors: ${errorCount}`)
  console.log(`   Categories: ${categories.length}`)
  console.log(`   Output: ${outputPath}`)
}

main().catch(console.error)
