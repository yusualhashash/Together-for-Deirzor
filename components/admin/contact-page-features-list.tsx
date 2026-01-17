"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { ChevronUp, ChevronDown, Pencil, Trash2, Save, X, Loader2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select"

interface ContactPageFeature {
  id: number
  icon: string
  title: string
  description: string
  sort_order: number
  is_active: boolean
}

interface ContactPageFeaturesListProps {
  features: ContactPageFeature[]
}

const emptyForm = {
  icon: "",
  title: "",
  description: "",
  is_active: true,
}

/* ================= ICON OPTIONS ================= */
const ICON_OPTIONS = [
  {
    label: "التواصل",
    items: [
      { label: "Phone", value: "phone" },
      { label: "Mail", value: "mail" },
      { label: "Message", value: "message-circle" },
      { label: "Headphones", value: "headphones" },
      { label: "Map Pin", value: "map-pin" },
    ],
  },
  {
    label: "الشبكات الاجتماعية",
    items: [
      { label: "Facebook", value: "facebook" },
      { label: "Instagram", value: "instagram" },
      { label: "Twitter", value: "twitter" },
      { label: "TikTok", value: "tiktok" },
      { label: "LinkedIn", value: "linkedin" },
    ],
  },
  {
    label: "عام",
    items: [
      { label: "Sparkles", value: "sparkles" },
      { label: "Shield", value: "shield" },
      { label: "Star", value: "star" },
      { label: "Globe", value: "globe" },
      { label: "Info", value: "info" },
    ],
  },
]

export function ContactPageFeaturesList({ features: initialFeatures }: ContactPageFeaturesListProps) {
  const { toast } = useToast()
  const [features, setFeatures] = useState(initialFeatures)
  const [editingFeature, setEditingFeature] = useState<ContactPageFeature | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState(emptyForm)

  /* ================= START EDIT ================= */
  const startEdit = (feature: ContactPageFeature) => {
    setEditingFeature(feature)
    setFormData({
      icon: feature.icon,
      title: feature.title,
      description: feature.description,
      is_active: feature.is_active,
    })
  }

  /* ================= ADD / UPDATE ================= */
  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.icon.trim()) {
      toast({
        title: "خطأ",
        description: "العنوان والأيقونة مطلوبان",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    try {
      const url = editingFeature
        ? "/api/admin/contact-page-features/update"
        : "/api/admin/contact-page-features/create"

      const payload = editingFeature
        ? { id: editingFeature.id, ...formData }
        : { ...formData, sort_order: features.length + 1 }

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error("Failed to save")

      toast({
        title: "تم الحفظ بنجاح",
        description: editingFeature ? "تم تحديث الميزة" : "تم إضافة الميزة",
      })

      setEditingFeature(null)
      setFormData(emptyForm)
      setTimeout(() => window.location.reload(), 800)
    } catch {
      toast({
        title: "خطأ",
        description: "فشل حفظ الميزة",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  /* ================= DELETE ================= */
  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف الميزة؟")) return

    try {
      await fetch("/api/admin/contact-page-features/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      toast({ title: "تم حذف الميزة" })
      setTimeout(() => window.location.reload(), 600)
    } catch {
      toast({
        title: "خطأ",
        description: "فشل حذف الميزة",
        variant: "destructive",
      })
    }
  }

  /* ================= REORDER ================= */
  const handleReorder = async (id: number, dir: "up" | "down") => {
    const index = features.findIndex((f) => f.id === id)
    if ((dir === "up" && index === 0) || (dir === "down" && index === features.length - 1)) return

    const current = features[index]
    const target = features[dir === "up" ? index - 1 : index + 1]

    try {
      await fetch("/api/admin/contact-page-features/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          features: [
            { id: current.id, sort_order: target.sort_order },
            { id: target.id, sort_order: current.sort_order },
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

  /* ================= FORM ================= */
  const renderForm = () => (
    <Card>
      <CardHeader>
        <CardTitle>{editingFeature ? "تعديل الميزة" : "إضافة ميزة جديدة"}</CardTitle>
        <CardDescription>أدخل بيانات الميزة</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Label className="p-2">الأيقونة</Label>
          <Select
            value={formData.icon}
            onValueChange={(value) => setFormData({ ...formData, icon: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر أيقونة" />
            </SelectTrigger>

            <SelectContent>
              {ICON_OPTIONS.map((group) => (
                <SelectGroup key={group.label}>
                  <SelectLabel>{group.label}</SelectLabel>
                  {group.items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="p-2">العنوان</Label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="دعم 24/7"
          />
        </div>

        <div>
          <Label className="p-2">الوصف</Label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="فريق الدعم متاح على مدار الساعة"
            rows={3}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>نشط</Label>
          <Switch
            checked={formData.is_active}
            onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSubmit} disabled={isSaving}>
            {isSaving && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            حفظ
          </Button>

          {editingFeature && (
            <Button
              variant="outline"
              onClick={() => {
                setEditingFeature(null)
                setFormData(emptyForm)
              }}
            >
              <X className="ml-2 h-4 w-4" /> إلغاء
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  /* ================= LIST ================= */
  return (
    <div className="space-y-10">
      {renderForm()}

      <div className="space-y-4">
        {features.map((feature, index) => (
          <Card key={feature.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4">
            <div className="flex items-center gap-4">
              <div>
                <h3 className="font-bold">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
                <p className="text-xs text-muted-foreground mt-1">الأيقونة: {feature.icon}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleReorder(feature.id, "up")}
                disabled={index === 0}
              >
                <ChevronUp className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleReorder(feature.id, "down")}
                disabled={index === features.length - 1}
              >
                <ChevronDown className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline" onClick={() => startEdit(feature)}>
                <Pencil className="h-3 w-3 ml-1" /> تعديل
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(feature.id)}>
                <Trash2 className="h-3 w-3 ml-1" /> حذف
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
