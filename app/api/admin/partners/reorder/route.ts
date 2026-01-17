import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { updatePartnerOrder } from "@/lib/partner/partner"


interface ReorderItem {
  id: number
  display_order: number
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const items = body.items as ReorderItem[]

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Invalid reorder data" },
        { status: 400 }
      )
    }

    await Promise.all(
      items.map((item) =>
        updatePartnerOrder(item.id, item.display_order)
      )
    )

    revalidatePath("/")
    revalidatePath("/admin/partners")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error reordering partners:", error)
    return NextResponse.json(
      { error: "Failed to reorder partners" },
      { status: 500 }
    )
  }
}
