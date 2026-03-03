// @ts-expect-error googleapis is used as an optional dev script dependency
import { google } from 'googleapis'
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
// Env from Doppler when run via: doppler run -- npx tsx tools/gsc-toolbox.ts ...

/**
 * GSC Toolbox: Programmatically manage Google Search Console properties.
 * 
 * Usage:
 * npx jiti tools/gsc-toolbox.ts init <site_url>
 * npx jiti tools/gsc-toolbox.ts verify <site_url>
 * npx jiti tools/gsc-toolbox.ts submit <site_url>
 */

const siteUrl = process.argv[3] || process.env.SITE_URL

function loadCredentials(): Record<string, any> {
  // Option A: file path (recommended)
  const keyFilePath = process.env.GSC_SERVICE_ACCOUNT_JSON_PATH?.trim()
  if (keyFilePath) {
    const resolved = resolve(process.cwd(), keyFilePath)
    if (!existsSync(resolved)) {
      throw new Error(`Service account key file not found: ${resolved}`)
    }
    return JSON.parse(readFileSync(resolved, 'utf8'))
  }

  // Option B: inline JSON or base64
  const inline = process.env.GSC_SERVICE_ACCOUNT_JSON?.trim()
  if (inline) {
    if (inline.startsWith('${') && inline.includes('}')) {
      throw new Error(
        'GSC_SERVICE_ACCOUNT_JSON looks like an unresolved Doppler reference (e.g. ${hub.prd.KEY}). Add the secret in the Doppler dashboard or set it as a cross-project ref that resolves in your config.'
      )
    }
    let str = inline
    if (!str.startsWith('{')) {
      const b64 = str.replace(/\s/g, '')
      try {
        str = Buffer.from(b64, 'base64').toString('utf8')
      } catch {
        throw new Error('GSC_SERVICE_ACCOUNT_JSON is set but failed to decode as base64. Use raw JSON (starts with {) or valid base64.')
      }
    }
    try {
      return JSON.parse(str)
    } catch {
      throw new Error('GSC_SERVICE_ACCOUNT_JSON is set but failed to parse as JSON. Check for valid JSON or base64-encoded JSON.')
    }
  }

  throw new Error(
    'No service account credentials found. Set GSC_SERVICE_ACCOUNT_JSON_PATH (path to key file) or GSC_SERVICE_ACCOUNT_JSON (inline JSON/base64) in Doppler or .env'
  )
}

async function getAuth() {
  const credentials = loadCredentials()
  return new google.auth.GoogleAuth({
    credentials,
    scopes: [
      'https://www.googleapis.com/auth/webmasters',
      'https://www.googleapis.com/auth/siteverification'
    ],
  })
}

async function addSite(url: string) {
  const auth = await getAuth()
  const searchconsole = google.searchconsole({ version: 'v1', auth })
  console.log(`🚀 Registering ${url} in Search Console...`)
  await searchconsole.sites.add({ siteUrl: url })
  console.log('✅ Site registered.')
}

async function getVerificationToken(url: string) {
  const auth = await getAuth()
  const siteVerification = google.siteVerification({ version: 'v1', auth })

  console.log(`🔍 Getting verification token for ${url}...`)
  const response = await siteVerification.webResource.getToken({
    requestBody: {
      site: { identifier: url, type: 'SITE' },
      verificationMethod: 'FILE'
    }
  })

  return response.data.token
}

async function verifySite(url: string) {
  const auth = await getAuth()
  const siteVerification = google.siteVerification({ version: 'v1', auth })

  console.log(`🛡️  Verifying ownership of ${url}...`)
  await siteVerification.webResource.insert({
    verificationMethod: 'FILE',
    requestBody: {
      site: { identifier: url, type: 'SITE' }
    }
  })
  console.log('✅ Ownership verified.')
}

async function grantAccess(url: string, email: string) {
  const auth = await getAuth()
  const siteVerification = google.siteVerification({ version: 'v1', auth })

  console.log(`👤 Granting "Owner" access to ${email}...`)
  // First get current owners to avoid overwriting them
  const resource = await siteVerification.webResource.get({
    id: `http${url.includes('https') ? 's' : ''}://${url.replace(/^https?:\/\//, '')}`
  }).catch(() => null)

  const owners = resource?.data.owners || []
  if (!owners.includes(email)) {
    owners.push(email)
  }

  await siteVerification.webResource.update({
    id: url,
    requestBody: {
      site: { identifier: url, type: 'SITE' },
      owners: owners
    }
  })
  console.log('✅ Access granted. Property should now appear in your GSC dashboard.')
}

