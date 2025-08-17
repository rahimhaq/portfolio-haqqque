import { Linkedin, Github, Instagram } from 'lucide-react';

const Contact = ({ texts, lang }) => {
  return (
    <section id="contact" className="py-20 text-center">
      <h2 className="text-3xl font-bold">{lang === 'en' ? 'Get In Touch' : 'Hubungi Saya'}</h2>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
        {lang === 'en' 
          ? "I’m open to discuss new projects, creative ideas, or ways to bring your vision to life. Feel free to reach out!" 
          : "Terbuka untuk diskusi proyek baru, ide kreatif, atau kolaborasi mewujudkan visi Anda. Jangan ragu menghubungi!"}
      </p>
      <a href="mailto:rahimtahajjadanzahirhaq@gmail.com" className="mt-8 inline-block bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition text-lg hover-glow">
        {lang === 'en' ? 'Send Email' : 'Kirim Email'}
      </a>
      <div className="mt-12 flex justify-center gap-6">
        <a href="https://linkedin.com/in/rahimhaq" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary"><Linkedin className="w-8 h-8"/></a>
        <a href="https://github.com/rahimhaq" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary"><Github className="w-8 h-8"/></a>
        <a href="https://www.instagram.com/rahimhaq" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary"><Instagram className="w-8 h-8"/></a>
      </div>
    </section>
  );
};

export default Contact;
