export default defineEventHandler(async (event) => {
  const db = useD1(event)

  // Get distinct filter values from products
  const [manufacturers, voltages, amperages, conditions] = await Promise.all([
    db
      .prepare(
        `SELECT DISTINCT manufacturer FROM products WHERE manufacturer != '' ORDER BY manufacturer ASC`,
      )
      .all(),
    db
      .prepare(`SELECT DISTINCT voltage FROM products WHERE voltage != '' ORDER BY voltage ASC`)
      .all(),
    db
      .prepare(`SELECT DISTINCT amperage FROM products WHERE amperage != '' ORDER BY amperage ASC`)
      .all(),
    db
      .prepare(
        `SELECT DISTINCT condition FROM products WHERE condition != '' ORDER BY condition ASC`,
      )
      .all(),
  ])

  return {
    manufacturers: (manufacturers.results || []).map((r: any) => r.manufacturer),
    voltages: (voltages.results || []).map((r: any) => r.voltage),
    amperages: (amperages.results || []).map((r: any) => r.amperage),
    conditions: (conditions.results || []).map((r: any) => r.condition),
  }
})
