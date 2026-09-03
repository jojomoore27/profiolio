-- ==============================================================================
-- SUPABASE SEED DATA
-- High quality production-grade initial dataset
-- ==============================================================================

-- 1. Profile
INSERT INTO public.profiles (name, title, bio, email, phone, location, avatar_url, resume_url, is_available, availability_text, years_experience, completed_projects, happy_clients)
VALUES (
  'Jerry Vance',
  'Staff Full-Stack Architect & Digital Product Designer',
  'I engineer high-performance web systems, distributed architectures, and design-led digital products. With over 6 years of expertise across modern frontend ecosystems and cloud backends, I transform complex business challenges into seamless, intuitive software that scales effortlessly.',
  'jerry@vancecraft.io',
  '+1 (555) 389-2041',
  'San Francisco, CA (Open to Worldwide Remote)',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  '/resume.pdf',
  true,
  'Available for select freelance contracts & advisory roles',
  6,
  58,
  42
) ON CONFLICT DO NOTHING;

-- 2. Site Settings
INSERT INTO public.site_settings (site_name, logo_text, hero_title, hero_subtitle, contact_email, footer_text, primary_color, dark_mode_default, meta_title, meta_description, keywords, github_url, linkedin_url, twitter_url, instagram_url)
VALUES (
  'Jerry Vance Portfolio',
  'JERRY VANCE',
  'Building digital experiences that make an impact.',
  'I am a senior full-stack engineer and digital product architect focused on building high-performance, accessible, and scalable digital products.',
  'jerry@vancecraft.io',
  '© 2026 Jerry Vance. Crafted with precision, modern React architectures, and supersonic speed.',
  '#0284c7',
  true,
  'Jerry Vance — Staff Full-Stack Engineer & Product Designer',
  'Discover the portfolio of Jerry Vance: award-winning web platforms, fintech systems, and next-generation cloud architectures.',
  'Full Stack Developer, React, Node.js, Supabase, Cloud Architecture, Fintech, Portfolio',
  'https://github.com',
  'https://linkedin.com',
  'https://twitter.com',
  'https://instagram.com'
) ON CONFLICT DO NOTHING;

-- 3. Services
INSERT INTO public.services (title, description, icon, features, price, sort_order, is_active)
VALUES
(
  'Full-Stack Web Engineering',
  'End-to-end web application development using React, Next.js, Node.js, and PostgreSQL/Supabase. Architected for speed, modularity, and rapid growth.',
  'Code',
  '["Modern React & TypeScript Architecture", "Database Modeling & API Design", "High-throughput Realtime Systems", "End-to-End Testing & CI/CD Pipelines"]'::jsonb,
  'From $4,500 / Project',
  1,
  true
),
(
  'Digital Product & UI/UX Design',
  'Translating complex user journeys into clean, editorial interfaces. Focused on micro-interactions, responsive ergonomics, and conversion psychology.',
  'Layout',
  '["Design Systems & Component Tokens", "Interactive Prototypes in Figma", "Accessibility & WCAG 2.1 Compliance", "A/B Conversion Rate Optimization"]'::jsonb,
  'From $3,200 / Project',
  2,
  true
),
(
  'Cloud Architecture & Backend APIs',
  'Scalable serverless backends, relational databases, edge caching, and bulletproof authentication protocols designed for zero downtime.',
  'Server',
  '["PostgreSQL Optimization & RLS", "Serverless & Microservices APIs", "Redis Caching & Queue Workers", "Zero-Trust Security & Vault Management"]'::jsonb,
  'From $4,000 / Project',
  3,
  true
),
(
  'Performance Audits & Optimization',
  'Deep-dive analysis of Core Web Vitals, runtime memory leaks, database bottleneck queries, and network payloads to achieve sub-second response times.',
  'Zap',
  '["Core Web Vitals Remediation (LCP/CLS/INP)", "Database Query Tuning & Indexing", "Bundle Splitting & Lazy Loading", "Production Readiness Checklist"]'::jsonb,
  'From $1,800 / Audit',
  4,
  true
),
(
  'SaaS MVP Acceleration',
  'Turn your venture concept into an operational, paying SaaS product in weeks rather than quarters with bulletproof billing and auth primitives.',
  'Layers',
  '["Stripe / Paddle Subscription Workflows", "Multi-tenant Database Partitioning", "User Onboarding & Analytics Tracking", "Admin Portals & Metric Dashboards"]'::jsonb,
  'Custom Retainer',
  5,
  true
),
(
  'E-Commerce & Headless Platforms',
  'Bespoke e-commerce solutions combining blazing storefront speeds with seamless payment gateways and inventory sync pipelines.',
  'ShoppingBag',
  '["Headless Storefronts & Checkout Flows", "Inventory & Warehouse Webhooks", "Real-Time Stock Tracking", "Localized Multi-Currency Checkouts"]'::jsonb,
  'From $5,000 / Project',
  6,
  true
);

