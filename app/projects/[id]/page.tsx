import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { getProject } from "@/lib/project/project"
import { getProjectImages } from "@/lib/project/project-images"
import { getSectors } from "@/lib/sector/sector"
import {
    Calendar,
    DollarSign,
    MapPin,
    Users
} from "lucide-react"
import { notFound } from "next/navigation"
import ImageSliderClient from "./ImageSliderClient"

const statusColors: Record<string, string> = {
    active: "bg-green-500/10 text-green-700 border-green-500/20",
    completed: "bg-blue-500/10 text-blue-700 border-blue-500/20",
    planned: "bg-orange-500/10 text-orange-700 border-orange-500/20",
    ongoing: "bg-green-500/10 text-green-700 border-green-500/20",
}

const statusLabels: Record<string, string> = {
    active: "نشط",
    ongoing: "جاري",
    completed: "مكتمل",
    planned: "مخطط",
}

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const projectId = parseInt(id)

    const [project, sectors, projectImages] = await Promise.all([
        getProject(projectId),
        getSectors(),
        getProjectImages(projectId),
    ])

    if (!project) {
        notFound()
    }

    const sector = sectors.find((s: any) => s.id === project.sector_id)

    const formatDate = (dateStr?: string | null) => {
        if (!dateStr) return ""
        const date = new Date(dateStr)
        return date.toLocaleDateString("ar-EG", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative flex items-center overflow-hidden bg-linear-to-br from-primary/10 via-accent/10 to-primary/5 py-32">
                <div className="absolute inset-0 bg-grid-white/5" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-wrap gap-3 mb-4">
                            {sector && (
                                <Badge className="text-base px-4 py-1">
                                    {sector.title}
                                </Badge>
                            )}
                            <Badge
                                className={`${statusColors[project.status]} text-base px-4 py-1`}
                            >
                                {statusLabels[project.status] || project.status}
                            </Badge>
                        </div>

                        <h1 className="text-xl md:text-3xl font-bold text-foreground">
                            {project.title}
                        </h1>
                    </div>
                </div>
            </section>

            {/* Project Images Slider - Client Component */}
            {projectImages.length > 0 && (
                <ImageSliderClient
                    projectImages={projectImages}
                    projectTitle={project.title}
                />
            )}

            {/* Main Project Image (fallback if no gallery images) */}
            {projectImages.length === 0 && project.image_url && (
                <section className="py-8 px-4">
                    <div className="container mx-auto max-w-6xl">
                        <Card className="overflow-hidden mb-6">
                            <div className="relative h-96">
                                <img
                                    src={project.image_url || "/placeholder.svg"}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </Card>
                    </div>
                </section>
            )}

            {/* Project Details */}
            <section className="py-12 px-4">
                <div className="container mx-auto max-w-6xl">
                    {/* Stats Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {project.location && (
                            <Card>
                                <CardContent className="p-8 text-center">
                                    <MapPin className="w-10 h-10 text-primary mx-auto mb-4" />
                                    <h3 className="font-semibold text-base text-muted-foreground mb-2">
                                        الموقع
                                    </h3>
                                    <p className="text-xl font-bold text-foreground">{project.location}</p>
                                </CardContent>
                            </Card>
                        )}

                        {project.beneficiaries && (
                            <Card>
                                <CardContent className="p-8 text-center">
                                    <Users className="w-10 h-10 text-primary mx-auto mb-4" />
                                    <h3 className="font-semibold text-base text-muted-foreground mb-2">
                                        المستفيدون
                                    </h3>
                                    <p className="text-xl font-bold text-foreground">
                                        {project.beneficiaries.toLocaleString()}
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {project.budget && (
                            <Card>
                                <CardContent className="p-8 text-center">
                                    <DollarSign className="w-10 h-10 text-primary mx-auto mb-4" />
                                    <h3 className="font-semibold text-base text-muted-foreground mb-2">
                                        الميزانية
                                    </h3>
                                    <p className="text-xl font-bold text-foreground">
                                        ${project.budget.toLocaleString()}
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {(project.start_date || project.end_date) && (
                            <Card>
                                <CardContent className="p-8 text-center">
                                    <Calendar className="w-10 h-10 text-primary mx-auto mb-4" />
                                    <h3 className="font-semibold text-base text-muted-foreground mb-2">
                                        المدة الزمنية
                                    </h3>
                                    <p className="text-sm font-bold text-foreground">
                                        {formatDate(project.start_date)} - {formatDate(project.end_date)}
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Full Description */}
                    {project.description && (
                        <Card>
                            <CardContent className="p-12">
                                <h2 className="text-4xl font-bold mb-8 text-foreground">تفاصيل المشروع</h2>
                                <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                                    <p>{project.description}</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </section>
        </div>
    )
}
