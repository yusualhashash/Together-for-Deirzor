"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { useState } from "react"

interface ContactPageHero {
  id: number
  badge_text: string
  title: string
  subtitle: string
  background_image: string | null
}

interface ContactPageHeroFormProps {
  heroData: ContactPageHero
}

export function ContactPageHeroForm({ heroData }: ContactPageHeroFormProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    badge_text: heroData.badge_text,
    title: heroData.title,
    subtitle: heroData.subtitle,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/admin/contact-page-hero/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: heroData.id,
          ...formData,
        }),
      })

      if (!response.ok) throw new Error("Failed to update")

      toast({
        title: "تم الحفظ",
        description: "تم تحديث قسم البانر بنجاح",
      })

      window.location.reload()
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل تحديث البانر",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="badge_text">نص الشارة</Label>
        <Input
          id="badge_text"
          value={formData.badge_text}
          onChange={(e) => setFormData({ ...formData, badge_text: e.target.value })}
          placeholder="نحن هنا لك"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">العنوان</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="تواصل معنا"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subtitle">العنوان الفرعي</Label>
        <Input
          id="subtitle"
          value={formData.subtitle}
          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
          placeholder="نحن هنا لمساعدتك في أي وقت"
          required
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        حفظ التغييرات
      </Button>
    </form>
  )
}