-- 4. Skills
INSERT INTO public.skills (name, category, proficiency, icon, sort_order)
VALUES
('React.js / Next.js', 'Frontend', 96, 'Atom', 1),
('TypeScript & Modern JS', 'Frontend', 94, 'FileCode', 2),
('Tailwind CSS & Design Tokens', 'Frontend', 92, 'Palette', 3),
('State Management & Hooks', 'Frontend', 90, 'Cpu', 4),
('Node.js & Express', 'Backend', 91, 'Server', 5),
('REST & GraphQL APIs', 'Backend', 89, 'Network', 6),
('Serverless Functions & Edge', 'Backend', 87, 'Cloud', 7),
('PostgreSQL & Supabase', 'Database', 93, 'Database', 8),
('Redis & Caching Layers', 'Database', 85, 'HardDrive', 9),
('Docker & Containerization', 'Tools & DevOps', 86, 'Box', 10),
('Git & GitHub Actions CI/CD', 'Tools & DevOps', 92, 'GitBranch', 11),
('Figma & UI Prototyping', 'Tools & DevOps', 88, 'Figma', 12);

-- 5. Projects
INSERT INTO public.projects (title, slug, short_description, description, category, client, year, role, duration, technologies, challenge, solution, results, live_url, github_url, image_url, gallery_images, is_featured, is_published, sort_order)
VALUES
(
  'Aura Financial Intelligence Platform',
  'aura-financial-intelligence',
  'Next-generation algorithmic portfolio management and real-time liquidity analytics for private wealth managers.',
  'Aura is a comprehensive financial intelligence dashboard engineered to handle high-frequency market streaming, complex asset allocation simulations, and bank-grade data compliance for multi-million dollar portfolios.',
  'Web Development',
  'Aura Capital Global',
  '2026',
  'Principal Full-Stack Architect',
  '4 Months',
  '["React", "Node.js", "Supabase", "PostgreSQL", "Tailwind CSS", "Recharts"]'::jsonb,
  'Processing millions of incoming ticker events while maintaining strict 60fps UI rendering and responsive drill-down analytics on client laptops and tablets.',
  'Architected a web-worker-powered canvas renderer paired with Supabase Realtime pub/sub subscriptions and PostgreSQL time-series aggregate buckets.',
  'Achieved 99.98% platform uptime, reduced client data load times by 74%, and secured an institutional award for FinTech UX of the Year.',
  'https://example.com/aura',
  'https://github.com/example/aura-platform',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
  true,
  true,
  1
),
(
  'Kinetix Multi-Brand Design System',
  'kinetix-design-system',
  'An open-source tokenized design language and component library powering 14 global consumer web applications.',
  'Kinetix provides an enterprise-ready UI foundation with cross-platform token synchronization, WCAG AAA accessibility compliance, and zero-runtime CSS-in-JS performance benchmarks.',
  'UI/UX',
  'Kinetix Tech Ecosystem',
  '2025',
  'Design Systems Lead',
  '3 Months',
  '["React", "Figma Tokens", "CSS Variables", "Storybook", "Jest"]'::jsonb,
  'Inconsistent visual styling and duplicate frontend engineering across five different product squads causing regression bugs and brand dilution.',
  'Created an atomic design system with 60+ headless primitives, automated token export pipelines from Figma, and strict dark/light high-contrast color modes.',
  'Cut new feature delivery cycles by 42% across teams and unified user accessibility ratings to a 99/100 Lighthouse score across all properties.',
  'https://example.com/kinetix',
  'https://github.com/example/kinetix-ui',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
  true,
  true,
  2
),
(
  'Veloce Autonomous Logistics Dashboard',
  'veloce-logistics-cloud',
  'IoT freight routing, carbon footprint tracking, and fleet telemetry portal handling 120,000 daily carrier shipments.',
  'Veloce enables international logistics dispatchers to monitor intermodal shipping lanes, predict weather-related port delays using machine learning pipelines, and optimize fuel efficiency.',
  'SaaS',
  'Veloce Global Freight',
  '2025',
  'Senior Full-Stack Consultant',
  '5 Months',
  '["React", "Node.js", "PostgreSQL", "Mapbox GL", "Supabase Storage"]'::jsonb,
  'Rendering dynamic vector tile maps with thousands of concurrent live vessel GPS coordinates without memory exhaustion.',
  'Implemented client-side spatial clustering using Mapbox GL and server-side spatial PostGIS queries with partitioned time-indexed data stores.',
  'Enabled automated turnaround routing that saved clients an estimated $2.3M in demurrage fees during peak holiday shipping season.',
  'https://example.com/veloce',
  'https://github.com/example/veloce-logistics',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
  true,
  true,
  3
),
(
  'Syllabus AI Classroom Companion',
  'syllabus-ai-companion',
  'Adaptive learning system integrating voice assistants and dynamic study curricula for higher education students.',
  'Syllabus analyzes lecture recordings and academic reading materials to produce interactive knowledge graphs, spaced-repetition flashcards, and live tutoring simulations.',
  'Mobile',
  'EdVantage Tech',
  '2024',
  'Lead Mobile & Web Engineer',
  '6 Months',
  '["React Native", "React", "Node.js", "PostgreSQL", "Tailwind CSS"]'::jsonb,
  'Delivering instantaneous streaming AI responses and personalized audio playback under low-bandwidth mobile environments.',
  'Constructed an intelligent offline-first SQLite synchronization engine with edge-cached audio generation and responsive progressive web app fallbacks.',
  'Adopted by 18 university campuses with an average student engagement rating of 4.9/5 stars over 250,000 active study sessions.',
  'https://example.com/syllabus',
  'https://github.com/example/syllabus-app',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
  false,
  true,
  4
),
(
  'Nordic Atelier Minimalist E-Commerce',
  'nordic-atelier-store',
  'High-end Scandinavian furniture boutique with augmented reality room previews and instantaneous global checkout.',
  'Nordic Atelier represents the pinnacle of minimal luxury commerce. Features sub-100ms page transitions, custom 3D model loaders, and automated currency conversion.',
  'E-commerce',
  'Nordic Living Copenhagen',
  '2024',
  'Frontend Architect',
  '2 Months',
  '["React", "Three.js", "Stripe Connect", "Supabase", "CSS Modules"]'::jsonb,
  'Showcasing high-fidelity 3D furniture models without bogging down mobile browser frame rates or battery life.',
  'Optimized GLTF models with progressive Level-of-Detail (LOD) loaders and hardware-accelerated WebGL shader shaders.',
  'Increased e-commerce conversion rates by 38% and reduced cart abandonment rates below 12%.',
  'https://example.com/nordic',
  'https://github.com/example/nordic-atelier',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
  false,
  true,
  5
),
(
  'Pulse Health Biometric Portal',
  'pulse-biometric-portal',
  'HIPAA-compliant patient telemetry and preventive health analytics portal connecting wearable sensor streams.',
  'Pulse aggregates heart rate variability, sleep stages, and continuous glucose monitoring data into actionable health scores reviewed by functional medicine physicians.',
  'Web Development',
  'Pulse Biosystems',
  '2023',
  'Senior Full-Stack Engineer',
  '4 Months',
  '["React", "Node.js", "PostgreSQL", "D3.js", "Supabase RLS"]'::jsonb,
  'Ensuring end-to-end cryptographic patient privacy while allowing real-time clinical anomaly alerts.',
  'Implemented Row-Level Security encryption schemes with dedicated audit logging and granular time-limited doctor access tokens.',
  'Certified for SOC2 Type II and HIPAA compliance with zero security incidents reported across 80,000 active patient monitoring days.',
  'https://example.com/pulse',
  'https://github.com/example/pulse-biometrics',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1000&q=80"]'::jsonb,
  false,
  true,
  6
);

