import { redirect } from "next/navigation"
import { checkAuth } from "@/lib/auth"
import { ImpactManagement } from "@/components/admin/impact-management"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getImpactStories } from "@/lib/impact/impact"
import { ImpactStory } from "@/lib/types"


export default async function AdminImpactPage() {
  const stories = await getImpactStories() as ImpactStory[]

  return (
    <div className="min-h-screen bg-gray-50 p-24" dir="rtl">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">إدارة  قصص النجاح
          </h1>
          <Button asChild variant="outline">
            <Link href="/admin/dashboard">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة للوحة التحكم
            </Link>
          </Button>
        </div>
        <ImpactManagement stories={stories} />
      </div>
    </div>
  )
}
