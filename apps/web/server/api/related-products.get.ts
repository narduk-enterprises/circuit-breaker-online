import { z } from 'zod'

const querySchema = z.object({
  slug: z.string().nonempty(),
})

type Query = { slug?: string }
export default defineEventHandler(async (event) => {
  const db = useD1(event)
  const query = (await getValidatedQuery(event, querySchema.parse)) as Query
  const slug = query?.slug

  if (!slug) {
    return { products: [] }
  }

  // Get the current product to find its category and manufacturer
  const product = await db.prepare(
    'SELECT category, manufacturer, subcategory FROM products WHERE slug = ?'
  ).bind(slug).first()

  if (!product) {
    return { products: [] }
  }

  // Find related products: same category first, then same manufacturer
  const related = await db.prepare(`
    SELECT slug, name, manufacturer, category, subcategory, images, voltage, amperage, short_description
    FROM products
    WHERE slug != ?
      AND (category = ? OR manufacturer = ?)
    ORDER BY
      CASE WHEN category = ? AND subcategory = ? THEN 0
           WHEN category = ? THEN 1
           WHEN manufacturer = ? THEN 2
           ELSE 3
      END,
      name
    LIMIT 8
  `).bind(
    slug,
    product.category, product.manufacturer,
    product.category, product.subcategory || '',
    product.category,
    product.manufacturer
  ).all()

  interface RelatedRow { images?: string; [key: string]: unknown }
  return {
    products: (related.results || []).map((p: RelatedRow) => ({
      ...p,
      images: p.images ? JSON.parse(String(p.images)) : [],
    })),
  }
})
