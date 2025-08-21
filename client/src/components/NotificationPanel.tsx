import React from 'react';
import { X, Bell, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNotifications } from '../hooks/useFirestore';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { data: notifications, loading } = useNotifications();

  if (!isOpen) return null;

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 pt-20">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b dark:border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
              <Bell className="text-white" size={20} />
            </div>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
              {t.nav.notifications}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-96">
          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-slate-600 dark:text-slate-300">{t.loading}</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-6 text-center">
              <Bell className="mx-auto mb-4 text-slate-400" size={48} />
              <p className="text-slate-500 dark:text-slate-400">{t.noData.notifications}</p>
            </div>
          ) : (
            <div className="divide-y dark:divide-slate-700">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <div className="flex items-start space-x-3">
                    {notification.thumbnail ? (
                      <img
                        src={notification.thumbnail}
                        alt={notification.heading}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Bell className="text-primary-600 dark:text-primary-400" size={20} />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-slate-800 dark:text-white mb-1 line-clamp-2">
                        {notification.heading}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mb-2 line-clamp-3">
                        {notification.details}
                      </p>
                      <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                        <Clock size={12} className="mr-1" />
                        <span>{formatTimestamp(notification.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-4 border-t dark:border-slate-700 text-center">
            <button
              onClick={onClose}
              className="text-primary-600 dark:text-primary-400 font-medium text-sm hover:underline"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
