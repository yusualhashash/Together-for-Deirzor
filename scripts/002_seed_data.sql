-- Insert admin user (username: admin, password: admin123)
INSERT INTO admin_users (username, password) VALUES ('admin', 'admin123');

-- Insert site settings as JSON
INSERT INTO site_content (content_key, content_value, content_type, display_order) VALUES
('site_settings', '{"site_name":"معاً لأجل دير الزور","site_name_en":"Together for Deir Ezzor","slogan":"نحو مستقبل أفضل","slogan_en":"Towards a Better Future","description":"منظمة إنسانية تعمل في مجالات متعددة لخدمة المجتمع","email":"info@together-dez.org","phone":"0123456789","address":"دير الزور، سوريا","facebook_url":"https://facebook.com","twitter_url":"https://twitter.com","instagram_url":"https://instagram.com","linkedin_url":"https://linkedin.com","youtube_url":"https://youtube.com","logo_url":null}', 'json', 1),
('home_hero', '{"title":"معاً لأجل دير الزور","subtitle":"نحو مستقبل أفضل","description":"منظمة إنسانية تعمل في مجالات التعليم، الصحة، الزراعة، حماية الطفل، والتنمية المجتمعية","cta_text":"تعرف على مشاريعنا","cta_link":"/projects","background_image":null}', 'json', 2),
-- Adding CTA section content
('cta_title', 'كن جزءاً من التغيير', 'text', 3),
('cta_description', 'انضم إلينا في رحلتنا لبناء مستقبل أفضل للمجتمع', 'text', 4),
('cta_primary_button_text', 'تواصل معنا الآن', 'text', 5),
('cta_primary_button_url', '/contact', 'text', 6),
('cta_secondary_button_text', 'استكشف مشاريعنا', 'text', 7),
('cta_secondary_button_url', '/projects', 'text', 8);

-- Insert sectors
INSERT INTO sectors (title, description, icon, display_order) VALUES
('التعليم', 'برامج تعليمية شاملة لتحسين جودة التعليم وتوفير الفرص التعليمية للجميع', 'BookOpen', 1),
('الصحة', 'خدمات صحية متكاملة وبرامج توعية صحية للمجتمع', 'Heart', 2),
('الزراعة', 'دعم المزارعين وتطوير القطاع الزراعي لتحقيق الأمن الغذائي', 'Sprout', 3),
('حماية الطفل', 'برامج لحماية الأطفال ورعايتهم وضمان حقوقهم', 'Baby', 4),
('التنمية المجتمعية', 'مشاريع تنموية لتحسين البنية التحتية وتمكين المجتمع', 'Users', 5);

-- Insert projects
INSERT INTO projects (title, description, sector_id, location, start_date, beneficiaries, status, is_featured, display_order) VALUES
('مشروع محو الأمية', 'برنامج تعليمي مكثف لمحو الأمية وتعليم القراءة والكتابة للكبار', 1, 'دير الزور', '2023-01-01', 500, 'active', true, 1),
('مدرسة الأمل', 'إنشاء وتشغيل مدرسة لتوفير التعليم الأساسي للأطفال', 1, 'دير الزور', '2022-09-01', 800, 'active', true, 2),
('مركز الرعاية الصحية', 'تقديم خدمات طبية مجانية للأسر المحتاجة', 2, 'دير الزور', '2023-03-01', 1000, 'active', true, 3),
('مشروع الحدائق المنزلية', 'تدريب العائلات على زراعة الخضروات في المنازل', 3, 'ريف دير الزور', '2023-06-01', 300, 'active', false, 4),
('مركز حماية الطفل', 'توفير بيئة آمنة للأطفال وأنشطة ترفيهية وتعليمية', 4, 'دير الزور', '2023-02-01', 400, 'active', true, 5),
('مشروع إعادة تأهيل البنية التحتية', 'إصلاح وتطوير البنية التحتية في المناطق المتضررة', 5, 'دير الزور', '2023-04-01', 2000, 'active', true, 6);

