import { sql } from "./db"
import type { CTASection } from "./types"

export async function getCTASection(): Promise<CTASection> {
  try {
    const result = await sql`
      SELECT * FROM cta_section 
      WHERE is_active = true
      LIMIT 1
    `

    if (result.length === 0) {
      return {
        title: "كن جزءاً من التغيير",
        description: "انضم إلينا في رحلتنا لبناء مستقبل أفضل للمجتمع",
        primary_button_text: "تواصل معنا الآن",
        primary_button_url: "/contact",
        secondary_button_text: "استكشف مشاريعنا",
        secondary_button_url: "/projects",
      }
    }

    const row = result[0] as any
    return {
      title: row.title,
      description: row.description,
      primary_button_text: row.primary_button_text,
      primary_button_url: row.primary_button_url,
      secondary_button_text: row.secondary_button_text,
      secondary_button_url: row.secondary_button_url,
    }
  } catch (error) {
    console.error("Error fetching CTA section:", error)
    return {
      title: "كن جزءاً من التغيير",
      description: "انضم إلينا في رحلتنا لبناء مستقبل أفضل للمجتمع",
      primary_button_text: "تواصل معنا الآن",
      primary_button_url: "/contact",
      secondary_button_text: "استكشف مشاريعنا",
      secondary_button_url: "/projects",
    }
  }
}

export async function updateCTASection(data: CTASection): Promise<void> {
  await sql`
    UPDATE cta_section
    SET
      title = ${data.title},
      description = ${data.description},
      primary_button_text = ${data.primary_button_text},
      primary_button_url = ${data.primary_button_url},
      secondary_button_text = ${data.secondary_button_text},
      secondary_button_url = ${data.secondary_button_url},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = 1
  `
}
