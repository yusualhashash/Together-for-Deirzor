import { sql } from "../db"
import { CreatePartnerInput, Partner, UpdatePartnerInput } from "../types"

// ===== Partner Functions =====
export async function getPartners(): Promise<Partner[]> {
  const result = await sql`
    SELECT * FROM partners 
    WHERE is_active = true
    ORDER BY display_order ASC
  `
  return result as Partner[]
}

export async function getAllPartners(): Promise<Partner[]> {
  const result = await sql`
    SELECT * FROM partners 
    ORDER BY display_order ASC
  `
  return result as Partner[]
}

export async function getPartner(id: number): Promise<Partner | null> {
  const result = await sql`
    SELECT * FROM partners 
    WHERE id = ${id}
    LIMIT 1
  `
  return result.length > 0 ? (result[0] as Partner) : null
}

export async function createPartner({
  name,
  website,
  description,
  display_order,
}: CreatePartnerInput): Promise<void> {
  await sql`
    INSERT INTO partners (name, website, description, display_order)
    VALUES (${name}, ${website}, ${description}, ${display_order})
  `
}



export async function updatePartner({
  id,
  name,
  website,
  description,
  is_active,
}: UpdatePartnerInput): Promise<void> {
  await sql`
    UPDATE partners
    SET
      name = ${name},
      website = ${website},
      description = ${description},
      is_active = ${is_active},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function updatePartnerOrder(id: number, display_order: number): Promise<void> {
  await sql`
    UPDATE partners 
    SET display_order = ${display_order}, 
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function deletePartner(id: number): Promise<void> {
  await sql`
    DELETE FROM partners WHERE id = ${id}
  `
}
