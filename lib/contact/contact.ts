import { sql } from "../db"
import { ContactInfo, ContactPageFeature, ContactPageHero } from "../types"


export async function getContactInfo(): Promise<ContactInfo[]> {
  const result = await sql`
    SELECT * FROM contact_info 
    WHERE is_active = true
    ORDER BY sort_order ASC
  `
  return result as ContactInfo[]
}

export async function getAllContactInfo(): Promise<ContactInfo[]> {
  const result = await sql`
    SELECT * FROM contact_info 
    ORDER BY sort_order ASC
  `
  return result as ContactInfo[]
}

export async function updateContactInfo(
  id: number,
  type: string,
  label: string,
  value: string,
  icon: string,
  is_active: boolean,
): Promise<void> {
  await sql`
    UPDATE contact_info 
    SET type = ${type}, 
        label = ${label}, 
        value = ${value},
        icon = ${icon},
        is_active = ${is_active},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function updateContactInfoOrder(id: number, sort_order: number): Promise<void> {
  await sql`
    UPDATE contact_info 
    SET sort_order = ${sort_order}, 
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function deleteContactInfo(id: number): Promise<void> {
  await sql`
    DELETE FROM contact_info WHERE id = ${id}
  `
}

export async function createContactInfo(
  type: string,
  label: string,
  value: string,
  icon: string,
  sort_order: number,
): Promise<void> {
  await sql`
    INSERT INTO contact_info (type, label, value, icon, sort_order)
    VALUES (${type}, ${label}, ${value}, ${icon}, ${sort_order})
  `
}

export async function getContactPageHero(): Promise<ContactPageHero | null> {
  const result = await sql`
    SELECT * FROM contact_page_hero 
    LIMIT 1
  `
  return result.length > 0 ? (result[0] as ContactPageHero) : null
}

export async function updateContactPageHero(
  id: number,
  badge_text: string,
  title: string,
  subtitle: string,
): Promise<void> {
  await sql`
    UPDATE contact_page_hero 
    SET badge_text = ${badge_text},
        title = ${title},
        subtitle = ${subtitle},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function getContactPageFeatures(): Promise<ContactPageFeature[]> {
  const result = await sql`
    SELECT * FROM contact_page_features 
    WHERE is_active = true
    ORDER BY sort_order ASC
  `
  return result as ContactPageFeature[]
}

export async function getAllContactPageFeatures(): Promise<ContactPageFeature[]> {
  const result = await sql`
    SELECT * FROM contact_page_features 
    ORDER BY sort_order ASC
  `
  return result as ContactPageFeature[]
}

export async function updateContactPageFeature(
  id: number,
  icon: string,
  title: string,
  description: string,
  is_active: boolean,
): Promise<void> {
  await sql`
    UPDATE contact_page_features 
    SET icon = ${icon},
        title = ${title},
        description = ${description},
        is_active = ${is_active},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function updateContactPageFeatureOrder(id: number, sort_order: number): Promise<void> {
  await sql`
    UPDATE contact_page_features 
    SET sort_order = ${sort_order}, 
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function deleteContactPageFeature(id: number): Promise<void> {
  await sql`
    DELETE FROM contact_page_features WHERE id = ${id}
  `
}

export async function createContactPageFeature(
  icon: string,
  title: string,
  description: string,
  sort_order: number,
): Promise<void> {
  await sql`
    INSERT INTO contact_page_features (icon, title, description, sort_order)
    VALUES (${icon}, ${title}, ${description}, ${sort_order})
  `
}
