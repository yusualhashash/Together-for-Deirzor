import { ContactInfoList } from "@/components/admin/contact-info-list"
import { Button } from "@/components/ui/button"
import { getAllContactInfo } from "@/lib/contact/contact"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function ContactAdminPage() {
  const contactInfo = await getAllContactInfo()

  return (
    <div className="min-h-screen bg-gray-50 p-6 py-24" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">إدارة التواصل</h1>
          <Button asChild variant="outline">
            <Link href="/admin/dashboard">
              <ArrowRight className="ml-2 h-4 w-4" />
              العودة للوحة التحكم
            </Link>
          </Button>
        </div>

        <div className="space-y-8">
          <ContactInfoList contactInfo={contactInfo} />
        </div>
      </div>
    </div>
  )
}
