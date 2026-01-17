import { AdminHeader } from "@/components/admin/admin-header"

import { SectorsManagement } from "@/components/admin/sectors-management"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getSectors } from "@/lib/sector/sector"

export default async function AdminSectorsPage() {
  const sectors = await getSectors()

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-24" dir="rtl">
      <div className="container mx-auto max-w-6xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">إدارة القطاعات</h1>
          <Button asChild variant="outline">
            <Link href="/admin/dashboard">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة للوحة التحكم
            </Link>
          </Button>
        </div>
        <SectorsManagement sectors={sectors} />
      </div>
    </div>
  )
}
