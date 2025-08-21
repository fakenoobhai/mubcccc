export interface Teacher {
  id: string;
  name: string;
  designation: string;
  subject: string;
  imageUrl: string;
  bio: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: Date;
  imageUrl?: string;
}

export interface GalleryImage {
  id: string;
  imageUrl: string;
  alt: string;
}

export interface HeroSlide {
  id: string;
  imageUrl: string;
  caption?: string;
}

export interface Notification {
  id: string;
  thumbnail: string;
  heading: string;
  details: string;
  timestamp: Date;
}

export interface AcademicSection {
  readonly name: string;
  readonly description: string;
  readonly details: readonly string[];
}

export type Language = 'en' | 'bn';
export type Theme = 'light' | 'dark';

export interface Content {
  schoolName: string;
  tagline: string;
  home: {
    heroTitle: string;
    heroSubtitle: string;
    learnMore: string;
    whyChooseUs: string;
    qualityEducation: string;
    qualityEducationDesc: string;
    experiencedFaculty: string;
    experiencedFacultyDesc: string;
    holisticDevelopment: string;
    holisticDevelopmentDesc: string;
    ourTeachers: string;
    viewAllTeachers: string;
    ourGallery: string;
    viewFullGallery: string;
    latestNewsNotices: string;
    viewAllNotices: string;
    readMore: string;
  };
  about: {
    title: string;
    history: string;
    mission: string;
    vision: string;
  };
  academics: {
    title: string;
    sections: readonly AcademicSection[];
  };
  contact: {
    title: string;
    address: string;
    phone: string;
    email: string;
    mapEmbed: string;
  };
  nav: {
    home: string;
    aboutUs: string;
    academics: string;
    teachers: string;
    contactUs: string;
    notices: string;
    gallery: string;
    notifications: string;
    admin: string;
    more: string;
    logout: string;
    login: string;
    adminPanel: string;
  };
  admin: {
    loginTitle: string;
    email: string;
    password: string;
    loginBtn: string;
    cancelBtn: string;
    loginFailed: string;
    loginSuccess: string;
    accessDenied: string;
    dbNotReady: string;
    dataNotPersistent: string;
    manageTeachers: string;
    teacherName: string;
    teacherDesignation: string;
    teacherSubject: string;
    teacherImageUrl: string;
    teacherBio: string;
    addTeacher: string;
    updateTeacher: string;
    cancelEdit: string;
    currentTeachers: string;
    actions: string;
    confirmDeleteTeacher: string;
    teacherAdded: string;
    teacherUpdated: string;
    teacherDeleteFailed: string;
    manageNotices: string;
    noticeTitle: string;
    noticeContent: string;
    noticeImageUrl: string;
    addNotice: string;
    updateNotice: string;
    currentNotices: string;
    date: string;
    noticeAdded: string;
    noticeUpdated: string;
    noticeDeleteFailed: string;
    manageGallery: string;
    galleryImageUrl: string;
    galleryImageAlt: string;
    addGalleryImage: string;
    currentGalleryImages: string;
    confirmDeleteGalleryImage: string;
    galleryImageAdded: string;
    galleryImageDeleteFailed: string;
    manageHeroSlides: string;
    heroSlideImageUrl: string;
    heroSlideCaption: string;
    addHeroSlide: string;
    updateHeroSlide: string;
    currentHeroSlides: string;
    confirmDeleteHeroSlide: string;
    heroSlideAdded: string;
    heroSlideUpdated: string;
    heroSlideDeleteFailed: string;
    manageNotifications: string;
    notificationThumbnail: string;
    notificationHeading: string;
    notificationDetails: string;
    sendNotification: string;
    notificationSent: string;
    notificationFailed: string;
    currentNotifications: string;
    confirmDeleteNotification: string;
    notificationDeleteFailed: string;
    uploadImage: string;
    or: string;
  };
  confirm: {
    logout: string;
    yes: string;
    no: string;
  };
  noData: {
    teachers: string;
    notices: string;
    gallery: string;
    slides: string;
    notifications: string;
  };
  loading: string;
  footer: {
    rightsReserved: string;
    privacyPolicy: string;
    termsOfService: string;
  };
}
