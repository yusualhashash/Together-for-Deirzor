import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { createAboutValue, getAllAboutValues } from "@/lib/about"

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("admin_session")
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { value_text } = await request.json()

    // Get current max display_order
    const allValues = await getAllAboutValues()
    const maxOrder = allValues.length > 0 ? Math.max(...allValues.map((v) => v.display_order)) : 0

    await createAboutValue(value_text, maxOrder + 1)

    revalidatePath("/about")
    revalidatePath("/admin/about")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error adding about value:", error)
    return NextResponse.json({ error: "Failed to add value" }, { status: 500 })
  }
}
