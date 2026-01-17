// app/page.tsx (or your Home page)
import { NGOCallToAction } from "@/components/ngo-cta"
import { NGOHero } from "@/components/ngo-hero"
import { NGOImpact } from "@/components/ngo-impact"
import { NGOPartners } from "@/components/ngo-partners"
import { NGOProjects } from "@/components/ngo-projects"
import { NGOSectors } from "@/components/ngo-sectors"
import { NGOStatistics } from "@/components/ngo-statistics"
import { getCTASection } from "@/lib/cta"
import { getFeaturedStories } from "@/lib/impact/impact"
import { getPartners } from "@/lib/partner/partner"
import { getFeaturedProjects, getProjects } from "@/lib/project/project"
import { getSectors } from "@/lib/sector/sector"
import { getStatistics } from "@/lib/statistic/statistic"
import { getSiteSettings } from "@/lib/site-settings"

export default async function Home() {
  // Fetch all necessary content in parallel
  const [sectors, stories, statistics, partners, ctaData, siteSettings] = await Promise.all([
    getSectors(),
    getFeaturedStories(),
    getStatistics(),
    getPartners(),
    getCTASection(),
    getSiteSettings(),
  ])

  // Fetch featured projects with fallback to all projects
  let projects = await getFeaturedProjects()
  if (!projects || projects.length === 0) {
    projects = await getProjects()
  }

  // Convert sectors array to a map object with sector IDs as keys
  const sectorMapObject = sectors.reduce(
    (map, sector) => {
      map[sector.id] = sector.title
      return map
    },
    {} as Record<string, string>,
  )

  return (
    <div className="min-h-screen">
      {/* ================= HERO ================= */}
      <NGOHero
        title={siteSettings.hero_title}
        subtitle={siteSettings.hero_subtitle}
        description={siteSettings.hero_description}
      />

      {/* ================= STATISTICS ================= */}
      <NGOStatistics statistics={statistics} />

      {/* ================= SECTORS ================= */}
      <NGOSectors title={"مجالات عملنا"} subtitle={"نعمل في عدة قطاعات لخدمة المجتمع"} sectors={sectors.slice(0, 6)} />

      {/* ================= PROJECTS ================= */}
      <NGOProjects
        title={"مشاريعنا المميزة"}
        subtitle={"تعرف على أبرز مشاريعنا"}
        projects={projects.slice(0, 6)}
        sectorMap={sectorMapObject}
      />

      {/* ================= IMPACT STORIES ================= */}
      <NGOImpact title={"قصص النجاح"} subtitle={"التأثير الحقيقي في حياة الناس"} stories={stories.slice(0, 6)} />

      {/* ================= PARTNERS ================= */}
      <NGOPartners partners={partners} />

      {/* ================= CALL TO ACTION ================= */}
      <NGOCallToAction ctaData={ctaData} />
    </div>
  )
}
