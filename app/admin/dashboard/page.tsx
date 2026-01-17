import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogOut, Phone, Layout, Menu, Briefcase, Heart, FileText, Building, TrendingUp, Globe, Mail, Info } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-24" dir="rtl">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">لوحة تحكم معاً لأجل دير الزور</h1>
          <form action="/api/admin/logout" method="POST">
            <Button variant="outline" type="submit">
              <LogOut className="mr-2 h-4 w-4" />
              تسجيل الخروج
            </Button>
          </form>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Content Management */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">إدارة المحتوى الأساسي للموقع</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    محتوى الصفحة الرئيسية
                  </CardTitle>
                  <CardDescription>تحرير محتوى الصفحة الرئيسية والإعدادات العامة</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/content">
                    <Button className="w-full">إدارة المحتوى</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    الإحصائيات
                  </CardTitle>
                  <CardDescription>تحرير الأرقام والإحصائيات المعروضة</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/statistics">
                    <Button className="w-full">إدارة الإحصائيات</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Navigation & Layout */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-purple-600">إدارة القائمة الرئيسية والفوتر</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Menu className="h-5 w-5" />
                    القائمة الرئيسية
                  </CardTitle>
                  <CardDescription>تحرير روابط القائمة الرئيسية</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/navigation">
                    <Button className="w-full">إدارة القائمة</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layout className="h-5 w-5" />
                    روابط الفوتر
                  </CardTitle>
                  <CardDescription>تحرير روابط وأقسام الفوتر</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/footer">
                    <Button className="w-full">إدارة الفوتر</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* About Page */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-cyan-600">إدارة صفحة من نحن</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    محتوى صفحة من نحن
                  </CardTitle>
                  <CardDescription>
                    تحرير محتوى صفحة من نحن والرؤية والرسالة
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/about">
                    <Button className="w-full">إدارة صفحة من نحن</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sectors & Activities */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-green-600"> إدارة صفحة الأنشطة </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    إدارة الأنشطة
                  </CardTitle>
                  <CardDescription>إضافة وتحرير  الأنشطة الإنسانية</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/sectors">
                    <Button className="w-full">إدارة الأنشطة</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-orange-600">إدارة صفحة المشاريع </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    إدارة المشاريع
                  </CardTitle>
                  <CardDescription>إضافة وتحرير المشاريع الإنسانية</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/projects">
                    <Button className="w-full">إدارة المشاريع</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Impact Stories */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-teal-600"> إدارة صفحة قصص النجاح</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    إدارة القصص
                  </CardTitle>
                  <CardDescription>إضافة وتحرير قصص الأثر والنجاح</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/impact">
                    <Button className="w-full">إدارة القصص</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Partners */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">إدارة  صفحة الشركاء</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    إدارة الشركاء
                  </CardTitle>
                  <CardDescription>إضافة وتحرير شركاء المنظمة</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/partners">
                    <Button className="w-full">إدارة الشركاء</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Page Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-orange-600">إدارة صفحة تواصل معنا</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    إدارة قسم البانر
                  </CardTitle>
                  <CardDescription>تحرير العنوان والمميزات</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/contact-page">
                    <Button className="w-full">إدارة البانر</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    إدارة قسم معلومات التواصل
                  </CardTitle>
                  <CardDescription>تحرير الهاتف والبريد والعنوان</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/contact">
                    <Button className="w-full">إدارة معلومات التواصل</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
