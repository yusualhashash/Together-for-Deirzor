import { SiteSettingsForm } from "@/components/admin/site-settings-form"
import { getSiteSettings } from "@/lib/site-settings"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function SiteSettingsPage() {
  const settings = await getSiteSettings()

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">إعدادات الموقع</h1>
        <p className="text-muted-foreground text-lg">تحكم في جميع معلومات الموقع والنصوص الرئيسية</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="border-b bg-muted/50">
          <CardTitle className="text-2xl">تعديل معلومات الموقع</CardTitle>
          <CardDescription>جميع التغييرات سيتم تطبيقها مباشرة على الموقع</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <SiteSettingsForm initialSettings={settings} />
        </CardContent>
      </Card>
    </div>
  )
}
