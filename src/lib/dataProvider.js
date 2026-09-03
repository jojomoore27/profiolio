import { supabase, isSupabaseConfigured } from './supabase';
import {
  initialProfile,
  initialSettings,
  initialProjects,
  initialServices,
  initialSkills,
  initialExperience,
  initialBlogPosts,
  initialMessages
} from './initialData';

// Local storage helper
const STORAGE_PREFIX = 'portfolio_cms_';

function getLocal(key, fallback) {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
}

function setLocal(key, value) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error('LocalStorage error:', e);
  }
}

// Initialize local fallback stores if empty
function initializeStores() {
  if (!localStorage.getItem(STORAGE_PREFIX + 'profile')) setLocal('profile', initialProfile);
  if (!localStorage.getItem(STORAGE_PREFIX + 'settings')) setLocal('settings', initialSettings);
  if (!localStorage.getItem(STORAGE_PREFIX + 'projects')) setLocal('projects', initialProjects);
  if (!localStorage.getItem(STORAGE_PREFIX + 'services')) setLocal('services', initialServices);
  if (!localStorage.getItem(STORAGE_PREFIX + 'skills')) setLocal('skills', initialSkills);
  if (!localStorage.getItem(STORAGE_PREFIX + 'experience')) setLocal('experience', initialExperience);
  if (!localStorage.getItem(STORAGE_PREFIX + 'blog_posts')) setLocal('blog_posts', initialBlogPosts);
  if (!localStorage.getItem(STORAGE_PREFIX + 'messages')) setLocal('messages', initialMessages);
}

initializeStores();

