import { deleteFooterLink } from "@/lib/footer/footer"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { id } = await request.json()
    await deleteFooterLink(id)

    revalidatePath("/", "layout")
    revalidatePath("/admin/footer")

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete footer link" }, { status: 500 })
  }
}
