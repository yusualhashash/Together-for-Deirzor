import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { updateContactInfo } from "@/lib/contact/contact"

export async function POST(request: Request) {
  try {
    const { id, type, label, value, icon, is_active } = await request.json()
    await updateContactInfo(id, type, label, value, icon, is_active)
    revalidatePath("/")
    revalidatePath("/contact")
    revalidatePath("/admin/contact")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Update error:", error)
    return NextResponse.json({ error: "Failed to update contact info" }, { status: 500 })
  }
}
