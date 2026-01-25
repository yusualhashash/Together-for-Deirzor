// Site Content Types


// Sector Types
export interface Sector {
  id: number
  title: string
  description: string | null
  icon: string | null
  image_url: string | null
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// Project
export interface Project {
  id: number
  title: string
  description: string | null
  sector_id: number | null
  location: string | null
  start_date: string | null
  end_date: string | null
  beneficiaries: number | null
  budget: number | null
  status: string
  image_url: string | null
  display_order: number
  is_featured: boolean
  created_at: string
  updated_at: string
}

// Project Image
export interface ProjectImage {
  id: number
  project_id: number
  image_url: string
  caption: string | null
  display_order: number
  created_at: string
  updated_at: string
}

// Team Member Types
export interface TeamMember {
  id: number
  name: string
  position: string | null
  department: string | null
  bio: string | null
  image_url: string | null
  email: string | null
  phone: string | null
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// Impact Story Types
export interface ImpactStory {
  id: number
  title: string
  story: string
  beneficiary_name: string | null
  project_id: number | null
  image_url: string | null
  video_url: string | null
  display_order: number
  is_featured: boolean
  created_at: string
  updated_at: string
}

// Partner Types
export interface Partner {
  id: number
  name: string
  website: string | null
  description: string | null
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// Statistic Types
export interface Statistic {
  id: number
  label: string
  value: string
  icon: string | null
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// ContactFeature Types
export interface ContactFeature {
  id: number
  title: string
  description: string
  icon: string
  color_from: string
  color_to: string
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// NavigationItem Types
export interface NavigationItem {
  id: number
  label: string
  href: string
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// FooterLink Types
export interface FooterLink {
  id: number
  title: string
  url: string
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// SocialLink Types
export interface SocialLink {
  id: number
  platform: string
  url: string
  icon: string
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// ContactInfo Types
export interface ContactInfo {
  id: number
  type: string
  label: string
  value: string
  icon: string
  sort_order: number
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ContactPageHero {
  id: number
  badge_text: string
  title: string
  subtitle: string
  description: string
  background_image: string | null
  created_at: Date
  updated_at: Date
}

export interface ContactPageFeature {
  id: number
  icon: string
  title: string
  description: string
  sort_order: number
  is_active: boolean
  created_at: Date
  updated_at: Date
}
// Call-to-Action Section Types
export interface CTASection {
  title: string
  description: string
  primary_button_text: string
  primary_button_url: string
  secondary_button_text: string
  secondary_button_url: string
}

export interface CreatePartnerInput {
  name: string
  website: string
  description: string
  display_order: number
}

export interface UpdatePartnerInput {
  id: number
  name: string
  website: string | null
  description: string
  is_active: boolean
}
