import { Card, CardContent } from "@/components/ui/card"
import { getSectors } from "@/lib/sector/sector"
import {
  GraduationCap,
  Heart,
  Home,
  Shield,
  Sprout,
  Users,
} from "lucide-react"


// Map sector.icon values (from DB) to Lucide icons
const iconMap: Record<string, any> = {
  BookOpen: GraduationCap,
  Heart: Heart,
  Home: Home,
  Shield: Shield,
  Sprout: Sprout,
  Users: Users,
}

export default async function ActivitiesPage() {
  const [sectors] = await Promise.all([

    getSectors(),
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-linear-to-br from-primary/10 via-accent/10 to-primary/5 pt-32 pb-20">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            {"مجالات عملنا"}
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            {"نعمل في عدة قطاعات لخدمة المجتمع وتحسين حياة الناس"}
          </p>
        </div>
      </section>

      {/* Sectors Grid */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.map((sector) => {
              const Icon = sector.icon && iconMap[sector.icon] ? iconMap[sector.icon] : Users

              return (
                <Card
                  key={sector.id}
                  className="group relative overflow-hidden rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-shadow duration-500"
                >
                  {sector.image_url && (
                    <div className="h-64 w-full overflow-hidden">
                      <img
                        src={sector.image_url}
                        alt={sector.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  )}
                  <CardContent className="p-8 text-center">
                    <div className="mx-auto -mt-12 w-20 h-20 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center shadow-xl">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="mt-6 text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {sector.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground text-lg leading-relaxed">
                      {sector.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
