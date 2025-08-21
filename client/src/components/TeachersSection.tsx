import React from 'react';
import { ArrowRight, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTeachers } from '../hooks/useFirestore';

const TeachersSection: React.FC = () => {
  const { t } = useLanguage();
  const { data: teachers, loading } = useTeachers();

  const displayTeachers = teachers.slice(0, 6); // Show first 6 teachers

  if (loading) {
    return (
      <section id="teachers" className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-8 bg-slate-300 dark:bg-slate-600 rounded w-48 mx-auto mb-4"></div>
            <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-64 bg-slate-300 dark:bg-slate-600"></div>
                <div className="p-6">
                  <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded mb-2"></div>
                  <div className="h-3 bg-slate-300 dark:bg-slate-600 rounded mb-1 w-3/4"></div>
                  <div className="h-3 bg-slate-300 dark:bg-slate-600 rounded mb-3 w-1/2"></div>
                  <div className="h-3 bg-slate-300 dark:bg-slate-600 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="teachers" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            {t.home.ourTeachers}
          </h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Meet our dedicated and experienced faculty members who are committed to providing quality education.
          </p>
        </div>

        {displayTeachers.length === 0 ? (
          <div className="text-center py-16">
            <User className="mx-auto mb-4 text-slate-400" size={48} />
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              {t.noData.teachers}
            </p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayTeachers.map((teacher) => (
                <div 
                  key={teacher.id} 
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative">
                    <img 
                      src={teacher.imageUrl} 
                      alt={teacher.name}
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                      {teacher.name}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium mb-1">
                      {teacher.designation}
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">
                      {teacher.subject}
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3">
                      {teacher.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-300">
                <span>{t.home.viewAllTeachers}</span>
                <ArrowRight className="inline ml-2" size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TeachersSection;
