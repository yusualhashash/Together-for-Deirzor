import { sql } from "../db"
import { NavigationItem } from "../types"

// ===== Navigation Functions =====
export async function getNavigationItems(): Promise<NavigationItem[]> {
    try {
        const result = await sql`
      SELECT * FROM navigation_items 
      WHERE is_active = true
      ORDER BY display_order ASC
    `
        return result as NavigationItem[]
    } catch (error) {
        console.error("[v0] Error fetching navigation items:", error)
        return []
    }
}

export async function getAllNavigationItems(): Promise<NavigationItem[]> {
    const result = await sql`
    SELECT * FROM navigation_items 
    ORDER BY display_order ASC
  `
    return result as NavigationItem[]
}

export async function createNavigationItem(label: string, href: string, display_order: number): Promise<void> {
    await sql`
    INSERT INTO navigation_items (label, href, display_order)
    VALUES (${label}, ${href}, ${display_order})
  `
}

export async function updateNavigationItem(id: number, label: string, href: string, is_active: boolean): Promise<void> {
    await sql`
    UPDATE navigation_items 
    SET label = ${label}, 
        href = ${href},
        is_active = ${is_active},
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function updateNavigationItemOrder(id: number, display_order: number): Promise<void> {
    await sql`
    UPDATE navigation_items 
    SET display_order = ${display_order}, 
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ${id}
  `
}

export async function deleteNavigationItem(id: number): Promise<void> {
    await sql`
    DELETE FROM navigation_items WHERE id = ${id}
  `
}
