export const initialProfile = {
  id: 'profile-1',
  name: 'Jerry Vance',
  title: 'Staff Full-Stack Architect & Product Designer',
  bio: 'I engineer high-performance web systems, distributed architectures, and design-led digital products. With over 6 years of expertise across modern frontend ecosystems and cloud backends, I transform complex business challenges into seamless, intuitive software that scales effortlessly.',
  email: 'jerry@vancecraft.io',
  phone: '+1 (555) 389-2041',
  location: 'San Francisco, CA (Open to Remote)',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  resume_url: '/resume.pdf',
  is_available: true,
  availability_text: 'Available for freelance projects & advisory roles',
  years_experience: 6,
  completed_projects: 58,
  happy_clients: 42
};

export const initialSettings = {
  id: 'settings-1',
  site_name: 'Jerry Vance Portfolio',
  logo_text: 'JERRY VANCE',
  hero_title: 'Building digital experiences that make an impact.',
  hero_subtitle: 'I am a senior full-stack developer and digital product architect focused on building high-performance, accessible, and scalable digital products.',
  contact_email: 'jerry@vancecraft.io',
  footer_text: '© 2026 Jerry Vance. Crafted with precision, modern React architectures, and supersonic speed.',
  primary_color: '#38bdf8',
  dark_mode_default: true,
  meta_title: 'Jerry Vance — Senior Full-Stack Engineer & Product Designer',
  meta_description: 'Discover the portfolio of Jerry Vance: award-winning web platforms, fintech systems, and next-generation cloud architectures.',
  keywords: 'Full Stack Developer, React, Node.js, Supabase, Cloud Architecture, Fintech, Portfolio',
  github_url: 'https://github.com',
  linkedin_url: 'https://linkedin.com',
  twitter_url: 'https://twitter.com',
  instagram_url: 'https://instagram.com'
};

