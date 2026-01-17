"use client"

import { useState, useEffect } from "react"
import type { Sector } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  Save,
  X,
  GraduationCap,
  Heart,
  Users,
  Sprout,
  Shield,
  Home,
  Cpu,
  DollarSign,
  BookOpen,
  Stethoscope,
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
type SectorForm = {
  title: string
  description: string
  icon: string
}

interface Props {
  sectors: Sector[]
}

/* ================= EMPTY FORM ================= */
const emptyForm: SectorForm = {
  title: "",
  description: "",
  icon: "",
}

/* ================= ICON OPTIONS ================= */
const ICON_OPTIONS = [
  { label: "Education", value: "GraduationCap" },
  { label: "Health", value: "Stethoscope" },
  { label: "Community", value: "Users" },
  { label: "Environment", value: "Sprout" },
  { label: "Protection", value: "Shield" },
  { label: "Shelter", value: "Home" },
  { label: "Technology", value: "Cpu" },
  { label: "Finance", value: "DollarSign" },
  { label: "Books", value: "BookOpen" },
  { label: "Love/Charity", value: "Heart" },
]

/* ================= COMPONENT ================= */
export function SectorsManagement({ sectors }: Props) {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [editingSector, setEditingSector] = useState<Sector | null>(null)
  const [form, setForm] = useState<SectorForm>(emptyForm)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  /* ================= ADD / UPDATE ================= */
  const handleSubmit = async () => {
    if (!form.title.trim() || !form.icon.trim()) {
      toast({
        title: "خطأ",
        description: "العنوان والأيقونة مطلوبان",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    try {
      const url = editingSector
        ? "/api/admin/sectors/update"
        : "/api/admin/sectors/create"

      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          editingSector ? { ...form, id: editingSector.id } : form
        ),
      })

      toast({
        title: "تم الحفظ بنجاح",
        description: editingSector
          ? "تم تحديث القطاع"
          : "تم إضافة القطاع",
      })

      setEditingSector(null)
      setForm(emptyForm)
      setTimeout(() => window.location.reload(), 800)
    } catch {
      toast({
        title: "خطأ",
        description: "فشل حفظ القطاع",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  /* ================= DELETE ================= */
  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف القطاع؟")) return

    try {
      await fetch("/api/admin/sectors/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      toast({ title: "تم حذف القطاع" })
      setTimeout(() => window.location.reload(), 600)
    } catch {
      toast({
        title: "خطأ",
        description: "فشل حذف القطاع",
        variant: "destructive",
      })
    }
  }

  /* ================= REORDER ================= */
  const handleReorder = async (id: number, dir: "up" | "down") => {
    const index = sectors.findIndex((s) => s.id === id)
    if ((dir === "up" && index === 0) || (dir === "down" && index === sectors.length - 1))
      return

    const current = sectors[index]
    const target = sectors[dir === "up" ? index - 1 : index + 1]

    try {
      await fetch("/api/admin/sectors/reorder", {
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
  const startEdit = (sector: Sector) => {
    setEditingSector(sector)
    setForm({
      title: sector.title ?? "",
      description: sector.description ?? "",
      icon: sector.icon ?? "",
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  /* ================= FORM RENDER ================= */
  const renderForm = (
    form: SectorForm,
    onSubmit: () => void,
    title: string,
    onCancel?: () => void
  ) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>أدخل بيانات القطاع</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Label className="p-2">العنوان</Label>
          <Input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div>
          <Label className="p-2">الوصف</Label>
          <Textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
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
                    {option.label} ({option.value})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={onSubmit} disabled={isSaving}>
            <Save className="ml-2 h-4 w-4" /> حفظ
          </Button>

          {onCancel && (
            <Button
              variant="outline"
              onClick={onCancel}
            >
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
      {!editingSector &&
        renderForm(form, handleSubmit, "إضافة قطاع جديد")}
      {editingSector &&
        renderForm(form, handleSubmit, "تعديل القطاع", () => {
          setEditingSector(null)
          setForm(emptyForm)
        })}

      <div className="space-y-4">
        {sectors.map((sector, index) => {
          // Map icon string to actual icon component
          const IconMap: Record<string, any> = {
            GraduationCap,
            Heart,
            Users,
            Sprout,
            Shield,
            Home,
            Cpu,
            DollarSign,
            BookOpen,
            Stethoscope,
          }
          const SectorIcon =
            sector.icon && IconMap[sector.icon] ? IconMap[sector.icon] : Users

          return (
            <Card
              key={sector.id}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded">
                  <SectorIcon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">{sector.title}</h3>
                  <p className="text-xs text-muted-foreground">{sector.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">الأيقونة: {sector.icon}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleReorder(sector.id, "up")}
                  disabled={index === 0}
                >
                  <ChevronUp className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleReorder(sector.id, "down")}
                  disabled={index === sectors.length - 1}
                >
                  <ChevronDown className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => startEdit(sector)}
                >
                  <Pencil className="h-3 w-3 ml-1" /> تعديل
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(sector.id)}
                >
                  <Trash2 className="h-3 w-3 ml-1" /> حذف
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
