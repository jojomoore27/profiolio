-- ==============================================================================
-- SUPABASE POSTGRESQL DATABASE SCHEMA
-- Modern Professional Portfolio & Business CMS
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Jerry Doe',
  title TEXT NOT NULL DEFAULT 'Senior Full-Stack Engineer & Product Designer',
  bio TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT DEFAULT 'San Francisco, CA / Remote',
  avatar_url TEXT,
  resume_url TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  availability_text TEXT DEFAULT 'Available for freelance projects & contracts',
  years_experience INT DEFAULT 6,
  completed_projects INT DEFAULT 54,
  happy_clients INT DEFAULT 38,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_name TEXT NOT NULL DEFAULT 'Jerry.dev',
  logo_text TEXT NOT NULL DEFAULT 'JERRY',
  hero_title TEXT NOT NULL DEFAULT 'Building digital experiences that make an impact.',
  hero_subtitle TEXT NOT NULL DEFAULT 'I am a senior full-stack developer and digital product architect focused on building high-performance, accessible, and scalable digital products.',
  contact_email TEXT NOT NULL DEFAULT 'hello@jerrydev.io',
  footer_text TEXT DEFAULT 'Crafted with precision, passion, and modern engineering standards.',
  primary_color TEXT DEFAULT '#38bdf8',
  dark_mode_default BOOLEAN DEFAULT TRUE,
  meta_title TEXT DEFAULT 'Jerry — Senior Full-Stack Engineer & Product Designer',
  meta_description TEXT DEFAULT 'Award-worthy digital experiences, scalable cloud systems, and modern web architectures.',
  keywords TEXT DEFAULT 'Full Stack Developer, React, Node.js, Supabase, Cloud Architecture, Portfolio',
  github_url TEXT DEFAULT 'https://github.com',
  linkedin_url TEXT DEFAULT 'https://linkedin.com',
  twitter_url TEXT DEFAULT 'https://twitter.com',
  instagram_url TEXT DEFAULT 'https://instagram.com',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Web Development',
  client TEXT,
  year TEXT DEFAULT '2026',
  role TEXT DEFAULT 'Lead Developer & Architect',
  duration TEXT DEFAULT '3 Months',
  technologies JSONB DEFAULT '[]'::jsonb,
  challenge TEXT,
  solution TEXT,
  results TEXT,
  live_url TEXT,
  github_url TEXT,
  image_url TEXT NOT NULL,
  gallery_images JSONB DEFAULT '[]'::jsonb,
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Services Table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Code',
  features JSONB DEFAULT '[]'::jsonb,
  price TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'Frontend', 'Backend', 'Database', 'Tools & DevOps'
  proficiency INT NOT NULL CHECK (proficiency BETWEEN 0 AND 100),
  icon TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Experience Table
CREATE TABLE IF NOT EXISTS public.experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  location TEXT,
  start_date TEXT NOT NULL,
  end_date TEXT DEFAULT 'Present',
  is_current BOOLEAN DEFAULT FALSE,
  description TEXT NOT NULL,
  technologies JSONB DEFAULT '[]'::jsonb,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Blog Posts Table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Engineering',
  tags JSONB DEFAULT '[]'::jsonb,
  featured_image TEXT NOT NULL,
  author TEXT DEFAULT 'Jerry',
  read_time TEXT DEFAULT '5 min read',
  is_published BOOLEAN DEFAULT TRUE,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Contact Messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 1. Profiles: Public Read, Auth Admin Full CRUD
CREATE POLICY "Public profiles can be viewed by anyone" 
  ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Admins can manage profiles" 
  ON public.profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 2. Site Settings: Public Read, Auth Admin Full CRUD
CREATE POLICY "Public settings can be viewed by anyone" 
  ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage site settings" 
  ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 3. Projects: Public Read published, Auth Admin Full CRUD
CREATE POLICY "Public can view published projects" 
  ON public.projects FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage all projects" 
  ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4. Services: Public Read active, Auth Admin Full CRUD
CREATE POLICY "Public can view active services" 
  ON public.services FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage services" 
  ON public.services FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 5. Skills: Public Read, Auth Admin Full CRUD
CREATE POLICY "Public can view skills" 
  ON public.skills FOR SELECT USING (true);
CREATE POLICY "Admins can manage skills" 
  ON public.skills FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 6. Experience: Public Read, Auth Admin Full CRUD
CREATE POLICY "Public can view experience" 
  ON public.experience FOR SELECT USING (true);
CREATE POLICY "Admins can manage experience" 
  ON public.experience FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 7. Blog Posts: Public Read published, Auth Admin Full CRUD
CREATE POLICY "Public can view published blog posts" 
  ON public.blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage all blog posts" 
  ON public.blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 8. Contact Messages: Anyone can insert, Only Admins can view & manage
CREATE POLICY "Anyone can submit a contact message" 
  ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Only authenticated admins can view and manage messages" 
  ON public.contact_messages FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ==============================================================================
-- STORAGE BUCKET CONFIGURATION
-- ==============================================================================
-- Insert storage bucket for portfolio assets if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Public access to download/view assets
CREATE POLICY "Public can view portfolio assets"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-assets');

-- Authenticated users can upload/manage assets
CREATE POLICY "Admins can upload portfolio assets"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'portfolio-assets');

CREATE POLICY "Admins can update portfolio assets"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'portfolio-assets');

CREATE POLICY "Admins can delete portfolio assets"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'portfolio-assets');
