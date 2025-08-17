import pool from '@/lib/db';

export default async function handler(req, res) {
  try {
    // Mengambil semua teks dari tabel site_content
    const [texts] = await pool.query('SELECT element_key, text_en, text_id FROM site_content');
    
    // Mengambil semua proyek dari tabel projects
    const [projects] = await pool.query('SELECT * FROM projects');

    // Mengubah array teks menjadi objek agar mudah diakses
    const contentData = texts.reduce((acc, item) => {
      acc[item.element_key] = {
        en: item.text_en,
        id: item.text_id,
      };
      return acc;
    }, {});

    res.status(200).json({
      texts: contentData,
      projects: projects,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}