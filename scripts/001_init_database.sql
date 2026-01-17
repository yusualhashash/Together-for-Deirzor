-- Create all NGO database tables

-- Admin users table with plain password (no hashing)
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Site content for storing key-value settings
CREATE TABLE IF NOT EXISTS site_content (
  id SERIAL PRIMARY KEY,
  content_key VARCHAR(100) UNIQUE NOT NULL,
  content_value TEXT NOT NULL,
  content_type VARCHAR(50) DEFAULT 'text',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sectors/Activities table
CREATE TABLE IF NOT EXISTS sectors (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  sector_id INTEGER REFERENCES sectors(id) ON DELETE SET NULL,
  location VARCHAR(255),
  start_date DATE,
  end_date DATE,
  beneficiaries INTEGER,
  budget DECIMAL(15,2),
  status VARCHAR(50) DEFAULT 'active',
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Impact stories table
CREATE TABLE IF NOT EXISTS impact_stories (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  story TEXT NOT NULL,
  beneficiary_name VARCHAR(255),
  project_id INTEGER REFERENCES projects(id) ON DELETE SET NULL,
  image_url TEXT,
  video_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Partners table
CREATE TABLE IF NOT EXISTS partners (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  logo_url TEXT,
  website VARCHAR(500),
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Statistics table
CREATE TABLE IF NOT EXISTS statistics (
  id SERIAL PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  value VARCHAR(100) NOT NULL,
  icon VARCHAR(100),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact features table
CREATE TABLE IF NOT EXISTS contact_features (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(100) NOT NULL,
  color_from VARCHAR(50) NOT NULL,
  color_to VARCHAR(50) NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Adding navigation items table for header menu
CREATE TABLE IF NOT EXISTS navigation_items (
  id SERIAL PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  href VARCHAR(500) NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Adding footer links table for quick links section
CREATE TABLE IF NOT EXISTS footer_links (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(500) NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Adding social links table for social media icons
CREATE TABLE IF NOT EXISTS social_links (
  id SERIAL PRIMARY KEY,
  platform VARCHAR(100) NOT NULL,
  url VARCHAR(500) NOT NULL,
  icon VARCHAR(100) NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Adding contact info table for footer contact details
CREATE TABLE IF NOT EXISTS contact_info (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  label VARCHAR(255) NOT NULL,
  value VARCHAR(500) NOT NULL,
  icon VARCHAR(100) NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