export const initialProjects = [
  {
    id: 'proj-1',
    title: 'Aura Financial Intelligence Platform',
    slug: 'aura-financial-intelligence',
    short_description: 'Algorithmic portfolio management and real-time liquidity analytics for private wealth managers.',
    description: 'Aura is a comprehensive financial intelligence dashboard engineered to handle high-frequency market streaming, complex asset allocation simulations, and bank-grade data compliance for multi-million dollar portfolios.',
    category: 'Web Development',
    client: 'Aura Capital Global',
    year: '2026',
    role: 'Principal Full-Stack Architect',
    duration: '4 Months',
    technologies: ['React', 'Node.js', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Recharts'],
    challenge: 'Processing millions of incoming ticker events while maintaining strict 60fps UI rendering and responsive drill-down analytics on client laptops and tablets.',
    solution: 'Architected a web-worker-powered canvas renderer paired with Supabase Realtime pub/sub subscriptions and PostgreSQL time-series aggregate buckets.',
    results: 'Achieved 99.98% platform uptime, reduced client data load times by 74%, and secured an institutional award for FinTech UX of the Year.',
    live_url: 'https://example.com/aura',
    github_url: 'https://github.com/example/aura-platform',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1000&q=80'
    ],
    is_featured: true,
    is_published: true,
    sort_order: 1
  },
  {
    id: 'proj-2',
    title: 'Kinetix Multi-Brand Design System',
    slug: 'kinetix-design-system',
    short_description: 'An open-source tokenized design language and component library powering 14 global consumer web applications.',
    description: 'Kinetix provides an enterprise-ready UI foundation with cross-platform token synchronization, WCAG AAA accessibility compliance, and zero-runtime CSS-in-JS performance benchmarks.',
    category: 'UI/UX',
    client: 'Kinetix Tech Ecosystem',
    year: '2025',
    role: 'Design Systems Lead',
    duration: '3 Months',
    technologies: ['React', 'Figma Tokens', 'CSS Variables', 'Storybook', 'Jest'],
    challenge: 'Inconsistent visual styling and duplicate frontend engineering across five different product squads causing regression bugs and brand dilution.',
    solution: 'Created an atomic design system with 60+ headless primitives, automated token export pipelines from Figma, and strict dark/light high-contrast color modes.',
    results: 'Cut new feature delivery cycles by 42% across teams and unified user accessibility ratings to a 99/100 Lighthouse score across all properties.',
    live_url: 'https://example.com/kinetix',
    github_url: 'https://github.com/example/kinetix-ui',
    image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1000&q=80'
    ],
    is_featured: true,
    is_published: true,
    sort_order: 2
  },
  {
    id: 'proj-3',
    title: 'Veloce Autonomous Logistics Dashboard',
    slug: 'veloce-logistics-cloud',
    short_description: 'IoT freight routing, carbon footprint tracking, and fleet telemetry portal handling 120,000 daily carrier shipments.',
    description: 'Veloce enables international logistics dispatchers to monitor intermodal shipping lanes, predict weather-related port delays using machine learning pipelines, and optimize fuel efficiency.',
    category: 'SaaS',
    client: 'Veloce Global Freight',
    year: '2025',
    role: 'Senior Full-Stack Consultant',
    duration: '5 Months',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Mapbox GL', 'Supabase Storage'],
    challenge: 'Rendering dynamic vector tile maps with thousands of concurrent live vessel GPS coordinates without memory exhaustion.',
    solution: 'Implemented client-side spatial clustering using Mapbox GL and server-side spatial PostGIS queries with partitioned time-indexed data stores.',
    results: 'Enabled automated turnaround routing that saved clients an estimated $2.3M in demurrage fees during peak holiday shipping season.',
    live_url: 'https://example.com/veloce',
    github_url: 'https://github.com/example/veloce-logistics',
    image_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1000&q=80'
    ],
    is_featured: true,
    is_published: true,
    sort_order: 3
  },
  {
    id: 'proj-4',
    title: 'Syllabus AI Classroom Companion',
    slug: 'syllabus-ai-companion',
    short_description: 'Adaptive learning system integrating voice assistants and dynamic study curricula for university students.',
    description: 'Syllabus analyzes lecture recordings and academic reading materials to produce interactive knowledge graphs, spaced-repetition flashcards, and live tutoring simulations.',
    category: 'Mobile',
    client: 'EdVantage Tech',
    year: '2024',
    role: 'Lead Mobile & Web Engineer',
    duration: '6 Months',
    technologies: ['React Native', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    challenge: 'Delivering instantaneous streaming AI responses and personalized audio playback under low-bandwidth mobile environments.',
    solution: 'Constructed an intelligent offline-first SQLite synchronization engine with edge-cached audio generation and responsive progressive web app fallbacks.',
    results: 'Adopted by 18 university campuses with an average student engagement rating of 4.9/5 stars over 250,000 active study sessions.',
    live_url: 'https://example.com/syllabus',
    github_url: 'https://github.com/example/syllabus-app',
    image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80'
    ],
    is_featured: false,
    is_published: true,
    sort_order: 4
  },
  {
    id: 'proj-5',
    title: 'Nordic Atelier Minimalist E-Commerce',
    slug: 'nordic-atelier-store',
    short_description: 'High-end Scandinavian furniture boutique with augmented reality room previews and instantaneous global checkout.',
    description: 'Nordic Atelier represents the pinnacle of minimal luxury commerce. Features sub-100ms page transitions, custom 3D model loaders, and automated currency conversion.',
    category: 'E-commerce',
    client: 'Nordic Living Copenhagen',
    year: '2024',
    role: 'Frontend Architect',
    duration: '2 Months',
    technologies: ['React', 'Three.js', 'Stripe Connect', 'Supabase', 'CSS Modules'],
    challenge: 'Showcasing high-fidelity 3D furniture models without bogging down mobile browser frame rates or battery life.',
    solution: 'Optimized GLTF models with progressive Level-of-Detail (LOD) loaders and hardware-accelerated WebGL shaders.',
    results: 'Increased e-commerce conversion rates by 38% and reduced cart abandonment rates below 12%.',
    live_url: 'https://example.com/nordic',
    github_url: 'https://github.com/example/nordic-atelier',
    image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80'
    ],
    is_featured: false,
    is_published: true,
    sort_order: 5
  },
  {
    id: 'proj-6',
    title: 'Pulse Health Biometric Portal',
    slug: 'pulse-biometric-portal',
    short_description: 'HIPAA-compliant patient telemetry and preventive health analytics portal connecting wearable sensor streams.',
    description: 'Pulse aggregates heart rate variability, sleep stages, and continuous glucose monitoring data into actionable health scores reviewed by functional medicine physicians.',
    category: 'Web Development',
    client: 'Pulse Biosystems',
    year: '2023',
    role: 'Senior Full-Stack Engineer',
    duration: '4 Months',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'D3.js', 'Supabase RLS'],
    challenge: 'Ensuring end-to-end cryptographic patient privacy while allowing real-time clinical anomaly alerts.',
    solution: 'Implemented Row-Level Security encryption schemes with dedicated audit logging and granular time-limited doctor access tokens.',
    results: 'Certified for SOC2 Type II and HIPAA compliance with zero security incidents reported across 80,000 active patient monitoring days.',
    live_url: 'https://example.com/pulse',
    github_url: 'https://github.com/example/pulse-biometrics',
    image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1000&q=80'
    ],
    is_featured: false,
    is_published: true,
    sort_order: 6
  }
];

