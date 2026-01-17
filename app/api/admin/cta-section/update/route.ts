import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { updateCTASection } from "@/lib/cta"
import { checkAuth } from "@/lib/auth"

export async function POST(request: Request) {
  const session = await checkAuth()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const data = await request.json()

    await updateCTASection({
      title: data.title,
      description: data.description,
      primary_button_text: data.primary_button_text,
      primary_button_url: data.primary_button_url,
      secondary_button_text: data.secondary_button_text,
      secondary_button_url: data.secondary_button_url,
    })

    revalidatePath("/")
    revalidatePath("/admin/content")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error updating CTA section:", error)
    return NextResponse.json({ error: "Failed to update CTA section" }, { status: 500 })
  }
}
