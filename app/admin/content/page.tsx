import { AdminHeader } from "@/components/admin/admin-header"
import { getSiteSettings } from "@/lib/site-settings"
import { getCTASection } from "@/lib/cta"
import { getAllSocialLinks } from "@/lib/social-links"
import { SiteSettingsForm } from "@/components/admin/site-settings-form"
import { CTASectionForm } from "@/components/admin/cta-section-form"
import { SocialLinksManagement } from "@/components/admin/social-links-management"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Globe, MessageSquare, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function AdminContentPage() {
  const [settings, ctaData, socialLinks] = await Promise.all([getSiteSettings(), getCTASection(), getAllSocialLinks()])

  return (
    <div className="min-h-screen bg-gray-50 p-24" dir="rtl">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">إدارة محتوى الموقع
          </h1>
          <Button asChild variant="outline">
            <Link href="/admin/dashboard">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة للوحة التحكم
            </Link>
          </Button>
        </div>
        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          <Card className="border-primary/20 shadow-lg">
            <CardHeader className="bg-linear-to-r from-primary/5 to-accent/5 border-b p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg">
                  <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl sm:text-2xl">إعدادات الموقع الرئيسية</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    تحكم في اسم الموقع، الشعار، النصوص الرئيسية، وإعدادات محركات البحث
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4 sm:pt-6">
              <SiteSettingsForm initialSettings={settings} />
            </CardContent>
          </Card>

          <Card className="border-accent/20 shadow-lg">
            <CardHeader className="bg-linear-to-r from-accent/5 to-primary/5 border-b p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-accent/10 rounded-lg">
                  <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                </div>
                <div>
                  <CardTitle className="text-xl sm:text-2xl">قسم الدعوة للتواصل (CTA)</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    النصوص والأزرار في نهاية الصفحة الرئيسية
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4 sm:pt-6">
              <CTASectionForm ctaData={ctaData} />
            </CardContent>
          </Card>

          <Card className="border-blue-500/20 shadow-lg">
            <CardHeader className="bg-linear-to-r from-blue-500/5 to-purple-500/5 border-b p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-blue-500/10 rounded-lg">
                  <Share2 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                </div>
                <div>
                  <CardTitle className="text-xl sm:text-2xl">روابط التواصل الاجتماعي</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    إدارة روابط وسائل التواصل الاجتماعي في الفوتر
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4 sm:pt-6">
              <SocialLinksManagement socialLinks={socialLinks} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
