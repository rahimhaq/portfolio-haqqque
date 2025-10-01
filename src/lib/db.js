    import { sql } from '@/lib/db';

    export default async function handler(req, res) {
      // Periksa jika metodenya bukan GET
      if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
      }

      try {
        // Gunakan fungsi 'sql' untuk mengambil data dari database
        const { rows: siteContent } = await sql`SELECT element_key, text_en, text_id FROM site_content;`;
        
        // Kirim data sebagai response JSON
        res.status(200).json(siteContent);
      } catch (error) {
        console.error('API route error:', error);
        res.status(500).json({ message: 'Failed to fetch site content' });
      }
    }