import { sql } from "../db"

export interface ProjectImage {
    id: number
    project_id: number
    image_url: string
    caption: string | null
    display_order: number
    created_at: string
}

export async function getProjectImages(
    projectId: number
): Promise<ProjectImage[]> {
    const result = await sql`
    SELECT * FROM project_images
    WHERE project_id = ${projectId}
    ORDER BY display_order ASC
  `
    return result as ProjectImage[]
}

export async function createProjectImage({
    project_id,
    image_url,
    caption,
    display_order = 0,
}: {
    project_id: number
    image_url: string
    caption?: string | null
    display_order?: number
}): Promise<void> {
    await sql`
    INSERT INTO project_images (
      project_id,
      image_url,
      caption,
      display_order
    )
    VALUES (
      ${project_id},
      ${image_url},
      ${caption || null},
      ${display_order}
    )
  `
}

export async function updateProjectImage(
    id: number,
    image_url: string,
    caption: string | null
): Promise<void> {
    await sql`
    UPDATE project_images
    SET 
      image_url = ${image_url},
      caption = ${caption}
    WHERE id = ${id}
  `
}

export async function deleteProjectImage(id: number): Promise<void> {
    await sql`
    DELETE FROM project_images WHERE id = ${id}
  `
}

export async function updateProjectImageOrder(
    id: number,
    display_order: number
): Promise<void> {
    await sql`
    UPDATE project_images
    SET display_order = ${display_order}
    WHERE id = ${id}
  `
}
