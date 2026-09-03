# PROJECT PROMPT — MODERN PROFESSIONAL PORTFOLIO WEBSITE

Build a complete, modern, professional and fully responsive **personal portfolio website** using:

* React.js
* Node.js
* Supabase
* Supabase Authentication
* Supabase PostgreSQL Database
* Supabase Storage
* HTML5
* CSS3
* JavaScript
* React Router
* Modern component-based architecture

The website is a **real working portfolio application**, not just a UI mockup.

The design should take inspiration from high-quality modern developer, designer, creative-agency and freelancer portfolios found on platforms such as Awwwards, Behance and other premium portfolio galleries.

Do NOT copy any existing website exactly. Use the inspiration only for layout quality, typography, animations, spacing, interactions and overall visual sophistication.

---

# 1. OVERALL DESIGN DIRECTION

Create a premium, minimal, visually impressive portfolio.

The website should immediately communicate:

* Professionalism
* Creativity
* Technical skill
* Experience
* Personality
* Attention to detail

Design style:

* Modern
* Minimal
* Elegant
* Premium
* Clean
* Editorial
* Slightly futuristic
* Strong typography
* Generous whitespace
* Beautiful project presentation
* Smooth micro-interactions
* Subtle animations

The design must NOT look like a generic Bootstrap template.

Use a carefully designed visual system with:

* Large typography
* Strong visual hierarchy
* Rounded cards where appropriate
* Subtle borders
* Soft shadows
* Smooth hover effects
* Beautiful project thumbnails
* Animated transitions
* Responsive layouts
* Accessible contrast

Provide both:

* Light mode
* Dark mode

Add a theme switcher in the navigation.

---

# 2. WEBSITE STRUCTURE

Create the following public pages:

1. Home
2. About
3. Projects
4. Project Details
5. Services
6. Experience
7. Skills
8. Blog
9. Blog Details
10. Contact
11. Resume
12. 404 Page

Also create an administration system:

13. Admin Login
14. Admin Dashboard
15. Project Management
16. Add Project
17. Edit Project
18. Blog Management
19. Add Blog Post
20. Edit Blog Post
21. Skills Management
22. Experience Management
23. Services Management
24. Messages / Contact Submissions
25. Profile Settings
26. Website Settings

---

# 3. HOME PAGE

Create a visually impressive hero section.

Example structure:

Small introduction:

"HELLO, I'M [NAME]"

Large headline:

"Building digital experiences that make an impact."

Supporting text explaining who the person is and what they do.

Example:

"I'm a full-stack developer and digital creative focused on building beautiful, scalable and user-friendly digital products."

Hero buttons:

* View My Work
* Let's Talk
* Download Resume

Include a profile image or professional portrait.

Add subtle animated background elements.

Include an availability indicator:

"Available for freelance projects"

Add social links:

* GitHub
* LinkedIn
* Twitter/X
* Instagram
* Email

---

# 4. HERO INTERACTION

Make the hero feel premium.

Add subtle:

* Mouse-following effects
* Floating elements
* Text reveal animation
* Image hover animation
* Scroll indicator
* Parallax effects where appropriate

Animations must remain smooth and lightweight.

Respect `prefers-reduced-motion`.

---

# 5. FEATURED PROJECTS

Create a large featured-project section.

Each project card should contain:

* Project image
* Project title
* Short description
* Category
* Technologies
* Year
* View project button

Example:

Project:

"Fintech Dashboard"

Description:

"A modern financial management platform designed for seamless digital banking."

Technology tags:

React
Node.js
Supabase
PostgreSQL

Use large editorial-style project cards.

Some projects should use:

* Full-width layouts
* Two-column layouts
* Asymmetrical layouts

Add smooth hover animations.

---

# 6. PROJECTS PAGE

Create a complete project gallery.

Include filtering:

* All
* Web Development
* Mobile
* UI/UX
* Branding
* SaaS
* E-commerce

Allow projects to be filtered dynamically.

Each project should display:

* Thumbnail
* Title
* Category
* Technologies
* Short description
* Year

Clicking a project opens its detailed project page.

---

