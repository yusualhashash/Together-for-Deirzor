import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { updateSectorOrder } from "@/lib/sector/sector"

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

    // Update orders in parallel
    await Promise.all(
      items.map((item) =>
        updateSectorOrder(item.id, item.display_order)
      )
    )

    // Revalidate pages
    revalidatePath("/")
    revalidatePath("/sectors")
    revalidatePath("/admin/sectors")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error reordering sectors:", error)
    return NextResponse.json(
      { error: "Failed to reorder sectors" },
      { status: 500 }
    )
  }
}
