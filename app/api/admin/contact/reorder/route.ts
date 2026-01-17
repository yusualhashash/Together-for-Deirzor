import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { updateContactInfoOrder } from "@/lib/contact/contact"

export async function POST(request: Request) {
  try {
    const { updates } = await request.json()

    for (const update of updates) {
      await updateContactInfoOrder(update.id, update.sort_order)
    }
    revalidatePath("/")
    revalidatePath("/contact")
    revalidatePath("/admin/contact")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Reorder error:", error)
    return NextResponse.json({ error: "Failed to reorder contact info" }, { status: 500 })
  }
}
