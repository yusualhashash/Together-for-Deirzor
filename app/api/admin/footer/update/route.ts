import { updateFooterLink } from "@/lib/footer/footer"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"


export async function POST(request: Request) {
  try {
    const { id, title, url, is_active } = await request.json()
    await updateFooterLink(id, title, url, is_active)

    revalidatePath("/", "layout")
    revalidatePath("/admin/footer")

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update footer link" }, { status: 500 })
  }
}
