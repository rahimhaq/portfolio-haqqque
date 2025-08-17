import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

const Hero = ({ texts, lang }) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-24 md:pt-28">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">{lang === 'en' ? 'Rahiim Tahajjadan Z. Haq' : 'Rahiim Tahajjadan Z. Haq'}</h1>
        <h2 className="text-2xl md:text-4xl font-medium text-primary mt-2">{lang === 'en' ? 'Embedded Systems & Full-Stack Developer' : 'Embedded Systems & Full-Stack Developer'}</h2>
        <p className="mt-6 text-lg max-w-2xl mx-auto text-slate-600">
          {lang === 'en' 
            ? 'Bachelor of Applied Computer Engineering Technology from IPB University with dual specialization in Embedded Systems and Full Stack Web Development.' 
            : 'Sarjana Terapan Teknologi Rekayasa Komputer dari IPB University dengan spesialisasi ganda dalam Sistem Tertanam (Embedded Systems) dan Pengembangan Web Full Stack.'}
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <a href="#contact" className="bg-primary hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition hover-glow">
            {lang === 'en' ? 'Contact Me' : 'Hubungi Saya'}
          </a>
          <a href="https://github.com/rahimhaq" target="_blank" rel="noopener noreferrer" className="border border-primary text-primary hover-glow font-semibold py-3 px-6 rounded-lg transition flex items-center gap-2">
            <Github size={20} />
            <span>GitHub</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
