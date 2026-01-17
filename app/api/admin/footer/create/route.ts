import { createFooterLink } from "@/lib/footer/footer"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"


export async function POST(request: Request) {
  try {
    const { title, url, display_order } = await request.json()
    await createFooterLink(title, url, display_order)

    revalidatePath("/", "layout")
    revalidatePath("/admin/footer")

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create footer link" }, { status: 500 })
  }
}
