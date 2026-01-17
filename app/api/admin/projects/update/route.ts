import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { updateProject } from "@/lib/project/project"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const id = Number(body.id)

    if (!id || !body.title || !body.status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    await updateProject(
      id,
      body.title,
      body.description ?? null,
      body.sector_id !== "" ? Number(body.sector_id) : null,
      body.location ?? null,
      body.start_date || null,
      body.end_date || null,
      body.beneficiaries !== "" ? Number(body.beneficiaries) : null,
      body.budget !== "" ? Number(body.budget) : null,
      body.status,
      body.image_url || null,
      Boolean(body.is_featured),
    )

    revalidatePath("/")
    revalidatePath("/projects")
    revalidatePath("/admin/projects")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    )
  }
}
