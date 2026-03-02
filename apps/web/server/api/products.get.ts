import { z } from 'zod'

const querySchema = z.object({
  slug: z.string().optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
  manufacturer: z.string().optional(),
  voltage: z.string().optional(),
  amperage: z.string().optional(),
  type: z.string().optional(),
  search: z.string().optional(),
  page: z.string().optional().transform(v => Math.max(1, parseInt(v || '1') || 1)),
  limit: z.string().optional().transform(v => Math.min(100, Math.max(1, parseInt(v || '24') || 24))),
  sort: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, querySchema.parse)
  const db = useD1(event)

  // Single product by slug
  if (query.slug) {
    const product = await db.prepare('SELECT * FROM products WHERE slug = ?').bind(query.slug as string).first()
    if (!product) {
      throw createError({ statusCode: 404, message: 'Product not found' })
    }
    return {
      ...product,
      images: JSON.parse((product.images as string) || '[]'),
      tags: JSON.parse((product.tags as string) || '[]'),
    }
  }

  // Build dynamic query
  const conditions: string[] = []
  const params: any[] = []

  // Category filter
  if (query.category) {
    conditions.push('category = ?')
    params.push(query.category)
  }

  // Subcategory filter
  if (query.subcategory) {
    conditions.push('subcategory = ?')
    params.push(query.subcategory)
  }

  // Manufacturer filter
  if (query.manufacturer) {
    conditions.push('manufacturer = ?')
    params.push(query.manufacturer)
  }

  // Voltage filter
  if (query.voltage) {
    conditions.push('voltage = ?')
    params.push(query.voltage)
  }

  // Amperage filter
  if (query.amperage) {
    conditions.push('amperage = ?')
    params.push(query.amperage)
  }

  // Type filter
  if (query.type) {
    conditions.push('type = ?')
    params.push(query.type)
  }

  // Search
  if (query.search) {
    const term = `%${query.search}%`
    conditions.push('(name LIKE ? OR description LIKE ? OR manufacturer LIKE ? OR sku LIKE ? OR model LIKE ? OR short_description LIKE ? OR tags LIKE ?)')
    params.push(term, term, term, term, term, term, term)
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

  // Count total
  const countRow = await db.prepare(`SELECT COUNT(*) as total FROM products ${whereClause}`).bind(...params).first()
  const total = (countRow as any)?.total || 0

  // Pagination
  const page = query.page
  const limit = query.limit
  const offset = (page - 1) * limit

  // Sorting
  const sortOptions: Record<string, string> = {
    'name-asc': 'name ASC',
    'name-desc': 'name DESC',
    'newest': 'id DESC',
    'manufacturer': 'manufacturer ASC, name ASC',
  }
  const sort = sortOptions[(query.sort as string)] || 'name ASC'

  const { results: products } = await db.prepare(
    `SELECT id, name, slug, sku, manufacturer, model, category, subcategory, condition, voltage, amperage, type, short_description, images FROM products ${whereClause} ORDER BY ${sort} LIMIT ? OFFSET ?`
  ).bind(...params, limit, offset).all()

  return {
    products: (products || []).map((p: any) => ({
      ...p,
      images: JSON.parse(p.images || '[]'),
    })),
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  }
})
