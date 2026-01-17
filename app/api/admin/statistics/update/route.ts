import { updateStatistic } from "@/lib/statistic/statistic"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    if (!data.id || !data.label || !data.value || !data.icon) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await updateStatistic(Number(data.id), {
      label: data.label,
      value: data.value,
      icon: data.icon,
      is_active: data.is_active ?? true,
    })

    revalidatePath("/")
    revalidatePath("/admin/statistics")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating statistic:", error)
    return NextResponse.json({ error: "Failed to update statistic" }, { status: 500 })
  }
}
