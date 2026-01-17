import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { updateContactPageFeature } from "@/lib/contact/contact"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { id, icon, title, description, is_active } = data

    if (!icon || !title || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await updateContactPageFeature(id, icon, title, description, is_active)

    revalidatePath("/contact")
    revalidatePath("/admin/contact-page")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating contact page feature:", error)
    return NextResponse.json({ error: "Failed to update contact page feature" }, { status: 500 })
  }
}