-- 6. Experience
INSERT INTO public.experience (company, role, location, start_date, end_date, is_current, description, technologies, sort_order)
VALUES
(
  'Apex Systems Lab',
  'Principal Full-Stack Architect',
  'San Francisco, CA',
  '2024',
  'Present',
  true,
  'Leading technical architecture and developer experience for distributed web applications. Spearheaded the migration from legacy monolithic frontends to modern modular micro-frontends, reducing deployment build times by 65% and improving platform availability to four nines.',
  '["React", "TypeScript", "Node.js", "PostgreSQL", "Supabase", "Docker"]'::jsonb,
  1
),
(
  'Lumina Digital Studio',
  'Senior Software Engineer & Team Lead',
  'New York, NY (Remote)',
  '2022',
  '2024',
  false,
  'Architected scalable web applications and enterprise portals for Fortune 500 clients in fintech, digital media, and healthcare. Mentored 8 junior and mid-level engineers, established company-wide code review standards, and authored reusable UI design frameworks.',
  '["React", "Next.js", "Tailwind CSS", "REST APIs", "GraphQL", "Figma"]'::jsonb,
  2
),
(
  'Vanguard Media Group',
  'Full-Stack Developer',
  'Austin, TX',
  '2020',
  '2022',
  false,
  'Developed editorial content platforms and high-traffic reader portals handling over 4M monthly pageviews. Built automated SEO publishing pipelines and integrated dynamic payment subscription paywalls.',
  '["JavaScript", "React", "Node.js", "Express", "MySQL", "Redis"]'::jsonb,
  3
),
(
  'Origin Creative Agency',
  'Frontend UI Engineer',
  'Seattle, WA',
  '2018',
  '2020',
  false,
  'Created award-winning promotional campaign websites, interactive 3D web graphics, and high-conversion client landing pages with custom micro-animations and responsive typography.',
  '["HTML5", "CSS3", "JavaScript", "GSAP", "Webpack", "Git"]'::jsonb,
  4
);

