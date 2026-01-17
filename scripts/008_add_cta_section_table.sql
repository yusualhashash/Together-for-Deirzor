-- Create CTA section table
CREATE TABLE IF NOT EXISTS cta_section (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL DEFAULT 'كن جزءاً من التغيير',
  description TEXT NOT NULL DEFAULT 'انضم إلينا في رحلتنا لبناء مستقبل أفضل للمجتمع',
  primary_button_text TEXT NOT NULL DEFAULT 'تواصل معنا الآن',
  primary_button_url TEXT NOT NULL DEFAULT '/contact',
  secondary_button_text TEXT NOT NULL DEFAULT 'استكشف مشاريعنا',
  secondary_button_url TEXT NOT NULL DEFAULT '/projects',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default CTA data
INSERT INTO cta_section (title, description, primary_button_text, primary_button_url, secondary_button_text, secondary_button_url)
VALUES (
  'كن جزءاً من التغيير',
  'انضم إلينا في رحلتنا لبناء مستقبل أفضل للمجتمع',
  'تواصل معنا الآن',
  '/contact',
  'استكشف مشاريعنا',
  '/projects'
)
ON CONFLICT DO NOTHING;
