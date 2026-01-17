import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { deleteContactInfo } from "@/lib/contact/contact"

export async function POST(request: Request) {
  try {
    const { id } = await request.json()
    await deleteContactInfo(id)
    revalidatePath("/")
    revalidatePath("/contact")
    revalidatePath("/admin/contact")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ error: "Failed to delete contact info" }, { status: 500 })
  }
}
