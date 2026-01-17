import { NextResponse } from "next/server";

import { revalidatePath } from "next/cache";
import { createContactPageFeature } from "@/lib/contact/contact";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { icon, title, description, sort_order } = data;

    if (!icon || !title || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await createContactPageFeature(icon, title, description, sort_order || 1);

    revalidatePath("/contact");
    revalidatePath("/admin/contact-page");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating contact page feature:", error);
    return NextResponse.json(
      { error: "Failed to create contact page feature" },
      { status: 500 }
    );
  }
}
