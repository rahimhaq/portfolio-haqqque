// Ganti import default menjadi named import untuk fungsi 'sql'
import { sql } from '@/lib/db';

export default async function handler(req, res) {
  try {
    // Gunakan fungsi 'sql' yang sudah diimpor untuk melakukan query
    const siteContent = await sql('SELECT element_key, text_en, text_id FROM site_content');
    
    // Kirim data sebagai response JSON
    res.status(200).json(siteContent);
  } catch (error) {
    console.error('API route error:', error);
    res.status(500).json({ message: 'Failed to fetch content' });
  }
}
