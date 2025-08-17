import mysql from 'mysql2/promise';

// Membuat satu koneksi yang bisa digunakan kembali (pooling)
// Ini sangat penting untuk performa di lingkungan serverless seperti Vercel
const pool = mysql.createPool(process.env.DATABASE_URL);

export default pool;