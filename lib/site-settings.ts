import { sql } from "@/lib/db"

export interface SiteSettings {
  id: number
  site_name: string
  site_tagline: string
  site_description: string
  hero_title: string
  hero_subtitle: string
  hero_description: string
  footer_about_title: string
  footer_about_description: string
  meta_description: string
  meta_keywords: string
  og_title: string
  og_description: string
  created_at: Date
  updated_at: Date
}

// Get site settings (there should only be one row)
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const result = await sql`
      SELECT * FROM site_settings LIMIT 1
    `

    if (result.length === 0) {
      // Return default values if no settings found
      return {
        id: 1,
        site_name: "معاً لأجل دير الزور",
        site_tagline: "نعمل معاً لبناء مستقبل أفضل",
        site_description: "منظمة إنسانية تعمل في مجالات متعددة لخدمة المجتمع",
        hero_title: "معاً لأجل دير الزور",
        hero_subtitle: "نعمل معاً لبناء مستقبل أفضل",
        hero_description: "منظمة إنسانية تعمل في مجالات متعددة لخدمة المجتمع",
        footer_about_title: "معاً لأجل دير الزور",
        footer_about_description: "منظمة إنسانية تعمل لخدمة المجتمع",
        meta_description:
          "منظمة إنسانية سورية تعمل في مجالات التعليم والصحة والزراعة وحماية الطفل والتنمية المجتمعية لتحسين حياة المجتمعات في دير الزور",
        meta_keywords:
          "معاً لأجل دير الزور, منظمة إنسانية, سوريا, دير الزور, تعليم, صحة, زراعة, حماية الطفل, تنمية مجتمعية",
        og_title: "معاً لأجل دير الزور - منظمة إنسانية سورية",
        og_description: "نعمل على تحسين حياة المجتمعات من خلال برامج متعددة في التعليم والصحة والتنمية",
        created_at: new Date(),
        updated_at: new Date(),
      }
    }

    return result[0] as SiteSettings
  } catch (error) {
    console.error("Error fetching site settings:", error)
    // Return default values on error
    return {
      id: 1,
      site_name: "معاً لأجل دير الزور",
      site_tagline: "نعمل معاً لبناء مستقبل أفضل",
      site_description: "منظمة إنسانية تعمل في مجالات متعددة لخدمة المجتمع",
      hero_title: "معاً لأجل دير الزور",
      hero_subtitle: "نعمل معاً لبناء مستقبل أفضل",
      hero_description: "منظمة إنسانية تعمل في مجالات متعددة لخدمة المجتمع",
      footer_about_title: "معاً لأجل دير الزور",
      footer_about_description: "منظمة إنسانية تعمل لخدمة المجتمع",
      meta_description:
        "منظمة إنسانية سورية تعمل في مجالات التعليم والصحة والزراعة وحماية الطفل والتنمية المجتمعية لتحسين حياة المجتمعات في دير الزور",
      meta_keywords:
        "معاً لأجل دير الزور, منظمة إنسانية, سوريا, دير الزور, تعليم, صحة, زراعة, حماية الطفل, تنمية مجتمعية",
      og_title: "معاً لأجل دير الزور - منظمة إنسانية سورية",
      og_description: "نعمل على تحسين حياة المجتمعات من خلال برامج متعددة في التعليم والصحة والتنمية",
      created_at: new Date(),
      updated_at: new Date(),
    }
  }
}

// Update site settings
export async function updateSiteSettings(settings: Partial<SiteSettings>): Promise<void> {
  try {
    await sql`
      UPDATE site_settings
      SET
        site_name = COALESCE(${settings.site_name}, site_name),
        site_tagline = COALESCE(${settings.site_tagline}, site_tagline),
        site_description = COALESCE(${settings.site_description}, site_description),
        hero_title = COALESCE(${settings.hero_title}, hero_title),
        hero_subtitle = COALESCE(${settings.hero_subtitle}, hero_subtitle),
        hero_description = COALESCE(${settings.hero_description}, hero_description),
        footer_about_title = COALESCE(${settings.footer_about_title}, footer_about_title),
        footer_about_description = COALESCE(${settings.footer_about_description}, footer_about_description),
        meta_description = COALESCE(${settings.meta_description}, meta_description),
        meta_keywords = COALESCE(${settings.meta_keywords}, meta_keywords),
        og_title = COALESCE(${settings.og_title}, og_title),
        og_description = COALESCE(${settings.og_description}, og_description),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
    `
  } catch (error) {
    console.error("Error updating site settings:", error)
    throw error
  }
}
