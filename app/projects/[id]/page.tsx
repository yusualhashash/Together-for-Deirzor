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
        <div className="min-h-screen bg-background ">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-linear-to-br from-primary/10 via-primary/5 to-background px-4 sm:px-8 lg:px-16 py-12 md:py-20">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6 justify-center py-8">
                            {sector && (
                                <Badge className="text-xs md:text-sm px-3 py-1 md:px-4">
                                    {sector.title}
                                </Badge>
                            )}

                            <Badge
                                className={`${statusColors[project.status]} text-xs md:text-sm px-3 py-1 md:px-4`}
                            >
                                {statusLabels[project.status] || project.status}
                            </Badge>
                        </div>

                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-foreground leading-tight text-center">
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
                <section className="py-6 md:py-10">
                    <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
                        <div className="relative aspect-4/3 md:aspect-video lg:aspect-21/9 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src={project.image_url || "/placeholder.svg"}
                                alt={project.title}
                                className="w-full h-full object-contain md:object-cover"
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* Project Details */}
            <section className="py-8 md:py-16 px-4">
                <div className="container mx-auto max-w-6xl">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-16">
                        {project.location && (
                            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                                <CardContent className="p-4 md:p-8 text-center">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                                        <MapPin className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                                    </div>
                                    <h3 className="font-medium text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">
                                        الموقع
                                    </h3>
                                    <p className="text-sm md:text-xl font-bold text-foreground">{project.location}</p>
                                </CardContent>
                            </Card>
                        )}

                        {project.beneficiaries && (
                            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                                <CardContent className="p-4 md:p-8 text-center">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                                        <Users className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                                    </div>
                                    <h3 className="font-medium text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">
                                        المستفيدون
                                    </h3>
                                    <p className="text-sm md:text-xl font-bold text-foreground">
                                        {project.beneficiaries.toLocaleString()}
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {project.budget && (
                            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                                <CardContent className="p-4 md:p-8 text-center">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                                        <DollarSign className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                                    </div>
                                    <h3 className="font-medium text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">
                                        الميزانية
                                    </h3>
                                    <p className="text-sm md:text-xl font-bold text-foreground">
                                        ${project.budget.toLocaleString()}
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {(project.start_date || project.end_date) && (
                            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                                <CardContent className="p-4 md:p-8 text-center">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                                        <Calendar className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                                    </div>
                                    <h3 className="font-medium text-xs md:text-sm text-muted-foreground mb-1 md:mb-2">
                                        المدة الزمنية
                                    </h3>
                                    <p className="text-xs md:text-base font-bold text-foreground">
                                        {formatDate(project.start_date)}
                                        {project.end_date && ` - ${formatDate(project.end_date)}`}
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Full Description */}
                    {project.description && (
                        <Card className="border-0 shadow-lg">
                            <CardContent className="p-6 md:p-12">
                                <h2 className="text-1xl md:text-3xl font-bold mb-4 md:mb-8 text-foreground">
                                    تفاصيل المشروع
                                </h2>
                                <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                                    <p className="whitespace-pre-line text-sm md:text-base leading-7 md:leading-8">
                                        {project.description}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </section>
        </div>
    )
}
