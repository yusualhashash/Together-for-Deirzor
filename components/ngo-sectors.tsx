import type { Sector } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Heart, Sprout, Shield, Users, Home } from "lucide-react"
import Link from "next/link"

interface SectorsProps {
  title: string
  subtitle: string
  sectors: Sector[]
}

const iconMap: Record<string, any> = {
  BookOpen: GraduationCap,
  Heart: Heart,
  Home: Home,
  Shield: Shield,
  Sprout: Sprout,
  Users: Users,
}

export function NGOSectors({ title, subtitle, sectors }: SectorsProps) {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===== HERO ===== */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground px-4">{title}</h2>
          <p className="text-lg sm:text-xl text-muted-foreground px-4">{subtitle}</p>
        </div>

        {/* ===== GRID ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sectors.map((sector) => {
            const Icon = sector.icon && iconMap[sector.icon] ? iconMap[sector.icon] : Users
            return (
              <Card
                key={sector.id}
                className="group relative overflow-hidden rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-shadow duration-500"
              >
                {sector.image_url && (
                  <div className="h-48 sm:h-56 md:h-64 w-full overflow-hidden">
                    <img
                      src={sector.image_url || "/placeholder.svg"}
                      alt={sector.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                )}

                <CardContent className="p-6 sm:p-8 text-center">
                  <div className="mx-auto -mt-10 sm:-mt-12 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center shadow-xl">
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>

                  <h3 className="mt-4 sm:mt-6 text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {sector.title}
                  </h3>

                  <p className="mt-2 text-muted-foreground text-base sm:text-lg leading-relaxed">
                    {sector.description}
                  </p>

                  <Link
                    href={`/projects?sector=${sector.id}`}
                    className="mt-3 sm:mt-4 inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm sm:text-base transition-colors"
                  >
                    عرض الأنشطة في هذا القطاع
                    <span className="text-xl sm:text-2xl">←</span>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* ===== VIEW ALL ===== */}
        <div className="text-center mt-8 sm:mt-12">
          <Link
            href="/sectors"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm sm:text-base"
          >
            عرض جميع الأنشطة
            <span className="text-xl sm:text-2xl">←</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
