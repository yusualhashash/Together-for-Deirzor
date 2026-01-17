import { updateStatisticOrder } from "@/lib/statistic/statistic"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"


export async function POST(request: Request) {
  try {
    const { items } = await request.json()
    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }

    for (const item of items) {
      if (item.id != null && item.display_order != null) {
        await updateStatisticOrder(Number(item.id), Number(item.display_order))
      }
    }
    revalidatePath("/")
    revalidatePath("/admin/statistics")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error reordering statistics:", error)
    return NextResponse.json({ error: "Failed to reorder" }, { status: 500 })
  }
}
