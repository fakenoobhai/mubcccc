import React from 'react';
import { GraduationCap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-800 dark:bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <GraduationCap className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold">MUBC</h3>
                <p className="text-sm text-slate-300">Since 1969</p>
              </div>
            </div>
            <p className="text-slate-300 mb-4">
              Empowering students with quality education and values for over 50 years.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors">
                <i className="fab fa-facebook-f text-sm"></i>
              </a>
              <a href="#" className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors">
                <i className="fab fa-youtube text-sm"></i>
              </a>
              <a href="#" className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors">
                <i className="fab fa-instagram text-sm"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => handleScrollTo('about')}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {t.nav.aboutUs}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScrollTo('academics')}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {t.nav.academics}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScrollTo('teachers')}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {t.nav.teachers}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScrollTo('notices')}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {t.nav.notices}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScrollTo('contact')}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {t.nav.contactUs}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <div className="space-y-3">
              <p className="text-slate-300 flex items-center">
                <i className="fas fa-map-marker-alt mr-3 text-primary-400"></i>
                Monipur, Mirpur-2, Dhaka-1216
              </p>
              <p className="text-slate-300 flex items-center">
                <i className="fas fa-phone mr-3 text-primary-400"></i>
                {t.contact.phone}
              </p>
              <p className="text-slate-300 flex items-center">
                <i className="fas fa-envelope mr-3 text-primary-400"></i>
                {t.contact.email}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-300">
            © 2024 Monipur Uccha Bidyalaya & College. {t.footer.rightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
