"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import type { AboutPageData } from "@/lib/about"

interface AboutPageFormProps {
  aboutData: AboutPageData
}

export function AboutPageForm({ aboutData }: AboutPageFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(aboutData)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/about/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to update")

      toast({
        title: "تم الحفظ بنجاح",
        description: "تم تحديث صفحة من نحن",
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
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-4 sm:p-6 border space-y-4 sm:space-y-6">
      {/* Hero Section */}
      <div className="space-y-3 sm:space-y-4 border-b pb-4 sm:pb-6">
        <h3 className="text-base sm:text-lg font-semibold text-foreground">قسم البانر الرئيسي</h3>

        <div>
          <Label className="p-2" htmlFor="hero_subtitle">العنوان الفرعي</Label>
          <Input
            id="hero_subtitle"
            value={formData.hero_subtitle}
            onChange={(e) => setFormData({ ...formData, hero_subtitle: e.target.value })}
            required
          />
        </div>

        <div>
          <Label className="p-2" htmlFor="hero_title">العنوان الرئيسي</Label>
          <Input
            id="hero_title"
            value={formData.hero_title}
            onChange={(e) => setFormData({ ...formData, hero_title: e.target.value })}
            required
          />
        </div>


        <div>
          <Label className="p-2" htmlFor="hero_description">الوصف</Label>
          <Textarea
            id="hero_description"
            value={formData.hero_description}
            onChange={(e) => setFormData({ ...formData, hero_description: e.target.value })}
            rows={3}
            required
          />
        </div>
      </div>

      {/* Vision Section */}
      <div className="space-y-4 border-b pb-6">
        <h3 className="text-lg font-semibold text-foreground">قسم الرؤية</h3>

        <div>
          <Label className="p-2" htmlFor="vision_title">عنوان الرؤية</Label>
          <Input
            id="vision_title"
            value={formData.vision_title}
            onChange={(e) => setFormData({ ...formData, vision_title: e.target.value })}
            required
          />
        </div>

        <div>
          <Label className="p-2" htmlFor="vision_content">محتوى الرؤية</Label>
          <Textarea
            id="vision_content"
            value={formData.vision_content}
            onChange={(e) => setFormData({ ...formData, vision_content: e.target.value })}
            rows={3}
            required
          />
        </div>
      </div>

      {/* Mission Section */}
      <div className="space-y-4 border-b pb-6">
        <h3 className="text-lg font-semibold text-foreground">قسم الرسالة</h3>

        <div>
          <Label className="p-2" htmlFor="mission_title">عنوان الرسالة</Label>
          <Input
            id="mission_title"
            value={formData.mission_title}
            onChange={(e) => setFormData({ ...formData, mission_title: e.target.value })}
            required
          />
        </div>

        <div>
          <Label className="p-2" htmlFor="mission_content">محتوى الرسالة</Label>
          <Textarea
            id="mission_content"
            value={formData.mission_content}
            onChange={(e) => setFormData({ ...formData, mission_content: e.target.value })}
            rows={3}
            required
          />
        </div>
      </div>

      {/* Values Section */}
      <div className="space-y-4 border-b pb-6">
        <h3 className="text-lg font-semibold text-foreground">قسم القيم</h3>

        <div>
          <Label className="p-2" htmlFor="values_section_title">عنوان القسم</Label>
          <Input
            id="values_section_title"
            value={formData.values_section_title}
            onChange={(e) => setFormData({ ...formData, values_section_title: e.target.value })}
            required
          />
        </div>

        <div>
          <Label className="p-2" htmlFor="values_section_subtitle">وصف القسم</Label>
          <Input
            id="values_section_subtitle"
            value={formData.values_section_subtitle || ""}
            onChange={(e) => setFormData({ ...formData, values_section_subtitle: e.target.value })}
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">قسم الدعوة للتواصل</h3>

        <div>
          <Label className="p-2" htmlFor="cta_title">عنوان الدعوة</Label>
          <Input
            id="cta_title"
            value={formData.cta_title}
            onChange={(e) => setFormData({ ...formData, cta_title: e.target.value })}
            required
          />
        </div>

        <div>
          <Label className="p-2" htmlFor="cta_description">وصف الدعوة</Label>
          <Textarea
            id="cta_description"
            value={formData.cta_description}
            onChange={(e) => setFormData({ ...formData, cta_description: e.target.value })}
            rows={2}
            required
          />
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full text-base sm:text-lg" size="lg">
        {isLoading ? "جاري الحفظ..." : "حفظ جميع التغييرات"}
      </Button>
    </form>
  )
}