# 7. PROJECT DETAILS PAGE

Create a premium case-study layout.

Include:

* Project title
* Hero image
* Project overview
* Client
* Year
* Role
* Technologies
* Project duration
* Challenge
* Solution
* Development process
* Results
* Image gallery
* Live website button
* GitHub button

Example structure:

PROJECT NAME

"The challenge"

Explain the problem.

"The solution"

Explain how the project solved the problem.

"The result"

Explain the outcome.

Add multiple project screenshots.

At the bottom:

Previous Project
Next Project

---

# 8. ABOUT PAGE

Create a visually engaging About page.

Include:

* Profile image
* Biography
* Personal introduction
* Professional background
* Values
* Career philosophy

Include statistics such as:

50+
Projects Completed

4+
Years Experience

30+
Happy Clients

10+
Technologies

Make the statistics editable from the admin dashboard.

---

# 9. SERVICES PAGE

Create service cards.

Example services:

* Web Development
* UI/UX Design
* Mobile App Development
* E-commerce Development
* SaaS Development
* Website Maintenance
* Branding
* API Development

Each service should include:

* Icon
* Title
* Description
* Features
* Optional pricing
* CTA

All service information must be editable from the admin dashboard.

---

# 10. SKILLS PAGE / SECTION

Create an attractive technical skills section.

Categories:

Frontend:

* React
* JavaScript
* HTML
* CSS
* Tailwind CSS

Backend:

* Node.js
* Express
* APIs

Database:

* PostgreSQL
* Supabase
* MySQL

Tools:

* Git
* GitHub
* Figma
* VS Code

Display skill levels visually.

Allow the admin to add, edit and delete skills.

---

# 11. EXPERIENCE PAGE

Create a timeline-style experience section.

Each experience item contains:

* Company
* Position
* Start date
* End date
* Description
* Technologies

Use a beautiful vertical timeline.

Allow all experience information to be managed through the admin dashboard.

---

# 12. BLOG

Create a professional blog.

Blog listing page should include:

* Featured article
* Article cards
* Categories
* Search
* Pagination

Each article should include:

* Featured image
* Title
* Excerpt
* Author
* Published date
* Category
* Reading time

Blog details page should contain:

* Large featured image
* Article title
* Author
* Date
* Reading time
* Article content
* Related posts
* Share buttons

The admin must be able to create and manage blog posts.

---

# 13. CONTACT PAGE

Create a professional contact page.

Include:

Name
Email
Subject
Message

Button:

"Send Message"

When submitted:

1. Validate the form.
2. Store the message in Supabase.
3. Show a success notification.
4. Prevent duplicate submissions where appropriate.

Admin should be able to view contact messages from the dashboard.

Each message should show:

* Sender
* Email
* Subject
* Message
* Date
* Read/unread status

Admin can:

* Mark as read
* Delete
* View details

---

# 14. RESUME PAGE

Create a professional resume page.

Include:

* Profile
* Summary
* Experience
* Education
* Skills
* Certifications
* Projects

Provide:

"Download Resume"

The resume file should be manageable through Supabase Storage.

---

# 15. ADMIN AUTHENTICATION

Create a secure admin authentication system using:

Supabase Auth.

Admin login page:

/admin/login

Fields:

Email
Password

Buttons:

Login

Forgot Password

After successful authentication:

Redirect to:

/admin/dashboard

Protect every admin route.

Unauthenticated users attempting to access:

/admin/dashboard
/admin/projects
/admin/blog
/admin/settings

must be redirected to:

/admin/login

Use Supabase Auth rather than creating a custom insecure authentication system.

Supabase Auth supports authentication and authorization and integrates with PostgreSQL and Row Level Security.

---

# 16. ADMIN DASHBOARD

Create a professional admin dashboard.

Layout:

SIDEBAR

Dashboard
Projects
Blog
Services
Skills
Experience
Messages
Resume
Profile
Settings
Logout

MAIN CONTENT

Dashboard overview.

Display statistics:

Total Projects
Published Projects
Blog Posts
Unread Messages
Services
Skills

Add charts where useful.

Example:

