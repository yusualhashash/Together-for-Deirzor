"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  Save,
  X,
  Users,
  Building2,
  Award,
  Heart,
  GraduationCap,
  FolderKanban,
  MapPin,
  Target,
} from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

/* ================= TYPES ================= */
export interface Statistic {
  id: number
  label: string
  value: string
  icon: string
  display_order: number
}

type StatisticForm = {
  label: string
  value: string
  icon: string
}

interface Props {
  statistics: Statistic[]
}

/* ================= EMPTY FORM ================= */
const emptyForm: StatisticForm = {
  label: "",
  value: "",
  icon: "",
}

/* ================= ICON OPTIONS ================= */
const ICON_OPTIONS = [
  { label: "Users", value: "Users" },
  { label: "Building", value: "Building2" },
  { label: "Award", value: "Award" },
  { label: "Heart", value: "Heart" },
  { label: "Graduation Cap", value: "GraduationCap" },
  { label: "Kanban", value: "FolderKanban" },
  { label: "Map Pin", value: "MapPin" },
  { label: "Target", value: "Target" },
]

/* ================= COMPONENT ================= */
export function StatisticsManagement({ statistics }: Props) {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [editingStatistic, setEditingStatistic] = useState<Statistic | null>(null)
  const [form, setForm] = useState<StatisticForm>(emptyForm)

  /* ================= ADD / UPDATE ================= */
  const handleSubmit = async () => {
    if (!form.label.trim() || !form.value.trim() || !form.icon.trim()) {
      toast({
        title: "خطأ",
        description: "جميع الحقول مطلوبة",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    try {
      const url = editingStatistic
        ? "/api/admin/statistics/update"
        : "/api/admin/statistics/create"

      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          editingStatistic ? { ...form, id: editingStatistic.id } : form
        ),
      })

      toast({
        title: "تم الحفظ بنجاح",
        description: editingStatistic
          ? "تم تحديث الإحصائية"
          : "تم إضافة الإحصائية",
      })

      setEditingStatistic(null)
      setForm(emptyForm)
      setTimeout(() => window.location.reload(), 800)
    } catch {
      toast({
        title: "خطأ",
        description: "فشل حفظ الإحصائية",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  /* ================= DELETE ================= */
  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذه الإحصائية؟")) return

    try {
      await fetch("/api/admin/statistics/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      toast({ title: "تم حذف الإحصائية" })
      setTimeout(() => window.location.reload(), 600)
    } catch {
      toast({
        title: "خطأ",
        description: "فشل حذف الإحصائية",
        variant: "destructive",
      })
    }
  }

  /* ================= REORDER ================= */
  const handleReorder = async (id: number, dir: "up" | "down") => {
    const index = statistics.findIndex((s) => s.id === id)
    if ((dir === "up" && index === 0) || (dir === "down" && index === statistics.length - 1))
      return

    const current = statistics[index]
    const target = statistics[dir === "up" ? index - 1 : index + 1]

    try {
      await fetch("/api/admin/statistics/reorder", {
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
  const startEdit = (statistic: Statistic) => {
    setEditingStatistic(statistic)
    setForm({
      label: statistic.label,
      value: statistic.value,
      icon: statistic.icon,
    })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  /* ================= ICON MAP ================= */
  const IconMap: Record<string, any> = {
    Users,
    Building2,
    Award,
    Heart,
    GraduationCap,
    FolderKanban,
    MapPin,
    Target,
  }

  /* ================= FORM RENDER ================= */
  const renderForm = (
    formData: StatisticForm,
    onSubmit: () => void,
    title: string,
    onCancel?: () => void
  ) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>أدخل بيانات الإحصائية</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Label className="p-2">العنوان</Label>
          <Input
            value={formData.label}
            onChange={(e) => setForm({ ...formData, label: e.target.value })}
            placeholder="مثال: عدد المستفيدين"
          />
        </div>

        <div>
          <Label className="p-2">القيمة</Label>
          <Input
            value={formData.value}
            onChange={(e) => setForm({ ...formData, value: e.target.value })}
            placeholder="مثال: 10,000+"
          />
        </div>

        <div>
          <Label className="p-2">الأيقونة</Label>
          <Select
            value={formData.icon}
            onValueChange={(v) => setForm({ ...formData, icon: v })}
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

        <div className="flex gap-2">
          <Button onClick={onSubmit} disabled={isSaving}>
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

  /* ================= MAIN RENDER ================= */
  return (
    <div className="space-y-10">
      {/* Add New Form */}
      {!editingStatistic &&
        renderForm(form, handleSubmit, "إضافة إحصائية جديدة")}

      {/* Edit Form */}
      {editingStatistic &&
        renderForm(form, handleSubmit, "تعديل الإحصائية", () => {
          setEditingStatistic(null)
          setForm(emptyForm)
        })}

      {/* Statistics List - Right-aligned buttons, NO border */}
      <div className="space-y-4">
        {statistics.map((stat, index) => {
          const StatIcon = IconMap[stat.icon] || Users

          return (
            <Card key={stat.id} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4">
              {/* Content - Left side */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded">
                  <StatIcon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold">{stat.value}</h3>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">الأيقونة: {stat.icon}</p>
                </div>
              </div>

              {/* Buttons - Right side, NO border, NO pt-4 */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleReorder(stat.id, "up")}
                  disabled={index === 0}
                >
                  <ChevronUp className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleReorder(stat.id, "down")}
                  disabled={index === statistics.length - 1}
                >
                  <ChevronDown className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => startEdit(stat)}
                >
                  <Pencil className="h-3 w-3 ml-1" /> تعديل
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(stat.id)}
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