export const dataProvider = {
  // --- Profile ---
  async getProfile() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('profiles').select('*').limit(1).single();
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase profiles query failed, using local store:', err);
      }
    }
    return getLocal('profile', initialProfile);
  },

  async updateProfile(profileData) {
    setLocal('profile', { ...getLocal('profile', initialProfile), ...profileData });
    if (isSupabaseConfigured) {
      try {
        await supabase.from('profiles').upsert(profileData);
      } catch (err) {
        console.warn('Supabase profile update warning:', err);
      }
    }
    return getLocal('profile', initialProfile);
  },

  // --- Site Settings ---
  async getSettings() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('site_settings').select('*').limit(1).single();
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase settings query failed, using local store:', err);
      }
    }
    return getLocal('settings', initialSettings);
  },

  async updateSettings(settingsData) {
    setLocal('settings', { ...getLocal('settings', initialSettings), ...settingsData });
    if (isSupabaseConfigured) {
      try {
        await supabase.from('site_settings').upsert(settingsData);
      } catch (err) {
        console.warn('Supabase settings update warning:', err);
      }
    }
    return getLocal('settings', initialSettings);
  },

  // --- Projects ---
  async getProjects(includeDrafts = false) {
    if (isSupabaseConfigured) {
      try {
        let query = supabase.from('projects').select('*').order('sort_order', { ascending: true });
        if (!includeDrafts) {
          query = query.eq('is_published', true);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase projects query failed, using local store:', err);
      }
    }
    const projects = getLocal('projects', initialProjects);
    return includeDrafts ? projects : projects.filter(p => p.is_published);
  },

  async getProjectBySlug(slug) {
    const projects = await this.getProjects(true);
    return projects.find(p => p.slug === slug) || null;
  },

  async saveProject(project) {
    const projects = getLocal('projects', initialProjects);
    let updated;
    if (project.id) {
      updated = projects.map(p => p.id === project.id ? { ...p, ...project, updated_at: new Date().toISOString() } : p);
    } else {
      const newProj = {
        ...project,
        id: 'proj-' + Date.now(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      updated = [newProj, ...projects];
    }
    setLocal('projects', updated);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('projects').upsert(project);
      } catch (err) {
        console.warn('Supabase project save warning:', err);
      }
    }
    return project;
  },

  async deleteProject(id) {
    const projects = getLocal('projects', initialProjects);
    const updated = projects.filter(p => p.id !== id);
    setLocal('projects', updated);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('projects').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase project delete warning:', err);
      }
    }
    return true;
  },

  // --- Services ---
  async getServices(includeInactive = false) {
    if (isSupabaseConfigured) {
      try {
        let query = supabase.from('services').select('*').order('sort_order', { ascending: true });
        if (!includeInactive) {
          query = query.eq('is_active', true);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase services query failed, using local store:', err);
      }
    }
    const services = getLocal('services', initialServices);
    return includeInactive ? services : services.filter(s => s.is_active);
  },

  async saveService(service) {
    const services = getLocal('services', initialServices);
    let updated;
    if (service.id) {
      updated = services.map(s => s.id === service.id ? { ...s, ...service } : s);
    } else {
      const newServ = { ...service, id: 'serv-' + Date.now() };
      updated = [...services, newServ];
    }
    setLocal('services', updated);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('services').upsert(service);
      } catch (err) {
        console.warn('Supabase service save warning:', err);
      }
    }
    return service;
  },

  async deleteService(id) {
    const services = getLocal('services', initialServices);
    const updated = services.filter(s => s.id !== id);
    setLocal('services', updated);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('services').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase service delete warning:', err);
      }
    }
    return true;
  },

  // --- Skills ---
  async getSkills() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('skills').select('*').order('sort_order', { ascending: true });
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase skills query failed, using local store:', err);
      }
    }
    return getLocal('skills', initialSkills);
  },

  async saveSkill(skill) {
    const skills = getLocal('skills', initialSkills);
    let updated;
    if (skill.id) {
      updated = skills.map(s => s.id === skill.id ? { ...s, ...skill } : s);
    } else {
      const newSkill = { ...skill, id: 'skill-' + Date.now() };
      updated = [...skills, newSkill];
    }
    setLocal('skills', updated);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('skills').upsert(skill);
      } catch (err) {
        console.warn('Supabase skill save warning:', err);
      }
    }
    return skill;
  },

  async deleteSkill(id) {
    const skills = getLocal('skills', initialSkills);
    const updated = skills.filter(s => s.id !== id);
    setLocal('skills', updated);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('skills').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase skill delete warning:', err);
      }
    }
    return true;
  },

  // --- Experience ---
  async getExperience() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('experience').select('*').order('sort_order', { ascending: true });
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase experience query failed, using local store:', err);
      }
    }
    return getLocal('experience', initialExperience);
  },

  async saveExperience(item) {
    const list = getLocal('experience', initialExperience);
    let updated;
    if (item.id) {
      updated = list.map(e => e.id === item.id ? { ...e, ...item } : e);
    } else {
      const newItem = { ...item, id: 'exp-' + Date.now() };
      updated = [...list, newItem];
    }
    setLocal('experience', updated);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('experience').upsert(item);
      } catch (err) {
        console.warn('Supabase experience save warning:', err);
      }
    }
    return item;
  },

  async deleteExperience(id) {
    const list = getLocal('experience', initialExperience);
    const updated = list.filter(e => e.id !== id);
    setLocal('experience', updated);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('experience').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase experience delete warning:', err);
      }
    }
    return true;
  },

  // --- Blog Posts ---
  async getBlogPosts(includeDrafts = false) {
    if (isSupabaseConfigured) {
      try {
        let query = supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
        if (!includeDrafts) {
          query = query.eq('is_published', true);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase blog query failed, using local store:', err);
      }
    }
    const posts = getLocal('blog_posts', initialBlogPosts);
    return includeDrafts ? posts : posts.filter(p => p.is_published);
  },

  async getBlogPostBySlug(slug) {
    const posts = await this.getBlogPosts(true);
    return posts.find(p => p.slug === slug) || null;
  },

  async saveBlogPost(post) {
    const posts = getLocal('blog_posts', initialBlogPosts);
    let updated;
    if (post.id) {
      updated = posts.map(p => p.id === post.id ? { ...p, ...post, updated_at: new Date().toISOString() } : p);
    } else {
      const newPost = {
        ...post,
        id: 'blog-' + Date.now(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      updated = [newPost, ...posts];
    }
    setLocal('blog_posts', updated);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('blog_posts').upsert(post);
      } catch (err) {
        console.warn('Supabase blog save warning:', err);
      }
    }
    return post;
  },

  async deleteBlogPost(id) {
    const posts = getLocal('blog_posts', initialBlogPosts);
    const updated = posts.filter(p => p.id !== id);
    setLocal('blog_posts', updated);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('blog_posts').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase blog delete warning:', err);
      }
    }
    return true;
  },

  // --- Contact Messages ---
  async getMessages() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase messages query failed, using local store:', err);
      }
    }
    return getLocal('messages', initialMessages);
  },

  async sendContactMessage(messageData) {
    const newMsg = {
      ...messageData,
      id: 'msg-' + Date.now(),
      is_read: false,
      created_at: new Date().toISOString()
    };
    const messages = getLocal('messages', initialMessages);
    setLocal('messages', [newMsg, ...messages]);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('contact_messages').insert([messageData]);
      } catch (err) {
        console.warn('Supabase contact message send warning:', err);
      }
    }
    return newMsg;
  },

  async markMessageRead(id, isRead = true) {
    const messages = getLocal('messages', initialMessages);
    const updated = messages.map(m => m.id === id ? { ...m, is_read: isRead } : m);
    setLocal('messages', updated);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('contact_messages').update({ is_read: isRead }).eq('id', id);
      } catch (err) {
        console.warn('Supabase message read status warning:', err);
      }
    }
    return true;
  },

  async deleteMessage(id) {
    const messages = getLocal('messages', initialMessages);
    const updated = messages.filter(m => m.id !== id);
    setLocal('messages', updated);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('contact_messages').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase message delete warning:', err);
      }
    }
    return true;
  }
};
