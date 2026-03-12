# SEO Product Indexing Strategy

> How every product page on circuitbreaker.online is made indexable for
> product-ID searches.

---

## Canonical Route Scheme

| URL Pattern                 | Purpose              | Indexable           |
| --------------------------- | -------------------- | ------------------- |
| `/products/{slug}`          | Product detail page  | ✅ `index,follow`   |
| `/products`                 | Full product catalog | ✅ `index,follow`   |
| `/products/category/{slug}` | Category listing     | ✅ `index,follow`   |
| `/products?category=X`      | Filtered listing     | ❌ `noindex,follow` |
| `/products?page=2`          | Paginated listing    | ❌ `noindex,follow` |
| `/products?search=term`     | Search results       | ❌ `noindex,follow` |

### Key rules

- **One canonical URL per product**:
  `https://circuitbreaker.online/products/{slug}`
- **No query-param canonicals**: Canonical URLs never include `?` or `#`.
- **No www leakage**: All URLs use `https://circuitbreaker.online` (no `www.`).
- **No trailing-slash on product paths**: `/products/ge-akr-50` (not
  `/products/ge-akr-50/`).

---

## Query-Param Noindex Policy

**Plugin:** `app/plugins/seo-policy.ts`

Every page is automatically evaluated on both SSR and client navigation:

- If `route.query` has any keys → `robots = noindex,follow` and canonical strips
  the query string.
- If `route.query` is empty → `robots = index,follow` and canonical is
  `siteUrl + route.path`.

This prevents Google from indexing duplicate filtered/sorted/paginated views
while keeping clean paths indexable.

---

## Product Page SEO

**File:** `app/pages/products/[slug].vue`

### Title

Includes product name, SKU (if not already in the name), and manufacturer:

```
GE AKR-50 Circuit Breaker - AKR-50 - General Electric | Circuit Breaker Sales
```

### Visible product ID

The product ID / SKU is rendered as visible text near the top of the page (below
the `<h1>`), ensuring Google indexes it for part-number searches.

### Fallback description

When no editorial description exists, a deterministic fallback (~50–200 words,
depending on available data) is generated from structured fields:

- Manufacturer, category, SKU, model, voltage, amperage, type, condition,
  warranty, subcategory.
- Plus standard boilerplate about Circuit Breaker Sales.

Helper: `app/utils/product-seo.ts` → `buildFallbackDescription()`

### JSON-LD Product schema

Every product page outputs:

```json
{
  "@type": "Product",
  "name": "...",
  "sku": "...",
  "mpn": "...",
  "brand": { "@type": "Brand", "name": "..." },
  "description": "...",
  "image": ["https://circuitbreaker.online/images/..."],
  "url": "https://circuitbreaker.online/products/...",
  "offers": {
    "@type": "Offer",
    "seller": { "@type": "Organization", "name": "Circuit Breaker Sales" }
  }
}
```

### BreadcrumbList schema

```
Home → Products → [Category] → [Product Name]
```

### Image URLs

All image URLs in `og:image`, `twitter:image`, and JSON-LD `image[]` are
absolute (prefixed with `https://circuitbreaker.online` if relative).

Helper: `app/utils/product-seo.ts` → `toAbsoluteImageUrl()`

---

## Sitemap Rules

**Generator:** `server/api/__sitemap__/urls.ts` +
`server/utils/buildSitemapEntries.ts`

1. **All product detail pages** are included: `/products/{slug}` with priority
   0.8.
2. **Parent category pages** are included: `/products/category/{slug}` with
   priority 0.85.
3. **Static pages** (services, equipment, industries, resources, brands) are
   included.
4. **No URLs with `?` or `#`** — enforced in the builder and by the `exclude`
   rule in `nuxt.config.ts`.
5. **`lastmod`** is set to the build/deploy time.

---

## How to Add a New Product

1. Insert the product into the `products` table with a unique `slug` (lowercase,
   hyphenated).
2. Ensure the product has at minimum: `name`, `slug`, `category`.
3. The sitemap API automatically picks up the new product.
4. The page at `/products/{slug}` renders automatically via the `[slug].vue`
   dynamic route.
5. Link to the product using `/products/{slug}` — never `/products?id=...`.

### Recommended fields for best SEO

| Field                         | Purpose                                        |
| ----------------------------- | ---------------------------------------------- |
| `name`                        | Product display name                           |
| `slug`                        | URL path segment                               |
| `sku`                         | Part number / SKU (appears in title + schema)  |
| `manufacturer`                | Brand name (appears in title + schema)         |
| `model`                       | Model identifier                               |
| `category`                    | Parent category name                           |
| `short_description`           | 1-2 sentence summary                           |
| `long_description`            | Full HTML description                          |
| `images`                      | JSON array of image paths                      |
| `voltage`, `amperage`, `type` | Spec fields for filtering and fallback content |
| `condition`                   | New / Reconditioned / Used                     |
| `warranty`                    | Warranty terms                                 |

---

## Verification Commands

### Run SEO regression tests

```bash
cd apps/web && pnpm seo:check
```

### Count sitemap URLs

```bash
curl -sS https://circuitbreaker.online/sitemap.xml | grep -c "<url>"
```

### Verify no query params in sitemap (must return 0)

```bash
curl -sS https://circuitbreaker.online/sitemap.xml | grep -F -c '?'
```

### Check a product page for JSON-LD

```bash
curl -sS https://circuitbreaker.online/products/ge-akr-50-circuit-breaker | grep -o '"@type":"Product"'
```

### Run full test suite

```bash
cd apps/web && pnpm test
```
