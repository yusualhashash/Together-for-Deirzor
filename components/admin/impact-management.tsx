"use client"

import { useState } from "react"
import type { ImpactStory } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Pencil, Trash2, Save, ChevronUp, ChevronDown } from "lucide-react"
import { ImageUploadField } from "@/components/admin/image-upload-field"
import { Label } from "../ui/label"

/* ---------------- FORM TYPE ---------------- */

type ImpactStoryForm = {
  title: string
  story: string
  beneficiary_name: string
  image_url: string
  is_featured: boolean
}

export function ImpactManagement({ stories }: { stories: ImpactStory[] }) {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)

  const [editingStory, setEditingStory] = useState<ImpactStory | null>(null)

  /* ---------------- ADD FORM ---------------- */

  const [addForm, setAddForm] = useState<ImpactStoryForm>({
    title: "",
    story: "",
    beneficiary_name: "",
    image_url: "",
    is_featured: false,
  })

  /* ---------------- EDIT FORM ---------------- */

  const [editForm, setEditForm] = useState<ImpactStoryForm>({
    title: "",
    story: "",
    beneficiary_name: "",
    image_url: "",
    is_featured: false,
  })

  /* ---------------- ADD ---------------- */

  const handleAdd = async () => {
    if (!addForm.title.trim() || !addForm.story.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال العنوان والقصة",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      const res = await fetch("/api/admin/impact/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addForm),
      })

      if (!res.ok) throw new Error()

      toast({ title: "تمت إضافة القصة بنجاح" })

      setAddForm({
        title: "",
        story: "",
        beneficiary_name: "",
        image_url: "",
        is_featured: false,
      })

      setTimeout(() => window.location.reload(), 800)
    } catch {
      toast({
        title: "خطأ",
        description: "فشل إضافة القصة",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  /* ---------------- UPDATE ---------------- */

  const handleUpdate = async () => {
    if (!editingStory) return

    setIsSaving(true)

    try {
      const res = await fetch("/api/admin/impact/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingStory.id,
          ...editForm,
        }),
      })

      if (!res.ok) throw new Error()

      toast({ title: "تم تحديث القصة بنجاح" })
      setEditingStory(null)

      setTimeout(() => window.location.reload(), 800)
    } catch {
      toast({
        title: "خطأ",
        description: "فشل تحديث القصة",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  /* ---------------- DELETE ---------------- */

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف القصة؟")) return

    await fetch("/api/admin/impact/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })

    toast({ title: "تم حذف القصة" })
    setTimeout(() => window.location.reload(), 600)
  }

  /* ---------------- REORDER ---------------- */

  const handleReorder = async (id: number, dir: "up" | "down") => {
    const index = stories.findIndex((s) => s.id === id)
    if (
      (dir === "up" && index === 0) ||
      (dir === "down" && index === stories.length - 1)
    )
      return

    const current = stories[index]
    const target = stories[dir === "up" ? index - 1 : index + 1]

    await fetch("/api/admin/impact/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [
          { id: current.id, display_order: target.display_order },
          { id: target.id, display_order: current.display_order },
        ],
      }),
    })

    toast({ title: "تم تغيير الترتيب" })
    setTimeout(() => window.location.reload(), 500)
  }

  /* ---------------- START EDIT ---------------- */

  const startEdit = (story: ImpactStory) => {
    setEditingStory(story)

    setEditForm({
      title: story.title,
      story: story.story,
      beneficiary_name: story.beneficiary_name ?? "",
      image_url: story.image_url ?? "",
      is_featured: story.is_featured,
    })
  }

  /* ================================================= */

  return (
    <div className="space-y-10">

      {/* ================= ADD ================= */}
      <Card>
        <CardHeader>
          <CardTitle>إضافة قصة نجاح جديدة</CardTitle>
          <CardDescription>أدخل بيانات القصة</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="عنوان القصة"
            value={addForm.title}
            onChange={(e) =>
              setAddForm({ ...addForm, title: e.target.value })
            }
          />

          <Textarea
            placeholder="القصة"
            value={addForm.story}
            onChange={(e) =>
              setAddForm({ ...addForm, story: e.target.value })
            }
          />

          <Input
            placeholder="اسم المستفيد (اختياري)"
            value={addForm.beneficiary_name}
            onChange={(e) =>
              setAddForm({ ...addForm, beneficiary_name: e.target.value })
            }
          />

          <ImageUploadField
            label="صورة القصة"
            currentImage={addForm.image_url}
            onImageChange={(url) =>
              setAddForm({ ...addForm, image_url: url || "" })
            }
          />

          <Button onClick={handleAdd} disabled={isSaving} className="w-full">
            <Save className="ml-2 h-4 w-4" />
            إضافة
          </Button>
        </CardContent>
      </Card>

      {/* ================= EDIT ================= */}
      {editingStory && (
        <Card className="border-green-500">
          <CardHeader>
            <CardTitle>تعديل القصة</CardTitle>
            <CardDescription>
              يتم تعديل: <b>{editingStory.title}</b>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Label >عنوان القصة</Label>
            <Input
              value={editForm.title}
              onChange={(e) =>
                setEditForm({ ...editForm, title: e.target.value })
              }
            />
            <Label >القصة</Label>
            <Textarea
              value={editForm.story}
              onChange={(e) =>
                setEditForm({ ...editForm, story: e.target.value })
              }
            />
            <Label >اسم المستفيد (اختياري)</Label>
            <Input
              value={editForm.beneficiary_name}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  beneficiary_name: e.target.value,
                })
              }
            />
            <Label >صورة القصة</Label>
            <ImageUploadField
              label="صورة القصة"
              currentImage={editForm.image_url}
              onImageChange={(url) =>
                setEditForm({ ...editForm, image_url: url || "" })
              }
            />

            <div className="flex gap-2">
              <Button onClick={handleUpdate} disabled={isSaving}>
                حفظ
              </Button>
              <Button variant="outline" onClick={() => setEditingStory(null)}>
                إلغاء
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ================= LIST ================= */}
      {/* ================= LIST ================= */}
      <div className="space-y-4">
        {stories.map((story, index) => (
          <Card
            key={story.id}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4"
          >
            {/* LEFT CONTENT */}
            <div className="flex gap-4">
              {story.image_url && (
                <img
                  src={story.image_url}
                  alt={story.title}
                  className="w-20 h-20 rounded object-cover"
                />
              )}

              <div className="space-y-1">
                <h3 className="font-bold">{story.title}</h3>

                <p className="text-xs text-muted-foreground line-clamp-2">
                  {story.story}
                </p>

                {story.beneficiary_name && (
                  <span className="text-xs text-muted-foreground">
                    المستفيد: {story.beneficiary_name}
                  </span>
                )}
              </div>
            </div>

            {/* RIGHT ACTIONS (EXACT LIKE PARTNERS) */}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleReorder(story.id, "up")}
                disabled={index === 0}
              >
                <ChevronUp className="h-3 w-3" />
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => handleReorder(story.id, "down")}
                disabled={index === stories.length - 1}
              >
                <ChevronDown className="h-3 w-3" />
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => startEdit(story)}
              >
                <Pencil className="h-3 w-3 ml-1" />
                تعديل
              </Button>

              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(story.id)}
              >
                <Trash2 className="h-3 w-3 ml-1" />
                حذف
              </Button>
            </div>
          </Card>
        ))}
      </div>


    </div>
  )
}
