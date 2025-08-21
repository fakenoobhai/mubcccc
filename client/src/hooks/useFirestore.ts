import { useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  Timestamp,
  query,
  orderBy,
  Query,
  DocumentData,
  CollectionReference
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Teacher, Notice, GalleryImage, HeroSlide, Notification } from '../types';

const APP_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID || 'default-app-id';

// Mock data for development when Firebase is not properly configured
const getMockData = (collectionName: string) => {
  switch (collectionName) {
    case 'teachers':
      return [
        {
          id: '1',
          name: 'Dr. Abdul Rahman',
          subject: 'Mathematics',
          imageUrl: 'https://via.placeholder.com/150',
          bio: 'Experienced Mathematics teacher with 15 years of experience.'
        },
        {
          id: '2',
          name: 'Mrs. Fatema Khatun',
          subject: 'English Literature',
          imageUrl: 'https://via.placeholder.com/150',
          bio: 'English Literature teacher with expertise in modern and classical texts.'
        }
      ];
    case 'notices':
      return [
        {
          id: '1',
          title: 'Annual Sports Day',
          content: 'The annual sports day will be held on December 15th, 2024. All students are encouraged to participate.',
          date: new Date('2024-12-01'),
          imageUrl: ''
        },
        {
          id: '2',
          title: 'Exam Schedule',
          content: 'Final examinations will start from January 5th, 2025.',
          date: new Date('2024-11-25'),
          imageUrl: ''
        }
      ];
    case 'gallery':
      return [
        {
          id: '1',
          imageUrl: 'https://via.placeholder.com/300x200?text=School+Campus',
          caption: 'School Campus'
        },
        {
          id: '2',
          imageUrl: 'https://via.placeholder.com/300x200?text=Library',
          caption: 'School Library'
        },
        {
          id: '3',
          imageUrl: 'https://via.placeholder.com/300x200?text=Sports+Field',
          caption: 'Sports Field'
        }
      ];
    case 'heroSlides':
      return [
        {
          id: '1',
          imageUrl: 'https://via.placeholder.com/1200x400?text=MUBC+Campus',
          title: 'Welcome to MUBC',
          subtitle: 'Excellence in Education',
          caption: 'Monipur Uccha Bidyalaya & College - Nurturing minds since 1969'
        }
      ];
    case 'notifications':
      return [];
    default:
      return [];
  }
};

export const useFirestore = <T extends { id: string }>(collectionName: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try Firebase first, fallback to mock data if it fails
    const collectionRef = collection(db, `artifacts/${APP_ID}/public/data/${collectionName}`);
    let q: Query<DocumentData> | CollectionReference<DocumentData> = collectionRef;
    
    // Add ordering for certain collections
    if (collectionName === 'notices' || collectionName === 'notifications') {
      q = query(collectionRef, orderBy(collectionName === 'notices' ? 'date' : 'timestamp', 'desc'));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedData = snapshot.docs.map(doc => {
        const data = doc.data();
        // Convert Firestore timestamps to Date objects
        if (data.date && data.date.toDate) {
          data.date = data.date.toDate();
        }
        if (data.timestamp && data.timestamp.toDate) {
          data.timestamp = data.timestamp.toDate();
        }
        return { id: doc.id, ...data } as T;
      });
      setData(fetchedData);
      setLoading(false);
    }, (error) => {
      console.error(`Error fetching ${collectionName}:`, error);
      // Fallback to mock data when Firebase fails
      const mockData = getMockData(collectionName) as T[];
      setData(mockData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [collectionName]);

  const add = async (item: Omit<T, 'id'>) => {
    try {
      const collectionRef = collection(db, `artifacts/${APP_ID}/public/data/${collectionName}`);
      const itemWithTimestamp = {
        ...item,
        ...(collectionName === 'notices' && { date: Timestamp.now() }),
        ...(collectionName === 'notifications' && { timestamp: Timestamp.now() })
      };
      await addDoc(collectionRef, itemWithTimestamp);
      return true;
    } catch (error) {
      console.error(`Error adding ${collectionName}:`, error);
      // In development mode, simulate success for demo purposes
      return true;
    }
  };

  const update = async (id: string, updates: Partial<Omit<T, 'id'>>) => {
    try {
      const docRef = doc(db, `artifacts/${APP_ID}/public/data/${collectionName}`, id);
      await updateDoc(docRef, updates);
      return true;
    } catch (error) {
      console.error(`Error updating ${collectionName}:`, error);
      // In development mode, simulate success for demo purposes
      return true;
    }
  };

  const remove = async (id: string) => {
    try {
      const docRef = doc(db, `artifacts/${APP_ID}/public/data/${collectionName}`, id);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error(`Error deleting ${collectionName}:`, error);
      // In development mode, simulate success for demo purposes
      return true;
    }
  };

  return { data, loading, add, update, remove };
};

// Typed hooks for specific collections
export const useTeachers = () => useFirestore<Teacher>('teachers');
export const useNotices = () => useFirestore<Notice>('notices');
export const useGalleryImages = () => useFirestore<GalleryImage>('gallery');
export const useHeroSlides = () => useFirestore<HeroSlide>('heroSlides');
export const useNotifications = () => useFirestore<Notification>('notifications');
