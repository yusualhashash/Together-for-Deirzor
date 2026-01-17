import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://rashd-wifi.com" // Update this with your actual domain

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
