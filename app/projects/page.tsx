import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Calendar, DollarSign } from "lucide-react"
import { getProjects } from "@/lib/project/project"
import { getSectors } from "@/lib/sector/sector"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "مشاريعنا",
  description: "تعرف على مشاريعنا التي تحدث فرقاً في المجتمع",
  openGraph: {
    title: "مشاريعنا",
    description: "تعرف على مشاريعنا التي تحدث فرقاً في المجتمع",
    type: "website",
  },
}

const statusColors: Record<string, string> = {
  active: "bg-green-500/10 text-green-700 border-green-500/20",
  completed: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  planned: "bg-orange-500/10 text-orange-700 border-orange-500/20",
}

export default async function ProjectsPage() {
  const [projects, sectors] = await Promise.all([getProjects(), getSectors()])

  const sectorMap = sectors.reduce(
    (acc, sector) => {
      acc[sector.id] = sector.title
      return acc
    },
    {} as Record<string, string>,
  )

  return (
    <div className="min-h-screen">
      {/* ================= HERO ================= */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-linear-to-br from-primary/10 via-accent/10 to-primary/5 pt-32 pb-20">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">{"مشاريعنا"}</h1>
            <p className="text-xl text-muted-foreground">{"تعرف على مشاريعنا التي تحدث فرقاً"}</p>
          </div>
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="group hover:shadow-2xl transition-all overflow-hidden">
                {project.image_url && (
                  <div className="h-56 overflow-hidden">
                    <img
                      src={project.image_url || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}

                <CardContent className="p-6 space-y-4">
                  {/* TITLE + STATUS */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl font-bold text-foreground flex-1">{project.title}</h3>
                    <Badge className={statusColors[project.status] || statusColors.active}>
                      {project.status === "active" && "نشط"}
                      {project.status === "completed" && "مكتمل"}
                      {project.status === "planned" && "مخطط"}
                    </Badge>
                  </div>

                  {/* SECTOR */}
                  {project.sector_id && (
                    <Badge variant="outline" className="text-primary border-primary/30">
                      {sectorMap[project.sector_id]}
                    </Badge>
                  )}

                  {/* DESCRIPTION */}
                  {project.description && (
                    <p className="text-muted-foreground line-clamp-3 leading-relaxed">{project.description}</p>
                  )}

                  {/* DETAILS */}
                  <div className="space-y-2 pt-2 border-t">
                    {project.location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{project.location}</span>
                      </div>
                    )}

                    {project.beneficiaries && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4 text-primary" />
                        <span>{project.beneficiaries.toLocaleString()} مستفيد</span>
                      </div>
                    )}

                    {project.budget && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <span>{project.budget.toLocaleString()} دولار</span>
                      </div>
                    )}

                    {(project.start_date || project.end_date) && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>
                          {project.start_date && new Date(project.start_date).toLocaleDateString("en-SY")}
                          {project.start_date && project.end_date && " - "}
                          {project.end_date && new Date(project.end_date).toLocaleDateString("en-SY")}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
