import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { updateNavigationItem } from "@/lib/navigation/navigation"

export async function POST(request: Request) {

  try {
    const { id, label, href, is_active } = await request.json()
    await updateNavigationItem(id, label, href, is_active)

    revalidatePath("/", "layout")
    revalidatePath("/admin/navigation")

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update navigation item" }, { status: 500 })
  }
}
