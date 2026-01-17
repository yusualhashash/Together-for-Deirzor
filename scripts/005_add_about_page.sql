-- Create about_page table to store all about page content
CREATE TABLE IF NOT EXISTS about_page (
  id SERIAL PRIMARY KEY,
  hero_title VARCHAR(255) NOT NULL,
  hero_subtitle VARCHAR(255) NOT NULL,
  hero_description TEXT NOT NULL,
  vision_title VARCHAR(255) NOT NULL DEFAULT 'رؤيتنا',
  vision_content TEXT NOT NULL,
  mission_title VARCHAR(255) NOT NULL DEFAULT 'رسالتنا',
  mission_content TEXT NOT NULL,
  values_section_title VARCHAR(255) NOT NULL DEFAULT 'قيمنا',
  values_section_subtitle VARCHAR(255) DEFAULT 'المبادئ التي نعمل بها',
  cta_title VARCHAR(255) NOT NULL DEFAULT 'انضم إلينا في رحلتنا',
  cta_description TEXT NOT NULL DEFAULT 'معاً نستطيع إحداث فرق حقيقي في حياة الناس',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create about_values table for storing individual values
CREATE TABLE IF NOT EXISTS about_values (
  id SERIAL PRIMARY KEY,
  value_text VARCHAR(255) NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default data for about page
INSERT INTO about_page (
  hero_title, 
  hero_subtitle, 
  hero_description, 
  vision_title,
  vision_content, 
  mission_title,
  mission_content,
  values_section_title,
  values_section_subtitle,
  cta_title,
  cta_description
) VALUES (
  'منظمة معاً لأجل دير الزور',
  'من نحن',
  'نعمل معاً لبناء مستقبل أفضل للمجتمع',
  'رؤيتنا',
  'مجتمع متمكن ومزدهر يعيش فيه الجميع بكرامة',
  'رسالتنا',
  'تقديم خدمات إنسانية شاملة تساهم في تحسين حياة المجتمعات',
  'قيمنا',
  'المبادئ التي نعمل بها',
  'انضم إلينا في رحلتنا',
  'معاً نستطيع إحداث فرق حقيقي في حياة الناس'
);

-- Insert default values
INSERT INTO about_values (value_text, display_order) VALUES
('الشفافية والمساءلة', 1),
('الاحترام والكرامة', 2),
('العدالة والمساواة', 3),
('الابتكار والاستدامة', 4),
('التعاون والشراكة', 5);

COMMIT;
