import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { updateSocialLink } from "@/lib/social-links"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const id = Number(body.id)

    if (!id || !body.platform || !body.url || !body.icon) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    await updateSocialLink(
      id,
      body.platform,
      body.url,
      body.icon,
      Boolean(body.is_active ?? true)
    )

    revalidatePath("/")
    revalidatePath("/admin/content")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Update social link error:", error)
    return NextResponse.json(
      { error: "Failed to update social link" },
      { status: 500 }
    )
  }
}
