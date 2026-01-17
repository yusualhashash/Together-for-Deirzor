import type { Partner } from "@/lib/types"

interface PartnersProps {
  partners: Partner[]
}

export function NGOPartners({ partners }: PartnersProps) {
  if (partners.length === 0) return null

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl space-y-4 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">شركاؤنا</h2>
          <p className="text-lg text-muted-foreground">
            نعمل مع منظمات موثوقة لتحقيق أهدافنا
          </p>
        </div>

        <div className="grid grid-cols-2 items-center gap-8 md:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center rounded-2xl bg-card p-6 transition-all hover:shadow-lg"
            >
              <span className="text-center text-sm font-semibold text-muted-foreground">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
