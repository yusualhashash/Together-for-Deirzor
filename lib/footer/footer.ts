import { sql } from "../db"
import { FooterLink } from "../types"


// ===== Footer Links Functions =====
export async function getFooterLinks(): Promise<FooterLink[]> {
  try {
    const result = await sql`
      SELECT * FROM footer_links 
      WHERE is_active = true
      ORDER BY display_order ASC
    `
    return result as FooterLink[]
  } catch (error) {
    console.error("[Footer] Error fetching footer links:", error)
    return []
  }
}

export async function getAllFooterLinks(): Promise<FooterLink[]> {
  const result = await sql`
    SELECT * FROM footer_links 
    ORDER BY COALESCE(display_order, 9999) ASC, id ASC
  `
  return result as FooterLink[]
}

export async function createFooterLink(
  title: string,      // ✅ Changed from 'label'
  url: string,       // ✅ Changed from 'href'
  display_order: number
): Promise<void> {
  await sql`
    INSERT INTO footer_links (title, url, display_order, is_active)
    VALUES (${title}, ${url}, ${display_order}, true)
  `
}

export async function updateFooterLink(
  id: number,
  title: string,      // ✅ Changed from 'label'
  url: string,       // ✅ Changed from 'href'
  is_active: boolean
): Promise<void> {
  await sql`
    UPDATE footer_links 
    SET title = ${title}, 
        url = ${url},
        is_active = ${is_active},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function updateFooterLinkOrder(id: number, display_order: number): Promise<void> {
  await sql`
    UPDATE footer_links 
    SET display_order = ${display_order}, 
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function deleteFooterLink(id: number): Promise<void> {
  await sql`
    DELETE FROM footer_links WHERE id = ${id}
  `
}
