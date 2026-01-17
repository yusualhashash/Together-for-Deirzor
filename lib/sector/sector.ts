import { sql } from "../db"
import { Sector } from "../types"

// ===== Sector Queries =====

export async function getSectors(): Promise<Sector[]> {
  const result = await sql`
    SELECT * FROM sectors
    WHERE is_active = true
    ORDER BY display_order ASC
  `
  return result as Sector[]
}

export async function getAllSectors(): Promise<Sector[]> {
  const result = await sql`
    SELECT * FROM sectors
    ORDER BY display_order ASC
  `
  return result as Sector[]
}

export async function getSector(id: number): Promise<Sector | null> {
  const result = await sql`
    SELECT * FROM sectors
    WHERE id = ${id}
    LIMIT 1
  `
  return result.length > 0 ? (result[0] as Sector) : null
}

// ===== CREATE SECTOR (object style) =====
export async function createSector({
  title,
  description,
  icon,
  image_url = null,
  display_order = 0,
}: {
  title: string
  description: string
  icon: string
  image_url?: string | null
  display_order?: number
}): Promise<void> {
  await sql`
    INSERT INTO sectors (title, description, icon, image_url, display_order)
    VALUES (${title}, ${description}, ${icon}, ${image_url}, ${display_order})
  `
}

// ===== UPDATE SECTOR =====
export async function updateSector(
  id: number,
  title: string,
  description: string,
  icon: string,
  image_url: string | null,
  is_active: boolean
): Promise<void> {
  await sql`
    UPDATE sectors
    SET title = ${title},
        description = ${description},
        icon = ${icon},
        image_url = ${image_url},
        is_active = ${is_active},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

// ===== UPDATE SECTOR ORDER =====
export async function updateSectorOrder(id: number, display_order: number): Promise<void> {
  await sql`
    UPDATE sectors
    SET display_order = ${display_order},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

// ===== DELETE SECTOR =====
export async function deleteSector(id: number): Promise<void> {
  await sql`
    DELETE FROM sectors WHERE id = ${id}
  `
}
