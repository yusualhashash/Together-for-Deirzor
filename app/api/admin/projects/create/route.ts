import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { createProject } from "@/lib/project/project"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const projectId = await createProject({
      title: data.title,
      description: data.description,
      sector_id: data.sector_id ?? null,
      location: data.location,
      start_date: data.start_date ?? null,
      end_date: data.end_date ?? null,
      beneficiaries: data.beneficiaries ?? null,
      budget: data.budget ?? null,
      status: data.status,
      image_url: data.image_url ?? null,
      is_featured: data.is_featured ?? false,
      display_order: 0,
    })

    revalidatePath("/")
    revalidatePath("/projects")
    revalidatePath("/admin/projects")

    return NextResponse.json({ success: true, projectId })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    )
  }
}