export const initialServices = [
  {
    id: 'serv-1',
    title: 'Full-Stack Web Engineering',
    description: 'End-to-end web application development using React, Next.js, Node.js, and PostgreSQL/Supabase. Architected for speed, modularity, and rapid growth.',
    icon: 'Code',
    features: ['Modern React & TypeScript Architecture', 'Database Modeling & API Design', 'High-throughput Realtime Systems', 'End-to-End Testing & CI/CD Pipelines'],
    price: 'From $4,500 / Project',
    sort_order: 1,
    is_active: true
  },
  {
    id: 'serv-2',
    title: 'Digital Product & UI/UX Design',
    description: 'Translating complex user journeys into clean, editorial interfaces. Focused on micro-interactions, responsive ergonomics, and conversion psychology.',
    icon: 'Layout',
    features: ['Design Systems & Component Tokens', 'Interactive Prototypes in Figma', 'Accessibility & WCAG 2.1 Compliance', 'A/B Conversion Rate Optimization'],
    price: 'From $3,200 / Project',
    sort_order: 2,
    is_active: true
  },
  {
    id: 'serv-3',
    title: 'Cloud Architecture & Backend APIs',
    description: 'Scalable serverless backends, relational databases, edge caching, and bulletproof authentication protocols designed for zero downtime.',
    icon: 'Server',
    features: ['PostgreSQL Optimization & RLS', 'Serverless & Microservices APIs', 'Redis Caching & Queue Workers', 'Zero-Trust Security & Vault Management'],
    price: 'From $4,000 / Project',
    sort_order: 3,
    is_active: true
  },
  {
    id: 'serv-4',
    title: 'Performance Audits & Optimization',
    description: 'Deep-dive analysis of Core Web Vitals, runtime memory leaks, database bottleneck queries, and network payloads to achieve sub-second response times.',
    icon: 'Zap',
    features: ['Core Web Vitals Remediation (LCP/CLS/INP)', 'Database Query Tuning & Indexing', 'Bundle Splitting & Lazy Loading', 'Production Readiness Checklist'],
    price: 'From $1,800 / Audit',
    sort_order: 4,
    is_active: true
  },
  {
    id: 'serv-5',
    title: 'SaaS MVP Acceleration',
    description: 'Turn your venture concept into an operational, paying SaaS product in weeks rather than quarters with bulletproof billing and auth primitives.',
    icon: 'Layers',
    features: ['Stripe / Paddle Subscription Workflows', 'Multi-tenant Database Partitioning', 'User Onboarding & Analytics Tracking', 'Admin Portals & Metric Dashboards'],
    price: 'Custom Retainer',
    sort_order: 5,
    is_active: true
  },
  {
    id: 'serv-6',
    title: 'E-Commerce & Headless Platforms',
    description: 'Bespoke e-commerce solutions combining blazing storefront speeds with seamless payment gateways and inventory sync pipelines.',
    icon: 'ShoppingBag',
    features: ['Headless Storefronts & Checkout Flows', 'Inventory & Warehouse Webhooks', 'Real-Time Stock Tracking', 'Localized Multi-Currency Checkouts'],
    price: 'From $5,000 / Project',
    sort_order: 6,
    is_active: true
  }
];