Projects over time
Messages received
Blog posts published

Use clean dashboard cards.

---

# 17. PROJECT MANAGEMENT

Admin page:

/admin/projects

Display projects in a table/grid.

Each project should have:

* Image
* Title
* Category
* Status
* Date
* Actions

Actions:

Edit
Delete
Publish/Unpublish
Preview

Add Project button.

---

# 18. ADD / EDIT PROJECT

Create a complete project editor.

Fields:

Project title
Slug
Description
Short description
Category
Client
Year
Role
Duration
Technologies
Challenge
Solution
Results
Live URL
GitHub URL
Featured project
Published status
Project image
Gallery images

Allow image uploads through Supabase Storage.

Generate SEO-friendly project slugs.

---

# 19. BLOG MANAGEMENT

Admin should be able to:

* Create post
* Edit post
* Delete post
* Publish post
* Unpublish post
* Upload featured image
* Add categories
* Add tags

Blog editor fields:

Title
Slug
Excerpt
Content
Category
Tags
Featured image
Author
Published date
SEO title
SEO description
Published status

---

# 20. SERVICES MANAGEMENT

Admin can:

* Add service
* Edit service
* Delete service
* Reorder services
* Enable/disable service

Fields:

Title
Description
Icon
Features
Price
Display order
Status

---

# 21. SKILLS MANAGEMENT

Admin can:

* Add skill
* Edit skill
* Delete skill
* Set category
* Set proficiency level
* Reorder skills

Example:

React — 90%
JavaScript — 92%
Node.js — 85%

---

# 22. EXPERIENCE MANAGEMENT

Admin can create:

Company
Position
Location
Start date
End date
Description
Technologies

Allow experience items to be reordered.

---

# 23. PROFILE SETTINGS

Admin should be able to edit:

Name
Professional title
Biography
Email
Phone
Location
Profile image
Resume
Availability status

Social media:

GitHub
LinkedIn
Twitter/X
Instagram
Facebook
Dribbble
Behance

Do not hardcode these values into the frontend.

Load them from Supabase.

---

# 24. WEBSITE SETTINGS

Create an admin settings page.

Allow administrator to control:

Website name
Logo
Favicon
Primary color
Dark/light mode default
Hero title
Hero subtitle
Contact email
Footer text
Social links

SEO settings:

Meta title
Meta description
Open Graph image
Keywords

---

# 25. SUPABASE DATABASE

Use Supabase PostgreSQL.

Create an appropriate relational database structure.

Recommended tables:

profiles
projects
project_images
project_categories
skills
skill_categories
services
experience
blog_posts
blog_categories
contact_messages
site_settings
social_links

Create appropriate foreign keys.

Use timestamps:

created_at
updated_at

Use UUIDs where appropriate.

---

# 26. SUPABASE STORAGE

Use Supabase Storage for:

* Profile images
* Project images
* Project galleries
* Blog images
* Resume/CV
* Site assets

Organize storage logically:

/profile
/projects
/blog
/resume
/site

Do not store large images directly inside PostgreSQL.

Store the file in Supabase Storage and save the public/storage URL in the database.

---

# 27. ROW LEVEL SECURITY

Implement proper Supabase Row Level Security policies.

Public users should be able to read:

* Published projects
* Published blog posts
* Public profile information
* Services
* Skills
* Experience
* Public site settings

Only authenticated administrators should be able to:

* Create projects
* Update projects
* Delete projects
* Create blog posts
* Update blog posts
* Delete blog posts
* Modify services
* Modify skills
* Modify experience
* View contact messages
* Modify website settings

Do NOT simply disable RLS.

Supabase specifically recommends reviewing RLS policies before production because database/API access should be restricted according to user permissions.

---

# 28. DATABASE SECURITY

Never expose:

* Supabase service-role keys
* Private credentials
* Admin passwords
* Secret API keys

Use environment variables.

Example:

VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY

Follow Supabase's recommended React configuration.

---

# 29. RESPONSIVE DESIGN

The entire website must be responsive.

Support:

Mobile
Tablet
Laptop
Desktop
Large desktop

