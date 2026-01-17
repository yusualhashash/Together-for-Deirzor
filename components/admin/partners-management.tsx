"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Save, Pencil, Trash2, ChevronUp, ChevronDown } from "lucide-react"

interface Partner {
  id: number
  name: string
  website: string | null
  display_order: number
}

export function PartnersManagement({ partners }: { partners: Partner[] }) {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)

  const [editingPartner, setEditingPartner] = useState<Partner | null>(null)

  /* ---------------- ADD FORM STATE ---------------- */
  const [addForm, setAddForm] = useState({
    name: "",
    website: "",
  })

  /* ---------------- EDIT FORM STATE ---------------- */
  const [editForm, setEditForm] = useState({
    name: "",
    website: "",
  })

  /* -------------------- ADD -------------------- */

  const handleAdd = async () => {
    if (!addForm.name.trim()) {
      toast({
        title: "خطأ",
        description: "اسم الشريك مطلوب",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      const response = await fetch("/api/admin/partners/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addForm),
      })

      if (!response.ok) throw new Error()

      toast({ title: "تم إضافة الشريك بنجاح" })
      setAddForm({ name: "", website: "" })
      setTimeout(() => window.location.reload(), 1000)
    } catch {
      toast({
        title: "خطأ",
        description: "فشل إضافة الشريك",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  /* -------------------- UPDATE -------------------- */

  const handleUpdate = async () => {
    if (!editingPartner) return

    if (!editForm.name.trim()) {
      toast({
        title: "خطأ",
        description: "اسم الشريك مطلوب",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      const response = await fetch("/api/admin/partners/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingPartner.id,
          ...editForm,
        }),
      })

      if (!response.ok) throw new Error()

      toast({ title: "تم تحديث الشريك بنجاح" })
      setEditingPartner(null)
      setTimeout(() => window.location.reload(), 1000)
    } catch {
      toast({
        title: "خطأ",
        description: "فشل تحديث الشريك",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  /* -------------------- DELETE -------------------- */

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا الشريك؟")) return

    try {
      const response = await fetch("/api/admin/partners/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) throw new Error()

      toast({ title: "تم الحذف بنجاح" })
      setTimeout(() => window.location.reload(), 800)
    } catch {
      toast({
        title: "خطأ",
        description: "فشل الحذف",
        variant: "destructive",
      })
    }
  }

  /* -------------------- REORDER -------------------- */

  const handleReorder = async (id: number, direction: "up" | "down") => {
    const index = partners.findIndex((p) => p.id === id)
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === partners.length - 1)
    )
      return

    const current = partners[index]
    const target = partners[direction === "up" ? index - 1 : index + 1]

    await fetch("/api/admin/partners/reorder", {
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

  /* -------------------- START EDIT -------------------- */

  const startEdit = (partner: Partner) => {
    setEditingPartner(partner)
    setEditForm({
      name: partner.name,
      website: partner.website ?? "",
    })
  }

  /* ============================================================ */

  return (
    <div className="space-y-10">

      {/* ================= ADD FORM ================= */}
      <Card>
        <CardHeader>
          <CardTitle>إضافة شريك جديد</CardTitle>
          <CardDescription>أدخل بيانات الشريك</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label className="p-2">اسم الشريك</Label>
            <Input
              value={addForm.name}
              onChange={(e) =>
                setAddForm({ ...addForm, name: e.target.value })
              }
            />
          </div>

          <Button onClick={handleAdd} disabled={isSaving} className="w-full">
            <Save className="ml-2 h-4 w-4" />
            إضافة
          </Button>
        </CardContent>
      </Card>

      {/* ================= EDIT FORM ================= */}
      {editingPartner && (
        <Card className="border-green-400 bg-white">
          <CardHeader>
            <CardTitle>تعديل الشريك</CardTitle>
            <CardDescription>
              يتم تعديل: <b>{editingPartner.name}</b>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <Label className="p-2">اسم الشريك</Label>
              <Input
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleUpdate} disabled={isSaving}>
                <Save className="ml-2 h-4 w-4" />
                حفظ التعديلات
              </Button>

              <Button
                variant="outline"
                onClick={() => setEditingPartner(null)}
              >
                إلغاء
              </Button>
            </div>
          </CardContent>
        </Card>
      )
      }

      {/* ================= LIST ================= */}
      <div className="space-y-4">
        {partners.map((partner, index) => (
          <Card
            key={partner.id}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4"
          >
            <div>
              <h3 className="font-bold">{partner.name}</h3>
              {partner.website && (
                <a
                  href={partner.website}
                  target="_blank"
                  className="text-xs text-blue-600"
                >
                  زيارة الموقع
                </a>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleReorder(partner.id, "up")}
                disabled={index === 0}
              >
                <ChevronUp className="h-3 w-3" />
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => handleReorder(partner.id, "down")}
                disabled={index === partners.length - 1}
              >
                <ChevronDown className="h-3 w-3" />
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => startEdit(partner)}
              >
                <Pencil className="h-3 w-3 ml-1" />
                تعديل
              </Button>

              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(partner.id)}
              >
                <Trash2 className="h-3 w-3 ml-1" />
                حذف
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div >
  )
}
