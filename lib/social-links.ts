import { sql } from "./db"
import type { SocialLink } from "./types"

export async function getSocialLinks(): Promise<SocialLink[]> {
  const result = await sql`
    SELECT * FROM social_links
    WHERE is_active = true
    ORDER BY display_order ASC
  `
  return result as SocialLink[]
}

export async function getAllSocialLinks(): Promise<SocialLink[]> {
  const result = await sql`
    SELECT * FROM social_links
    ORDER BY display_order ASC
  `
  return result as SocialLink[]
}

export async function createSocialLink({
  platform,
  url,
  icon,
}: {
  platform: string
  url: string
  icon: string
}): Promise<void> {
  await sql`
    INSERT INTO social_links (platform, url, icon, is_active, display_order)
    VALUES (
      ${platform},
      ${url},
      ${icon.toLowerCase()},
      true,
      (SELECT COALESCE(MAX(display_order), 0) + 1 FROM social_links)
    )
  `
}

export async function updateSocialLink(
  id: number,
  platform: string,
  url: string,
  icon: string,
  is_active: boolean
): Promise<void> {
  await sql`
    UPDATE social_links
    SET
      platform = ${platform},
      url = ${url},
      icon = ${icon.toLowerCase()},
      is_active = ${is_active},
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function updateSocialLinkOrder(id: number, display_order: number) {
  await sql`
    UPDATE social_links
    SET display_order = ${display_order},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function deleteSocialLink(id: number) {
  await sql`
    DELETE FROM social_links WHERE id = ${id}
  `
}