Pay particular attention to:

375px
390px
768px
1024px
1440px
1920px

Mobile navigation should transform into a beautiful hamburger menu.

Admin dashboard must also work on mobile.

---

# 30. ANIMATIONS

Use tasteful animations.

Examples:

* Page transitions
* Fade-ins
* Slide-ins
* Text reveals
* Hover effects
* Image zoom
* Card movement
* Scroll animations
* Button interactions

Avoid excessive animations.

The website should feel premium rather than distracting.

---

# 31. NAVIGATION

Desktop navigation:

Logo

Home
About
Projects
Services
Blog
Contact

CTA:

"Let's Talk"

Theme toggle

Mobile navigation:

Hamburger menu
Fullscreen/slide-out navigation

---

# 32. FOOTER

Create a sophisticated footer.

Include:

Logo
Short description
Navigation
Services
Social links
Email
Copyright

Example:

© 2026 [Name]. All rights reserved.

---

# 33. SEO

Implement proper SEO.

Each page should have:

* Unique title
* Meta description
* Open Graph metadata
* Semantic HTML
* Proper heading hierarchy
* Descriptive image alt text
* SEO-friendly URLs

Project URLs:

/projects/project-name

Blog URLs:

/blog/article-name

---

# 34. ACCESSIBILITY

Follow accessibility best practices.

Include:

* Keyboard navigation
* Proper labels
* Focus states
* ARIA where necessary
* Accessible contrast
* Alt text
* Reduced motion support
* Semantic HTML

---

# 35. ERROR HANDLING

Create polished error states.

Examples:

Loading
Empty state
Error state
Success state
404
Unauthorized
Network failure

Do not leave blank screens.

Use toast notifications for actions such as:

Project created
Project updated
Project deleted
Message sent
Login successful
Login failed

---

# 36. LOADING STATES

Use skeleton loaders for:

Projects
Blog posts
Dashboard statistics
Images
Tables

Avoid displaying empty white screens while data loads.

---

# 37. COMPONENT ARCHITECTURE

Use reusable React components.

Example structure:

src/

components/
Navbar.jsx
Footer.jsx
Button.jsx
ProjectCard.jsx
BlogCard.jsx
ServiceCard.jsx
SkillCard.jsx
ExperienceTimeline.jsx
Modal.jsx
Toast.jsx
LoadingSpinner.jsx

pages/

```
Home.jsx
About.jsx
Projects.jsx
ProjectDetails.jsx
Services.jsx
Experience.jsx
Blog.jsx
BlogDetails.jsx
Contact.jsx
Resume.jsx
NotFound.jsx
```

admin/

```
AdminLogin.jsx
Dashboard.jsx
Projects.jsx
ProjectEditor.jsx
Blog.jsx
BlogEditor.jsx
Services.jsx
Skills.jsx
Experience.jsx
Messages.jsx
Settings.jsx
```

lib/

```
supabase.js
```

hooks/

```
useAuth.js
useProjects.js
useBlog.js
```

---

# 38. ROUTING

Use React Router.

Public routes:

/
/about
/projects
/projects/:slug
/services
/experience
/blog
/blog/:slug
/contact
/resume

Admin routes:

/admin/login
/admin/dashboard
/admin/projects
/admin/projects/new
/admin/projects/:id/edit
/admin/blog
/admin/blog/new
/admin/blog/:id/edit
/admin/services
/admin/skills
/admin/experience
/admin/messages
/admin/settings

Protect admin routes.

---

# 39. ADMIN UI DESIGN

The admin dashboard should NOT look like the public portfolio.

Use a professional SaaS dashboard design.

Features:

* Sidebar
* Top navigation
* Breadcrumbs
* Search
* Tables
* Cards
* Dropdown menus
* Modals
* Forms
* Confirmation dialogs
* Toast notifications

Add responsive sidebar behavior.

---

# 40. DEMO DATA

Populate the application with realistic demo content.

Create at least:

6 projects
6 blog posts
8 skills
4 services
3 experience entries
1 profile

Use realistic professional content.

Do NOT use lorem ipsum.

