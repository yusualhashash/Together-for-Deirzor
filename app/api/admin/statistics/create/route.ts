import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"
import { createStatistic } from "@/lib/statistic/statistic"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    // Validate required fields
    if (!data.label || !data.value || !data.icon) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await createStatistic({
      label: data.label,
      value: data.value,
      icon: data.icon,
      display_order: data.display_order ?? 0,
    })
    revalidatePath("/")
    revalidatePath("/admin/statistics")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error creating statistic:", error)
    return NextResponse.json({ error: "Failed to create statistic" }, { status: 500 })
  }
}
