import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { sql } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("admin_session")
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    await sql`
      UPDATE site_settings 
      SET 
        hero_title = ${data.title},
        hero_subtitle = ${data.subtitle},
        hero_description = ${data.description},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = 1
    `

    revalidatePath("/")
    revalidatePath("/admin/content")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating home hero:", error)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}
