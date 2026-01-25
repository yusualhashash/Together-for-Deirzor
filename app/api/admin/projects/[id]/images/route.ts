import { NextResponse } from "next/server"
import { getProjectImages } from "@/lib/project/project-images"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const projectId = parseInt(id)

        if (isNaN(projectId)) {
            return NextResponse.json(
                { error: "Invalid project ID" },
                { status: 400 }
            )
        }

        const images = await getProjectImages(projectId)

        return NextResponse.json({ images })
    } catch (error) {
        console.error("Error fetching project images:", error)
        return NextResponse.json(
            { error: "Failed to fetch project images" },
            { status: 500 }
        )
    }
}
