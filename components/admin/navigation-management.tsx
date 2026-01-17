"use client"

import { useState } from "react"
import type { NavigationItem } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import {
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  Save,
  X,
} from "lucide-react"

type NavigationForm = {
  label: string
  href: string
  is_active: boolean
}

interface NavigationManagementProps {
  items: NavigationItem[]
}

const emptyForm: NavigationForm = {
  label: "",
  href: "",
  is_active: true,
}

export function NavigationManagement({ items }: NavigationManagementProps) {
  const { toast } = useToast()

  const [isSaving, setIsSaving] = useState(false)
  const [editingItem, setEditingItem] = useState<NavigationItem | null>(null)
  const [form, setForm] = useState<NavigationForm>(emptyForm)

  /* ================= ADD / UPDATE ================= */
  const handleSubmit = async () => {
    if (!form.label.trim() || !form.href.trim()) {
      toast({
        title: "خطأ",
        description: "النص والرابط مطلوبان",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      const url = editingItem
        ? "/api/admin/navigation/update"
        : "/api/admin/navigation/create"

      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          editingItem
            ? { ...form, id: editingItem.id }
            : { ...form, display_order: items.length + 1 }
        ),
      })

      toast({
        title: "تم الحفظ بنجاح",
        description: editingItem ? "تم تحديث العنصر" : "تم إضافة العنصر",
      })

      setEditingItem(null)
      setForm(emptyForm)
      setTimeout(() => window.location.reload(), 800)
    } catch {
      toast({
        title: "خطأ",
        description: "فشل حفظ العنصر",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  /* ================= DELETE ================= */
  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا العنصر؟")) return

    try {
      await fetch("/api/admin/navigation/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      toast({ title: "تم حذف العنصر" })
      setTimeout(() => window.location.reload(), 600)
    } catch {
      toast({
        title: "خطأ",
        description: "فشل حذف العنصر",
        variant: "destructive",
      })
    }
  }

  /* ================= REORDER ================= */
  const handleReorder = async (id: number, dir: "up" | "down") => {
    const index = items.findIndex((i) => i.id === id)
    if ((dir === "up" && index === 0) || (dir === "down" && index === items.length - 1))
      return

    const current = items[index]
    const target = items[dir === "up" ? index - 1 : index + 1]

    try {
      await fetch("/api/admin/navigation/reorder", {
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
    } catch {
      toast({
        title: "خطأ",
        description: "فشل تغيير الترتيب",
        variant: "destructive",
      })
    }
  }

  /* ================= START EDIT ================= */
  const startEdit = (item: NavigationItem) => {
    setEditingItem(item)
    setForm({
      label: item.label ?? "",
      href: item.href ?? "",
      is_active: item.is_active ?? true,
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  /* ================= FORM RENDER ================= */
  const renderForm = (title: string, onCancel?: () => void) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>أدخل بيانات عنصر القائمة</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Label className="p-2">النص</Label>
          <Input
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
          />
        </div>

        <div>
          <Label className="p-2">الرابط</Label>
          <Input
            value={form.href}
            onChange={(e) => setForm({ ...form, href: e.target.value })}
            placeholder="/about"
          />
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={form.is_active}
            onCheckedChange={(v) => setForm({ ...form, is_active: v })}
          />
          <Label>نشط</Label>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSubmit} disabled={isSaving}>
            <Save className="ml-2 h-4 w-4" /> حفظ
          </Button>

          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              <X className="ml-2 h-4 w-4" /> إلغاء
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  /* ================= RENDER ================= */
  return (
    <div className="space-y-10">
      {!editingItem &&
        renderForm("إضافة عنصر جديد")}

      {editingItem &&
        renderForm("تعديل العنصر", () => {
          setEditingItem(null)
          setForm(emptyForm)
        })}

      <div className="space-y-4">
        {items.map((item, index) => (
          <Card key={item.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4">
            <div className="flex flex-col">
              <h3 className="font-bold">{item.label}</h3>
              <p className="text-xs text-muted-foreground">{item.href}</p>
              <p className="text-xs mt-1">
                {item.is_active ? "نشط" : "غير نشط"}
              </p>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => handleReorder(item.id, "up")} disabled={index === 0}>
                <ChevronUp className="h-3 w-3" />
              </Button>

              <Button size="sm" variant="outline" onClick={() => handleReorder(item.id, "down")} disabled={index === items.length - 1}>
                <ChevronDown className="h-3 w-3" />
              </Button>

              <Button size="sm" variant="outline" onClick={() => startEdit(item)}>
                <Pencil className="h-3 w-3 ml-1" /> تعديل
              </Button>

              <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                <Trash2 className="h-3 w-3 ml-1" /> حذف
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
