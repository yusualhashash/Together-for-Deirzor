"use client"

import { ImageUploadField } from "@/components/admin/image-upload-field"
import { MultiImageUploadField } from "@/components/admin/multi-image-upload-field"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import type { Project, ProjectImage, Sector } from "@/lib/types"
import {
  ChevronDown,
  ChevronUp,
  Pencil,
  Save,
  Trash2,
  X
} from "lucide-react"
import { useEffect, useState } from "react"

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
  additional_images: string[]
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
  status: "",
  start_date: "",
  end_date: "",
  image_url: "",
  additional_images: [],
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
  const [projectImages, setProjectImages] = useState<ProjectImage[]>([])
  const [newImageUrl, setNewImageUrl] = useState("")
  const [newImageCaption, setNewImageCaption] = useState("")
  const [loadingImages, setLoadingImages] = useState(false)
  const [addForm, setAddForm] = useState<ProjectForm>(emptyForm)
  const [editForm, setEditForm] = useState<ProjectForm>(emptyForm)

  // Track original images loaded from DB to avoid duplicates
  const [originalImageUrls, setOriginalImageUrls] = useState<string[]>([])

  /* ================= LOAD PROJECT IMAGES ================= */
  useEffect(() => {
    if (editingProject && projectImages.length > 0) {
      const imageUrls = projectImages.map((img) => img.image_url)
      setOriginalImageUrls(imageUrls)
      setEditForm((prev) => ({
        ...prev,
        additional_images: imageUrls,
      }))
    }
  }, [projectImages, editingProject])

  useEffect(() => {
    if (editingProject) {
      loadProjectImages(editingProject.id)
    } else {
      setProjectImages([])
      setOriginalImageUrls([])
    }
  }, [editingProject])

  const loadProjectImages = async (projectId: number) => {
    setLoadingImages(true)
    try {
      const response = await fetch(`/api/admin/projects/${projectId}/images`)
      if (response.ok) {
        const data = await response.json()
        setProjectImages(data.images || [])
      }
    } catch (error) {
      console.error("Failed to load project images:", error)
    } finally {
      setLoadingImages(false)
    }
  }

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
      const response = await fetch("/api/admin/projects/create", {
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
          status: addForm.status, // Fixed typo: was "stateus"
        }),
      })

      if (response.ok) {
        const data = await response.json()
        const projectId = data.projectId

        // Only save NEW additional images (since this is a new project, all are new)
        if (addForm.additional_images.length > 0) {
          for (const imageUrl of addForm.additional_images) {
            await fetch("/api/admin/projects/images/create", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                project_id: projectId,
                image_url: imageUrl,
                caption: null,
              }),
            })
          }
        }

        toast({ title: "تمت إضافة المشروع بنجاح" })
        setTimeout(() => window.location.reload(), 800)
      }
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
      const response = await fetch("/api/admin/projects/update", {
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

      if (response.ok) {
        // Find images that were DELETED (in original but not in current form)
        const deletedImages = originalImageUrls.filter(
          (url) => !editForm.additional_images.includes(url)
        )

        // Delete removed images from database
        for (const imageUrl of deletedImages) {
          const imageToDelete = projectImages.find((img) => img.image_url === imageUrl)
          if (imageToDelete) {
            await fetch(`/api/admin/projects/images/delete?id=${imageToDelete.id}`, {
              method: "DELETE",
            })
          }
        }

        // Only save NEW additional images (not already in DB)
        const newImages = editForm.additional_images.filter(
          (url) => !originalImageUrls.includes(url)
        )

        if (newImages.length > 0) {
          for (const imageUrl of newImages) {
            await fetch("/api/admin/projects/images/create", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                project_id: editingProject.id,
                image_url: imageUrl,
                caption: null,
              }),
            })
          }
        }

        toast({ title: "تم تحديث المشروع بنجاح" })
        setEditingProject(null)
        setTimeout(() => window.location.reload(), 800)
      }
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

  /* ================= PROJECT IMAGES MANAGEMENT ================= */

  const handleAddImage = async () => {
    if (!editingProject || !newImageUrl.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى رفع صورة",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    try {
      const response = await fetch("/api/admin/projects/images/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_id: editingProject.id,
          image_url: newImageUrl,
          caption: newImageCaption || null,
        }),
      })

      if (response.ok) {
        toast({ title: "تمت إضافة الصورة بنجاح" })
        setNewImageUrl("")
        setNewImageCaption("")
        loadProjectImages(editingProject.id)
      }
    } catch {
      toast({
        title: "خطأ",
        description: "فشل إضافة الصورة",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteImage = async (imageId: number) => {
    if (!confirm("هل أنت متأكد من حذف الصورة؟")) return

    try {
      await fetch(`/api/admin/projects/images/delete?id=${imageId}`, {
        method: "DELETE",
      })

      toast({ title: "تم حذف الصورة" })
      if (editingProject) {
        loadProjectImages(editingProject.id)
      }
    } catch {
      toast({
        title: "خطأ",
        description: "فشل حذف الصورة",
        variant: "destructive",
      })
    }
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
      additional_images: [],
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
            rows={2}
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
              <SelectValue placeholder="اختر الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">جاري</SelectItem>
              <SelectItem value="completed">مكتمل</SelectItem>
              <SelectItem value="planned">مخطط</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ImageUploadField
          label="صورة المشروع الرئيسية"
          currentImage={form.image_url}
          onImageChange={(url) =>
            setForm({ ...form, image_url: url || "" })
          }
        />

        <MultiImageUploadField
          label="صور إضافية للمشروع"
          images={form.additional_images}
          onImagesChange={(images) =>
            setForm({ ...form, additional_images: images })
          }
          maxImages={10}
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
