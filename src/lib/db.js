import { Pool } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// ✅ default export untuk kompatibilitas impor lama: import pool from '@/lib/db'
export default pool;

// ✅ named export 'sql' yang kamu pakai sekarang
export async function sql(query, params = []) {
  const client = await pool.connect();
  try {
    const result = await client.query(query, params);
    return result.rows;
  } finally {
    client.release();
  }
}

// (opsional) kalau mau juga expose named 'pool'
export { pool };
