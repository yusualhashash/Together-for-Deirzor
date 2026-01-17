import { updateImpactStory } from "@/lib/impact/impact"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"


export async function POST(request: Request) {
  try {
    const { id, title, story, beneficiary_name, project_id, image_url, video_url, is_featured } = await request.json()
    await updateImpactStory(id, title, story, beneficiary_name, project_id, image_url, video_url, is_featured)

    revalidatePath("/")
    revalidatePath("/impact")
    revalidatePath("/admin/impact")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating impact story:", error)
    return NextResponse.json(
      { error: "Failed to update impact story" },
      { status: 500 }
    )
  }
}
