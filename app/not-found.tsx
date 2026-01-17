import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowRight } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-[120px] md:text-[180px] font-bold text-emerald-500 leading-none">404</h1>
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">الصفحة غير موجودة</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى موقع آخر
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="w-5 h-5" />
              العودة للرئيسية
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2 bg-transparent">
            <Link href="/packages">
              الباقات
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
