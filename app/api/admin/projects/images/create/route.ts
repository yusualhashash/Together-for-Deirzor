import { createProjectImage } from "@/lib/project/project-images"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { project_id, image_url, caption, display_order } = body

        if (!project_id || !image_url) {
            return NextResponse.json(
                { error: "project_id and image_url are required" },
                { status: 400 },
            )
        }

        const newImage = await createProjectImage({
            project_id,
            image_url,
            caption: caption || null,
            display_order: display_order || 0,
        })

        return NextResponse.json(newImage)
    } catch (error) {
        console.error("Error creating project image:", error)
        return NextResponse.json({ error: "Failed to create project image" }, { status: 500 })
    }
}
