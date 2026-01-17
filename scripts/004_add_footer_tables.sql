-- Add social links and contact info tables for footer

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

CREATE TABLE IF NOT EXISTS contact_info (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  label VARCHAR(255) NOT NULL,
  value TEXT NOT NULL,
  icon VARCHAR(100) NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO social_links (platform, url, icon, display_order) VALUES
('TikTok', 'https://tiktok.com/@yourorg', 'tiktok', 1),
('WhatsApp', 'https://wa.me/963123456789', 'message-circle', 2),
('Twitter', 'https://twitter.com/yourorg', 'twitter', 3),
('Instagram', 'https://instagram.com/yourorg', 'instagram', 4),
('Facebook', 'https://facebook.com/yourorg', 'facebook', 5);

INSERT INTO contact_info (type, label, value, icon, display_order) VALUES
('phone', 'رقم الهاتف', '5156 173 775 964+', 'phone', 1),
('whatsapp', 'واتساب', '5156 173 775 964+', 'message-circle', 2),
('email', 'البريد الإلكتروني', 'info@rashdwifi.com', 'mail', 3);
