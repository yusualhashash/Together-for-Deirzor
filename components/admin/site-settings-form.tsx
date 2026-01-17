"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { SiteSettings } from "@/lib/site-settings"

interface SiteSettingsFormProps {
  initialSettings: SiteSettings
}

export function SiteSettingsForm({ initialSettings }: SiteSettingsFormProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(initialSettings)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/site-settings/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to update")

      toast({
        title: "تم الحفظ بنجاح",
        description: "تم تحديث إعدادات الموقع بنجاح",
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-auto">
          <TabsTrigger value="general" className="text-sm py-2">
            إعدادات عامة
          </TabsTrigger>
          <TabsTrigger value="hero" className="text-sm py-2">
            الصفحة الرئيسية
          </TabsTrigger>
          <TabsTrigger value="footer" className="text-sm py-2">
            الفوتر
          </TabsTrigger>
          <TabsTrigger value="seo" className="text-sm py-2">
            SEO
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="site_name" className="text-base font-semibold">
                اسم الموقع
              </Label>
              <p className="text-sm text-muted-foreground mb-2">يظهر في الهيدر والفوتر وعنوان المتصفح</p>
              <Input
                id="site_name"
                value={formData.site_name}
                onChange={(e) => setFormData({ ...formData, site_name: e.target.value })}
                className="text-lg"
                required
              />
            </div>

            <div>
              <Label htmlFor="site_tagline" className="text-base font-semibold">
                الشعار (Tagline)
              </Label>
              <p className="text-sm text-muted-foreground mb-2">جملة قصيرة تصف المنظمة</p>
              <Input
                id="site_tagline"
                value={formData.site_tagline}
                onChange={(e) => setFormData({ ...formData, site_tagline: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="site_description" className="text-base font-semibold">
                وصف الموقع
              </Label>
              <p className="text-sm text-muted-foreground mb-2">وصف مختصر للمنظمة وأنشطتها</p>
              <Textarea
                id="site_description"
                value={formData.site_description}
                onChange={(e) => setFormData({ ...formData, site_description: e.target.value })}
                rows={3}
                required
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="hero" className="space-y-4 mt-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="hero_title" className="text-base font-semibold">
                عنوان البانر الرئيسي
              </Label>
              <p className="text-sm text-muted-foreground mb-2">العنوان الكبير في أعلى الصفحة الرئيسية</p>
              <Input
                id="hero_title"
                value={formData.hero_title}
                onChange={(e) => setFormData({ ...formData, hero_title: e.target.value })}
                className="text-lg"
                required
              />
            </div>

            <div>
              <Label htmlFor="hero_subtitle" className="text-base font-semibold">
                العنوان الفرعي
              </Label>
              <p className="text-sm text-muted-foreground mb-2">يظهر فوق العنوان الرئيسي في البانر</p>
              <Input
                id="hero_subtitle"
                value={formData.hero_subtitle}
                onChange={(e) => setFormData({ ...formData, hero_subtitle: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="hero_description" className="text-base font-semibold">
                وصف البانر
              </Label>
              <p className="text-sm text-muted-foreground mb-2">النص التوضيحي تحت العنوان الرئيسي</p>
              <Textarea
                id="hero_description"
                value={formData.hero_description}
                onChange={(e) => setFormData({ ...formData, hero_description: e.target.value })}
                rows={3}
                required
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="footer" className="space-y-4 mt-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="footer_about_title" className="text-base font-semibold">
                عنوان قسم "عن المنظمة" في الفوتر
              </Label>
              <p className="text-sm text-muted-foreground mb-2">العنوان الذي يظهر في القسم الأيسر من الفوتر</p>
              <Input
                id="footer_about_title"
                value={formData.footer_about_title}
                onChange={(e) => setFormData({ ...formData, footer_about_title: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="footer_about_description" className="text-base font-semibold">
                وصف المنظمة في الفوتر
              </Label>
              <p className="text-sm text-muted-foreground mb-2">نص قصير عن المنظمة يظهر في الفوتر</p>
              <Textarea
                id="footer_about_description"
                value={formData.footer_about_description}
                onChange={(e) => setFormData({ ...formData, footer_about_description: e.target.value })}
                rows={3}
                required
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4 mt-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="meta_description" className="text-base font-semibold">
                وصف محركات البحث (Meta Description)
              </Label>
              <p className="text-sm text-muted-foreground mb-2">
                يظهر في نتائج البحث على Google - يفضل أن يكون بين 150-160 حرف
              </p>
              <Textarea
                id="meta_description"
                value={formData.meta_description}
                onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                rows={3}
                required
              />
              <p className="text-xs text-muted-foreground mt-1">عدد الأحرف: {formData.meta_description.length}</p>
            </div>

            <div>
              <Label htmlFor="meta_keywords" className="text-base font-semibold">
                الكلمات المفتاحية (Keywords)
              </Label>
              <p className="text-sm text-muted-foreground mb-2">افصل بين الكلمات بفاصلة (,)</p>
              <Textarea
                id="meta_keywords"
                value={formData.meta_keywords}
                onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                rows={2}
                required
              />
            </div>

            <div>
              <Label htmlFor="og_title" className="text-base font-semibold">
                عنوان مشاركة وسائل التواصل (OG Title)
              </Label>
              <p className="text-sm text-muted-foreground mb-2">يظهر عند مشاركة الموقع على فيسبوك وتويتر</p>
              <Input
                id="og_title"
                value={formData.og_title}
                onChange={(e) => setFormData({ ...formData, og_title: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="og_description" className="text-base font-semibold">
                وصف مشاركة وسائل التواصل (OG Description)
              </Label>
              <p className="text-sm text-muted-foreground mb-2">يظهر عند مشاركة الموقع على وسائل التواصل</p>
              <Textarea
                id="og_description"
                value={formData.og_description}
                onChange={(e) => setFormData({ ...formData, og_description: e.target.value })}
                rows={2}
                required
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end pt-4 border-t">
        <Button type="submit" disabled={isLoading} size="lg" className="px-8">
          {isLoading ? "جاري الحفظ..." : "حفظ جميع التغييرات"}
        </Button>
      </div>
    </form>
  )
}