async function submitSitemap(url: string) {
  const auth = await getAuth()
  const searchconsole = google.searchconsole({ version: 'v1', auth })
  const sitemapUrl = `${url.endsWith('/') ? url : url + '/'}sitemap.xml`

  console.log(`🚀 Submitting sitemap: ${sitemapUrl}`)
  await searchconsole.sitemaps.submit({
    siteUrl: url,
    feedpath: sitemapUrl
  })
  console.log('✅ Sitemap submitted.')
}

/** Fetch ALL URLs from the sitemap (handles both sitemap index and single sitemap). */
async function getAllSitemapUrls(baseUrl: string): Promise<string[]> {
  const base = baseUrl.replace(/\/$/, '')
  let allUrls: string[] = []
  let xml: string
  try {
    const res = await fetch(`${base}/sitemap.xml`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    xml = await res.text()
  } catch (e: any) {
    throw new Error(`Failed to fetch sitemap: ${e.message}`)
  }
  const topLocs = xml.match(/<loc>([^<]+)<\/loc>/g)?.map(s => s.replace(/<\/?loc>/g, '').trim()) || []
  if (xml.includes('<sitemap>')) {
    for (const childUrl of topLocs) {
      try {
        const childRes = await fetch(childUrl)
        if (!childRes.ok) continue
        const childXml = await childRes.text()
        const childLocs = childXml.match(/<loc>([^<]+)<\/loc>/g)?.map(s => s.replace(/<\/?loc>/g, '').trim()) || []
        allUrls = allUrls.concat(childLocs)
      } catch { /* skip broken child sitemaps */ }
    }
  } else {
    allUrls = topLocs
  }
  return allUrls
}

/** Fetch up to `limit` product URLs from the live sitemap. */
async function getProductUrlsFromSitemap(baseUrl: string, limit: number): Promise<string[]> {
  const allUrls = await getAllSitemapUrls(baseUrl)
  const productUrls = allUrls.filter(u => u.includes('/products/') && !u.includes('category='))
  return productUrls.slice(0, limit)
}

/** Submit URLs to GSC via URL Inspection API (surfaces URLs for recrawl). */
async function inspectUrls(siteUrl: string, urls: string[]) {
  if (urls.length === 0) {
    console.log('⚠️  No URLs to inspect.')
    return
  }
  console.log(`   Submitting ${urls.length} URLs to Google Search Console (URL Inspection)...`)
  const auth = await getAuth()
  const authClient = await auth.getClient()
  const token = await authClient.getAccessToken()
  if (!token.token) throw new Error('Failed to get access token')
  const baseUrl = siteUrl.endsWith('/') ? siteUrl : siteUrl + '/'
  const gscSiteUrl = siteUrl.startsWith('sc-domain:') ? siteUrl : baseUrl
  const delayMs = 250
  let ok = 0
  let err = 0
  for (let i = 0; i < urls.length; i++) {
    try {
      const res = await fetch('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inspectionUrl: urls[i],
          siteUrl: gscSiteUrl,
          languageCode: 'en-US',
        }),
      })
      if (res.ok) {
        ok++
        if ((i + 1) % 10 === 0) console.log(`   Inspected ${i + 1}/${urls.length}...`)
      } else {
        const body = await res.text()
        if (err < 3) console.warn(`   ⚠ ${urls[i]} → ${res.status} ${body.slice(0, 120)}`)
        err++
      }
    } catch (e: any) {
      if (err < 3) console.warn(`   ⚠ ${urls[i]} → ${e.message}`)
      err++
    }
    if (i < urls.length - 1) await new Promise(r => setTimeout(r, delayMs))
  }
  console.log(`✅ Submitted ${ok} URLs to Google Search Console (${err} errors).`)
}

