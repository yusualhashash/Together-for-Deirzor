import { Card } from "@/components/ui/card"
import { getContactInfo, getContactPageFeatures, getContactPageHero } from "@/lib/contact/contact"
import type { Metadata } from "next"

import { Facebook, Headphones, Instagram, Mail, MapPin, MessageCircle, Phone, Sparkles, Twitter } from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
  const heroData = await getContactPageHero()

  return {
    title: "تواصل معنا",
    description: heroData?.subtitle || "نحن هنا لمساعدتك في أي وقت",
    openGraph: {
      title: `تواصل معنا | ${heroData?.title || "اتصل بنا"}`,
      description: heroData?.subtitle || "نحن هنا لمساعدتك في أي وقت",
      type: "website",
    },
  }
}

const iconMap: Record<string, any> = {
  phone: Phone,
  mail: Mail,
  "map-pin": MapPin,
  "message-circle": MessageCircle,
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  headphones: Headphones,
  sparkles: Sparkles,
}

const getContactAction = (type: string, value: string) => {
  switch (type) {
    case "phone":
      return `tel:${value.replace(/\s/g, "")}`
    case "whatsapp":
      return `https://wa.me/${value.replace(/\D/g, "")}`
    case "email":
      return `mailto:${value}`
    case "facebook":
      return value.startsWith("http") ? value : `https://facebook.com/${value}`
    case "instagram":
      return value.startsWith("http") ? value : `https://instagram.com/${value}`
    case "twitter":
      return value.startsWith("http") ? value : `https://twitter.com/${value}`
    case "location":
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`
    default:
      return "#"
  }
}

export default async function ContactPage() {
  const heroData = await getContactPageHero()
  const contactInfo = await getContactInfo()
  const features = await getContactPageFeatures()

  const whatsappContact = contactInfo.find((info) => info.type === "whatsapp")
  const whatsappNumber = whatsappContact?.value || ""

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <section
        className="relative min-h-100 flex items-center justify-center overflow-hidden bg-linear-to-br from-primary/10 via-accent/10 to-primary/5 pt-32 pb-20"
        style={
          heroData?.background_image
            ? {
                backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.9), rgba(5, 150, 105, 0.95)), url(${heroData.background_image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-black">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">{heroData?.badge_text || "نحن هنا لك"}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{heroData?.title || "تواصل معنا"}</h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl mb-4 text-gray-500">
              {heroData?.subtitle || "نحن هنا لمساعدتك في أي وقت"}
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature) => {
              const Icon = iconMap[feature.icon] || Headphones
              return (
                <Card
                  key={feature.id}
                  className="p-6 text-center hover:shadow-lg transition-all duration-300 border-2 border-gray-100 hover:border-blue-500"
                >
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-base text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Cards Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">طرق التواصل</h2>
            <p className="text-lg text-gray-600">اختر الطريقة الأنسب للتواصل معنا</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {contactInfo.map((info) => {
              const Icon = iconMap[info.icon] || Phone
              const href = getContactAction(info.type, info.value)
              const isExternal = info.type !== "location"

              return (
                <Card
                  key={info.id}
                  className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-blue-200 hover:border-blue-200 bg-white"
                >
                  <a
                    href={href}
                    target={isExternal && info.type !== "phone" && info.type !== "email" ? "_blank" : undefined}
                    rel={
                      isExternal && info.type !== "phone" && info.type !== "email" ? "noopener noreferrer" : undefined
                    }
                    className="flex flex-col items-center text-center gap-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
                      <Icon className="w-8 h-8 text-black" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-gray-900 mb-2">{info.label}</h3>
                      <p className="text-sm text-gray-600 wrap-break-word">{info.value}</p>
                    </div>
                  </a>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
