import { deleteImpactStory } from "@/lib/impact/impact"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"


export async function POST(request: Request) {
  try {
    const { id } = await request.json()
    await deleteImpactStory(id)

    revalidatePath("/")
    revalidatePath("/impact")
    revalidatePath("/admin/impact")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting impact story:", error)
    return NextResponse.json(
      { error: "Failed to delete impact story" },
      { status: 500 }
    )
  }
}