-- Insert impact stories
INSERT INTO impact_stories (title, story, beneficiary_name, project_id, is_featured, display_order) VALUES
('تغيير حياة أحمد', 'أحمد طفل بعمر 10 سنوات، كان محروماً من التعليم بسبب الظروف المادية. بعد انضمامه لمدرسة الأمل، أصبح من الطلاب المتفوقين ويحلم بأن يصبح طبيباً', 'أحمد محمد', 2, true, 1),
('شفاء فاطمة', 'فاطمة امرأة مسنة كانت تعاني من مرض مزمن ولم تتمكن من الحصول على العلاج. مركز الرعاية الصحية قدم لها العلاج المجاني وهي الآن بصحة جيدة', 'فاطمة أحمد', 3, true, 2),
('نجاح عائلة سالم', 'عائلة سالم استفادت من مشروع الحدائق المنزلية وأصبحت تزرع خضرواتها الخاصة، مما وفر لهم الكثير من المصاريف وحسن من نوعية غذائهم', 'عائلة سالم', 4, true, 3),
('أمل طفلة سعيدة', 'أمل طفلة عمرها 7 سنوات كانت تعاني من صعوبات نفسية. بعد انضمامها لمركز حماية الطفل، أصبحت أكثر سعادة وثقة بنفسها', 'أمل خالد', 5, true, 4);

-- Insert partners
INSERT INTO partners (name, website, description, display_order) VALUES
('الأمم المتحدة', 'https://un.org', 'شريك استراتيجي في العديد من المشاريع الإنسانية', 1),
('منظمة الصحة العالمية', 'https://who.int', 'دعم البرامج الصحية والتوعية', 2),
('اليونيسيف', 'https://unicef.org', 'شراكة في برامج حماية الطفل والتعليم', 3),
('برنامج الأغذية العالمي', 'https://wfp.org', 'دعم الأمن الغذائي والتغذية', 4),
('منظمة أطباء بلا حدود', 'https://msf.org', 'الشراكة في المشاريع الصحية', 5),
('الهلال الأحمر', 'https://redcrescent.org', 'التعاون في الإغاثة الطارئة والمساعدات', 6);

-- Insert statistics
INSERT INTO statistics (label, value, icon, display_order) VALUES
('المستفيدون', '+50,000', 'Users', 1),
('المشاريع المنفذة', '21', 'Briefcase', 2),
('المتطوعون', '150+', 'Heart', 3),
('المناطق المخدومة', '15', 'MapPin', 4),
('سنوات الخبرة', '8+', 'Calendar', 5),
('الشركاء', '25+', 'Handshake', 6);

-- Insert contact features
INSERT INTO contact_features (title, description, icon, color_from, color_to, display_order) VALUES
('واتساب', 'تواصل معنا مباشرةً عبر واتساب للحصول على خدمة فورية', 'MessageCircle', 'emerald-500', 'green-600', 1),
('موقعنا', 'يمكنك زيارتنا في مكتبنا أو التواصل معنا عبر الإنترنت', 'MapPin', 'blue-500', 'cyan-600', 2),
('رد سريع', 'نضمن لك الرد على استفساراتك في أسرع وقت ممكن', 'Send', 'purple-500', 'pink-600', 3),
('دعم 24/7', 'فريق الدعم الفني متاح على مدار الساعة لمساعدتك', 'Headphones', 'orange-500', 'red-600', 4);

-- Insert social media links
INSERT INTO social_links (platform, url, icon, display_order) VALUES
('Facebook', 'https://facebook.com', 'Facebook', 1),
('Twitter', 'https://twitter.com', 'Twitter', 2),
('Instagram', 'https://instagram.com', 'Instagram', 3),
('WhatsApp', 'https://wa.me/0123456789', 'MessageCircle', 4),
('TikTok', 'https://tiktok.com', 'TikTok', 5);

-- Insert contact information
INSERT INTO contact_info (type, label, value, icon, display_order) VALUES
('phone', 'رقم الهاتف', '0123456789', 'Phone', 1),
('whatsapp', 'واتساب', '0123456789', 'MessageCircle', 2),
('email', 'البريد الإلكتروني', 'info@together-dez.org', 'Mail', 3);

-- Insert footer quick links
INSERT INTO footer_links (title, url, display_order) VALUES
('الرئيسية', '/', 1),
('الباقات', '/packages', 2),
('التغطية', '/coverage', 3),
('من نحن', '/about', 4),
('تواصل معنا', '/contact', 5);
