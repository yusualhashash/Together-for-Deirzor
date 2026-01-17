-- Create social_links table if not exists
CREATE TABLE IF NOT EXISTS social_links (
  id SERIAL PRIMARY KEY,
  platform VARCHAR(100) NOT NULL,
  url TEXT NOT NULL,
  icon VARCHAR(100) NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default social links
INSERT INTO social_links (platform, url, icon, display_order, is_active)
VALUES 
  ('Facebook', 'https://facebook.com', 'facebook', 1, true),
  ('Twitter', 'https://twitter.com', 'twitter', 2, true),
  ('Instagram', 'https://instagram.com', 'instagram', 3, true),
  ('WhatsApp', 'https://wa.me/963', 'whatsapp', 4, true)
ON CONFLICT DO NOTHING;
