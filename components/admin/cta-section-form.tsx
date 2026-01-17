"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import type { CTASection } from "@/lib/types"

interface CTASectionFormProps {
  ctaData: CTASection
}

export function CTASectionForm({ ctaData }: CTASectionFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(ctaData)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/cta-section/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to update")

      toast({
        title: "تم الحفظ بنجاح",
        description: "تم تحديث قسم الدعوة للتواصل",
      })

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

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 border space-y-4">
      <div>
        <Label htmlFor="title">العنوان الرئيسي</Label>
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
          <Label htmlFor="primary_button_text">نص الزر الأساسي</Label>
          <Input
            id="primary_button_text"
            value={formData.primary_button_text}
            onChange={(e) => setFormData({ ...formData, primary_button_text: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="primary_button_url">رابط الزر الأساسي</Label>
          <Input
            id="primary_button_url"
            value={formData.primary_button_url}
            onChange={(e) => setFormData({ ...formData, primary_button_url: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="secondary_button_text">نص الزر الثانوي</Label>
          <Input
            id="secondary_button_text"
            value={formData.secondary_button_text}
            onChange={(e) => setFormData({ ...formData, secondary_button_text: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="secondary_button_url">رابط الزر الثانوي</Label>
          <Input
            id="secondary_button_url"
            value={formData.secondary_button_url}
            onChange={(e) => setFormData({ ...formData, secondary_button_url: e.target.value })}
            required
          />
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
      </Button>
    </form>
  )
}
