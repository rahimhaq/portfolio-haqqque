const Footer = ({ lang }) => {
    return (
        <footer className="border-t">
            <div className="container mx-auto px-6 py-6 text-center text-slate-500">
                <p>{lang === 'en' ? '© 2025 Rahim Tahajjadan Zhaahir Haq. Built with passion (and coffee).' : '© 2025 Rahiim Tahajjadan Zhaahir Haq. Dibuat dengan semangat (dan kopi).'}</p>
            </div>
        </footer>
    );
};

export default Footer;
