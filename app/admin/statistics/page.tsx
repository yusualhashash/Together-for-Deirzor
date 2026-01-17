import { StatisticsManagement } from "@/components/admin/statistics-management"
import { Button } from "@/components/ui/button"
import { getStatistics } from "@/lib/statistic/statistic"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function AdminStatisticsPage() {
  const statistics = await getStatistics()

  // Normalize icons to ensure always string
  const safeStatistics = statistics.map((s) => ({
    ...s,
    icon: s.icon || "Users",
  }))

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-24" dir="rtl">
      <div className="container mx-auto max-w-6xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">إدارة الإحصائيات</h1>
          <Button asChild variant="outline">
            <Link href="/admin/dashboard">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة للوحة التحكم
            </Link>
          </Button>
        </div>

        <StatisticsManagement statistics={safeStatistics} />
      </div>
    </div>
  )
}
