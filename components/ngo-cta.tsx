import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { CTASection } from "@/lib/types"

interface NGOCallToActionProps {
  ctaData: CTASection
}

export function NGOCallToAction({ ctaData }: NGOCallToActionProps) {
  return (
    <section className="py-24 bg-linear-to-br from-primary via-accent to-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white">{ctaData.title}</h2>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed">{ctaData.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href={ctaData.primary_button_url}>
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full text-lg px-8 py-6 shadow-lg hover:shadow-xl"
              >
                {ctaData.primary_button_text}
              </Button>
            </Link>
            <Link href={ctaData.secondary_button_url}>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full text-lg px-8 py-6 bg-white/10 border-2 border-white text-white hover:bg-white hover:text-primary backdrop-blur-sm"
              >
                {ctaData.secondary_button_text}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
