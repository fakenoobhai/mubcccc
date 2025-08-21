import React from 'react';
import { School, Book, TrendingUp, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const AcademicsSection: React.FC = () => {
  const { t } = useLanguage();

  const getSectionIcon = (index: number) => {
    switch (index) {
      case 0:
        return <School className="text-white" size={24} />;
      case 1:
        return <Book className="text-white" size={24} />;
      case 2:
        return <TrendingUp className="text-white" size={24} />;
      default:
        return <School className="text-white" size={24} />;
    }
  };

  return (
    <section id="academics" className="py-20 bg-white dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            {t.academics.title}
          </h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.academics.sections.map((section, index) => (
            <div key={index} className="bg-slate-50 dark:bg-slate-700 p-8 rounded-xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mr-4">
                  {getSectionIcon(index)}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                  {section.name}
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                {section.description}
              </p>
              <ul className="space-y-2">
                {section.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-center text-slate-600 dark:text-slate-300">
                    <Check className="text-primary-600 mr-3" size={16} />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AcademicsSection;
