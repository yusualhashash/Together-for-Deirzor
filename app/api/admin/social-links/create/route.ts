import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { createSocialLink } from "@/lib/social-links"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    if (!data.platform || !data.url || !data.icon) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    await createSocialLink({
      platform: data.platform,
      url: data.url,
      icon: data.icon,
    })

    revalidatePath("/")
    revalidatePath("/admin/content")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error creating social link:", error)
    return NextResponse.json(
      { error: "Failed to create social link" },
      { status: 500 }
    )
  }
}
