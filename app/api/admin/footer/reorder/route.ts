import { updateFooterLinkOrder } from "@/lib/footer/footer"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { items } = await request.json()

    for (const item of items) {
      await updateFooterLinkOrder(item.id, item.display_order)
    }

    revalidatePath("/", "layout")
    revalidatePath("/admin/footer")

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to reorder" }, { status: 500 })
  }
}
