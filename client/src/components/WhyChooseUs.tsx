import React from 'react';
import { BookOpen, Users, Trophy } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const WhyChooseUs: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <BookOpen size={32} />,
      title: t.home.qualityEducation,
      description: t.home.qualityEducationDesc
    },
    {
      icon: <Users size={32} />,
      title: t.home.experiencedFaculty,
      description: t.home.experiencedFacultyDesc
    },
    {
      icon: <Trophy size={32} />,
      title: t.home.holisticDevelopment,
      description: t.home.holisticDevelopmentDesc
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            {t.home.whyChooseUs}
          </h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-600 transition-colors duration-300">
                <div className="text-primary-600 group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
