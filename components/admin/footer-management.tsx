"use client"

import { useState, useEffect } from "react"
import type { FooterLink } from "@/lib/types"
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

type FooterForm = {
  title: string
  url: string
  is_active: boolean
}

interface FooterManagementProps {
  links: FooterLink[]
}

const emptyForm: FooterForm = {
  title: "",
  url: "",
  is_active: true,
}

export function FooterManagement({ links }: FooterManagementProps) {
  const { toast } = useToast()

  const [isSaving, setIsSaving] = useState(false)
  const [editingLink, setEditingLink] = useState<FooterLink | null>(null)
  const [form, setForm] = useState<FooterForm>(emptyForm)

  /* ================= ADD / UPDATE ================= */
  const handleSubmit = async () => {
    if (!form.title.trim() || !form.url.trim()) {
      toast({
        title: "خطأ",
        description: "النص والرابط مطلوبان",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      const url = editingLink
        ? "/api/admin/footer/update"
        : "/api/admin/footer/create"

      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          editingLink
            ? { ...form, id: editingLink.id }
            : { ...form, display_order: links.length + 1 }
        ),
      })

      toast({
        title: "تم الحفظ بنجاح",
        description: editingLink ? "تم تحديث الرابط" : "تم إضافة الرابط",
      })

      setEditingLink(null)
      setForm(emptyForm)
      setTimeout(() => window.location.reload(), 800)
    } catch {
      toast({
        title: "خطأ",
        description: "فشل حفظ الرابط",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  /* ================= DELETE ================= */
  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا الرابط؟")) return

    try {
      await fetch("/api/admin/footer/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      toast({ title: "تم حذف الرابط" })
      setTimeout(() => window.location.reload(), 600)
    } catch {
      toast({
        title: "خطأ",
        description: "فشل حذف الرابط",
        variant: "destructive",
      })
    }
  }

  /* ================= REORDER ================= */
  const handleReorder = async (id: number, dir: "up" | "down") => {
    const index = links.findIndex((l) => l.id === id)
    if ((dir === "up" && index === 0) || (dir === "down" && index === links.length - 1))
      return

    const current = links[index]
    const target = links[dir === "up" ? index - 1 : index + 1]

    try {
      await fetch("/api/admin/footer/reorder", {
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
  const startEdit = (link: FooterLink) => {
    setEditingLink(link)
    setForm({
      title: link.title ?? "",
      url: link.url ?? "",
      is_active: link.is_active ?? true,
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  /* ================= FORM RENDER ================= */
  const renderForm = (title: string, onCancel?: () => void) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>أدخل بيانات الرابط</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Label className="p-2">النص</Label>
          <Input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div>
          <Label className="p-2">الرابط</Label>
          <Input
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
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
      {!editingLink &&
        renderForm("إضافة رابط جديد")}

      {editingLink &&
        renderForm("تعديل الرابط", () => {
          setEditingLink(null)
          setForm(emptyForm)
        })}

      <div className="space-y-4">
        {links.map((link, index) => (
          <Card key={link.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4">
            <div className="flex flex-col">
              <h3 className="font-bold">{link.title}</h3>
              <p className="text-xs text-muted-foreground">{link.url}</p>
              <p className="text-xs mt-1">
                {link.is_active ? "نشط" : "غير نشط"}
              </p>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => handleReorder(link.id, "up")} disabled={index === 0}>
                <ChevronUp className="h-3 w-3" />
              </Button>

              <Button size="sm" variant="outline" onClick={() => handleReorder(link.id, "down")} disabled={index === links.length - 1}>
                <ChevronDown className="h-3 w-3" />
              </Button>

              <Button size="sm" variant="outline" onClick={() => startEdit(link)}>
                <Pencil className="h-3 w-3 ml-1" /> تعديل
              </Button>

              <Button size="sm" variant="destructive" onClick={() => handleDelete(link.id)}>
                <Trash2 className="h-3 w-3 ml-1" /> حذف
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