export const initialSkills = [
  { id: 'skill-1', name: 'React.js / Next.js', category: 'Frontend', proficiency: 96, icon: 'Atom', sort_order: 1 },
  { id: 'skill-2', name: 'TypeScript & Modern JS', category: 'Frontend', proficiency: 94, icon: 'FileCode', sort_order: 2 },
  { id: 'skill-3', name: 'Tailwind CSS & Design Tokens', category: 'Frontend', proficiency: 92, icon: 'Palette', sort_order: 3 },
  { id: 'skill-4', name: 'State Management & React Hooks', category: 'Frontend', proficiency: 90, icon: 'Cpu', sort_order: 4 },
  { id: 'skill-5', name: 'Node.js & Express', category: 'Backend', proficiency: 91, icon: 'Server', sort_order: 5 },
  { id: 'skill-6', name: 'REST & GraphQL APIs', category: 'Backend', proficiency: 89, icon: 'Network', sort_order: 6 },
  { id: 'skill-7', name: 'Serverless Functions & Edge', category: 'Backend', proficiency: 87, icon: 'Cloud', sort_order: 7 },
  { id: 'skill-8', name: 'PostgreSQL & Supabase', category: 'Database', proficiency: 93, icon: 'Database', sort_order: 8 },
  { id: 'skill-9', name: 'Redis & In-Memory Caching', category: 'Database', proficiency: 85, icon: 'HardDrive', sort_order: 9 },
  { id: 'skill-10', name: 'Docker & Containerization', category: 'Tools & DevOps', proficiency: 86, icon: 'Box', sort_order: 10 },
  { id: 'skill-11', name: 'Git & GitHub Actions CI/CD', category: 'Tools & DevOps', proficiency: 92, icon: 'GitBranch', sort_order: 11 },
  { id: 'skill-12', name: 'Figma & UI Prototyping', category: 'Tools & DevOps', proficiency: 88, icon: 'Figma', sort_order: 12 }
];

export const initialExperience = [
  {
    id: 'exp-1',
    company: 'Apex Systems Lab',
    role: 'Principal Full-Stack Architect',
    location: 'San Francisco, CA',
    start_date: '2024',
    end_date: 'Present',
    is_current: true,
    description: 'Leading technical architecture and developer experience for distributed web applications. Spearheaded the migration from legacy monolithic frontends to modern modular micro-frontends, reducing deployment build times by 65% and improving platform availability to four nines.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Supabase', 'Docker'],
    sort_order: 1
  },
  {
    id: 'exp-2',
    company: 'Lumina Digital Studio',
    role: 'Senior Software Engineer & Team Lead',
    location: 'New York, NY (Remote)',
    start_date: '2022',
    end_date: '2024',
    is_current: false,
    description: 'Architected scalable web applications and enterprise portals for Fortune 500 clients in fintech, digital media, and healthcare. Mentored 8 junior and mid-level engineers, established company-wide code review standards, and authored reusable UI design frameworks.',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'REST APIs', 'GraphQL', 'Figma'],
    sort_order: 2
  },
  {
    id: 'exp-3',
    company: 'Vanguard Media Group',
    role: 'Full-Stack Developer',
    location: 'Austin, TX',
    start_date: '2020',
    end_date: '2022',
    is_current: false,
    description: 'Developed editorial content platforms and high-traffic reader portals handling over 4M monthly pageviews. Built automated SEO publishing pipelines and integrated dynamic payment subscription paywalls.',
    technologies: ['JavaScript', 'React', 'Node.js', 'Express', 'MySQL', 'Redis'],
    sort_order: 3
  },
  {
    id: 'exp-4',
    company: 'Origin Creative Agency',
    role: 'Frontend UI Engineer',
    location: 'Seattle, WA',
    start_date: '2018',
    end_date: '2020',
    is_current: false,
    description: 'Created award-winning promotional campaign websites, interactive 3D web graphics, and high-conversion client landing pages with custom micro-animations and responsive typography.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'Webpack', 'Git'],
    sort_order: 4
  }
];

