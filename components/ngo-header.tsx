"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { NavigationItem } from "@/lib/types"

interface HeaderProps {
  branding: string
  navItems: NavigationItem[]
}

export function NGOHeader({ branding, navItems }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-card/95 backdrop-blur-md shadow-lg border-b" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-primary to-accent rounded-xl sm:rounded-2xl flex items-center justify-center text-primary-foreground font-bold text-lg sm:text-xl shadow-lg">
              م
            </div>
            <span className="text-base sm:text-xl md:text-2xl font-bold text-foreground leading-tight max-w-[180px] sm:max-w-none">
              {branding || "منظمة معاً لأجل دير الزور"}
            </span>
          </Link>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex lg:items-center lg:gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`px-4 py-2 rounded-xl transition-all font-semibold border-b-4 ${
                    isActive
                      ? "text-primary border-primary"
                      : "text-foreground/80 hover:text-primary hover:border-primary/50 border-transparent"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* CTA Button - Desktop */}
          <Link href="/contact" className="hidden lg:block">
            <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-all">
              تواصل معنا
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:bg-muted rounded-xl transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t shadow-xl animate-in slide-in-from-top-2 duration-300">
          <nav className="container mx-auto px-4 py-4 sm:py-6 flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl transition-all font-semibold border-r-4 text-base ${
                    isActive
                      ? "text-primary bg-primary/15 border-primary"
                      : "text-foreground/80 hover:text-primary hover:bg-primary/10 border-transparent"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="mt-2">
              <Button size="lg" className="w-full rounded-full">
                تواصل معنا
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
