import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github } from 'lucide-react';

// --- KOMPONEN MODAL (DETAIL PROYEK) ---
const ProjectModal = ({ project, lang, onClose }) => {
    if (!project) return null;

    // Memilih konten modal berdasarkan bahasa yang aktif
    const modalContent = lang === 'en' ? project.modal_content_en : project.modal_content_id;
    
    return (
        <motion.div 
            className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-[60]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div 
                className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 relative border shadow-xl"
                onClick={e => e.stopPropagation()}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ type: 'spring', damping: 20, stiffness: 150 }}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-900"><X className="w-8 h-8" /></button>
                
                <h2 className="text-3xl font-bold mb-2">{project[`title_${lang}`]}</h2>
                <p className="text-primary mb-6">{modalContent?.role}</p>
                
                <h3 className="text-xl font-semibold mt-8 mb-2">{lang === 'en' ? 'Project Challenge' : 'Tantangan Proyek'}</h3>
                <p className="text-slate-700">{modalContent?.challenge}</p>

                <h3 className="text-xl font-semibold mt-8 mb-2">{lang === 'en' ? 'Solution & Development' : 'Solusi & Proses'}</h3>
                <div className="space-y-6 text-slate-700">
                    {modalContent?.solution?.map(step => (
                        <div key={step.title}>
                            <h4 className="font-semibold text-slate-900">{step.title}</h4>
                            <p>{step.desc}</p>
                            {step.images && (
                                <div className={`grid ${step.images.length > 1 ? 'md:grid-cols-2' : ''} gap-4 mt-4`}>
                                    {step.images.map(img => <img key={img} src={img} alt={step.title} className="rounded-lg border" />)}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                
                <div className="mt-8 text-center">
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="bg-primary hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition inline-flex items-center gap-2 hover-glow">
                        <Github /> <span>{lang === 'en' ? 'View Code on GitHub' : 'Lihat Kode di GitHub'}</span>
                    </a>
                </div>
            </motion.div>
        </motion.div>
    );
};

// --- KOMPONEN KARTU PROYEK ---
const ProjectCard = ({ project, lang, onClick }) => {
    return (
        <motion.div 
            className="rounded-lg overflow-hidden shadow border bg-white group cursor-pointer flex flex-col"
            onClick={() => onClick(project)}
            whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.05)"}}
        >
            <div className="overflow-hidden h-56">
                <img src={project.image_url} alt={project[`title_${lang}`]} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold">{project[`title_${lang}`]}</h3>
                <p className="mt-2 text-slate-600 text-sm flex-grow">{project[`description_${lang}`]}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {project[`tags_${lang}`]?.map(tag => <span key={tag} className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full">{tag}</span>)}
                </div>
                <div className="mt-6 flex gap-4">
                    <button className="w-full bg-primary hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition">{lang === 'en' ? 'View Details' : 'Lihat Detail'}</button>
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="w-full border border-primary text-primary font-medium py-2 px-4 rounded-lg transition text-center hover-glow">{lang === 'en' ? 'Code' : 'Kode'}</a>
                </div>
            </div>
        </motion.div>
    );
};

// --- KOMPONEN UTAMA (SECTIONS) ---
const Projects = ({ projects, lang }) => {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <section id="projects" className="py-20">
            <h2 className="text-3xl font-bold text-center mb-12">{lang === 'en' ? 'Featured Projects' : 'Proyek Unggulan'}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map(p => <ProjectCard key={p.id} project={p} onClick={setSelectedProject} lang={lang} />)}
            </div>
            
            {/* INI BAGIAN YANG DIKEMBALIKAN */}
            <AnimatePresence>
                {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} lang={lang} />}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
