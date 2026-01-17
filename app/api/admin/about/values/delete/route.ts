import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { deleteAboutValue } from "@/lib/about"

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("admin_session")
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await request.json()
    await deleteAboutValue(id)

    revalidatePath("/about")
    revalidatePath("/admin/about")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting about value:", error)
    return NextResponse.json({ error: "Failed to delete value" }, { status: 500 })
  }
}
