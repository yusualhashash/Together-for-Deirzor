import { Card, CardContent } from "@/components/ui/card"
import { getImpactStories } from "@/lib/impact/impact"
import { Quote } from "lucide-react"
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"

export default async function ImpactPage() {
  const [stories] = await Promise.all([
    getImpactStories(),
  ])

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-linear-to-br from-primary/10 via-accent/10 to-primary/5 pt-32 pb-20">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">قصص النجاح</h1>
            <p className="text-xl text-muted-foreground">التأثير الحقيقي في حياة الناس</p>
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12">
            {stories.map((story: { id: Key | null | undefined; image_url: any; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; story: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; beneficiary_name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => (
              <Card key={story.id} className="hover:shadow-2xl transition-all overflow-hidden">
                {story.image_url && (
                  <div className="h-80 overflow-hidden">
                    <img
                      src={story.image_url || "/placeholder.svg"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-8 space-y-6">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Quote className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{story.title}</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">{story.story}</p>
                  <p className="text-base font-bold text-primary pt-4 border-t">- {story.beneficiary_name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
