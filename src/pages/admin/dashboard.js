import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false); // State untuk loading upload

  // ==========================================
  // 👇 GANTI 2 BARIS INI DENGAN DATA ASLI ANDA 👇
  // ==========================================
  const CLOUD_NAME = 'dfjzg38an'; 
  const UPLOAD_PRESET = 'portfolio_uploads'; 
  // ==========================================

  const [formData, setFormData] = useState({
    slug: '',
    image_url: '',
    github_url: '',
    title_en: '',
    title_id: '',
    description_en: '',
    description_id: '',
    tags_string: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Logika Upload ke Cloudinary (KEMBALI ADA)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('upload_preset', UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formDataUpload,
      });
      const data = await res.json();
      
      if (data.secure_url) {
        setFormData((prev) => ({ ...prev, image_url: data.secure_url }));
        alert('Gambar berhasil diupload ke Cloudinary!');
      } else {
        console.error('Cloudinary Error:', data);
        alert(`Gagal upload: ${data.error?.message || 'Cek Cloud Name & Preset Anda'}`);
      }
    } catch (error) {
      console.error('Upload Error:', error);
      alert('Terjadi kesalahan koneksi saat upload gambar.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const tagsArray = formData.tags_string
      ? formData.tags_string.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
      : [];

    const payload = {
      ...formData,
      tags_en: tagsArray,
      tags_id: tagsArray,
    };

    try {
      const res = await fetch('/api/projects/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Sukses! Project berhasil ditambahkan ke Database.');
        setFormData({
          slug: '',
          image_url: '',
          github_url: '',
          title_en: '',
          title_id: '',
          description_en: '',
          description_id: '',
          tags_string: '',
        });
      } else {
        alert(`Gagal simpan ke DB: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan koneksi ke server.');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard Admin</h1>
          <button onClick={() => signOut()} className="text-red-600 font-semibold">Logout</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Slug URL</label>
              <input name="slug" required value={formData.slug} onChange={handleChange} className="w-full border p-2 rounded" placeholder="my-project" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">GitHub URL</label>
              <input name="github_url" value={formData.github_url} onChange={handleChange} className="w-full border p-2 rounded" placeholder="https://github.com/..." />
            </div>
          </div>

          {/* Upload Gambar (KEMBALI ADA) */}
          <div className="bg-blue-50 p-4 rounded border border-blue-200">
            <label className="block text-sm font-bold text-blue-800 mb-2">Upload Gambar Project</label>
            <div className="flex items-center gap-4">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
              />
              {uploading && <span className="text-blue-600 animate-pulse font-bold">Mengupload...</span>}
            </div>
            
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">Atau masukkan URL manual:</p>
              <input name="image_url" value={formData.image_url} onChange={handleChange} className="w-full border p-2 rounded text-sm" placeholder="https://..." />
            </div>

            {formData.image_url && (
              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-1">Preview:</p>
                <img src={formData.image_url} alt="Preview" className="h-32 object-cover rounded border" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input name="title_en" required value={formData.title_en} onChange={handleChange} className="border p-2 rounded" placeholder="Title (EN)" />
            <input name="title_id" required value={formData.title_id} onChange={handleChange} className="border p-2 rounded" placeholder="Title (ID)" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <textarea name="description_en" required rows="3" value={formData.description_en} onChange={handleChange} className="border p-2 rounded" placeholder="Desc (EN)" />
            <textarea name="description_id" required rows="3" value={formData.description_id} onChange={handleChange} className="border p-2 rounded" placeholder="Desc (ID)" />
          </div>

          <input name="tags_string" value={formData.tags_string} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Tags: React, Next.js" />

          <button disabled={loading || uploading} type="submit" className={`w-full py-3 rounded text-white font-bold ${loading || uploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
            {loading ? 'Menyimpan...' : 'Simpan Project'}
          </button>
        </form>
      </div>
    </div>
  );
}