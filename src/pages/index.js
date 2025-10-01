import { useState, useEffect } from 'react';

// Hapus import supabase
// import { supabase } from '@/lib/supabase';

// Import koneksi baru dari NeonDB
import { sql } from '@/lib/db';

import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/layout/Footer';
import ToTopButton from '@/components/ToTopButton';

export async function getStaticProps() {
  try {
    // Ambil data konten (About Me, dll) dengan query SQL standar
    const contentRows = await sql('SELECT element_key, text_en, text_id FROM site_content');

    // Ubah format data agar sesuai dengan yang dibutuhkan komponen
    const siteContent = contentRows.reduce((acc, row) => {
      acc[row.element_key] = { en: row.text_en, id: row.text_id };
      return acc;
    }, {});

    // Ambil data proyek dengan query SQL standar
    const projects = await sql('SELECT * FROM projects ORDER BY id');

    return {
      props: {
        siteContent,
        projects,
      },
      revalidate: 60, // Periksa pembaruan setiap 60 detik
    };
  } catch (error) {
    console.error('Failed to fetch data from NeonDB:', error);
    // Jika database error, kembalikan props kosong agar halaman tidak rusak
    return {
      props: {
        siteContent: {},
        projects: [],
      },
      revalidate: 10,
    };
  }
}


export default function Home({ siteContent, projects }) {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'en';
    setLang(savedLang);

    const handleStorageChange = () => {
      setLang(localStorage.getItem('lang') || 'en');
    };

    window.addEventListener('languageChanged', handleStorageChange);
    return () => {
      window.removeEventListener('languageChanged', handleStorageChange);
    };
  }, []);
  
  // Hapus bagian `texts` karena data sudah diformat di getStaticProps
  // const texts = site_content.reduce(...)

  return (
    <>
      <Navbar lang={lang} setLang={setLang} />
      <main className="container mx-auto px-6">
        <Hero texts={siteContent} lang={lang} />
        <About texts={siteContent} lang={lang} />
        <Projects projects={projects} lang={lang} />
        <Skills lang={lang} />
        <Contact texts={siteContent} lang={lang} />
      </main>
      <Footer lang={lang} />
      <ToTopButton />
    </>
  );
}
