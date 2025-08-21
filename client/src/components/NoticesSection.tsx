import React from 'react';
import { ArrowRight, FileText, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNotices } from '../hooks/useFirestore';

const NoticesSection: React.FC = () => {
  const { t } = useLanguage();
  const { data: notices, loading } = useNotices();

  const displayNotices = notices.slice(0, 6); // Show first 6 notices

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getNoticeCategory = (index: number) => {
    const categories = [
      { name: 'Important', color: 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400' },
      { name: 'Academic', color: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' },
      { name: 'Event', color: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400' }
    ];
    return categories[index % categories.length];
  };

  if (loading) {
    return (
      <section id="notices" className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-8 bg-slate-300 dark:bg-slate-600 rounded w-64 mx-auto mb-4"></div>
            <div className="w-20 h-1 bg-primary-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 animate-pulse">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-6 bg-slate-300 dark:bg-slate-600 rounded w-20"></div>
                  <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-16"></div>
                </div>
                <div className="h-6 bg-slate-300 dark:bg-slate-600 rounded mb-3"></div>
                <div className="space-y-2 mb-4">
                  <div className="h-3 bg-slate-300 dark:bg-slate-600 rounded"></div>
                  <div className="h-3 bg-slate-300 dark:bg-slate-600 rounded w-3/4"></div>
                </div>
                <div className="h-4 bg-slate-300 dark:bg-slate-600 rounded w-24"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="notices" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
            {t.home.latestNewsNotices}
          </h2>
          <div className="w-20 h-1 bg-primary-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Stay updated with the latest announcements and important information.
          </p>
        </div>

        {displayNotices.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="mx-auto mb-4 text-slate-400" size={48} />
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              {t.noData.notices}
            </p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayNotices.map((notice, index) => {
                const category = getNoticeCategory(index);
                
                return (
                  <div 
                    key={notice.id}
                    className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${category.color}`}>
                        {category.name}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 text-sm flex items-center">
                        <Calendar className="mr-1" size={14} />
                        {formatDate(notice.date)}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">
                      {notice.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3">
                      {notice.content}
                    </p>
                    <button className="text-primary-600 dark:text-primary-400 font-medium text-sm hover:underline">
                      <span>{t.home.readMore}</span>
                      <ArrowRight className="inline ml-1" size={14} />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-300">
                <span>{t.home.viewAllNotices}</span>
                <ArrowRight className="inline ml-2" size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default NoticesSection;
