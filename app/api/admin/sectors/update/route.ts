import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { updateSector } from "@/lib/sector/sector"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const id = Number(body.id)

    // Validate required fields
    if (!id || !body.title || !body.icon) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    await updateSector(
      id,
      body.title,                     // <-- changed from name to title
      body.description ?? "",
      body.icon,
      body.image_url ?? null,
      Boolean(body.is_active ?? true) // default to true
    )

    // Revalidate pages
    revalidatePath("/")
    revalidatePath("/sectors")
    revalidatePath("/admin/sectors")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating sector:", error)
    return NextResponse.json(
      { error: "Failed to update sector" },
      { status: 500 }
    )
  }
}
