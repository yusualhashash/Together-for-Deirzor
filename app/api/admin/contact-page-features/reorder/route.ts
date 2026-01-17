import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { updateContactPageFeatureOrder } from "@/lib/contact/contact"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { features } = data

    if (!features || !Array.isArray(features)) {
      return NextResponse.json({ error: "Invalid features data" }, { status: 400 })
    }

    await Promise.all(
      features.map((feature: { id: number; sort_order: number }) =>
        updateContactPageFeatureOrder(feature.id, feature.sort_order),
      ),
    )
    revalidatePath("/contact")
    revalidatePath("/admin/contact-page")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error reordering contact page features:", error)
    return NextResponse.json({ error: "Failed to reorder contact page features" }, { status: 500 })
  }
}
