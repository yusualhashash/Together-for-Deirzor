import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"
import { deleteStatistic } from "@/lib/statistic/statistic"

export async function POST(request: Request) {
  try {
    const { id } = await request.json()
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 })
    }
    await deleteStatistic(Number(id))
    revalidatePath("/")
    revalidatePath("/admin/statistics")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting statistic:", error)
    return NextResponse.json({ error: "Failed to delete statistic" }, { status: 500 })
  }
}
