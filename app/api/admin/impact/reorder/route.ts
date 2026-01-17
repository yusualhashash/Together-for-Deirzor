import { updateImpactStoryOrder } from "@/lib/impact/impact"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"


export async function POST(request: Request) {
  try {
    const { items } = await request.json()

    for (const item of items) {
      await updateImpactStoryOrder(item.id, item.display_order)
    }

    revalidatePath("/")
    revalidatePath("/impact")
    revalidatePath("/admin/impact")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error reordering impact stories:", error)
    return NextResponse.json(
      { error: "Failed to reorder impact stories" },
      { status: 500 }
    )
  }
}