-- 7. Blog Posts
INSERT INTO public.blog_posts (title, slug, excerpt, content, category, tags, featured_image, author, read_time, is_published)
VALUES
(
  'Architecting Modern Web Applications for Sub-Second Performance',
  'architecting-modern-web-applications',
  'A comprehensive breakdown of how modern browser rendering engines, edge caching, and atomic state design combine to deliver instantaneous user experiences.',
  '# The Evolution of Web Performance

In the contemporary digital landscape, millisecond latency translates directly into user engagement and revenue. As web applications grow in complexity, developers frequently encounter performance degradation caused by unoptimized bundle sizes, excessive DOM operations, and poorly structured data pipelines.

## 1. The Critical Rendering Path Reimagined
When a user requests a web page, the browser undergoes a meticulous sequence of phases: parsing HTML, constructing the DOM and CSSOM, computing layout geometries, and rasterizing pixels to the screen.

To optimize this path:
* **Eliminate Render-Blocking CSS**: Extract critical CSS tokens required for above-the-fold content and defer secondary stylesheets.
* **Component-Level Code Splitting**: Break your single-page application into logical route boundaries using dynamic imports (`React.lazy`).
* **Optimistic UI Updates**: Update the interface immediately upon user interaction while syncing with background Supabase mutations asynchronously.

## 2. Leveraging Edge Computing and Caching
By placing computation physically closer to users through edge workers, round-trip times (RTT) plummet from hundreds of milliseconds to under 20ms.

> Fast software is not just an engineering achievement; it is a fundamental pillar of respect for your users'' time.

## 3. Database Query Pruning
Always verify that your relational database queries leverage appropriate indexes and omit redundant columns. Utilizing Supabase Row Level Security (RLS) ensures that access authorization occurs natively within PostgreSQL rather than consuming CPU cycles in application code.

Conclusion: Prioritizing speed from Day 1 creates a compounding advantage that distinguishes world-class digital products from average templates.',
  'Engineering',
  '["Performance", "React", "Architecture", "Optimization"]'::jsonb,
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
  'Jerry Vance',
  '6 min read',
  true
),
(
  'Building Bulletproof CMS Workflows with Supabase & React',
  'building-bulletproof-cms-supabase-react',
  'Why pairing Supabase PostgreSQL with custom React component systems provides superior control and security compared to traditional headless CMS platforms.',
  '# Why Relational CMS Architectures Win

For years, developers were forced to choose between heavyweight legacy monoliths (WordPress, Drupal) and rigid, proprietary headless CMS subscriptions with unpredictable pricing tiers.

Today, pairing **Supabase PostgreSQL** with a tailored React frontend unlocks the ideal balance of developer velocity, rock-solid security, and total data sovereignty.

## Advantages of Native PostgreSQL CMS:
1. **Relational Integrity**: Projects, categories, team members, and testimonials link with real foreign keys and cascade deletions.
2. **Row Level Security (RLS)**: Define database-level authorization policies directly in SQL. Public readers can only query published posts, while administrators retain full CRUD capabilities.
3. **Real-time Subscriptions**: When an editor updates a post title or marks a project as published, connected public viewers see the changes instantly.
4. **Zero Vendor Lock-in**: Your content resides in standard SQL tables that can be exported or migrated with standard database dumps.

## Implementing Resilient Offline Fallbacks
When developing client applications, engineering a resilient data provider that gracefully switches between cloud Supabase endpoints and local persistent storage guarantees uninterrupted local development and resilient disaster recovery.',
  'Architecture',
  '["Supabase", "PostgreSQL", "React", "Security"]'::jsonb,
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  'Jerry Vance',
  '8 min read',
  true
),
(
  'Design Tokens: The Secret to Scalable Brand Cohesion',
  'design-tokens-scalable-brand-cohesion',
  'How to bridge the gap between design tools and codebases using standardized CSS custom properties and atomic design principles.',
  '# Bridging Design and Code

A design system is not merely a collection of UI buttons and color swatches; it is the shared vocabulary spoken by product designers, frontend engineers, and product managers.

## Defining the Hierarchy of Tokens
1. **Global (Primitive) Tokens**: Raw color hex codes, font families, and base spacing units (`--color-blue-500: #0284c7;`).
2. **Semantic (Alias) Tokens**: Context-specific roles (`--surface-primary`, `--text-muted`, `--border-focus`).
3. **Component Tokens**: Scoped exclusively to individual modules (`--button-height`, `--card-radius`).

When dark mode is introduced, semantic tokens switch their referenced values effortlessly without touching component source code.',
  'UI/UX Design',
  '["Design Systems", "CSS", "UI/UX", "Tokens"]'::jsonb,
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
  'Jerry Vance',
  '5 min read',
  true
),
(
  'Mastering State Management in Modern React 18+',
  'mastering-state-management-react-18',
  'Demystifying when to use local component state, URL query parameters, React Context, and external server-cache stores.',
  '# The State Management Conundrum

React state management has dramatically matured. Gone are the days when boilerplate-heavy Redux was mandated for even the simplest counter widget.

## The 4 Tiers of React State:
* **Local UI State**: Kept inside `useState` or `useReducer` for accordion toggles, dropdown open/close states, and modal visibility.
* **URL State**: The most underrated state store! Keeping search queries, active filter tabs, and pagination offsets in the URL allows users to bookmark and share exact views.
* **Global Context**: Ideal for theme modes (Dark/Light), active authenticated user sessions, and global toast notifications.
* **Server Cache**: Managing remote Supabase database queries with optimistic updates and caching.',
  'Development',
  '["React", "JavaScript", "State", "Hooks"]'::jsonb,
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
  'Jerry Vance',
  '7 min read',
  true
),
(
  'The Power of Editorial Typography on the Modern Web',
  'editorial-typography-modern-web',
  'How deliberate typeface pairing, fluid clamp scales, and vertical rhythm transform technical portfolios into captivating digital experiences.',
  '# Typography as the Visual Voice

Before a visitor reads a single sentence on your portfolio, their subconscious has already formed an impression based entirely on typeface choices, letter spacing, and line heights.

By pairing an editorial modern serif or bold modern sans-serif headline font (such as Outfit) with an ultra-legible geometric body font (Plus Jakarta Sans), you instantly signal sophistication and authority.',
  'Typography',
  '["Typography", "Design", "CSS", "Aesthetics"]'::jsonb,
  'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=1200&q=80',
  'Jerry Vance',
  '4 min read',
  true
),
(
  'Securing Client-Facing APIs and Preventing Data Breaches',
  'securing-client-facing-apis',
  'Essential defense strategies for frontend and backend engineers: CORS policies, rate limiting, RLS validation, and token sanitization.',
  '# Security Starts at the Architectural Core

A single leaked API credential or an improperly configured database endpoint can compromise years of reputation and user trust.

## Key Security Pillars:
1. **Never Trust the Client**: Client-side validation is purely for user experience. Always enforce schema constraints, field length maximums, and data sanitization at the database/API boundary.
2. **Row Level Security**: Ensure database policies enforce that write mutations require valid authenticated JWTs.
3. **Environment Separation**: Maintain strict separation between public anon keys and administrative service role keys.',
  'Security',
  '["Security", "APIs", "Database", "Best Practices"]'::jsonb,
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
  'Jerry Vance',
  '6 min read',
  true
);

-- 8. Sample Contact Messages
INSERT INTO public.contact_messages (name, email, subject, message, is_read)
VALUES
(
  'Eleanor Vance',
  'eleanor@meridiancreative.com',
  'Design System & Frontend Architecture Contract',
  'Hi Jerry! We came across your portfolio and were thoroughly impressed by the Aura financial intelligence case study. We are launching a new enterprise SaaS platform in Q4 and would love to discuss a 3-month consulting engagement. Are you available for a quick introductory video call next Tuesday?',
  false
),
(
  'Marcus Thorne',
  'marcus@thornelogistics.io',
  'Inquiry regarding Veloce logistics telemetry work',
  'Jerry, your work on real-time IoT vector mapping was exactly what our engineering team has been researching. We would appreciate the opportunity to discuss your availability for technical advisory sessions.',
  true
);
