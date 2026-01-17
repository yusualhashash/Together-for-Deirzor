import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { createSector } from "@/lib/sector/sector"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    await createSector({
      title: data.title,
      description: data.description,
      icon: data.icon,
      image_url: data.image_url ?? null,
      display_order: 0,
    })

    revalidatePath("/")
    revalidatePath("/sectors")
    revalidatePath("/admin/sectors")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error creating sector:", error)
    return NextResponse.json(
      { error: "Failed to create sector" },
      { status: 500 }
    )
  }
}
