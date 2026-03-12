/**
 * Look up a single category by its URL slug.
 *
 * Used by the `/products/category/[slug]` page to resolve a slug
 * back to the category name for product filtering and SEO.
 */
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 400, message: 'Missing category slug' })
  }

  const db = useD1(event)
  const category = await db
    .prepare(
      "SELECT name, slug, parent, count FROM categories WHERE slug = ? AND (parent IS NULL OR parent = '')",
    )
    .bind(slug)
    .first()

  if (!category) {
    throw createError({ statusCode: 404, message: 'Category not found' })
  }

  // Also fetch subcategories
  const { results: subcategories } = await db
    .prepare('SELECT name, slug, count FROM categories WHERE parent = ? ORDER BY count DESC')
    .bind(category.name)
    .all()

  return {
    name: category.name,
    slug: category.slug,
    count: category.count,
    subcategories: (subcategories || []).map((c: Record<string, unknown>) => ({
      name: c.name as string,
      slug: c.slug as string,
      count: c.count as number,
    })),
  }
})
