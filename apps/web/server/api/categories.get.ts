export default defineEventHandler(async (event) => {
  const db = useD1(event)

  const { results: categories } = await db
    .prepare(
      `
    SELECT name, slug, parent, count
    FROM categories
    ORDER BY count DESC
  `,
    )
    .all()

  // Build hierarchical structure
  const parentCats = (categories || []).filter((c: any) => !c.parent)
  const childCats = (categories || []).filter((c: any) => c.parent)

  return parentCats.map((parent: any) => ({
    name: parent.name,
    slug: parent.slug,
    count: parent.count,
    subcategories: childCats
      .filter((c: any) => c.parent === parent.name)
      .map((c: any) => ({
        name: c.name,
        slug: c.slug,
        count: c.count,
      }))
      .sort((a: any, b: any) => b.count - a.count),
  }))
})
