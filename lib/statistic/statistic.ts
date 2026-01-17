import { sql } from "../db"
import { Statistic } from "../types"

// ===== Statistics Functions =====
export async function getStatistics(): Promise<Statistic[]> {
    const result = await sql`
    SELECT * FROM statistics 
    WHERE is_active = true
    ORDER BY display_order ASC
  `
    return result as Statistic[]
}

export async function getAllStatistics(): Promise<Statistic[]> {
    const result = await sql`
    SELECT * FROM statistics 
    ORDER BY display_order ASC
  `
    return result as Statistic[]
}

export async function getStatistic(id: number): Promise<Statistic | null> {
    const result = await sql`
    SELECT * FROM statistics 
    WHERE id = ${id}
    LIMIT 1
  `
    return result.length > 0 ? (result[0] as Statistic) : null
}

export async function createStatistic(data: {
    label: string
    value: string
    icon: string
    display_order?: number
}): Promise<void> {
    await sql`
    INSERT INTO statistics (label, value, icon, display_order)
    VALUES (
      ${data.label},
      ${data.value},
      ${data.icon},
      ${data.display_order ?? 0}
    )
  `
}

export async function updateStatistic(
    id: number,
    data: {
        label: string
        value: string
        icon: string
        is_active?: boolean
    }
): Promise<void> {
    await sql`
    UPDATE statistics 
    SET label = ${data.label}, 
        value = ${data.value}, 
        icon = ${data.icon},
        is_active = ${data.is_active ?? true},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function updateStatisticOrder(
    id: number,
    display_order: number
): Promise<void> {
    await sql`
    UPDATE statistics 
    SET display_order = ${display_order}, 
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function deleteStatistic(id: number): Promise<void> {
    await sql`
    DELETE FROM statistics WHERE id = ${id}
  `
}
