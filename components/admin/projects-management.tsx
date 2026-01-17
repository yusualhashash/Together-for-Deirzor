"use client"

import { useState } from "react"
import type { Project, Sector } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  Save,
  X,
} from "lucide-react"
import { ImageUploadField } from "@/components/admin/image-upload-field"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

/* ================= TYPES ================= */

type ProjectForm = {
  sector_id: string
  title: string
  description: string
  location: string
  beneficiaries: string
  budget: string
  status: string
  start_date: string
  end_date: string
  image_url: string
}

interface Props {
  projects: Project[]
  sectors: Sector[]
}

/* ================= EMPTY FORM ================= */

const emptyForm: ProjectForm = {
  sector_id: "",
  title: "",
  description: "",
  location: "",
  beneficiaries: "",
  budget: "",
  status: "ongoing",
  start_date: "",
  end_date: "",
  image_url: "",
}

/* ================= HELPER ================= */

// Converts a date string to YYYY-MM-DD format for input[type="date"]
const formatDate = (dateStr?: string | null) => {
  if (!dateStr) return ""
  const d = new Date(dateStr)
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  const year = d.getFullYear()
  return `${year}-${month}-${day}`
}

/* ================= COMPONENT ================= */

export function ProjectsManagement({ projects, sectors }: Props) {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const [addForm, setAddForm] = useState<ProjectForm>(emptyForm)
  const [editForm, setEditForm] = useState<ProjectForm>(emptyForm)

  /* ================= ADD ================= */

  const handleAdd = async () => {
    if (!addForm.title.trim()) {
      toast({
        title: "خطأ",
        description: "عنوان المشروع مطلوب",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    try {
      await fetch("/api/admin/projects/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...addForm,
          sector_id: addForm.sector_id ? Number(addForm.sector_id) : null,
          beneficiaries: addForm.beneficiaries
            ? Number(addForm.beneficiaries)
            : null,
          budget: addForm.budget ? Number(addForm.budget) : null,
          start_date: addForm.start_date || null,
          end_date: addForm.end_date || null,
        }),
      })

      toast({ title: "تمت إضافة المشروع بنجاح" })
      setTimeout(() => window.location.reload(), 800)
    } catch {
      toast({
        title: "خطأ",
        description: "فشل إضافة المشروع",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  /* ================= UPDATE ================= */

  const handleUpdate = async () => {
    if (!editingProject) return

    setIsSaving(true)
    try {
      await fetch("/api/admin/projects/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingProject.id,
          ...editForm,
          sector_id: editForm.sector_id ? Number(editForm.sector_id) : null,
          beneficiaries: editForm.beneficiaries
            ? Number(editForm.beneficiaries)
            : null,
          budget: editForm.budget ? Number(editForm.budget) : null,
          start_date: editForm.start_date || null,
          end_date: editForm.end_date || null,
        }),
      })

      toast({ title: "تم تحديث المشروع بنجاح" })
      setEditingProject(null)
      setTimeout(() => window.location.reload(), 800)
    } catch {
      toast({
        title: "خطأ",
        description: "فشل تحديث المشروع",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  /* ================= DELETE ================= */

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف المشروع؟")) return

    await fetch("/api/admin/projects/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })

    toast({ title: "تم حذف المشروع" })
    setTimeout(() => window.location.reload(), 600)
  }

  /* ================= REORDER ================= */

  const handleReorder = async (id: number, dir: "up" | "down") => {
    const index = projects.findIndex((p) => p.id === id)
    if ((dir === "up" && index === 0) || (dir === "down" && index === projects.length - 1))
      return

    const current = projects[index]
    const target = projects[dir === "up" ? index - 1 : index + 1]

    await fetch("/api/admin/projects/reorder", {
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

  /* ================= START EDIT ================= */

  const startEdit = (project: Project) => {
    setEditingProject(project)
    setEditForm({
      sector_id: project.sector_id?.toString() || "",
      title: project.title,
      description: project.description || "",
      location: project.location || "",
      beneficiaries: project.beneficiaries?.toString() || "",
      budget: project.budget?.toString() || "",
      status: project.status,
      start_date: formatDate(project.start_date),
      end_date: formatDate(project.end_date),
      image_url: project.image_url || "",
    })

    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  /* ================= FORM RENDER ================= */

  const renderForm = (
    form: ProjectForm,
    setForm: (f: ProjectForm) => void,
    onSubmit: () => void,
    title: string,
    onCancel?: () => void
  ) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>أدخل بيانات المشروع</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <Label className="p-2">القطاع</Label>
          <Select
            value={form.sector_id}
            onValueChange={(v) => setForm({ ...form, sector_id: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر القطاع" />
            </SelectTrigger>
            <SelectContent>
              {sectors.map((s) => (
                <SelectItem key={s.id} value={s.id.toString()}>
                  {s.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="p-2">عنوان المشروع</Label>
          <Input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div>
          <Label className="p-2">الوصف</Label>
          <Textarea
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        <div>
          <Label className="p-2">الموقع</Label>
          <Input
            value={form.location}
            onChange={(e) =>
              setForm({ ...form, location: e.target.value })
            }
          />
        </div>

        <div>
          <Label className="p-2">عدد المستفيدين</Label>
          <Input
            type="number"
            value={form.beneficiaries}
            onChange={(e) =>
              setForm({ ...form, beneficiaries: e.target.value })
            }
          />
        </div>

        <div>
          <Label className="p-2">ميزانية المشروع</Label>
          <Input
            type="number"
            value={form.budget}
            onChange={(e) =>
              setForm({ ...form, budget: e.target.value })
            }
          />
        </div>

        <div>
          <Label className="p-2">تاريخ البدء</Label>
          <Input
            type="date"
            value={form.start_date}
            onChange={(e) =>
              setForm({ ...form, start_date: e.target.value })
            }
          />
        </div>

        <div>
          <Label className="p-2">تاريخ الانتهاء</Label>
          <Input
            type="date"
            value={form.end_date}
            onChange={(e) =>
              setForm({ ...form, end_date: e.target.value })
            }
          />
        </div>

        <div>
          <Label className="p-2">الحالة</Label>
          <Select
            value={form.status}
            onValueChange={(v) => setForm({ ...form, status: v })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ongoing">جاري</SelectItem>
              <SelectItem value="completed">مكتمل</SelectItem>
              <SelectItem value="planned">مخطط</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ImageUploadField
          label="صورة المشروع"
          currentImage={form.image_url}
          onImageChange={(url) =>
            setForm({ ...form, image_url: url || "" })
          }
        />

        <div className="flex gap-2">
          <Button onClick={onSubmit} disabled={isSaving}>
            <Save className="ml-2 h-4 w-4" />
            حفظ
          </Button>

          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              <X className="ml-2 h-4 w-4" />
              إلغاء
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  /* ================= RENDER ================= */

  return (
    <div className="space-y-10">
      {!editingProject &&
        renderForm(addForm, setAddForm, handleAdd, "إضافة مشروع جديد")}

      {editingProject &&
        renderForm(
          editForm,
          setEditForm,
          handleUpdate,
          "تعديل المشروع",
          () => setEditingProject(null)
        )}

      <div className="space-y-4">
        {projects.map((project, index) => (
          <Card
            key={project.id}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4"
          >
            <div>
              <h3 className="font-bold">{project.title}</h3>
              <p className="text-xs text-muted-foreground">
                {project.location}
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleReorder(project.id, "up")}
                disabled={index === 0}
              >
                <ChevronUp className="h-3 w-3" />
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => handleReorder(project.id, "down")}
                disabled={index === projects.length - 1}
              >
                <ChevronDown className="h-3 w-3" />
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => startEdit(project)}
              >
                <Pencil className="h-3 w-3 ml-1" />
                تعديل
              </Button>

              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(project.id)}
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
