import { PartnersManagement } from "@/components/admin/partners-management"
import { Button } from "@/components/ui/button"
import { getAllPartners } from "@/lib/partner/partner"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function AdminPartnersPage() {
  const partners = await getAllPartners()

  return (
    <div className="min-h-screen bg-gray-50 p-24" dir="rtl">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">إدارة الشركاء</h1>
          <Button asChild variant="outline">
            <Link href="/admin/dashboard">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة للوحة التحكم
            </Link>
          </Button>
        </div>

        <PartnersManagement partners={partners} />
      </div>
    </div>
  )
}
