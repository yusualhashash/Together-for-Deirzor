import { deleteProjectImage } from "@/lib/project/project-images"
import { NextResponse } from "next/server"

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")

        if (!id) {
            return NextResponse.json({ error: "Image ID is required" }, { status: 400 })
        }

        await deleteProjectImage(Number.parseInt(id))
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting project image:", error)
        return NextResponse.json({ error: "Failed to delete project image" }, { status: 500 })
    }
}
