"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Plus, Pencil, Trash2, ChevronUp, ChevronDown } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ContactFeature {
  id: number
  icon: string
  title: string
  description: string
  gradient_from: string
  gradient_to: string
  display_order: number
}

export function ContactFeaturesManagement({ features }: { features: ContactFeature[] }) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingFeature, setEditingFeature] = useState<ContactFeature | null>(null)
  const [formData, setFormData] = useState({
    icon: "",
    title: "",
    description: "",
    gradient_from: "",
    gradient_to: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = editingFeature ? `/api/admin/contact-features/update` : `/api/admin/contact-features/create`
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingFeature ? { ...formData, id: editingFeature.id } : formData),
      })

      if (!response.ok) throw new Error("Failed to save")

      toast({
        title: "تم الحفظ بنجاح",
        description: editingFeature ? "تم تحديث الميزة" : "تم إضافة الميزة",
      })

      setIsDialogOpen(false)
      setEditingFeature(null)
      setTimeout(() => window.location.reload(), 1000)
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل حفظ التغييرات",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذه الميزة؟")) return

    try {
      const response = await fetch(`/api/admin/contact-features/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) throw new Error("Failed to delete")

      toast({
        title: "تم الحذف بنجاح",
        description: "تم حذف الميزة",
      })

      setTimeout(() => window.location.reload(), 1000)
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل الحذف",
        variant: "destructive",
      })
    }
  }

  const handleReorder = async (id: number, direction: "up" | "down") => {
    const currentIndex = features.findIndex((f) => f.id === id)
    if ((direction === "up" && currentIndex === 0) || (direction === "down" && currentIndex === features.length - 1)) {
      return
    }

    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1
    const currentFeature = features[currentIndex]
    const targetFeature = features[targetIndex]

    try {
      await fetch("/api/admin/contact-features/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [
            { id: currentFeature.id, display_order: targetFeature.display_order },
            { id: targetFeature.id, display_order: currentFeature.display_order },
          ],
        }),
      })

      toast({ title: "تم تغيير الترتيب بنجاح" })
      setTimeout(() => window.location.reload(), 500)
    } catch (error) {
      toast({ title: "خطأ", description: "فشل تغيير الترتيب", variant: "destructive" })
    }
  }

  const openEditDialog = (feature: ContactFeature) => {
    setEditingFeature(feature)
    setFormData({
      icon: feature.icon,
      title: feature.title,
      description: feature.description,
      gradient_from: feature.gradient_from,
      gradient_to: feature.gradient_to,
    })
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              setEditingFeature(null)
              setFormData({
                icon: "",
                title: "",
                description: "",
                gradient_from: "",
                gradient_to: "",
              })
            }}
          >
            <Plus className="ml-2 h-4 w-4" />
            إضافة ميزة جديدة
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-131.25">
          <DialogHeader>
            <DialogTitle>{editingFeature ? "تعديل الميزة" : "إضافة ميزة جديدة"}</DialogTitle>
            <DialogDescription>أدخل بيانات ميزة التواصل</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="icon">الأيقونة</Label>
              <Input
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                required
                placeholder="MessageCircle, MapPin, Send, Headphones"
              />
              <p className="text-xs text-muted-foreground mt-1">
                استخدم: MessageCircle, MapPin, Send, Headphones, Phone, Mail
              </p>
            </div>

            <div>
              <Label htmlFor="title">العنوان</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">الوصف</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gradient_from">لون البداية</Label>
                <Input
                  id="gradient_from"
                  value={formData.gradient_from}
                  onChange={(e) => setFormData({ ...formData, gradient_from: e.target.value })}
                  required
                  placeholder="emerald-500"
                />
              </div>

              <div>
                <Label htmlFor="gradient_to">لون النهاية</Label>
                <Input
                  id="gradient_to"
                  value={formData.gradient_to}
                  onChange={(e) => setFormData({ ...formData, gradient_to: e.target.value })}
                  required
                  placeholder="green-600"
                />
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "جاري الحفظ..." : "حفظ"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid gap-4">
        {features.map((feature, index) => (
          <div key={feature.id} className="bg-white p-4 rounded-lg border">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-12 h-12 rounded-full bg-linear-to-r from-${feature.gradient_from} to-${feature.gradient_to} flex items-center justify-center text-white`}
                  >
                    {feature.icon.substring(0, 2)}
                  </div>
                  <h3 className="font-bold">{feature.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
                <div className="mt-2 text-xs text-muted-foreground">
                  أيقونة: {feature.icon} | ألوان: {feature.gradient_from} → {feature.gradient_to}
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    onClick={() => handleReorder(feature.id, "up")}
                    disabled={index === 0}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    onClick={() => handleReorder(feature.id, "down")}
                    disabled={index === features.length - 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" size="sm" onClick={() => openEditDialog(feature)}>
                  <Pencil className="h-3 w-3" />
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(feature.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
