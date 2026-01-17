import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { updateNavigationItemOrder } from "@/lib/navigation/navigation"

export async function POST(request: Request) {
  try {
    const { items } = await request.json()

    for (const item of items) {
      await updateNavigationItemOrder(item.id, item.display_order)
    }

    revalidatePath("/", "layout")
    revalidatePath("/admin/navigation")

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to reorder" }, { status: 500 })
  }
}
