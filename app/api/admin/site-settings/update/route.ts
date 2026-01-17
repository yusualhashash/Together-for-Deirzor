import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { updateSiteSettings } from "@/lib/site-settings"

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("admin_session")
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    await updateSiteSettings(data)

    revalidatePath("/", "layout")
    revalidatePath("/admin/content")
    revalidatePath("/admin/site-settings")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating site settings:", error)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}
