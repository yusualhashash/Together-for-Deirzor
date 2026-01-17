import { Card, CardContent } from "@/components/ui/card"
import { Target, Heart, Award } from "lucide-react"
import { getAboutPageData, getAboutValues } from "@/lib/about"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  const aboutData = await getAboutPageData()

  return {
    title: "من نحن",
    description: aboutData.hero_description,
    openGraph: {
      title: `من نحن | ${aboutData.hero_title}`,
      description: aboutData.hero_description,
      type: "website",
    },
  }
}

export default async function AboutPage() {
  const [aboutData, values] = await Promise.all([getAboutPageData(), getAboutValues()])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-linear-to-br from-primary/10 via-accent/10 to-primary/5 pt-32 pb-20">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-block px-6 py-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full">
              <span className="text-primary font-semibold">{aboutData.hero_subtitle}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground text-balance">{aboutData.hero_title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed text-pretty">{aboutData.hero_description}</p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-linear-to-br from-primary/5 to-accent/5 border-2 hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 bg-linear-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">{aboutData.vision_title}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">{aboutData.vision_content}</p>
              </CardContent>
            </Card>

            <Card className="bg-linear-to-br from-accent/5 to-primary/5 border-2 hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8 space-y-4">
                <div className="w-16 h-16 bg-linear-to-br from-accent to-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">{aboutData.mission_title}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">{aboutData.mission_content}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      {values.length > 0 && (
        <section className="py-24 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">{aboutData.values_section_title}</h2>
              <p className="text-xl text-muted-foreground">{aboutData.values_section_subtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <Card key={value.id} className="hover:shadow-xl transition-all duration-300 border-2 group">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-foreground font-semibold text-lg">{value.value_text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 bg-linear-to-br from-primary via-accent to-primary">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-balance">{aboutData.cta_title}</h2>
          <p className="text-xl text-white/90 text-pretty">{aboutData.cta_description}</p>
        </div>
      </section>
    </div>
  )
}