export const initialBlogPosts = [
  {
    id: 'blog-1',
    title: 'Architecting Modern Web Applications for Sub-Second Performance',
    slug: 'architecting-modern-web-applications',
    excerpt: 'A comprehensive breakdown of how modern browser rendering engines, edge caching, and atomic state design combine to deliver instantaneous user experiences.',
    content: `## The Evolution of Web Performance

In the contemporary digital landscape, millisecond latency translates directly into user engagement and revenue. As web applications grow in complexity, developers frequently encounter performance degradation caused by unoptimized bundle sizes, excessive DOM operations, and poorly structured data pipelines.

### 1. The Critical Rendering Path Reimagined
When a user requests a web page, the browser undergoes a meticulous sequence of phases: parsing HTML, constructing the DOM and CSSOM, computing layout geometries, and rasterizing pixels to the screen.

To optimize this path:
* **Eliminate Render-Blocking CSS**: Extract critical CSS tokens required for above-the-fold content and defer secondary stylesheets.
* **Component-Level Code Splitting**: Break your single-page application into logical route boundaries using dynamic imports (\`React.lazy\`).
* **Optimistic UI Updates**: Update the interface immediately upon user interaction while syncing with background Supabase mutations asynchronously.

### 2. Leveraging Edge Computing and Caching
By placing computation physically closer to users through edge workers, round-trip times (RTT) plummet from hundreds of milliseconds to under 20ms.

> "Fast software is not just an engineering achievement; it is a fundamental pillar of respect for your users' time."

### 3. Database Query Pruning
Always verify that your relational database queries leverage appropriate indexes and omit redundant columns. Utilizing Supabase Row Level Security (RLS) ensures that access authorization occurs natively within PostgreSQL rather than consuming CPU cycles in application code.

**Conclusion**: Prioritizing speed from Day 1 creates a compounding advantage that distinguishes world-class digital products from average templates.`,
    category: 'Engineering',
    tags: ['Performance', 'React', 'Architecture', 'Optimization'],
    featured_image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    author: 'Jerry Vance',
    read_time: '6 min read',
    is_published: true,
    published_at: '2026-08-15'
  },
  {
    id: 'blog-2',
    title: 'Building Bulletproof CMS Workflows with Supabase & React',
    slug: 'building-bulletproof-cms-supabase-react',
    excerpt: 'Why pairing Supabase PostgreSQL with custom React component systems provides superior control and security compared to traditional headless CMS platforms.',
    content: `## Why Relational CMS Architectures Win

For years, developers were forced to choose between heavyweight legacy monoliths (WordPress, Drupal) and rigid, proprietary headless CMS subscriptions with unpredictable pricing tiers.

Today, pairing **Supabase PostgreSQL** with a tailored React frontend unlocks the ideal balance of developer velocity, rock-solid security, and total data sovereignty.

### Key Architectural Advantages:
1. **Relational Integrity**: Projects, categories, team members, and testimonials link with real foreign keys and cascade deletions.
2. **Row Level Security (RLS)**: Define database-level authorization policies directly in SQL. Public readers can only query published posts, while administrators retain full CRUD capabilities.
3. **Real-time Subscriptions**: When an editor updates a post title or marks a project as published, connected public viewers see the changes instantly.
4. **Zero Vendor Lock-in**: Your content resides in standard SQL tables that can be exported or migrated with standard database dumps.

### Implementing Resilient Offline Fallbacks
When developing client applications, engineering a resilient data provider that gracefully switches between cloud Supabase endpoints and local persistent storage guarantees uninterrupted local development and resilient disaster recovery.`,
    category: 'Architecture',
    tags: ['Supabase', 'PostgreSQL', 'React', 'Security'],
    featured_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    author: 'Jerry Vance',
    read_time: '8 min read',
    is_published: true,
    published_at: '2026-08-02'
  },
  {
    id: 'blog-3',
    title: 'Design Tokens: The Secret to Scalable Brand Cohesion',
    slug: 'design-tokens-scalable-brand-cohesion',
    excerpt: 'How to bridge the gap between design tools and codebases using standardized CSS custom properties and atomic design principles.',
    content: `## Bridging Design and Code

A design system is not merely a collection of UI buttons and color swatches; it is the shared vocabulary spoken by product designers, frontend engineers, and product managers.

### Defining the Hierarchy of Tokens
1. **Global (Primitive) Tokens**: Raw color hex codes, font families, and base spacing units (\`--color-blue-500: #0284c7;\`).
2. **Semantic (Alias) Tokens**: Context-specific roles (\`--surface-primary\`, \`--text-muted\`, \`--border-focus\`).
3. **Component Tokens**: Scoped exclusively to individual modules (\`--button-height\`, \`--card-radius\`).

When dark mode is introduced, semantic tokens switch their referenced values effortlessly without touching component source code.`,
    category: 'UI/UX Design',
    tags: ['Design Systems', 'CSS', 'UI/UX', 'Tokens'],
    featured_image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    author: 'Jerry Vance',
    read_time: '5 min read',
    is_published: true,
    published_at: '2026-07-20'
  },
  {
    id: 'blog-4',
    title: 'Mastering State Management in Modern React 18+',
    slug: 'mastering-state-management-react-18',
    excerpt: 'Demystifying when to use local component state, URL query parameters, React Context, and external server-cache stores.',
    content: `## The State Management Conundrum

React state management has dramatically matured. Gone are the days when boilerplate-heavy Redux was mandated for even the simplest counter widget.

### The 4 Tiers of React State:
* **Local UI State**: Kept inside \`useState\` or \`useReducer\` for accordion toggles, dropdown open/close states, and modal visibility.
* **URL State**: The most underrated state store! Keeping search queries, active filter tabs, and pagination offsets in the URL allows users to bookmark and share exact views.
* **Global Context**: Ideal for theme modes (Dark/Light), active authenticated user sessions, and global toast notifications.
* **Server Cache**: Managing remote Supabase database queries with optimistic updates and caching.`,
    category: 'Development',
    tags: ['React', 'JavaScript', 'State', 'Hooks'],
    featured_image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
    author: 'Jerry Vance',
    read_time: '7 min read',
    is_published: true,
    published_at: '2026-07-10'
  },
  {
    id: 'blog-5',
    title: 'The Power of Editorial Typography on the Modern Web',
    slug: 'editorial-typography-modern-web',
    excerpt: 'How deliberate typeface pairing, fluid clamp scales, and vertical rhythm transform technical portfolios into captivating digital experiences.',
    content: `## Typography as the Visual Voice

Before a visitor reads a single sentence on your portfolio, their subconscious has already formed an impression based entirely on typeface choices, letter spacing, and line heights.

By pairing an editorial modern serif or bold modern sans-serif headline font (such as Outfit) with an ultra-legible geometric body font (Plus Jakarta Sans), you instantly signal sophistication and authority.`,
    category: 'Typography',
    tags: ['Typography', 'Design', 'CSS', 'Aesthetics'],
    featured_image: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=1200&q=80',
    author: 'Jerry Vance',
    read_time: '4 min read',
    is_published: true,
    published_at: '2026-06-28'
  },
  {
    id: 'blog-6',
    title: 'Securing Client-Facing APIs and Preventing Data Breaches',
    slug: 'securing-client-facing-apis',
    excerpt: 'Essential defense strategies for frontend and backend engineers: CORS policies, rate limiting, RLS validation, and token sanitization.',
    content: `## Security Starts at the Architectural Core

A single leaked API credential or an improperly configured database endpoint can compromise years of reputation and user trust.

### Key Security Pillars:
1. **Never Trust the Client**: Client-side validation is purely for user experience. Always enforce schema constraints, field length maximums, and data sanitization at the database/API boundary.
2. **Row Level Security**: Ensure database policies enforce that write mutations require valid authenticated JWTs.
3. **Environment Separation**: Maintain strict separation between public anon keys and administrative service role keys.`,
    category: 'Security',
    tags: ['Security', 'APIs', 'Database', 'Best Practices'],
    featured_image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    author: 'Jerry Vance',
    read_time: '6 min read',
    is_published: true,
    published_at: '2026-06-15'
  }
];

export const initialMessages = [
  {
    id: 'msg-1',
    name: 'Eleanor Vance',
    email: 'eleanor@meridiancreative.com',
    subject: 'Design System & Frontend Architecture Contract',
    message: 'Hi Jerry! We came across your portfolio and were thoroughly impressed by the Aura financial intelligence case study. We are launching a new enterprise SaaS platform in Q4 and would love to discuss a 3-month consulting engagement. Are you available for a quick introductory video call next Tuesday?',
    is_read: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString()
  },
  {
    id: 'msg-2',
    name: 'Marcus Thorne',
    email: 'marcus@thornelogistics.io',
    subject: 'Inquiry regarding Veloce logistics telemetry work',
    message: 'Jerry, your work on real-time IoT vector mapping was exactly what our engineering team has been researching. We would appreciate the opportunity to discuss your availability for technical advisory sessions.',
    is_read: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
  }
];
