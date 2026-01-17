import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { createNavigationItem } from "@/lib/navigation/navigation"

export async function POST(request: Request) {
  try {
    const { label, href, display_order } = await request.json()
    await createNavigationItem(label, href, display_order)

    revalidatePath("/", "layout")
    revalidatePath("/admin/navigation")

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create navigation item" }, { status: 500 })
  }
}
