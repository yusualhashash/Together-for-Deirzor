import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

import { ContactPageHeroForm } from "@/components/admin/contact-page-hero-form"
import { ContactPageFeaturesList } from "@/components/admin/contact-page-features-list"
import { getAllContactPageFeatures, getContactPageHero } from "@/lib/contact/contact"

export default async function ContactPageAdmin() {
  const heroData = await getContactPageHero()
  const features = await getAllContactPageFeatures()

  return (
    <div className="container mx-auto p-6 max-w-6xl py-24" dir="rtl">
      {/* Header with back button */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة صفحة تواصل معنا</h1>
          <p className="text-gray-600 mt-2">إدارة محتوى قسم البانر والمميزات في صفحة التواصل</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/dashboard">
            <ArrowRight className="ml-2 h-4 w-4" />
            العودة للوحة التحكم
          </Link>
        </Button>
      </div>

      {/* Hero Section Form */}
      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">قسم البانر الرئيسي</h2>
        {heroData && <ContactPageHeroForm heroData={heroData} />}
      </Card>

      {/* Features List */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">المميزات</h2>
        <ContactPageFeaturesList features={features} />
      </Card>
    </div>
  )
}
