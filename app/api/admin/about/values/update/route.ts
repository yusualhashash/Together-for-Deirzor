import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { updateAboutValue } from "@/lib/about"

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("admin_session")
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id, value_text, is_active } = await request.json()
    await updateAboutValue(id, value_text, is_active)

    revalidatePath("/about")
    revalidatePath("/admin/about")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error updating about value:", error)
    return NextResponse.json({ error: "Failed to update value" }, { status: 500 })
  }
}
