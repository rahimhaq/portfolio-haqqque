import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button 
            onClick={scrollToTop}
            className={`fixed bottom-5 right-5 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            aria-label="Back to top"
        >
            <ArrowUp />
        </button>
    );
};

export default ToTopButton;