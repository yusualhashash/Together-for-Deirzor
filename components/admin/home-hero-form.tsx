"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { ImageUploadField } from "@/components/admin/image-upload-field"

interface HomeHeroFormProps {
  hero: {
    title: string
    subtitle: string
    description: string
    cta_text: string
    cta_link: string
    background_image: string | null
  }
}

export function HomeHeroForm({ hero }: HomeHeroFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(hero)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/home-hero/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to update")

      toast({
        title: "تم الحفظ بنجاح",
        description: "تم تحديث البانر الرئيسي",
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
        <Label htmlFor="subtitle">العنوان الفرعي</Label>
        <Input
          id="subtitle"
          value={formData.subtitle}
          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">الوصف</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cta_text">نص الزر</Label>
          <Input
            id="cta_text"
            value={formData.cta_text}
            onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="cta_link">رابط الزر</Label>
          <Input
            id="cta_link"
            value={formData.cta_link}
            onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
            required
          />
        </div>
      </div>

      <ImageUploadField
        label="صورة الخلفية"
        currentImage={formData.background_image}
        onImageChange={(url) => setFormData({ ...formData, background_image: url })}
      />

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
      </Button>
    </form>
  )
}
