const About = ({ texts, lang }) => {
  return (
    <section id="about" className="py-20">
      <h2 className="text-3xl font-bold text-center mb-12">{lang === 'en' ? 'About Me' : 'Tentang Saya'}</h2>
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 items-center">
        <div className="md:col-span-1 flex justify-center">
          <img src="/RahimHaq.png" alt="Rahim Haq" className="rounded-lg w-48 md:w-full max-w-xs object-cover border shadow-lg" />
        </div>
        <div className="md:col-span-2 space-y-4">
          <p className="text-lg text-justify text-slate-700">{texts['about.p1']?.[lang]}</p>
          <p className="text-lg text-justify text-slate-700">{texts['about.p2']?.[lang]}</p>
          <p className="text-lg text-justify text-slate-700">{texts['about.p3']?.[lang]}</p>
        </div>
      </div>
    </section>
  );
};
export default About;
