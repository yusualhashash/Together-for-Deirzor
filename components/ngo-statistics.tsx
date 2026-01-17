"use client"

import { useEffect, useRef, useState } from "react"
import type { Statistic } from "@/lib/types"
import { Users, Building2, Award, Heart, GraduationCap, FolderKanban, MapPin, Target } from "lucide-react"

interface StatisticsProps {
  statistics: Statistic[]
}

const iconMap: Record<string, any> = {
  // Match exact database icon names
  Users: Users,
  Building2: Building2,
  Award: Award,
  Heart: Heart,
  GraduationCap: GraduationCap,
  FolderKanban: FolderKanban,
  MapPin: MapPin,
  Target: Target,
  // Legacy lowercase support
  users: Users,
  building: Building2,
  award: Award,
  heart: Heart,
}

export function NGOStatistics({ statistics }: StatisticsProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  if (statistics.length === 0) return null

  return (
    <section
      ref={ref}
      className="py-12 sm:py-16 md:py-20 bg-linear-to-br from-primary via-accent to-primary relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-white/10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {statistics.map((stat, index) => {
            const Icon = iconMap[stat.icon || "Users"] || Users

            return (
              <div
                key={stat.id}
                className={`text-center space-y-2 sm:space-y-3 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className="flex justify-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-15 md:h-15 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                  </div>
                </div>
                <div className="text-white/90 font-semibold text-sm sm:text-base md:text-lg lg:text-xl px-2">
                  {stat.label}
                </div>
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">{stat.value}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
