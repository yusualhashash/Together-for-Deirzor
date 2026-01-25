import { sql } from "../db"
import { Project } from "../types"

// ===== Project Queries =====

export async function getProjects(): Promise<Project[]> {
  const result = await sql`
    SELECT * FROM projects
    ORDER BY display_order ASC
  `
  return result as Project[]
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const result = await sql`
    SELECT * FROM projects
    WHERE is_featured = true
    ORDER BY display_order ASC
    LIMIT 6
  `
  return result as Project[]
}

export async function getProjectsBySector(sectorId: number): Promise<Project[]> {
  const result = await sql`
    SELECT * FROM projects
    WHERE sector_id = ${sectorId}
    ORDER BY display_order ASC
  `
  return result as Project[]
}

export async function getProject(id: number): Promise<Project | null> {
  const result = await sql`
    SELECT * FROM projects
    WHERE id = ${id}
    LIMIT 1
  `
  return result.length > 0 ? (result[0] as Project) : null
}

export async function createProject({
  title,
  description,
  sector_id,
  location,
  start_date,
  end_date,
  beneficiaries,
  budget,
  status,
  image_url,
  is_featured = false,
  display_order = 0,
}: {
  title: string
  description: string
  sector_id: number | null
  location: string
  start_date: string | null
  end_date: string | null
  beneficiaries: number | null
  budget: number | null,
  status: string
  image_url: string | null
  is_featured?: boolean
  display_order?: number
}): Promise<number> {
  const result = await sql`
    INSERT INTO projects (
      title,
      description,
      sector_id,
      location,
      start_date,
      end_date,
      beneficiaries,
      budget,
      status,
      image_url,
      is_featured,
      display_order
    )
    VALUES (
      ${title},
      ${description},
      ${sector_id},
      ${location},
      ${start_date},
      ${end_date},
      ${beneficiaries},
      ${budget},
      ${status},
      ${image_url},
      ${is_featured},
      ${display_order}
    )
    RETURNING id
  `
  return result[0].id as number
}


export async function updateProject(
  id: number,
  title: string,
  description: string,
  sector_id: number | null,
  location: string,
  start_date: string | null,
  end_date: string | null,
  beneficiaries: number | null,
  budget: number | null,
  status: string,
  image_url: string | null,
  is_featured: boolean,
): Promise<void> {
  await sql`
    UPDATE projects 
    SET title = ${title}, 
        description = ${description}, 
        sector_id = ${sector_id},
        location = ${location},
        start_date = ${start_date},
        end_date = ${end_date},
        beneficiaries = ${beneficiaries},
        budget = ${budget},
        status = ${status},
        image_url = ${image_url},
        is_featured = ${is_featured},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}


/* ===== REORDER (same as partners) ===== */
export async function updateProjectOrder(
  id: number,
  display_order: number
): Promise<void> {
  await sql`
    UPDATE projects
    SET
      display_order = ${display_order},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function deleteProject(id: number): Promise<void> {
  await sql`
    DELETE FROM projects WHERE id = ${id}
  `
}
