"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

interface HeroProps {
  title: string
  subtitle: string
  description: string
}

export function NGOHero({ title, subtitle, description }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-accent/10 to-primary/5">
        <div className="absolute inset-0 bg-grid-white/5" />
        <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-48 h-48 sm:w-96 sm:h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-48 h-48 sm:w-96 sm:h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-block px-4 sm:px-6 py-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full">
            <span className="text-primary font-semibold text-sm sm:text-base">{subtitle}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight px-4">
            {title}
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 px-4">
            <Link href="/projects" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-full text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 shadow-lg hover:shadow-xl transition-all"
              >
                تعرف على مشاريعنا
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto rounded-full text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 border-2 hover:bg-primary/5 bg-transparent"
              >
                تواصل معنا
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
          <ChevronDown className="w-8 h-8 text-muted-foreground" />
        </div>
      </div>
    </section>
  )
}
