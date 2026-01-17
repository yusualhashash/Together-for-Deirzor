-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  site_name VARCHAR(255) NOT NULL DEFAULT 'معاً لأجل دير الزور',
  site_tagline VARCHAR(500) NOT NULL DEFAULT 'نعمل معاً لبناء مستقبل أفضل',
  site_description TEXT NOT NULL DEFAULT 'منظمة إنسانية تعمل في مجالات متعددة لخدمة المجتمع',
  hero_title VARCHAR(255) NOT NULL DEFAULT 'معاً لأجل دير الزور',
  hero_subtitle VARCHAR(500) NOT NULL DEFAULT 'نعمل معاً لبناء مستقبل أفضل',
  hero_description TEXT NOT NULL DEFAULT 'منظمة إنسانية تعمل في مجالات متعددة لخدمة المجتمع',
  footer_about_title VARCHAR(255) NOT NULL DEFAULT 'معاً لأجل دير الزور',
  footer_about_description TEXT NOT NULL DEFAULT 'منظمة إنسانية تعمل لخدمة المجتمع',
  meta_description TEXT NOT NULL DEFAULT 'منظمة إنسانية سورية تعمل في مجالات التعليم والصحة والزراعة وحماية الطفل والتنمية المجتمعية لتحسين حياة المجتمعات في دير الزور',
  meta_keywords TEXT NOT NULL DEFAULT 'معاً لأجل دير الزور, منظمة إنسانية, سوريا, دير الزور, تعليم, صحة, زراعة, حماية الطفل, تنمية مجتمعية',
  og_title VARCHAR(255) NOT NULL DEFAULT 'معاً لأجل دير الزور - منظمة إنسانية سورية',
  og_description TEXT NOT NULL DEFAULT 'نعمل على تحسين حياة المجتمعات من خلال برامج متعددة في التعليم والصحة والتنمية',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default settings (only one row should exist)
INSERT INTO site_settings (
  site_name,
  site_tagline,
  site_description,
  hero_title,
  hero_subtitle,
  hero_description,
  footer_about_title,
  footer_about_description,
  meta_description,
  meta_keywords,
  og_title,
  og_description
) VALUES (
  'معاً لأجل دير الزور',
  'نعمل معاً لبناء مستقبل أفضل',
  'منظمة إنسانية تعمل في مجالات متعددة لخدمة المجتمع',
  'معاً لأجل دير الزور',
  'نعمل معاً لبناء مستقبل أفضل',
  'منظمة إنسانية تعمل في مجالات متعددة لخدمة المجتمع',
  'معاً لأجل دير الزور',
  'منظمة إنسانية تعمل لخدمة المجتمع',
  'منظمة إنسانية سورية تعمل في مجالات التعليم والصحة والزراعة وحماية الطفل والتنمية المجتمعية لتحسين حياة المجتمعات في دير الزور',
  'معاً لأجل دير الزور, منظمة إنسانية, سوريا, دير الزور, تعليم, صحة, زراعة, حماية الطفل, تنمية مجتمعية',
  'معاً لأجل دير الزور - منظمة إنسانية سورية',
  'نعمل على تحسين حياة المجتمعات من خلال برامج متعددة في التعليم والصحة والتنمية'
)
ON CONFLICT DO NOTHING;

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_site_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER site_settings_updated_at
BEFORE UPDATE ON site_settings
FOR EACH ROW
EXECUTE FUNCTION update_site_settings_updated_at();
