import React, { createContext, useContext, useState } from 'react';
import { Language, Content } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Content;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const content = {
  en: {
    schoolName: "Monipur Uccha Bidyalaya & College",
    tagline: "Excellence in Education, Shaping Futures",
    home: {
      heroTitle: "Welcome to Monipur Uccha Bidyalaya & College",
      heroSubtitle: "A Legacy of Learning and Achievement since 1969.",
      learnMore: "Learn More",
      whyChooseUs: "Why Choose Us?",
      qualityEducation: "Quality Education",
      qualityEducationDesc: "Providing top-tier education from Class 1 to 12.",
      experiencedFaculty: "Experienced Faculty",
      experiencedFacultyDesc: "Dedicated and highly qualified teachers.",
      holisticDevelopment: "Holistic Development",
      holisticDevelopmentDesc: "Focus on academic, moral, and co-curricular growth.",
      ourTeachers: "Our Teachers",
      viewAllTeachers: "View All Teachers",
      ourGallery: "Our Gallery",
      viewFullGallery: "View Full Gallery",
      latestNewsNotices: "Latest News & Notices",
      viewAllNotices: "View All Notices",
      readMore: "Read More",
    },
    about: {
      title: "About Monipur Uccha Bidyalaya & College",
      history: "Monipur Uccha Bidyalaya & College (MUBC) was established in 1969 by the late Hazi Noor Mohammad with a vision to provide quality education in Mirpur, Dhaka. Starting as a small primary school, it gradually expanded to include secondary and higher secondary levels, becoming one of the most renowned educational institutions in Bangladesh. Over the decades, MUBC has consistently achieved outstanding results in various public examinations, including PSC, JSC, SSC, and HSC, earning a reputation for academic excellence and holistic student development. We are committed to fostering a conducive learning environment that nurtures intellectual, moral, and social growth.",
      mission: "Our mission is to empower students with knowledge, skills, and values to become responsible citizens and future leaders. We strive to provide a comprehensive education that encourages critical thinking, creativity, and a lifelong love for learning.",
      vision: "To be a leading educational institution in Bangladesh, recognized for academic distinction, innovative teaching methodologies, and a commitment to producing well-rounded individuals who contribute positively to society."
    },
    academics: {
      title: "Academic Information",
      sections: [
        {
          name: "Classes Offered",
          description: "We offer education from Class I to Class XII in both Bengali and English mediums.",
          details: [
            "Class I - Class V (Primary Section)",
            "Class VI - Class X (Secondary Section)",
            "Class XI - Class XII (College Section - Science, Business Studies, Humanities)"
          ]
        },
        {
          name: "Curriculum",
          description: "Our curriculum is aligned with the National Curriculum and Textbook Board (NCTB) guidelines, focusing on a balanced approach to theoretical knowledge and practical application.",
          details: [
            "Comprehensive syllabus for all subjects.",
            "Regular assessments and examinations.",
            "Emphasis on concept clarity and problem-solving skills."
          ]
        },
        {
          name: "Examination & Results",
          description: "We conduct regular internal examinations and prepare students thoroughly for public examinations.",
          details: [
            "Mid-term and Annual examinations.",
            "Model tests for public exams (PSC, JSC, SSC, HSC).",
            "Online result publication through student portal."
          ]
        }
      ]
    },
    contact: {
      title: "Contact Us",
      address: "Monipur, Mirpur-2, Dhaka-1216, Bangladesh",
      phone: "+88 017XXXXXXX",
      email: "info@mubc.edu.bd",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.080517924719!2d90.3546736746979!3d23.82137688469399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0c915f7a297%3A0x6a0f4a7c8c3c1e2e!2sMonipur%20High%20School%20and%20College!5e0!3m2!1sen!2sbd!4v1678901234567!5m2=1sen!2sbd"
    },
    nav: {
      home: "Home",
      aboutUs: "About Us",
      academics: "Academics",
      teachers: "Teachers",
      contactUs: "Contact Us",
      notices: "Notices",
      gallery: "Gallery",
      notifications: "Notifications",
      admin: "Admin",
      more: "More",
      logout: "Logout",
      login: "Login",
      adminPanel: "Admin Panel"
    },
    admin: {
      loginTitle: "Admin Login",
      email: "Email",
      password: "Password",
      loginBtn: "Login",
      cancelBtn: "Cancel",
      loginFailed: "Login failed. Incorrect email or password.",
      loginSuccess: "Successfully logged in!",
      accessDenied: "You do not have admin access.",
      dbNotReady: "Database not ready or user not logged in.",
      dataNotPersistent: "Important: This data is stored under your app's public data in Firestore database.",
      manageTeachers: "Manage Teachers",
      teacherName: "Name",
      teacherDesignation: "Designation",
      teacherSubject: "Subject",
      teacherImageUrl: "Image URL",
      teacherBio: "Short Biography",
      addTeacher: "Add New Teacher",
      updateTeacher: "Update Teacher",
      cancelEdit: "Cancel Edit",
      currentTeachers: "Current Teachers",
      actions: "Actions",
      confirmDeleteTeacher: "Are you sure you want to delete this teacher?",
      teacherAdded: "Teacher added successfully!",
      teacherUpdated: "Teacher updated successfully!",
      teacherDeleteFailed: "Failed to delete teacher.",
      manageNotices: "Manage Notices",
      noticeTitle: "Title",
      noticeContent: "Content",
      noticeImageUrl: "Image URL (Optional)",
      addNotice: "Add New Notice",
      updateNotice: "Update Notice",
      currentNotices: "Current Notices",
      date: "Date",
      noticeAdded: "Notice added successfully!",
      noticeUpdated: "Notice updated successfully!",
      noticeDeleteFailed: "Failed to delete notice.",
      manageGallery: "Manage Gallery",
      galleryImageUrl: "Image URL",
      galleryImageAlt: "Alt Text",
      addGalleryImage: "Add New Gallery Image",
      currentGalleryImages: "Current Gallery Images",
      confirmDeleteGalleryImage: "Are you sure you want to delete this gallery image?",
      galleryImageAdded: "Gallery image added successfully!",
      galleryImageDeleteFailed: "Failed to delete gallery image.",
      manageHeroSlides: "Manage Hero Slideshow Images",
      heroSlideImageUrl: "Slide Image URL",
      heroSlideCaption: "Caption (Optional)",
      addHeroSlide: "Add New Slide Image",
      updateHeroSlide: "Update Slide Image",
      currentHeroSlides: "Current Slideshow Images",
      confirmDeleteHeroSlide: "Are you sure you want to delete this slideshow image?",
      heroSlideAdded: "Slide image added successfully!",
      heroSlideUpdated: "Slide image updated successfully!",
      heroSlideDeleteFailed: "Failed to delete slide image.",
      manageNotifications: "Manage Notifications",
      notificationThumbnail: "Thumbnail URL",
      notificationHeading: "Heading",
      notificationDetails: "Details",
      sendNotification: "Send Notification",
      notificationSent: "Notification sent successfully!",
      notificationFailed: "Failed to send notification.",
      currentNotifications: "Current Notifications",
      confirmDeleteNotification: "Are you sure you want to delete this notification?",
      notificationDeleteFailed: "Failed to delete notification.",
      uploadImage: "Upload Image from Device",
      or: "OR",
    },
    confirm: {
      logout: "Are you sure you want to log out?",
      yes: "Yes",
      no: "No"
    },
    noData: {
      teachers: "No teacher information found.",
      notices: "No notices found.",
      gallery: "No images found.",
      slides: "No slideshow images found.",
      notifications: "No notifications found."
    },
    loading: "Loading data, please wait...",
    footer: {
      rightsReserved: "All rights reserved.",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service"
    }
  },
  bn: {
    schoolName: "মনিপুর উচ্চ বিদ্যালয় ও কলেজ",
    tagline: "শিক্ষার উৎকর্ষ, ভবিষ্যতের রূপদান",
    home: {
      heroTitle: "মনিপুর উচ্চ বিদ্যালয় ও কলেজে স্বাগতম",
      heroSubtitle: "১৯৬৯ সাল থেকে শিক্ষা ও অর্জনের এক ঐতিহ্য।",
      learnMore: "আরও জানুন",
      whyChooseUs: "কেন আমাদের বেছে নেবেন?",
      qualityEducation: "গুণগত শিক্ষা",
      qualityEducationDesc: "১ম থেকে ১২শ শ্রেণি পর্যন্ত উচ্চমানের শিক্ষা প্রদান।",
      experiencedFaculty: "অভিজ্ঞ শিক্ষকবৃন্দ",
      experiencedFacultyDesc: "নিবেদিত এবং উচ্চ যোগ্যতাসম্পন্ন শিক্ষক।",
      holisticDevelopment: "সার্বিক বিকাশ",
      holisticDevelopmentDesc: "একাডেমিক, নৈতিক এবং সহ-পাঠ্যক্রমিক বিকাশে মনোযোগ।",
      ourTeachers: "আমাদের শিক্ষকবৃন্দ",
      viewAllTeachers: "সকল শিক্ষক দেখুন",
      ourGallery: "আমাদের গ্যালারি",
      viewFullGallery: "সম্পূর্ণ গ্যালারি দেখুন",
      latestNewsNotices: "সর্বশেষ খবর ও নোটিশ",
      viewAllNotices: "সকল নোটিশ দেখুন",
      readMore: "আরও পড়ুন",
    },
    about: {
      title: "মনিপুর উচ্চ বিদ্যালয় ও কলেজ সম্পর্কে",
      history: "মনিপুর উচ্চ বিদ্যালয় ও কলেজ (MUBC) প্রতিষ্ঠাতা মরহুম হাজী নূর মোহাম্মদ কর্তৃক ১৯৬৯ সালে প্রতিষ্ঠিত হয়, যার লক্ষ্য ছিল ঢাকার মিরপুরে মানসম্মত শিক্ষা প্রদান করা। একটি ছোট প্রাথমিক বিদ্যালয় হিসেবে শুরু হয়ে এটি ধীরে ধীরে মাধ্যমিক ও উচ্চ মাধ্যমিক স্তর অন্তর্ভুক্ত করে, বাংলাদেশের অন্যতম স্বনামধন্য শিক্ষা প্রতিষ্ঠানে পরিণত হয়। কয়েক দশক ধরে, MUBC ধারাবাহিকভাবে PSC, JSC, SSC, এবং HSC সহ বিভিন্ন পাবলিক পরীক্ষায় অসামান্য ফলাফল অর্জন করেছে, যা একাডেমিক শ্রেষ্ঠত্ব এবং শিক্ষার্থীদের সার্বিক বিকাশের জন্য খ্যাতি অর্জন করেছে। আমরা একটি অনুকূল শিক্ষার পরিবেশ গড়ে তুলতে প্রতিশ্রুতিবদ্ধ যা বুদ্ধিবৃত্তিক, নৈতিক এবং সামাজিক বিকাশকে উৎসাহিত করে।",
      mission: "আমাদের লক্ষ্য হল শিক্ষার্থীদের জ্ঞান, দক্ষতা এবং মূল্যবোধ দিয়ে ক্ষমতায়ন করা যাতে তারা দায়িত্বশীল নাগরিক এবং ভবিষ্যতের নেতা হতে পারে। আমরা একটি ব্যাপক শিক্ষা প্রদানের চেষ্টা করি যা সমালোচনামূলক চিন্তাভাবনা, সৃজনশীলতা এবং শেখার প্রতি আজীবন ভালোবাসাকে উৎসাহিত করে।",
      vision: "বাংলাদেশের একটি শীর্ষস্থানীয় শিক্ষা প্রতিষ্ঠান হওয়া, যা একাডেমিক শ্রেষ্ঠত্ব, উদ্ভাবনী শিক্ষাদান পদ্ধতি এবং সমাজে ইতিবাচক অবদান রাখে এমন সুশিক্ষিত ব্যক্তি তৈরির প্রতিশ্রুতির জন্য স্বীকৃত।"
    },
    academics: {
      title: "একাডেমিক তথ্য",
      sections: [
        {
          name: "শ্রেণি সমূহ",
          description: "আমরা ১ম থেকে ১২শ শ্রেণি পর্যন্ত বাংলা ও ইংরেজি উভয় মাধ্যমে শিক্ষা প্রদান করি।",
          details: [
            "১ম - ৫ম শ্রেণি (প্রাথমিক শাখা)",
            "৬ষ্ঠ - ১০ম শ্রেণি (মাধ্যমিক শাখা)",
            "১১শ - ১২শ শ্রেণি (কলেজ শাখা - বিজ্ঞান, ব্যবসায় শিক্ষা, মানবিক)"
          ]
        },
        {
          name: "পাঠ্যক্রম",
          description: "আমাদের পাঠ্যক্রম জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) নির্দেশনার সাথে সামঞ্জস্যপূর্ণ।",
          details: [
            "সকল বিষয়ের ব্যাপক সিলেবাস।",
            "নিয়মিত মূল্যায়ন এবং পরীক্ষা।",
            "ধারণা স্পষ্টতা এবং সমস্যা সমাধানের উপর জোর।"
          ]
        },
        {
          name: "পরীক্ষা ও ফলাফল",
          description: "আমরা নিয়মিত অভ্যন্তরীণ পরীক্ষা পরিচালনা করি এবং পাবলিক পরীক্ষার জন্য শিক্ষার্থীদের ভালভাবে প্রস্তুত করি।",
          details: [
            "অর্ধবার্ষিক এবং বার্ষিক পরীক্ষা।",
            "পাবলিক পরীক্ষার জন্য মডেল টেস্ট।",
            "অনলাইনে ফলাফল প্রকাশ।"
          ]
        }
      ]
    },
    contact: {
      title: "যোগাযোগ করুন",
      address: "মনিপুর, মিরপুর-২, ঢাকা-১২১৬, বাংলাদেশ",
      phone: "+৮৮ ০১৭XXXXXXX",
      email: "info@mubc.edu.bd",
      mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.080517924719!2d90.3546736746979!3d23.82137688469399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0c915f7a297%3A0x6a0f4a7c8c3c1e2e!2sMonipur%20High%20School%20and%20College!5e0!3m2!1sen!2sbd!4v1678901234567!5m2=1sen!2sbd"
    },
    nav: {
      home: "হোম",
      aboutUs: "আমাদের সম্পর্কে",
      academics: "একাডেমিক",
      teachers: "শিক্ষকবৃন্দ",
      contactUs: "যোগাযোগ",
      notices: "নোটিশ",
      gallery: "গ্যালারি",
      notifications: "নোটিফিকেশন",
      admin: "অ্যাডমিন",
      more: "আরও",
      logout: "লগআউট",
      login: "লগইন",
      adminPanel: "অ্যাডমিন প্যানেল"
    },
    admin: {
      loginTitle: "অ্যাডমিন লগইন",
      email: "ইমেল",
      password: "পাসওয়ার্ড",
      loginBtn: "লগইন",
      cancelBtn: "বাতিল করুন",
      loginFailed: "লগইন ব্যর্থ হয়েছে। ভুল ইমেল বা পাসওয়ার্ড।",
      loginSuccess: "সফলভাবে লগইন করা হয়েছে!",
      accessDenied: "আপনার অ্যাডমিন অ্যাক্সেস নেই।",
      dbNotReady: "ডেটাবেস প্রস্তুত নয়।",
      dataNotPersistent: "গুরুত্বপূর্ণ: এই ডেটা Firestore ডেটাবেসে আপনার অ্যাপের পাবলিক ডাটার অধীনে সংরক্ষিত হয়।",
      manageTeachers: "শিক্ষক পরিচালনা করুন",
      teacherName: "নাম",
      teacherDesignation: "পদবি",
      teacherSubject: "বিষয়",
      teacherImageUrl: "ছবির URL",
      teacherBio: "সংক্ষিপ্ত পরিচিতি",
      addTeacher: "নতুন শিক্ষক যোগ করুন",
      updateTeacher: "শিক্ষক আপডেট করুন",
      cancelEdit: "বাতিল করুন",
      currentTeachers: "বর্তমান শিক্ষকবৃন্দ",
      actions: "কার্যক্রম",
      confirmDeleteTeacher: "আপনি কি এই শিক্ষককে মুছে ফেলতে নিশ্চিত?",
      teacherAdded: "শিক্ষক সফলভাবে যোগ করা হয়েছে!",
      teacherUpdated: "শিক্ষক সফলভাবে আপডেট করা হয়েছে!",
      teacherDeleteFailed: "শিক্ষক মুছে ফেলতে ব্যর্থ।",
      manageNotices: "নোটিশ পরিচালনা করুন",
      noticeTitle: "শিরোনাম",
      noticeContent: "বিষয়বস্তু",
      noticeImageUrl: "ছবির URL (ঐচ্ছিক)",
      addNotice: "নতুন নোটিশ যোগ করুন",
      updateNotice: "নোটিশ আপডেট করুন",
      currentNotices: "বর্তমান নোটিশসমূহ",
      date: "তারিখ",
      noticeAdded: "নোটিশ সফলভাবে যোগ করা হয়েছে!",
      noticeUpdated: "নোটিশ সফলভাবে আপডেট করা হয়েছে!",
      noticeDeleteFailed: "নোটিশ মুছে ফেলতে ব্যর্থ।",
      manageGallery: "গ্যালারি পরিচালনা করুন",
      galleryImageUrl: "ছবির URL",
      galleryImageAlt: "বিকল্প টেক্সট (Alt Text)",
      addGalleryImage: "নতুন গ্যালারি ইমেজ যোগ করুন",
      currentGalleryImages: "বর্তমান গ্যালারি ইমেজসমূহ",
      confirmDeleteGalleryImage: "আপনি কি এই গ্যালারি ইমেজটি মুছে ফেলতে নিশ্চিত?",
      galleryImageAdded: "গ্যালারি ইমেজ সফলভাবে যোগ করা হয়েছে!",
      galleryImageDeleteFailed: "গ্যালারি ইমেজ মুছে ফেলতে ব্যর্থ।",
      manageHeroSlides: "হিরো স্লাইডশো ইমেজ পরিচালনা করুন",
      heroSlideImageUrl: "স্লাইড ছবির URL",
      heroSlideCaption: "ক্যাপশন (ঐচ্ছিক)",
      addHeroSlide: "নতুন স্লাইড ইমেজ যোগ করুন",
      updateHeroSlide: "স্লাইড ইমেজ আপডেট করুন",
      currentHeroSlides: "বর্তমান স্লাইডশো ইমেজসমূহ",
      confirmDeleteHeroSlide: "আপনি কি এই স্লাইডশো ইমেজটি মুছে ফেলতে নিশ্চিত?",
      heroSlideAdded: "স্লাইড ইমেজ সফলভাবে যোগ করা হয়েছে!",
      heroSlideUpdated: "স্লাইড ইমেজ সফলভাবে আপডেট করা হয়েছে!",
      heroSlideDeleteFailed: "স্লাইড ইমেজ মুছে ফেলতে ব্যর্থ।",
      manageNotifications: "নোটিফিকেশন পরিচালনা করুন",
      notificationThumbnail: "থাম্বনেইল URL",
      notificationHeading: "শিরোনাম",
      notificationDetails: "বিস্তারিত",
      sendNotification: "নোটিফিকেশন পাঠান",
      notificationSent: "নোটিফিকেশন সফলভাবে পাঠানো হয়েছে!",
      notificationFailed: "নোটিফিকেশন পাঠাতে ব্যর্থ হয়েছে।",
      currentNotifications: "বর্তমান নোটিফিকেশনসমূহ",
      confirmDeleteNotification: "আপনি কি এই নোটিফিকেশনটি মুছে ফেলতে নিশ্চিত?",
      notificationDeleteFailed: "নোটিফিকেশন মুছে ফেলতে ব্যর্থ হয়েছে।",
      uploadImage: "ডিভাইস থেকে ছবি আপলোড করুন",
      or: "অথবা",
    },
    confirm: {
      logout: "আপনি কি লগআউট করতে নিশ্চিত?",
      yes: "হ্যাঁ",
      no: "না"
    },
    noData: {
      teachers: "কোন শিক্ষক তথ্য পাওয়া যায়নি।",
      notices: "কোনো নোটিশ পাওয়া যায়নি।",
      gallery: "কোনো ছবি পাওয়া যায়নি।",
      slides: "কোনো স্লাইডশো ছবি পাওয়া যায়নি।",
      notifications: "কোনো নোটিফিকেশন পাওয়া যায়নি।"
    },
    loading: "ডেটা লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...",
    footer: {
      rightsReserved: "সর্বস্বত্ব সংরক্ষিত।",
      privacyPolicy: "গোপনীয়তা নীতি",
      termsOfService: "পরিষেবার শর্তাবলী"
    }
  }
} as const;

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('bn');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: content[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};
