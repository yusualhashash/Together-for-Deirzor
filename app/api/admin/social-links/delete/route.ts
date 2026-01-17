import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { deleteSocialLink } from "@/lib/social-links"

export async function POST(request: Request) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      )
    }

    await deleteSocialLink(id)

    revalidatePath("/")
    revalidatePath("/admin/content")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete social link error:", error)
    return NextResponse.json(
      { error: "Failed to delete social link" },
      { status: 500 }
    )
  }
}
