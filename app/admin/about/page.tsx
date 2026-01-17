import { AdminHeader } from "@/components/admin/admin-header"
import { getAboutPageData, getAllAboutValues } from "@/lib/about"
import { AboutPageForm } from "@/components/admin/about-page-form"
import { AboutValuesManagement } from "@/components/admin/about-values-management"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function AdminAboutPage() {
  const [aboutData, values] = await Promise.all([getAboutPageData(), getAllAboutValues()])

  return (
    <div className="min-h-screen bg-gray-50 p-6 py-24" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">إدارة صفحة من نحن</h1>
          <Button asChild variant="outline">
            <Link href="/admin/dashboard">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة للوحة التحكم
            </Link>
          </Button>
        </div>
        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          <section>
            <AboutPageForm aboutData={aboutData} />
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-foreground">إدارة القيم</h2>
            <AboutValuesManagement values={values} />
          </section>
        </div>
      </div>
    </div>
  )
}
