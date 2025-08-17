import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';

import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/layout/Footer';
import ToTopButton from '@/components/ToTopButton';

export async function getStaticProps() {
  const { data: site_content, error: contentError } = await supabase.from('site_content').select('*');
  const { data: projects, error: projectsError } = await supabase.from('projects').select('*');

  if (contentError || projectsError) {
    console.error(contentError || projectsError);
  }

  return {
    props: {
      site_content: site_content || [],
      projects: projects || [],
    },
    revalidate: 60,
  };
}

export default function Home({ site_content, projects }) {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'en';
    setLang(savedLang);

    const handleStorageChange = () => {
      setLang(localStorage.getItem('lang') || 'en');
    };

    // Menggunakan 'languageChanged' event yang kita buat di Navbar
    window.addEventListener('languageChanged', handleStorageChange);
    return () => {
      window.removeEventListener('languageChanged', handleStorageChange);
    };
  }, []);

  const texts = site_content.reduce((acc, item) => {
    acc[item.element_key] = {
      en: item.text_en,
      id: item.text_id,
    };
    return acc;
  }, {});

  return (
    <>
      <Navbar lang={lang} setLang={setLang} />
      <main className="container mx-auto px-6">
        <Hero texts={texts} lang={lang} />
        <About texts={texts} lang={lang} />
        <Projects projects={projects} lang={lang} />
        <Skills lang={lang} />
        <Contact texts={texts} lang={lang} />
      </main>
      <Footer lang={lang} />
      <ToTopButton />
    </>
  );
}
