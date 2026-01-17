import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { deleteNavigationItem } from "@/lib/navigation/navigation"

export async function POST(request: Request) {
  try {
    const { id } = await request.json()
    await deleteNavigationItem(id)

    revalidatePath("/", "layout")
    revalidatePath("/admin/navigation")

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete navigation item" }, { status: 500 })
  }
}
