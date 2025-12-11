import { sql } from '@/lib/db';
import { getServerSession } from "next-auth/next";
// Pastikan path import ini sesuai dengan lokasi file [...nextauth].js Anda
// Biasanya ada di folder src/pages/api/auth/[...nextauth].js
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  // 1. Cek Keamanan: Pastikan yang melakukan request adalah admin yang sudah login
  // Kita menggunakan getServerSession untuk memverifikasi session di sisi server
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized: Harap login terlebih dahulu.' });
  }

  // 2. Cek Method: Hanya terima request dengan method POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Mengambil data yang dikirim dari form (req.body)
    const { 
      slug, title_en, title_id, description_en, description_id, 
      image_url, github_url, tags_en, tags_id 
    } = req.body;

    // 3. Masukkan data ke NeonDB menggunakan template literal sql``
    // Perhatikan penggunaan JSON.stringify untuk kolom bertipe JSONB (tags_en dan tags_id)
    await sql`
      INSERT INTO projects (
        slug, title_en, title_id, description_en, description_id, 
        image_url, github_url, tags_en, tags_id
      ) VALUES (
        ${slug}, ${title_en}, ${title_id}, ${description_en}, ${description_id}, 
        ${image_url}, ${github_url}, ${JSON.stringify(tags_en)}, ${JSON.stringify(tags_id)}
      );
    `;

    // Kirim respons sukses jika data berhasil masuk
    res.status(200).json({ message: 'Project added successfully!' });
  } catch (error) {
    console.error('Database Error:', error);
    
    // Menangkap error spesifik, misalnya jika slug duplikat (kode unik PostgreSQL 23505)
    if (error.code === '23505') {
       return res.status(400).json({ message: 'Error: Slug project ini sudah ada. Gunakan slug lain.' });
    }
    
    // Kirim respons error umum jika terjadi kesalahan lain
    res.status(500).json({ message: 'Failed to add project', error: error.message });
  }
}