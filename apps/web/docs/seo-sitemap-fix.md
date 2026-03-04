# SEO & Sitemap Fix

## What Changed

### 1. Sitemap — Clean URLs Only
**File:** `server/api/__sitemap__/urls.ts`

Previously, the sitemap included query-param category URLs like:
```
/products?category=Circuit%20Breakers
```

Now the sitemap emits clean path-based category URLs:
```
/products/category/circuit-breakers
```

All sitemap entries are guaranteed to be free of `?` and `#` characters.

### 2. Global SEO Policy Plugin
**File:** `app/plugins/seo-policy.ts`

A Nuxt plugin that runs on both SSR and client navigation:
- **Canonical URL**: Always set to `https://circuitbreaker.online` + route path (no query string)
- **Robots**: `index,follow` for clean pages, `noindex,follow` for any page with query params

This prevents Google from indexing filtered/parameterized product pages while keeping the clean category and product pages indexable.

### 3. Clean Category Pages
**File:** `app/pages/products/category/[slug].vue`

New page route that renders a category-specific product listing at `/products/category/{slug}`. Includes:
- Proper SEO meta tags (title, description, OG image)
- Schema.org CollectionPage + Breadcrumb structured data
- Product grid with pagination
- Subcategory links

**API:** `server/api/categories/[slug].get.ts` — resolves a category slug to its name and subcategories.

### 4. Internal Link Updates

All internal links now use clean category paths instead of query params:
- Homepage category grid → `/products/category/{slug}`
- Equipment pages → `/products/category/{slug}`
- Product detail breadcrumbs → `/products/category/{slug}`
- Shop services page → `/products/category/renewal-replacement-parts`

### 5. Category Slug Utility
**File:** `app/composables/useCategorySlug.ts`

Converts a category name to its URL slug: `"Circuit Breakers"` → `"circuit-breakers"`.

---

## What URLs Are Now Indexable

| URL Pattern | Indexable | Example |
|---|---|---|
| `/` | ✅ Yes | Homepage |
| `/about`, `/contact` | ✅ Yes | Static pages |
| `/products` | ✅ Yes | Full product catalog |
| `/products/category/{slug}` | ✅ Yes | `/products/category/circuit-breakers` |
| `/products/{slug}` | ✅ Yes | `/products/ge-akr-50-circuit-breaker` |
| `/equipment/{slug}` | ✅ Yes | `/equipment/switchgear` |
| `/industries/{slug}` | ✅ Yes | `/industries/data-centers` |
| `/products?category=X` | ❌ No (noindex) | Query-param filtered pages |
| `/products?page=2` | ❌ No (noindex) | Paginated pages |
| `/products?sort=newest` | ❌ No (noindex) | Sorted pages |

---

## How to Add a New Indexable Category

1. Ensure the category exists in the `categories` table with a `slug` and `parent = NULL` (top-level category).
2. The sitemap API (`server/api/__sitemap__/urls.ts`) automatically picks up all parent categories.
3. The page at `/products/category/{slug}` will resolve automatically via the `[slug].vue` dynamic route.
4. Link to the category using `/products/category/{slug}` — never `/products?category=Name`.

---

## Verification Commands

Check total sitemap URLs:
```bash
curl -sS https://circuitbreaker.online/sitemap.xml | grep -c "<url>"
```

Verify no query params in sitemap (must return 0):
```bash
curl -sS https://circuitbreaker.online/sitemap.xml | grep -c "\?"
```

Run regression tests locally:
```bash
cd apps/web && pnpm test
```
