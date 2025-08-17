import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ lang, setLang }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'id' : 'en';
    localStorage.setItem('lang', newLang);
    setLang(newLang);
    // Dispatch custom event agar komponen lain tahu bahasa berubah
    window.dispatchEvent(new Event('languageChanged'));
  };

  const navLinks = [
    { href: '#about', key: 'nav.about', en: 'About', id: 'Tentang Saya' },
    { href: '#projects', key: 'nav.projects', en: 'Projects', id: 'Proyek' },
    { href: '#skills', key: 'nav.skills', en: 'Skills', id: 'Keahlian' },
    { href: '#contact', key: 'nav.contact', en: 'Contact', id: 'Kontak' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'glass-effect' : ''}`}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" aria-label="Home">
          <img src="/tahajjadan.png" alt="Logo Rahim Haq" className="h-9 md:h-10 w-auto" />
        </a>
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <a key={link.key} href={link.href} className="text-slate-600 hover:text-primary transition">{lang === 'en' ? link.en : link.id}</a>
          ))}
          <a href="https://drive.google.com/file/d/1drl44u_OzYlp_Uluz8EB7mLWTbVLpxvd/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="hidden lg:inline-block bg-primary hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition">
            {lang === 'en' ? 'View CV' : 'Lihat CV'}
          </a>
          <button onClick={toggleLanguage} className="text-xs px-3 py-1 border rounded-full hover-glow" aria-label="Toggle language">
            {lang === 'en' ? 'ID' : 'EN'}
          </button>
        </div>
        <button onClick={() => setMenuOpen(!isMenuOpen)} className="md:hidden z-10">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white">
          {navLinks.map(link => (
            <a key={link.key} href={link.href} onClick={() => setMenuOpen(false)} className="block py-2 px-6 text-sm hover:bg-slate-50">{lang === 'en' ? link.en : link.id}</a>
          ))}
          <a href="https://drive.google.com/file/d/1drl44u_OzYlp_Uluz8EB7mLWTbVLpxvd/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="block py-2 px-6 text-sm hover:bg-slate-50">{lang === 'en' ? 'View CV' : 'Lihat CV'}</a>
          <button onClick={toggleLanguage} className="m-3 text-xs px-3 py-1 border rounded-full hover-glow">
            {lang === 'en' ? 'ID' : 'EN'}
          </button>
        </div>
      )}
    </header>
  );
};
export default Navbar;
