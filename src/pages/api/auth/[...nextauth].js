import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Kita export authOptions agar bisa digunakan di API route lain (untuk proteksi)
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Admin Login',
      credentials: {
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Cek apakah password sesuai dengan yang ada di .env.local
        if (credentials.password === process.env.ADMIN_PASSWORD) {
          // Jika benar, kembalikan user admin
          return { id: 1, name: "Admin", email: "admin@rahimhaq.com" };
        }
        // Jika salah, return null
        return null;
      }
    })
  ],
  pages: {
    signIn: '/admin/login', // Mengarahkan ke halaman login kustom kita
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);