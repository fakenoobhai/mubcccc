import React, { useState } from 'react';
import { 
  X, 
  Users, 
  FileText, 
  Image as ImageIcon, 
  Monitor, 
  Bell,
  Edit,
  Trash2,
  Plus,
  Save,
  ShieldQuestion,
  LogOut
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTeachers, useNotices, useGalleryImages, useHeroSlides, useNotifications } from '../hooks/useFirestore';
import { useToast } from '../hooks/use-toast';
import { Teacher, Notice, GalleryImage, HeroSlide, Notification } from '../types';

interface AdminPanelProps {
  onClose: () => void;
  onLogout: () => void;
}

type AdminSection = 'teachers' | 'notices' | 'gallery' | 'heroSlides' | 'notifications';

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, onLogout }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<AdminSection>('teachers');
  
  // Data hooks
  const { data: teachers, add: addTeacher, update: updateTeacher, remove: removeTeacher } = useTeachers();
  const { data: notices, add: addNotice, update: updateNotice, remove: removeNotice } = useNotices();
  const { data: galleryImages, add: addGalleryImage, remove: removeGalleryImage } = useGalleryImages();
  const { data: heroSlides, add: addHeroSlide, update: updateHeroSlide, remove: removeHeroSlide } = useHeroSlides();
  const { data: notifications, add: addNotification, remove: removeNotification } = useNotifications();

  // Form states
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [editingHeroSlide, setEditingHeroSlide] = useState<HeroSlide | null>(null);
  const [teacherForm, setTeacherForm] = useState({
    name: '',
    designation: '',
    subject: '',
    imageUrl: '',
    bio: ''
  });
  const [noticeForm, setNoticeForm] = useState({
    title: '',
    content: '',
    imageUrl: ''
  });
  const [galleryForm, setGalleryForm] = useState({
    imageUrl: '',
    alt: ''
  });
  const [heroSlideForm, setHeroSlideForm] = useState({
    imageUrl: '',
    caption: ''
  });
  const [notificationForm, setNotificationForm] = useState({
    thumbnail: '',
    heading: '',
    details: ''
  });

  const handleLogout = () => {
    onLogout();
  };

  // Teacher Management
  const handleAddTeacher = async () => {
    if (teacherForm.name && teacherForm.designation) {
      const success = await addTeacher(teacherForm as Omit<Teacher, 'id'>);
      if (success) {
        toast({ title: "Success", description: t.admin.teacherAdded });
        setTeacherForm({ name: '', designation: '', subject: '', imageUrl: '', bio: '' });
      }
    }
  };

  const handleUpdateTeacher = async () => {
    if (editingTeacher) {
      const success = await updateTeacher(editingTeacher.id, teacherForm);
      if (success) {
        toast({ title: "Success", description: t.admin.teacherUpdated });
        setEditingTeacher(null);
        setTeacherForm({ name: '', designation: '', subject: '', imageUrl: '', bio: '' });
      }
    }
  };

  const handleDeleteTeacher = async (id: string) => {
    if (window.confirm(t.admin.confirmDeleteTeacher)) {
      const success = await removeTeacher(id);
      if (success) {
        toast({ title: "Success", description: "Teacher deleted successfully!" });
      } else {
        toast({ title: "Error", description: t.admin.teacherDeleteFailed, variant: "destructive" });
      }
    }
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setTeacherForm({
      name: teacher.name,
      designation: teacher.designation,
      subject: teacher.subject,
      imageUrl: teacher.imageUrl,
      bio: teacher.bio
    });
  };

  // Notice Management
  const handleAddNotice = async () => {
    if (noticeForm.title && noticeForm.content) {
      const success = await addNotice({ ...noticeForm, date: new Date() } as Omit<Notice, 'id'>);
      if (success) {
        toast({ title: "Success", description: t.admin.noticeAdded });
        setNoticeForm({ title: '', content: '', imageUrl: '' });
      }
    }
  };

  const handleUpdateNotice = async () => {
    if (editingNotice) {
      const success = await updateNotice(editingNotice.id, noticeForm);
      if (success) {
        toast({ title: "Success", description: t.admin.noticeUpdated });
        setEditingNotice(null);
        setNoticeForm({ title: '', content: '', imageUrl: '' });
      }
    }
  };

  const handleDeleteNotice = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      const success = await removeNotice(id);
      if (success) {
        toast({ title: "Success", description: "Notice deleted successfully!" });
      } else {
        toast({ title: "Error", description: t.admin.noticeDeleteFailed, variant: "destructive" });
      }
    }
  };

  const handleEditNotice = (notice: Notice) => {
    setEditingNotice(notice);
    setNoticeForm({
      title: notice.title,
      content: notice.content,
      imageUrl: notice.imageUrl || ''
    });
  };

  // Gallery Management
  const handleAddGalleryImage = async () => {
    if (galleryForm.imageUrl && galleryForm.alt) {
      const success = await addGalleryImage(galleryForm as Omit<GalleryImage, 'id'>);
      if (success) {
        toast({ title: "Success", description: t.admin.galleryImageAdded });
        setGalleryForm({ imageUrl: '', alt: '' });
      }
    }
  };

  const handleDeleteGalleryImage = async (id: string) => {
    if (window.confirm(t.admin.confirmDeleteGalleryImage)) {
      const success = await removeGalleryImage(id);
      if (success) {
        toast({ title: "Success", description: "Gallery image deleted successfully!" });
      } else {
        toast({ title: "Error", description: t.admin.galleryImageDeleteFailed, variant: "destructive" });
      }
    }
  };

  // Hero Slide Management
  const handleAddHeroSlide = async () => {
    if (heroSlideForm.imageUrl) {
      const success = await addHeroSlide(heroSlideForm as Omit<HeroSlide, 'id'>);
      if (success) {
        toast({ title: "Success", description: t.admin.heroSlideAdded });
        setHeroSlideForm({ imageUrl: '', caption: '' });
      }
    }
  };

  const handleUpdateHeroSlide = async () => {
    if (editingHeroSlide) {
      const success = await updateHeroSlide(editingHeroSlide.id, heroSlideForm);
      if (success) {
        toast({ title: "Success", description: t.admin.heroSlideUpdated });
        setEditingHeroSlide(null);
        setHeroSlideForm({ imageUrl: '', caption: '' });
      }
    }
  };

  const handleDeleteHeroSlide = async (id: string) => {
    if (window.confirm(t.admin.confirmDeleteHeroSlide)) {
      const success = await removeHeroSlide(id);
      if (success) {
        toast({ title: "Success", description: "Hero slide deleted successfully!" });
      } else {
        toast({ title: "Error", description: t.admin.heroSlideDeleteFailed, variant: "destructive" });
      }
    }
  };

  const handleEditHeroSlide = (slide: HeroSlide) => {
    setEditingHeroSlide(slide);
    setHeroSlideForm({
      imageUrl: slide.imageUrl,
      caption: slide.caption || ''
    });
  };

  // Notification Management
  const handleAddNotification = async () => {
    if (notificationForm.heading && notificationForm.details) {
      const success = await addNotification({ ...notificationForm, timestamp: new Date() } as Omit<Notification, 'id'>);
      if (success) {
        toast({ title: "Success", description: t.admin.notificationSent });
        setNotificationForm({ thumbnail: '', heading: '', details: '' });
      } else {
        toast({ title: "Error", description: t.admin.notificationFailed, variant: "destructive" });
      }
    }
  };

  const handleDeleteNotification = async (id: string) => {
    if (window.confirm(t.admin.confirmDeleteNotification)) {
      const success = await removeNotification(id);
      if (success) {
        toast({ title: "Success", description: "Notification deleted successfully!" });
      } else {
        toast({ title: "Error", description: t.admin.notificationDeleteFailed, variant: "destructive" });
      }
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'teachers':
        return (
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
                {editingTeacher ? t.admin.updateTeacher : t.admin.addTeacher}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={t.admin.teacherName}
                  value={teacherForm.name}
                  onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
                />
                <input
                  type="text"
                  placeholder={t.admin.teacherDesignation}
                  value={teacherForm.designation}
                  onChange={(e) => setTeacherForm({ ...teacherForm, designation: e.target.value })}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
                />
                <input
                  type="text"
                  placeholder={t.admin.teacherSubject}
                  value={teacherForm.subject}
                  onChange={(e) => setTeacherForm({ ...teacherForm, subject: e.target.value })}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
                />
                <input
                  type="url"
                  placeholder={t.admin.teacherImageUrl}
                  value={teacherForm.imageUrl}
                  onChange={(e) => setTeacherForm({ ...teacherForm, imageUrl: e.target.value })}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
                />
              </div>
              <textarea
                placeholder={t.admin.teacherBio}
                value={teacherForm.bio}
                onChange={(e) => setTeacherForm({ ...teacherForm, bio: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg mt-4 dark:bg-slate-700 dark:text-white"
              />
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={editingTeacher ? handleUpdateTeacher : handleAddTeacher}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center"
                >
                  <Save className="mr-2" size={16} />
                  {editingTeacher ? t.admin.updateTeacher : t.admin.addTeacher}
                </button>
                {editingTeacher && (
                  <button
                    onClick={() => {
                      setEditingTeacher(null);
                      setTeacherForm({ name: '', designation: '', subject: '', imageUrl: '', bio: '' });
                    }}
                    className="px-6 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600"
                  >
                    {t.admin.cancelEdit}
                  </button>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
                {t.admin.currentTeachers}
              </h3>
              <div className="grid gap-4">
                {teachers.map((teacher) => (
                  <div key={teacher.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img
                        src={teacher.imageUrl}
                        alt={teacher.name}
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300';
                        }}
                      />
                      <div>
                        <h4 className="font-semibold text-slate-800 dark:text-white">{teacher.name}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{teacher.designation}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditTeacher(teacher)}
                        className="p-2 text-primary-600 hover:bg-primary-100 dark:hover:bg-primary-900 rounded-lg"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteTeacher(teacher.id)}
                        className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'notices':
        return (
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
                {editingNotice ? t.admin.updateNotice : t.admin.addNotice}
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder={t.admin.noticeTitle}
                  value={noticeForm.title}
                  onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
                />
                <input
                  type="url"
                  placeholder={t.admin.noticeImageUrl}
                  value={noticeForm.imageUrl}
                  onChange={(e) => setNoticeForm({ ...noticeForm, imageUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
                />
                <textarea
                  placeholder={t.admin.noticeContent}
                  value={noticeForm.content}
                  onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={editingNotice ? handleUpdateNotice : handleAddNotice}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center"
                >
                  <Save className="mr-2" size={16} />
                  {editingNotice ? t.admin.updateNotice : t.admin.addNotice}
                </button>
                {editingNotice && (
                  <button
                    onClick={() => {
                      setEditingNotice(null);
                      setNoticeForm({ title: '', content: '', imageUrl: '' });
                    }}
                    className="px-6 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600"
                  >
                    {t.admin.cancelEdit}
                  </button>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
                {t.admin.currentNotices}
              </h3>
              <div className="grid gap-4">
                {notices.map((notice) => (
                  <div key={notice.id} className="flex items-start justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800 dark:text-white mb-2">{notice.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-2">{notice.content}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {notice.date.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEditNotice(notice)}
                        className="p-2 text-primary-600 hover:bg-primary-100 dark:hover:bg-primary-900 rounded-lg"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteNotice(notice.id)}
                        className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
                {t.admin.addGalleryImage}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="url"
                  placeholder={t.admin.galleryImageUrl}
                  value={galleryForm.imageUrl}
                  onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
                />
                <input
                  type="text"
                  placeholder={t.admin.galleryImageAlt}
                  value={galleryForm.alt}
                  onChange={(e) => setGalleryForm({ ...galleryForm, alt: e.target.value })}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
                />
              </div>
              <button
                onClick={handleAddGalleryImage}
                className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center"
              >
                <Plus className="mr-2" size={16} />
                {t.admin.addGalleryImage}
              </button>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
                {t.admin.currentGalleryImages}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {galleryImages.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.imageUrl}
                      alt={image.alt}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <button
                        onClick={() => handleDeleteGalleryImage(image.id)}
                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'heroSlides':
        return (
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
                {editingHeroSlide ? t.admin.updateHeroSlide : t.admin.addHeroSlide}
              </h3>
              <div className="space-y-4">
                <input
                  type="url"
                  placeholder={t.admin.heroSlideImageUrl}
                  value={heroSlideForm.imageUrl}
                  onChange={(e) => setHeroSlideForm({ ...heroSlideForm, imageUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
                />
                <input
                  type="text"
                  placeholder={t.admin.heroSlideCaption}
                  value={heroSlideForm.caption}
                  onChange={(e) => setHeroSlideForm({ ...heroSlideForm, caption: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={editingHeroSlide ? handleUpdateHeroSlide : handleAddHeroSlide}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center"
                >
                  <Save className="mr-2" size={16} />
                  {editingHeroSlide ? t.admin.updateHeroSlide : t.admin.addHeroSlide}
                </button>
                {editingHeroSlide && (
                  <button
                    onClick={() => {
                      setEditingHeroSlide(null);
                      setHeroSlideForm({ imageUrl: '', caption: '' });
                    }}
                    className="px-6 py-2 bg-slate-500 text-white rounded-lg hover:bg-slate-600"
                  >
                    {t.admin.cancelEdit}
                  </button>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
                {t.admin.currentHeroSlides}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {heroSlides.map((slide) => (
                  <div key={slide.id} className="relative group">
                    <img
                      src={slide.imageUrl}
                      alt={slide.caption || 'Hero slide'}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleEditHeroSlide(slide)}
                        className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteHeroSlide(slide.id)}
                        className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    {slide.caption && (
                      <p className="absolute bottom-2 left-2 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                        {slide.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
                {t.admin.sendNotification}
              </h3>
              <div className="space-y-4">
                <input
                  type="url"
                  placeholder={t.admin.notificationThumbnail}
                  value={notificationForm.thumbnail}
                  onChange={(e) => setNotificationForm({ ...notificationForm, thumbnail: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
                />
                <input
                  type="text"
                  placeholder={t.admin.notificationHeading}
                  value={notificationForm.heading}
                  onChange={(e) => setNotificationForm({ ...notificationForm, heading: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
                />
                <textarea
                  placeholder={t.admin.notificationDetails}
                  value={notificationForm.details}
                  onChange={(e) => setNotificationForm({ ...notificationForm, details: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white"
                />
              </div>
              <button
                onClick={handleAddNotification}
                className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center"
              >
                <Bell className="mr-2" size={16} />
                {t.admin.sendNotification}
              </button>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">
                {t.admin.currentNotifications}
              </h3>
              <div className="grid gap-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-start justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-start space-x-4 flex-1">
                      {notification.thumbnail && (
                        <img
                          src={notification.thumbnail}
                          alt={notification.heading}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800 dark:text-white mb-2">{notification.heading}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-2">{notification.details}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {notification.timestamp.toLocaleDateString()} {notification.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteNotification(notification.id)}
                      className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg ml-4"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-100 dark:bg-slate-900 z-50">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <ShieldQuestion className="text-primary-600" size={32} />
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{t.nav.adminPanel}</h1>
              <p className="text-sm text-slate-600 dark:text-slate-300">{t.admin.dataNotPersistent}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut size={16} />
              <span>{t.nav.logout}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-slate-800 border-r dark:border-slate-700 p-6">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveSection('teachers')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeSection === 'teachers'
                  ? 'bg-primary-600 text-white'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Users size={20} />
              <span>{t.admin.manageTeachers}</span>
            </button>
            
            <button
              onClick={() => setActiveSection('notices')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeSection === 'notices'
                  ? 'bg-primary-600 text-white'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <FileText size={20} />
              <span>{t.admin.manageNotices}</span>
            </button>
            
            <button
              onClick={() => setActiveSection('gallery')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeSection === 'gallery'
                  ? 'bg-primary-600 text-white'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <ImageIcon size={20} />
              <span>{t.admin.manageGallery}</span>
            </button>
            
            <button
              onClick={() => setActiveSection('heroSlides')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeSection === 'heroSlides'
                  ? 'bg-primary-600 text-white'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Monitor size={20} />
              <span>{t.admin.manageHeroSlides}</span>
            </button>
            
            <button
              onClick={() => setActiveSection('notifications')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeSection === 'notifications'
                  ? 'bg-primary-600 text-white'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <Bell size={20} />
              <span>{t.admin.manageNotifications}</span>
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