Use appropriate placeholder images from reliable image sources during development where necessary.

---

# 41. IMAGE HANDLING

Images should:

* Maintain aspect ratio
* Be optimized
* Use lazy loading where appropriate
* Have alt text
* Display attractive placeholders while loading

Use `object-fit: cover` where appropriate.

---

# 42. PERFORMANCE

Optimize the application.

Requirements:

* Lazy load images
* Avoid unnecessary React re-renders
* Reuse components
* Keep bundle size reasonable
* Avoid huge dependencies
* Use pagination for large datasets
* Optimize database queries

---

# 43. SECURITY REQUIREMENTS

Implement:

* Protected admin routes
* Supabase authentication
* Row Level Security
* Input validation
* Form validation
* Secure database queries
* Safe file upload handling
* File type restrictions
* File size restrictions
* Authentication state handling
* Logout functionality

Never trust client-side authorization alone.

---

# 44. ADMIN LOGIN UX

Design a beautiful admin login page.

Centered login card.

Include:

Logo
"Welcome back"
Email
Password
Show/hide password
Remember session
Login button
Forgot password

Display clear authentication errors.

After successful login:

Redirect to dashboard.

---

# 45. DASHBOARD EXPERIENCE

Dashboard should show:

Welcome back, [Admin Name]

Cards:

Total Projects
Published Projects
Blog Posts
Unread Messages

Below:

Recent Projects
Recent Messages
Recent Blog Posts

Include quick actions:

* Add Project
* New Blog Post
  View Messages

---

# 46. PROJECT SEARCH

Admin should be able to search projects.

Search by:

Title
Category
Technology
Status

Add sorting:

Newest
Oldest
A-Z

---

# 47. BLOG SEARCH

Admin should be able to search blog posts.

Filter:

Published
Draft
Category

Sort:

Newest
Oldest
Title

---

# 48. CONTACT MESSAGE MANAGEMENT

Dashboard should display:

Unread messages count.

Message table:

Name
Email
Subject
Date
Status

Clicking a message opens the full message.

Admin can mark it as read/unread.

---

# 49. DESIGN SYSTEM

Create reusable CSS variables.

Example:

--background
--foreground
--primary
--secondary
--muted
--border
--card
--accent

Create consistent:

Typography
Spacing
Border radius
Shadows
Transitions
Buttons
Forms
Cards

Do not use random styling values throughout the application.

---

# 50. FINAL QUALITY REQUIREMENT

The finished project must feel like a **real portfolio product built by a professional designer/developer**, not an AI-generated template.

Prioritize:

1. Excellent UI/UX
2. Responsive design
3. Working Supabase integration
4. Secure authentication
5. Functional admin dashboard
6. CRUD functionality
7. Clean architecture
8. Good performance
9. Accessibility
10. Premium visual presentation

Every button should either perform its intended function or clearly indicate where functionality is intentionally unavailable.

Do not create fake dashboard functionality.

Do not hardcode data that should come from Supabase.

The public website should retrieve its content from Supabase.

The admin dashboard should modify the same Supabase data that powers the public website.

---

# 51. DELIVERABLE

Produce a complete working project.

Include:

* Full React application
* Node.js setup where required
* Supabase integration
* Database schema SQL
* RLS policies
* Authentication
* Storage configuration
* Admin dashboard
* Public portfolio
* Responsive styling
* Demo data
* Environment variable example
* README
* Setup instructions

Create a `.env.example` file.

Example:

VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=

Do not include real credentials.

---

# 52. IMPORTANT DEVELOPMENT INSTRUCTION

Do not stop after creating the frontend.

Build the complete application end-to-end.

The workflow should be:

PUBLIC WEBSITE
↓
Supabase Database
↓
Admin Dashboard
↓
Admin makes changes
↓
Database updates
↓
Public website automatically reflects the changes

Test all major CRUD operations.

Test authentication.

Test protected routes.

Test image uploads.

Test responsive layouts.

Test forms.

Test navigation.

Test logout.

Test 404 handling.

Fix errors before considering the project complete.

The final result should be ready to run locally and straightforward to connect to a real Supabase project.
