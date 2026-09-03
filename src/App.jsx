import React, { useState, useEffect } from 'react';
import { Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AdminLayout } from './components/layout/AdminLayout';
import { ProtectedRoute } from './components/ui/ProtectedRoute';
import { ToastContainer } from './components/ui/Toast';
import { dataProvider } from './lib/dataProvider';

// Public Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { ProjectDetails } from './pages/ProjectDetails';
import { Services } from './pages/Services';
import { Experience } from './pages/Experience';
import { Skills } from './pages/Skills';
import { Blog } from './pages/Blog';
import { BlogDetails } from './pages/BlogDetails';
import { Contact } from './pages/Contact';
import { Resume } from './pages/Resume';
import { NotFound } from './pages/NotFound';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { Dashboard } from './pages/admin/Dashboard';
import { AdminProjects } from './pages/admin/AdminProjects';
import { ProjectEditor } from './pages/admin/ProjectEditor';
import { AdminBlog } from './pages/admin/AdminBlog';
import { BlogEditor } from './pages/admin/BlogEditor';
import { AdminServices } from './pages/admin/AdminServices';
import { AdminSkills } from './pages/admin/AdminSkills';
import { AdminExperience } from './pages/admin/AdminExperience';
import { AdminMessages } from './pages/admin/AdminMessages';
import { AdminSettings } from './pages/admin/AdminSettings';

// Public Layout Wrapper with Dynamic Navbar & Footer
function PublicLayout() {
  const [siteSettings, setSiteSettings] = useState(null);
  const [profile, setProfile] = useState(null);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    Promise.all([dataProvider.getSettings(), dataProvider.getProfile()]).then(([s, p]) => {
      setSiteSettings(s);
      setProfile(p);
    });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar siteSettings={siteSettings} />
      <main style={{ flexGrow: 1 }}>
        <Outlet />
      </main>
      <Footer siteSettings={siteSettings} profile={profile} />
    </div>
  );
}

export function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetails />} />
          <Route path="/services" element={<Services />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin Authentication Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin CMS Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="projects/new" element={<ProjectEditor />} />
          <Route path="projects/:id/edit" element={<ProjectEditor />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="blog/new" element={<BlogEditor />} />
          <Route path="blog/:id/edit" element={<BlogEditor />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="skills" element={<AdminSkills />} />
          <Route path="experience" element={<AdminExperience />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>

      <ToastContainer />
    </>
  );
}
export default App;
