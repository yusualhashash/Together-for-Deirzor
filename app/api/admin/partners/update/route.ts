import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { updatePartner } from "@/lib/partner/partner"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      id,
      name,
      website,
      description,
      is_active,
    } = body as {
      id: number
      name: string
      website?: string | null
      description?: string
      is_active?: boolean
    }

    if (!id || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    await updatePartner({
      id,
      name,
      website: website ?? null,
      description: description ?? "",
      is_active: is_active ?? true,
    })

    revalidatePath("/")
    revalidatePath("/admin/partners")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating partner:", error)
    return NextResponse.json(
      { error: "Failed to update partner" },
      { status: 500 }
    )
  }
}
