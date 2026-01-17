import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { deleteSector } from "@/lib/sector/sector"

export async function POST(request: Request) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: "Sector ID is required" },
        { status: 400 }
      )
    }

    await deleteSector(id)

    // Revalidate pages
    revalidatePath("/")
    revalidatePath("/sectors")
    revalidatePath("/admin/sectors")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting sector:", error)
    return NextResponse.json(
      { error: "Failed to delete sector" },
      { status: 500 }
    )
  }
}
