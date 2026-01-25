import { NGOFooter } from "@/components/ngo-footer"
import { NGOHeader } from "@/components/ngo-header"
import { getContactInfo } from "@/lib/contact/contact"
import { getSocialLinks } from "@/lib/social-links"
import { getFooterLinks } from "@/lib/footer/footer"
import { getNavigationItems } from "@/lib/navigation/navigation"
import { getSiteSettings } from "@/lib/site-settings"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next"
import { Cairo } from "next/font/google"
import type React from "react"
import "./globals.css"

const cairo = Cairo({ subsets: ["arabic", "latin"], weight: ["400", "600", "700"] })

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://tfdzo.org" || "https://tfdzo.com"

  return {
    title: {
      default: siteSettings.site_name,
      template: `%s | ${siteSettings.site_name}`,
    },
    description: siteSettings.meta_description,
    keywords: siteSettings.meta_keywords.split(",").map((k) => k.trim()),
    authors: [{ name: siteSettings.site_name }],
    creator: siteSettings.site_name,
    publisher: siteSettings.site_name,
    metadataBase: new URL(baseUrl),
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: "/",
      languages: {
        "ar": "/",
      },
    },
    icons: {
      icon: [
        { url: "/logo.jpg", type: "image/jpeg" },
        { url: "/favicon.ico", sizes: "any" },
      ],
      apple: [
        { url: "/logo.jpg", sizes: "180x180", type: "image/jpeg" },
      ],
      shortcut: "/logo.jpg",
    },
    manifest: "/manifest.json",
    openGraph: {
      title: siteSettings.og_title,
      description: siteSettings.og_description,
      siteName: siteSettings.site_name,
      locale: "ar_SY",
      type: "website",
      url: baseUrl,
      images: [
        {
          url: "/logo.jpg",
          width: 512,
          height: 512,
          alt: siteSettings.site_name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteSettings.og_title,
      description: siteSettings.og_description,
      images: ["/logo.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION || "",
    },
    category: "humanitarian organization",
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [navItems, footerLinks, socialLinks, contactInfo, siteSettings] = await Promise.all([
    getNavigationItems(),
    getFooterLinks(),
    getSocialLinks(),
    getContactInfo(),
    getSiteSettings(),
  ])

  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} font-sans antialiased`}>
        <NGOHeader branding={siteSettings.site_name} navItems={navItems} />
        {children}
        <NGOFooter
          aboutTitle={siteSettings.footer_about_title}
          aboutDescription={siteSettings.footer_about_description}
          copyrightText={`© ${new Date().getFullYear()} ${siteSettings.site_name}. جميع الحقوق محفوظة.`}
          footerLinks={footerLinks}
          socialLinks={socialLinks}
          contactInfo={contactInfo}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
