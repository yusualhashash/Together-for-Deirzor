import { sql } from "../db"
import { ImpactStory } from "../types"

// ===== Impact Story Functions =====
export async function getImpactStories(): Promise<ImpactStory[]> {
    const result = await sql`
    SELECT * FROM impact_stories 
    ORDER BY display_order ASC
  `
    return result as ImpactStory[]
}

export async function getFeaturedStories(): Promise<ImpactStory[]> {
    const result = await sql`
    SELECT * FROM impact_stories 
    WHERE is_featured = true
    ORDER BY display_order ASC
    LIMIT 3
  `
    return result as ImpactStory[]
}

export async function getImpactStory(id: number): Promise<ImpactStory | null> {
    const result = await sql`
    SELECT * FROM impact_stories 
    WHERE id = ${id}
    LIMIT 1
  `
    return result.length > 0 ? (result[0] as ImpactStory) : null
}

export async function createImpactStory(
    title: string,
    story: string,
    beneficiary_name: string,
    project_id: number | null,
    image_url: string | null,
    video_url: string | null,
    is_featured: boolean,
    display_order: number,
): Promise<void> {
    await sql`
    INSERT INTO impact_stories (
      title, story, beneficiary_name, project_id, image_url, video_url, is_featured, display_order
    )
    VALUES (
      ${title}, ${story}, ${beneficiary_name}, ${project_id}, ${image_url}, ${video_url}, ${is_featured}, ${display_order}
    )
  `
}

export async function updateImpactStory(
    id: number,
    title: string,
    story: string,
    beneficiary_name: string,
    project_id: number | null,
    image_url: string | null,
    video_url: string | null,
    is_featured: boolean,
): Promise<void> {
    await sql`
    UPDATE impact_stories 
    SET title = ${title}, 
        story = ${story}, 
        beneficiary_name = ${beneficiary_name},
        project_id = ${project_id},
        image_url = ${image_url},
        video_url = ${video_url},
        is_featured = ${is_featured},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function updateImpactStoryOrder(id: number, display_order: number): Promise<void> {
    await sql`
    UPDATE impact_stories 
    SET display_order = ${display_order}, 
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function deleteImpactStory(id: number): Promise<void> {
    await sql`
    DELETE FROM impact_stories WHERE id = ${id}
  `
}
