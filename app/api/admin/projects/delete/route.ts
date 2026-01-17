import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { deleteProject } from "@/lib/project/project"

export async function POST(request: Request) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      )
    }

    await deleteProject(id)

    revalidatePath("/")
    revalidatePath("/projects")
    revalidatePath("/admin/projects")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    )
  }
}
