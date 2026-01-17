"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ChevronUp, ChevronDown, Trash2, Save, Plus, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { ContactInfo } from "@/lib/types"



interface ContactInfoListProps {
  contactInfo: ContactInfo[]
}

const CONTACT_TYPES = [
  { value: "phone", label: "هاتف" },
  { value: "whatsapp", label: "واتساب" },
  { value: "email", label: "بريد إلكتروني" },
  { value: "location", label: "موقع" },
  { value: "facebook", label: "فيسبوك" },
  { value: "instagram", label: "إنستغرام" },
  { value: "twitter", label: "تويتر" },
]

const ICONS = [
  { value: "phone", label: "هاتف" },
  { value: "message-circle", label: "رسالة" },
  { value: "mail", label: "بريد" },
  { value: "map-pin", label: "موقع" },
  { value: "facebook", label: "فيسبوك" },
  { value: "instagram", label: "إنستغرام" },
  { value: "twitter", label: "تويتر" },
]

export function ContactInfoList({ contactInfo: initialContactInfo }: ContactInfoListProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [contactInfo, setContactInfo] = useState(initialContactInfo)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [editForm, setEditForm] = useState({
    type: "",
    label: "",
    value: "",
    icon: "",
    is_active: true,
  })

  const startEdit = (info: ContactInfo) => {
    setEditingId(info.id)
    setEditForm({
      type: info.type,
      label: info.label,
      value: info.value,
      icon: info.icon,
      is_active: info.is_active,
    })
    setIsCreating(false)
  }

  const startCreate = () => {
    setIsCreating(true)
    setEditingId(null)
    setEditForm({
      type: "phone",
      label: "",
      value: "",
      icon: "phone",
      is_active: true,
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setIsCreating(false)
  }

  const handleSave = async (id: number) => {
    setIsSaving(true)
    try {
      const response = await fetch("/api/admin/contact/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...editForm }),
      })

      if (!response.ok) throw new Error("Failed to update")

      toast({ title: "تم الحفظ", description: "تم تحديث معلومات التواصل بنجاح" })
      setEditingId(null)
      router.refresh()
    } catch (error) {
      toast({ title: "خطأ", description: "فشل حفظ التغييرات", variant: "destructive" })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCreate = async () => {
    setIsSaving(true)
    try {
      const maxOrder = Math.max(...contactInfo.map((s) => s.sort_order), 0)
      const response = await fetch("/api/admin/contact/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...editForm, sort_order: maxOrder + 1 }),
      })

      if (!response.ok) throw new Error("Failed to create")

      toast({ title: "تم الإنشاء", description: "تم إضافة معلومات التواصل بنجاح" })
      setIsCreating(false)
      router.refresh()
    } catch (error) {
      toast({ title: "خطأ", description: "فشل إنشاء معلومات التواصل", variant: "destructive" })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف معلومات التواصل؟")) return

    try {
      const response = await fetch("/api/admin/contact/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) throw new Error("Failed to delete")

      toast({ title: "تم الحذف", description: "تم حذف معلومات التواصل بنجاح" })
      router.refresh()
    } catch (error) {
      toast({ title: "خطأ", description: "فشل حذف معلومات التواصل", variant: "destructive" })
    }
  }

  const handleReorder = async (id: number, direction: "up" | "down") => {
    const currentIndex = contactInfo.findIndex((s) => s.id === id)
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === contactInfo.length - 1)
    ) {
      return
    }

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1
    const newContactInfo = [...contactInfo]
      ;[newContactInfo[currentIndex], newContactInfo[newIndex]] = [newContactInfo[newIndex], newContactInfo[currentIndex]]

    try {
      await fetch("/api/admin/contact/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          updates: newContactInfo.map((s, index) => ({ id: s.id, sort_order: index })),
        }),
      })

      setContactInfo(newContactInfo)
      router.refresh()
    } catch (error) {
      toast({ title: "خطأ", description: "فشل إعادة الترتيب", variant: "destructive" })
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>معلومات التواصل</CardTitle>
            <CardDescription>إدارة طرق التواصل المعروضة</CardDescription>
          </div>
          <Button onClick={startCreate} disabled={isCreating}>
            <Plus className="ml-2 h-4 w-4" />
            إضافة معلومة جديدة
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isCreating && (
          <Card className="border-2 border-green-500">
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>النوع</Label>
                  <Select value={editForm.type} onValueChange={(value) => setEditForm({ ...editForm, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CONTACT_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>الأيقونة</Label>
                  <Select value={editForm.icon} onValueChange={(value) => setEditForm({ ...editForm, icon: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ICONS.map((icon) => (
                        <SelectItem key={icon.value} value={icon.value}>
                          {icon.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>التسمية</Label>
                <Input
                  value={editForm.label}
                  onChange={(e) => setEditForm({ ...editForm, label: e.target.value })}
                  placeholder="رقم الهاتف"
                />
              </div>
              <div>
                <Label>القيمة</Label>
                <Input
                  value={editForm.value}
                  onChange={(e) => setEditForm({ ...editForm, value: e.target.value })}
                  placeholder="+964 775 173 5156"
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={editForm.is_active}
                    onCheckedChange={(checked) => setEditForm({ ...editForm, is_active: checked })}
                  />
                  <Label>نشط</Label>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleCreate} className="min-w-35" disabled={isSaving}>
                    <Save className="ml-2 h-4 w-4" />
                    {isSaving ? "جاري الحفظ..." : "حفظ"}
                  </Button>
                  <Button onClick={cancelEdit} variant="outline" disabled={isSaving}>
                    <X className="ml-2 h-4 w-4" />
                    إلغاء
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {contactInfo.map((info, index) => (
          <Card key={info.id} className={!info.is_active ? "opacity-50" : ""}>
            <CardContent className="pt-6">
              {editingId === info.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>النوع</Label>
                      <Select
                        value={editForm.type}
                        onValueChange={(value) => setEditForm({ ...editForm, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CONTACT_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>الأيقونة</Label>
                      <Select
                        value={editForm.icon}
                        onValueChange={(value) => setEditForm({ ...editForm, icon: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ICONS.map((icon) => (
                            <SelectItem key={icon.value} value={icon.value}>
                              {icon.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>التسمية</Label>
                    <Input
                      value={editForm.label}
                      onChange={(e) => setEditForm({ ...editForm, label: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>القيمة</Label>
                    <Input
                      value={editForm.value}
                      onChange={(e) => setEditForm({ ...editForm, value: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={editForm.is_active}
                      onCheckedChange={(checked) => setEditForm({ ...editForm, is_active: checked })}
                    />
                    <Label>نشط</Label>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex gap-2">
                      <Button onClick={() => handleSave(info.id)} className="min-w-35" disabled={isSaving}>
                        <Save className="ml-2 h-4 w-4" />
                        {isSaving ? "جاري الحفظ..." : "حفظ"}
                      </Button>
                      <Button onClick={cancelEdit} variant="outline" disabled={isSaving}>
                        <X className="ml-2 h-4 w-4" />
                        إلغاء
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-0.5">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => handleReorder(info.id, "up")}
                      disabled={index === 0}
                    >
                      <ChevronUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => handleReorder(info.id, "down")}
                      disabled={index === contactInfo.length - 1}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{info.label}</h3>
                    <p className="text-gray-600">{info.value}</p>
                    <p className="text-sm text-gray-500">
                      النوع: {CONTACT_TYPES.find((t) => t.value === info.type)?.label}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => startEdit(info)}>
                      تعديل
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(info.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  )
}