/** Submit up to `limit` product URLs to GSC via URL Inspection API. */
async function inspectProductUrls(siteUrl: string, limit: number) {
  const baseUrl = siteUrl.endsWith('/') ? siteUrl : siteUrl + '/'
  console.log(`📡 Fetching up to ${limit} product URLs from sitemap...`)
  const urls = await getProductUrlsFromSitemap(baseUrl, limit)
  if (urls.length === 0) {
    console.log('⚠️  No product URLs found in sitemap. Ensure the site is deployed and sitemap includes /products/*.')
    return
  }
  console.log(`   Found ${urls.length} product URLs.`)
  await inspectUrls(siteUrl, urls)
}

/** Submit ALL sitemap URLs to GSC via URL Inspection API. */
async function inspectAllUrls(siteUrl: string, limit: number) {
  const baseUrl = siteUrl.endsWith('/') ? siteUrl : siteUrl + '/'
  console.log(`📡 Fetching ALL URLs from sitemap (limit: ${limit})...`)
  const allUrls = await getAllSitemapUrls(baseUrl)
  const urls = allUrls.slice(0, limit)
  console.log(`   Found ${allUrls.length} total URLs. Submitting ${urls.length}...`)
  await inspectUrls(siteUrl, urls)
}

async function main() {
  const cmd = process.argv[2]

  if (!siteUrl) {
    console.error('❌ SITE_URL is required.')
    process.exit(1)
  }

  try {
    switch (cmd) {
      case 'init': {
        await addSite(siteUrl)
        const token = await getVerificationToken(siteUrl)
        if (token) {
          // FILE verification expects:
          // 1) a file at `/${googleXXXXXXXXXXXX.html}`
          // 2) whose contents are exactly `google-site-verification: googleXXXXXXXXXXXX.html`
          //
          // The API response token format can vary (plain filename, or a formatted string).
          const m = token.match(/google[0-9a-z]+\.html/i)
          const fileName =
            token.match(/verification-file=([^:\s]+)/i)?.[1] ||
            (m ? m[0] : '') ||
            'google-verification.html'
          const content = token.includes('google-site-verification:')
            ? token
            : `google-site-verification: ${fileName}`
          const publicDir = join(process.cwd(), 'public')
          if (!existsSync(publicDir)) mkdirSync(publicDir)
          const filePath = join(publicDir, fileName)
          writeFileSync(filePath, content)
          console.log(`💾 Verification file created: public/${fileName}`)

          // Cloudflare Pages (and some hosting setups) may redirect `/foo.html` -> `/foo`.
          // Create a no-extension copy too so verification still succeeds.
          if (fileName.toLowerCase().endsWith('.html')) {
            const noExt = fileName.slice(0, -'.html'.length)
            if (noExt && noExt !== fileName) {
              writeFileSync(join(publicDir, noExt), content)
              console.log(`💾 Verification file created: public/${noExt}`)
            }
          }

          console.log('👉 Deploy your app, then run: npm run setup:gsc:verify')
        }
        break
      }

      case 'verify': {
        await verifySite(siteUrl)
        const userEmail = process.env.GSC_USER_EMAIL
        if (userEmail) {
          await grantAccess(siteUrl, userEmail)
        } else {
          console.log('⚠️  GSC_USER_EMAIL not set. Skipping automatic access grant.')
          console.log('👉 To see this property in your dashboard, add your email to .env and run: npm run setup:gsc:verify')
        }
        break
      }

      case 'submit':
        await submitSitemap(siteUrl)
        break

      case 'inspect-urls': {
        const gscSiteUrl = process.env.SITE_URL || siteUrl
        if (!gscSiteUrl) {
          console.error('❌ SITE_URL is required (set in Doppler or pass as argument).')
          process.exit(1)
        }
        const limit = Math.min(1000, Math.max(1, parseInt(process.argv[3] || '100', 10)))
        await inspectProductUrls(gscSiteUrl, limit)
        break
      }

      case 'inspect-all': {
        const gscSiteUrl = process.env.SITE_URL || siteUrl
        if (!gscSiteUrl) {
          console.error('❌ SITE_URL is required.')
          process.exit(1)
        }
        const limit = Math.min(2000, Math.max(1, parseInt(process.argv[3] || '2000', 10)))
        await inspectAllUrls(gscSiteUrl, limit)
        break
      }

      default:
        console.log('Usage: npx jiti tools/gsc-toolbox.ts [init|verify|submit|inspect-urls|inspect-all] [limit]')
    }
  } catch (error: any) {
    console.error('❌ Error:', error.response?.data?.error?.message || error.message)
    process.exit(1)
  }
}

main()
