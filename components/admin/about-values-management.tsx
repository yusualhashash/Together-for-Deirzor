"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Plus, Check, X, Pencil } from "lucide-react"
import type { AboutValue } from "@/lib/about"

interface AboutValuesManagementProps {
  values: AboutValue[]
}

export function AboutValuesManagement({ values: initialValues }: AboutValuesManagementProps) {
  const { toast } = useToast()
  const [values, setValues] = useState(initialValues)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState("")
  const [newValue, setNewValue] = useState("")
  const [isAdding, setIsAdding] = useState(false)

  const handleAdd = async () => {
    if (!newValue.trim()) return
    setIsAdding(true)

    try {
      const response = await fetch("/api/admin/about/values/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value_text: newValue }),
      })

      if (!response.ok) throw new Error("Failed to add")

      toast({
        title: "تم الإضافة بنجاح",
        description: "تمت إضافة القيمة الجديدة",
      })

      setNewValue("")
      setTimeout(() => window.location.reload(), 1000)
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل إضافة القيمة",
        variant: "destructive",
      })
    } finally {
      setIsAdding(false)
    }
  }

  const handleUpdate = async (id: number, is_active: boolean) => {
    try {
      const response = await fetch("/api/admin/about/values/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, value_text: editText, is_active }),
      })

      if (!response.ok) throw new Error("Failed to update")

      toast({
        title: "تم التحديث بنجاح",
        description: "تم تحديث القيمة",
      })

      setEditingId(null)
      setTimeout(() => window.location.reload(), 1000)
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل تحديث القيمة",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذه القيمة؟")) return

    try {
      const response = await fetch("/api/admin/about/values/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) throw new Error("Failed to delete")

      toast({
        title: "تم الحذف بنجاح",
        description: "تم حذف القيمة",
      })

      setTimeout(() => window.location.reload(), 1000)
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل حذف القيمة",
        variant: "destructive",
      })
    }
  }

  const startEdit = (value: AboutValue) => {
    setEditingId(value.id)
    setEditText(value.value_text)
  }

  return (
    <div className="space-y-4">
      {/* Add New Value */}
      <Card className="bg-linear-to-br from-primary/5 to-accent/5 border-2 border-dashed border-primary/30">
        <CardContent className="p-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="new-value" className="sr-only">
                إضافة قيمة جديدة
              </Label>
              <Input
                id="new-value"
                placeholder="أضف قيمة جديدة..."
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              />
            </div>
            <Button onClick={handleAdd} disabled={isAdding || !newValue.trim()}>
              <Plus className="w-4 h-4 ml-2" />
              إضافة
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Values List */}
      <div className="grid gap-3">
        {values.map((value) => (
          <Card key={value.id} className={!value.is_active ? "opacity-50" : ""}>
            <CardContent className="p-4">
              {editingId === value.id ? (
                <div className="flex gap-2 items-center">
                  <Input value={editText} onChange={(e) => setEditText(e.target.value)} className="flex-1" />
                  <Button size="sm" variant="ghost" onClick={() => handleUpdate(value.id, value.is_active)}>
                    <Check className="w-4 h-4 text-green-600" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                    <X className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">{value.value_text}</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleUpdate(value.id, !value.is_active)}>
                      {value.is_active ? "إخفاء" : "إظهار"}
                    </Button>

                    <Button size="sm" variant="outline" onClick={() => startEdit(value)}>
                      <Pencil className="h-3 w-3 ml-1" />
                      تعديل
                    </Button>

                    <Button size="sm" variant="destructive" onClick={() => handleDelete(value.id)}>
                      <Trash2 className="h-3 w-3 ml-1" />
                      حذف
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
