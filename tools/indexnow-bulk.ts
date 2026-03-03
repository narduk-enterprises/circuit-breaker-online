/**
 * Bulk IndexNow Submission Script
 *
 * Fetches ALL URLs from the live sitemap and submits them
 * to IndexNow in batches of 10,000 (IndexNow batch limit).
 *
 * Usage:
 *   npx jiti tools/indexnow-bulk.ts
 *
 * Requires:
 *   INDEXNOW_KEY env var (from Doppler or .env)
 *   SITE_URL env var (defaults to https://circuitbreaker.online)
 */

const siteUrl = (process.env.SITE_URL || 'https://circuitbreaker.online').replace(/\/$/, '')
const indexNowKey = process.env.INDEXNOW_KEY || ''

if (!indexNowKey) {
    console.error('❌ INDEXNOW_KEY env var is required. Run via: doppler run -- npx jiti tools/indexnow-bulk.ts')
    process.exit(1)
}

/** Extract all <loc> URLs from XML string */
function extractLocs(xml: string): string[] {
    return (xml.match(/<loc>([^<]+)<\/loc>/g) || [])
        .map(s => s.replace(/<\/?loc>/g, '').trim())
}

/** Fetch all URLs from the sitemap (handles both sitemap index and single sitemap) */
async function getAllSitemapUrls(): Promise<string[]> {
    console.log(`📡 Fetching sitemap from ${siteUrl}/sitemap.xml...`)
    const res = await fetch(`${siteUrl}/sitemap.xml`)
    if (!res.ok) throw new Error(`Failed to fetch sitemap: HTTP ${res.status}`)
    const xml = await res.text()

    let allUrls: string[] = []

    // Check if this is a sitemap index (contains <sitemap> elements)
    if (xml.includes('<sitemap>')) {
        const childSitemapUrls = extractLocs(xml)
        console.log(`   Found sitemap index with ${childSitemapUrls.length} child sitemaps`)
        for (const childUrl of childSitemapUrls) {
            try {
                const childRes = await fetch(childUrl)
                if (!childRes.ok) continue
                const childXml = await childRes.text()
                const childLocs = extractLocs(childXml)
                allUrls = allUrls.concat(childLocs)
                console.log(`   ✓ ${childUrl} → ${childLocs.length} URLs`)
            } catch (e: any) {
                console.warn(`   ⚠ Failed to fetch ${childUrl}: ${e.message}`)
            }
        }
    } else {
        allUrls = extractLocs(xml)
    }

    return allUrls
}

/** Submit URLs to IndexNow in batches */
async function submitToIndexNow(urls: string[]) {
    const host = new URL(siteUrl).host
    const keyLocation = `${siteUrl}/${indexNowKey}.txt`
    const batchSize = 10_000 // IndexNow max batch size

    console.log(`\n🚀 Submitting ${urls.length} URLs to IndexNow...`)
    console.log(`   Key: ${indexNowKey.slice(0, 8)}...`)
    console.log(`   Host: ${host}`)

    let totalOk = 0
    let totalErr = 0

    for (let i = 0; i < urls.length; i += batchSize) {
        const batch = urls.slice(i, i + batchSize)
        const batchNum = Math.floor(i / batchSize) + 1
        const totalBatches = Math.ceil(urls.length / batchSize)

        console.log(`\n   Batch ${batchNum}/${totalBatches} (${batch.length} URLs)...`)

        const payload = {
            host,
            key: indexNowKey,
            keyLocation,
            urlList: batch,
        }

        try {
            const response = await fetch('https://api.indexnow.org/indexnow', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=utf-8' },
                body: JSON.stringify(payload),
            })

            if (response.status >= 200 && response.status < 300) {
                console.log(`   ✅ Batch ${batchNum} accepted (HTTP ${response.status})`)
                totalOk += batch.length
            } else {
                const body = await response.text().catch(() => '')
                console.warn(`   ⚠ Batch ${batchNum} rejected: HTTP ${response.status} — ${body.slice(0, 200)}`)
                totalErr += batch.length
            }
        } catch (e: any) {
            console.error(`   ❌ Batch ${batchNum} failed: ${e.message}`)
            totalErr += batch.length
        }
    }

    console.log(`\n📊 Summary: ${totalOk} URLs accepted, ${totalErr} errors`)
}

async function main() {
    try {
        const urls = await getAllSitemapUrls()
        console.log(`\n📋 Total URLs found: ${urls.length}`)

        // Show breakdown
        const products = urls.filter(u => u.includes('/products/'))
        const categories = urls.filter(u => u.includes('category='))
        const static_ = urls.filter(u => !u.includes('/products/') && !u.includes('category='))
        console.log(`   Products: ${products.length}`)
        console.log(`   Categories: ${categories.length}`)
        console.log(`   Static pages: ${static_.length}`)

        if (urls.length === 0) {
            console.log('⚠️  No URLs found. Is the site deployed?')
            return
        }

        await submitToIndexNow(urls)
    } catch (e: any) {
        console.error('❌ Error:', e.message)
        process.exit(1)
    }
}

main()
