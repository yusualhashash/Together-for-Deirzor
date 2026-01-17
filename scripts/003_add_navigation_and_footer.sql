-- Create navigation_items table for header menu
CREATE TABLE IF NOT EXISTS navigation_items (
  id SERIAL PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  href VARCHAR(255) NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create footer_links table for footer quick links
CREATE TABLE IF NOT EXISTS footer_links (
  id SERIAL PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  href VARCHAR(255) NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default navigation items
INSERT INTO navigation_items (label, href, display_order) VALUES
('الرئيسية', '/', 1),
('من نحن', '/about', 2),
('الأنشطة', '/activities', 3),
('المشاريع', '/projects', 4),
('التأثير', '/impact', 5),
('تواصل معنا', '/contact', 6);

-- Insert default footer links
INSERT INTO footer_links (label, href, display_order) VALUES
('الرئيسية', '/', 1),
('من نحن', '/about', 2),
('الأنشطة', '/activities', 3),
('المشاريع', '/projects', 4),
('التأثير', '/impact', 5),
('تواصل معنا', '/contact', 6);
