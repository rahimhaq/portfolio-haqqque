import { useState, useEffect } from 'react';
import { sql } from '@/lib/db'; // Import koneksi NeonDB

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
    // 1. Ambil data konten
    const contentRows = await sql('SELECT element_key, text_en, text_id FROM site_content');

    // Format data konten menjadi object
    const siteContent = contentRows.reduce((acc, row) => {
      acc[row.element_key] = { en: row.text_en, id: row.text_id };
      return acc;
    }, {});

    // 2. Ambil data proyek
    // UBAH: Tambahkan DESC agar project terbaru muncul di awal
    const projects = await sql('SELECT * FROM projects ORDER BY id DESC');

    return {
      props: {
        siteContent,
        projects: JSON.parse(JSON.stringify(projects)), // Serialisasi data tanggal/objek kompleks agar aman
      },
      revalidate: 10, // Update halaman setiap 10 detik jika ada request baru
    };
  } catch (error) {
    console.error('Failed to fetch data from NeonDB:', error);
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

  return (
    <>
      <Navbar lang={lang} setLang={setLang} />
      <main className="container mx-auto px-6">
        {/* Pass siteContent ke komponen yang butuh teks dinamis */}
        <Hero texts={siteContent} lang={lang} />
        <About texts={siteContent} lang={lang} />
        
        {/* Pass projects dari database ke komponen Projects */}
        <Projects projects={projects} lang={lang} />
        
        <Skills lang={lang} />
        <Contact texts={siteContent} lang={lang} />
      </main>
      <Footer lang={lang} />
      <ToTopButton />
    </>
  );
}