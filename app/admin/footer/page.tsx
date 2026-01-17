import { FooterManagement } from "@/components/admin/footer-management"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getAllFooterLinks } from "@/lib/footer/footer"

export default async function FooterPage() {
  const footerLinks = await getAllFooterLinks()

  return (
    <div className="min-h-screen bg-gray-50 p-24" dir="rtl">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">إدارة   روابط التذييل
          </h1>
          <Button asChild variant="outline">
            <Link href="/admin/dashboard">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة للوحة التحكم
            </Link>
          </Button>
        </div>

        <FooterManagement links={footerLinks} />
      </div>
    </div>
  )
}
