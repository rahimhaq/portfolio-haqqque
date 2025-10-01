import { sql } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // panggil sql sebagai fungsi biasa (bukan tagged template)
    const siteContent = await sql(
      'SELECT element_key, text_en, text_id FROM site_content;'
    );

    res.status(200).json(siteContent); // siteContent sudah array of rows
  } catch (error) {
    console.error('API route error:', error);
    res.status(500).json({ message: 'Failed to fetch site content' });
  }
}
