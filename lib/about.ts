import { sql } from "./db"

export interface AboutPageData {
  id: number
  hero_title: string
  hero_subtitle: string
  hero_description: string
  vision_title: string
  vision_content: string
  mission_title: string
  mission_content: string
  values_section_title: string
  values_section_subtitle: string
  cta_title: string
  cta_description: string
  created_at: Date
  updated_at: Date
}

export interface AboutValue {
  id: number
  value_text: string
  display_order: number
  is_active: boolean
  created_at: Date
  updated_at: Date
}

export async function getAboutPageData(): Promise<AboutPageData> {
  try {
    const result = await sql`
      SELECT * FROM about_page 
      ORDER BY id DESC 
      LIMIT 1
    `

    if (result.length === 0) {
      // Return default data if not found
      return {
        id: 0,
        hero_title: "منظمة معاً لأجل دير الزور",
        hero_subtitle: "من نحن",
        hero_description: "نعمل معاً لبناء مستقبل أفضل للمجتمع",
        vision_title: "رؤيتنا",
        vision_content: "مجتمع متمكن ومزدهر يعيش فيه الجميع بكرامة",
        mission_title: "رسالتنا",
        mission_content: "تقديم خدمات إنسانية شاملة تساهم في تحسين حياة المجتمعات",
        values_section_title: "قيمنا",
        values_section_subtitle: "المبادئ التي نعمل بها",
        cta_title: "انضم إلينا في رحلتنا",
        cta_description: "معاً نستطيع إحداث فرق حقيقي في حياة الناس",
        created_at: new Date(),
        updated_at: new Date(),
      } as AboutPageData
    }

    return result[0] as AboutPageData
  } catch (error) {
    console.error("[v0] Error fetching about page data:", error)
    throw error
  }
}

export async function getAboutValues(): Promise<AboutValue[]> {
  try {
    const result = await sql`
      SELECT * FROM about_values 
      WHERE is_active = true
      ORDER BY display_order ASC
    `
    return result as AboutValue[]
  } catch (error) {
    console.error("[v0] Error fetching about values:", error)
    return []
  }
}

export async function getAllAboutValues(): Promise<AboutValue[]> {
  try {
    const result = await sql`
      SELECT * FROM about_values 
      ORDER BY display_order ASC
    `
    return result as AboutValue[]
  } catch (error) {
    console.error("[v0] Error fetching all about values:", error)
    return []
  }
}

export async function updateAboutPageData(data: Partial<AboutPageData>): Promise<void> {
  try {
    await sql`
      UPDATE about_page 
      SET 
        hero_title = ${data.hero_title},
        hero_subtitle = ${data.hero_subtitle},
        hero_description = ${data.hero_description},
        vision_title = ${data.vision_title},
        vision_content = ${data.vision_content},
        mission_title = ${data.mission_title},
        mission_content = ${data.mission_content},
        values_section_title = ${data.values_section_title},
        values_section_subtitle = ${data.values_section_subtitle},
        cta_title = ${data.cta_title},
        cta_description = ${data.cta_description},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
    `
  } catch (error) {
    console.error("[v0] Error updating about page data:", error)
    throw error
  }
}

export async function createAboutValue(value_text: string, display_order: number): Promise<void> {
  await sql`
    INSERT INTO about_values (value_text, display_order)
    VALUES (${value_text}, ${display_order})
  `
}

export async function updateAboutValue(id: number, value_text: string, is_active: boolean): Promise<void> {
  await sql`
    UPDATE about_values 
    SET 
      value_text = ${value_text},
      is_active = ${is_active},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function deleteAboutValue(id: number): Promise<void> {
  await sql`
    DELETE FROM about_values WHERE id = ${id}
  `
}

export async function updateAboutValueOrder(id: number, display_order: number): Promise<void> {
  await sql`
    UPDATE about_values 
    SET display_order = ${display_order}, 
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}
