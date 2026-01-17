import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { createPartner } from "@/lib/partner/partner"


export async function POST(request: Request) {
  try {
    const { name, description, website } = await request.json()

    await createPartner({
      name,
      description,
      website,
      display_order: 0,
    })

    revalidatePath("/")
    revalidatePath("/admin/partners")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error creating partner:", error)
    return NextResponse.json(
      { error: "Failed to create partner" },
      { status: 500 }
    )
  }
}
