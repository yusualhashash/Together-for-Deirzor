// components/ngo-projects.tsx
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Calendar, DollarSign } from "lucide-react"
import type { Project as RawProject } from "@/lib/types"

interface SectorMap {
  [key: number]: string
}

interface ProjectsProps {
  title: string
  subtitle: string
  projects: RawProject[]
  sectorMap?: SectorMap
}

const statusColors: Record<string, string> = {
  active: "bg-green-500/10 text-green-700 border-green-500/20",
  completed: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  planned: "bg-orange-500/10 text-orange-700 border-orange-500/20",
}

export function NGOProjects({ title, subtitle, projects, sectorMap }: ProjectsProps) {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* TITLE & SUBTITLE */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground px-4">{title}</h2>
          <p className="text-lg sm:text-xl text-muted-foreground px-4">{subtitle}</p>
        </div>

        {/* PROJECT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="group hover:shadow-2xl transition-all overflow-hidden">
              {project.image_url && (
                <div className="h-48 sm:h-56 overflow-hidden">
                  <img
                    src={project.image_url || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}

              <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                {/* TITLE + STATUS */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground flex-1">{project.title}</h3>
                  <Badge className={statusColors[project.status] || statusColors.active}>
                    {project.status === "active" && "نشط"}
                    {project.status === "completed" && "مكتمل"}
                    {project.status === "planned" && "مخطط"}
                  </Badge>
                </div>

                {/* SECTOR */}
                {project.sector_id && sectorMap && sectorMap[project.sector_id] && (
                  <Badge variant="outline" className="text-primary border-primary/30">
                    {sectorMap[project.sector_id]}
                  </Badge>
                )}

                {/* DESCRIPTION */}
                {project.description && (
                  <p className="text-muted-foreground line-clamp-3 leading-relaxed text-sm sm:text-base">
                    {project.description}
                  </p>
                )}

                {/* DETAILS */}
                <div className="space-y-2 pt-2 border-t">
                  {project.location && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary shrink-0" />
                      <span>{project.location}</span>
                    </div>
                  )}

                  {project.beneficiaries && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                      <Users className="w-4 h-4 text-primary shrink-0" />
                      <span>{project.beneficiaries.toLocaleString()} مستفيد</span>
                    </div>
                  )}

                  {project.budget && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                      <DollarSign className="w-4 h-4 text-primary shrink-0" />
                      <span>{project.budget.toLocaleString()} دولار</span>
                    </div>
                  )}

                  {(project.start_date || project.end_date) && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary shrink-0" />
                      <span>
                        {project.start_date && new Date(project.start_date).toLocaleDateString("ar-SY")}
                        {project.start_date && project.end_date && " - "}
                        {project.end_date && new Date(project.end_date).toLocaleDateString("ar-SY")}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* READ MORE PROJECTS LINK */}
        <div className="text-center mt-8 sm:mt-12">
          <a
            href="/projects"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm sm:text-base"
          >
            قراءة المزيد من المشاريع
            <span className="text-xl sm:text-2xl">←</span>
          </a>
        </div>
      </div>
    </section>
  )
}
