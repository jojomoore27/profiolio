# Modern Professional Portfolio & Business CMS

A production-grade, minimal, and visually impressive personal portfolio and business web application with an integrated full-featured **Admin Content Management System (CMS)**, built with **React**, **Node.js**, **Vite**, and **Supabase**.

---

## 🌟 Key Highlights & Features

### 1. Public Portfolio
* **High-Impact Hero**: Availability indicator badge, typography hierarchy, primary calls-to-action, floating metric badge, and interactive social links.
* **Filterable Projects Gallery**: Dynamic category tabs (*Web Development, Mobile, UI/UX, SaaS, E-commerce*), real-time search, and editorial case-study cards.
* **Deep Case Study Layout**: Problem / Challenge, Architectural Solution, Measurable Results, Technology chips, Gallery showcase, and Prev/Next project navigation.
* **Comprehensive Services**: Detailed capability cards with feature checklists, pricing guidelines, and inquiry triggers.
* **Career Experience Timeline**: Vertical interactive milestone track with company tags, dates, and accomplishments.
* **Visual Skills Matrix**: Grouped proficiencies (Frontend, Backend, Database, Tools & DevOps) with percentage progress meters.
* **Editorial Blog**: Featured lead essay, category filters, keyword search, reading times, and full article view with social sharing.
* **Contact Experience**: Validated contact form writing directly to the Supabase database / store with confirmation toast notifications.
* **Official Resume**: Formatted printable curriculum vitae with instant PDF download and print triggers.
* **Design System**: Seamless Dark/Light mode switcher, glassmorphism, responsive mobile slide-out drawer, and accessible contrast ratios.

### 2. Full-Featured Admin CMS (`/admin`)
* **Dedicated SaaS Interface**: Custom sidebar, topbar with profile status, breadcrumbs, and dark/light synchronization.
* **Dashboard Overview**: Real-time KPI metric counters (Total Projects, Published, Blog Posts, Unread Messages) and recent client inquiries.
* **Project Management**: Create, edit, and delete case studies; auto-slug generator, technology tags, and image preview.
* **Blog CMS**: Markdown-supported article editor, category classification, tags, and publish/draft toggles.
* **Services & Skills Editors**: Add or modify digital services, pricing, skill categories, and proficiency percentage sliders.
* **Career Milestones**: Manage work history, achievements, and technology stacks.
* **Inquiries Inbox**: View client submissions, filter by read/unread, mark as read, and delete inquiries.
* **Profile & Settings**: Customize public biography, editable stats counters, site name, SEO metadata, and social links.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
The `.env` file is already configured with your Supabase project keys:
```env
VITE_SUPABASE_URL=https://phnxxhmzomeetaguihqc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> **Dual-Mode Resiliency**: The application is built with an intelligent dual data provider:
> * If Supabase tables are ready, it directly queries Supabase PostgreSQL, Supabase Auth, and Storage with Row Level Security (RLS).
> * If a table has not been migrated or Supabase is unreachable, it seamlessly falls back to an in-browser persistent LocalStorage mock pre-seeded with rich, realistic demo data (6+ projects, 6+ blog articles, 8+ skills, 4+ services, 3+ experiences, and contact messages).

### 3. Supabase Database Setup (Optional / Ready-to-Run)
To initialize your Supabase PostgreSQL database:
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard) -> **SQL Editor**.
2. Run [`database/schema.sql`](file:///database/schema.sql) to create all tables and Row Level Security policies.
3. (Optional) Run [`database/seed.sql`](file:///database/seed.sql) to populate initial demo data in Supabase.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Accessing the Admin CMS
Navigate to `/admin/login` or click the Shield icon in the top navigation bar.
* **Quick Demo Login**: Click the **Quick Demo Admin Login** button for instant one-click access.
* **Supabase Auth**: You can also sign in with any existing admin user registered in your Supabase Auth project.

---

## 🛠 Project Structure

```
├── database/
│   ├── schema.sql         # Supabase PostgreSQL DDL, RLS policies, and storage
│   └── seed.sql           # Initial dataset for projects, blogs, skills, etc.
├── src/
│   ├── components/
│   │   ├── layout/        # Navbar, Footer, and AdminLayout
│   │   └── ui/            # ProjectCard, BlogCard, ServiceCard, Toast, Skeleton, etc.
│   ├── context/           # ThemeContext (Dark/Light), AuthContext (Supabase + Demo)
│   ├── lib/               # supabase.js, dataProvider.js, initialData.js
│   ├── pages/             # Home, About, Projects, ProjectDetails, Services,
│   │                      # Experience, Skills, Blog, BlogDetails, Contact, Resume, NotFound
│   ├── pages/admin/       # AdminLogin, Dashboard, AdminProjects, ProjectEditor,
│   │                      # AdminBlog, BlogEditor, AdminServices, AdminSkills,
│   │                      # AdminExperience, AdminMessages, AdminSettings
│   ├── App.jsx            # Application Router
│   ├── index.css          # Design system tokens and styles
│   └── main.jsx           # React Root Entry Point
├── .env                   # Supabase environment variables
├── .env.example           # Example environment template
├── package.json           # Dependencies and scripts
└── vite.config.js         # Vite configuration
```
