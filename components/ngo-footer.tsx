import Link from "next/link"
import { Facebook, Instagram, Twitter, MessageCircle, Phone, Mail, MapPin } from "lucide-react"
import type { FooterLink, SocialLink, ContactInfo } from "@/lib/types"

interface FooterProps {
  aboutTitle: string
  aboutDescription: string
  copyrightText?: string
  footerLinks: FooterLink[]
  socialLinks: SocialLink[]
  contactInfo: ContactInfo[]
}

const iconMap: Record<string, any> = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  "message-circle": MessageCircle,
  phone: Phone,
  whatsapp: MessageCircle,
  mail: Mail,
  email: Mail,
  "map-pin": MapPin,
  location: MapPin,
  tiktok: ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  ),
}

const getContactHref = (type: string, value: string) => {
  const cleanValue = value.replace(/\s+/g, "").replace(/\+/g, "")

  switch (type) {
    case "whatsapp":
      return `https://wa.me/${cleanValue}`
    case "phone":
      return `tel:${value.replace(/\s+/g, "")}`
    case "email":
      return `mailto:${value}`
    case "location":
      return `https://maps.google.com/?q=${encodeURIComponent(value)}`
    default:
      return "#"
  }
}

export function NGOFooter({
  aboutTitle,
  aboutDescription,
  copyrightText,
  footerLinks,
  socialLinks,
  contactInfo,
}: FooterProps) {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info - Rightmost in RTL */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-primary">{aboutTitle}</h3>
            <p className="text-white/70 text-sm leading-relaxed">{aboutDescription}</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-primary">روابط سريعة</h3>
            <ul className="space-y-2">
              {footerLinks
                .filter((link) => link.url)
                .map((link) => (
                  <li key={link.id}>
                    <Link href={link.url || "#"} className="text-white/70 hover:text-primary transition-colors text-sm">
                      {link.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-primary">تواصل معنا</h3>
            <ul className="space-y-3">
              {contactInfo.slice(0, 4).map((info) => {
                const Icon = iconMap[info.icon] || Phone
                return (
                  <li key={info.id}>
                    <a
                      href={getContactHref(info.type, info.value)}
                      className="flex items-center gap-2 text-white/70 hover:text-primary transition-colors"
                      target={info.type === "location" ? "_blank" : undefined}
                      rel={info.type === "location" ? "noopener noreferrer" : undefined}
                    >
                      <Icon className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-sm wrap-break-word">{info.value}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-primary">تابعنا</h3>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.icon] || MessageCircle
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-primary text-white flex items-center justify-center transition-all hover:scale-105"
                    aria-label={social.platform}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {copyrightText && (
          <div className="border-t border-slate-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
            <p className="text-white/50 text-xs sm:text-sm">{copyrightText}</p>
          </div>
        )}
      </div>
    </footer>
  )
}
