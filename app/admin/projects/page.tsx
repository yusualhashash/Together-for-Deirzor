import { Button } from "@/components/ui/button"
import { getProjects } from "@/lib/project/project"
import { getSectors } from "@/lib/sector/sector"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { ProjectsManagement } from "@/components/admin/projects-management"

export default async function AdminProjectsPage() {
  const projects = await getProjects()
  const sectors = await getSectors()

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-24" dir="rtl">
      <div className="container mx-auto max-w-6xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">إدارة المشاريع</h1>
          <Button asChild variant="outline">
            <Link href="/admin/dashboard">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة للوحة التحكم
            </Link>
          </Button>
        </div>

        <ProjectsManagement projects={projects} sectors={sectors} />
      </div>
    </div>
  )
}
