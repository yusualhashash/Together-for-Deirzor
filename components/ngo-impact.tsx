import type { ImpactStory } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import Link from "next/link"

interface ImpactProps {
  title: string
  subtitle: string
  stories: ImpactStory[]
}

export function NGOImpact({ title, subtitle, stories }: ImpactProps) {
  if (stories.length === 0) return null

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">{title}</h2>
          <p className="text-xl text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <Card key={story.id} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden">
              {story.image_url && (
                <div className="h-64 overflow-hidden">
                  <img
                    src={story.image_url || "/placeholder.svg"}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Quote className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{story.title}</h3>
                <p className="text-muted-foreground line-clamp-4 leading-relaxed">{story.story}</p>
                <p className="text-sm font-semibold text-primary">- {story.beneficiary_name}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/impact"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-md"
          >
            قراءة المزيد من القصص
            <span className="text-2xl">←</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
