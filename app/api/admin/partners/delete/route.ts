import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { deletePartner } from "@/lib/partner/partner"


export async function POST(request: Request) {
  try {
    const { id } = (await request.json()) as { id: number }

    if (!id) {
      return NextResponse.json(
        { error: "Partner ID is required" },
        { status: 400 }
      )
    }

    await deletePartner(id)

    revalidatePath("/")
    revalidatePath("/admin/partners")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting partner:", error)
    return NextResponse.json(
      { error: "Failed to delete partner" },
      { status: 500 }
    )
  }
}
