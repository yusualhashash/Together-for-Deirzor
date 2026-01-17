"use client"

import { useState, useEffect } from "react"
import type { SocialLink } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import {
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  Save,
  X,
} from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

/* ================= TYPES ================= */
type SocialLinkForm = {
  platform: string
  url: string
  icon: string
}

interface Props {
  socialLinks: SocialLink[]
}

/* ================= EMPTY FORM ================= */
const emptyForm: SocialLinkForm = {
  platform: "",
  url: "",
  icon: "",
}

/* ================= ICON OPTIONS ================= */
const ICON_OPTIONS = [
  { label: "Facebook", value: "facebook" },
  { label: "Twitter / X", value: "twitter" },
  { label: "Instagram", value: "instagram" },
  { label: "WhatsApp", value: "whatsapp" },
  { label: "Telegram", value: "telegram" },
  { label: "YouTube", value: "youtube" },
  { label: "LinkedIn", value: "linkedin" },
]

/* ================= COMPONENT ================= */
export function SocialLinksManagement({ socialLinks }: Props) {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null)
  const [form, setForm] = useState<SocialLinkForm>(emptyForm)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  /* ================= ADD / UPDATE ================= */
  const handleSubmit = async () => {
    if (!form.platform.trim() || !form.url.trim() || !form.icon.trim()) {
      toast({
        title: "خطأ",
        description: "جميع الحقول مطلوبة",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    try {
      const url = editingLink
        ? "/api/admin/social-links/update"
        : "/api/admin/social-links/create"

      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          editingLink ? { ...form, id: editingLink.id } : form
        ),
      })

      toast({
        title: "تم الحفظ بنجاح",
        description: editingLink
          ? "تم تحديث الرابط"
          : "تم إضافة الرابط",
      })

      setEditingLink(null)
      setForm(emptyForm)
      setTimeout(() => window.location.reload(), 700)
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
    if (!confirm("هل أنت متأكد من حذف الرابط؟")) return

    try {
      await fetch("/api/admin/social-links/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      toast({ title: "تم حذف الرابط" })
      setTimeout(() => window.location.reload(), 500)
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
    const index = socialLinks.findIndex((l) => l.id === id)
    if (
      (dir === "up" && index === 0) ||
      (dir === "down" && index === socialLinks.length - 1)
    )
      return

    const current = socialLinks[index]
    const target = socialLinks[dir === "up" ? index - 1 : index + 1]

    try {
      await fetch("/api/admin/social-links/reorder", {
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
  const startEdit = (link: SocialLink) => {
    setEditingLink(link)
    setForm({
      platform: link.platform ?? "",
      url: link.url ?? "",
      icon: link.icon ?? "",
    })
  }

  /* ================= FORM ================= */
  const renderForm = (
    title: string,
    onCancel?: () => void
  ) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>أدخل بيانات الرابط</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Label className="p-2">المنصة</Label>
          <Input
            value={form.platform}
            onChange={(e) => setForm({ ...form, platform: e.target.value })}
          />
        </div>

        <div>
          <Label className="p-2">الرابط</Label>
          <Input
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            dir="ltr"
          />
        </div>

        {mounted && (
          <div>
            <Label className="p-2">الأيقونة</Label>
            <Select
              value={form.icon}
              onValueChange={(v) => setForm({ ...form, icon: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر أيقونة" />
              </SelectTrigger>
              <SelectContent>
                {ICON_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

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
        {socialLinks.map((link, index) => (
          <Card
            key={link.id}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4"
          >
            <div>
              <h3 className="font-bold">{link.platform}</h3>
              <p className="text-xs text-muted-foreground" dir="ltr">
                {link.url}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                الأيقونة: {link.icon}
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleReorder(link.id, "up")}
                disabled={index === 0}
              >
                <ChevronUp className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleReorder(link.id, "down")}
                disabled={index === socialLinks.length - 1}
              >
                <ChevronDown className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => startEdit(link)}
              >
                <Pencil className="h-3 w-3 ml-1" /> تعديل
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(link.id)}
              >
                <Trash2 className="h-3 w-3 ml-1" /> حذف
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
