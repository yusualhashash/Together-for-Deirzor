import { createImpactStory } from "@/lib/impact/impact"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { title, story, beneficiary_name, project_id, image_url, video_url, is_featured, display_order } = await request.json()
    await createImpactStory(title, story, beneficiary_name, project_id, image_url, video_url, is_featured, display_order)

    revalidatePath("/")
    revalidatePath("/impact")
    revalidatePath("/admin/impact")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error creating impact story:", error)
    return NextResponse.json(
      { error: "Failed to create impact story" },
      { status: 500 }
    )
  }
}
