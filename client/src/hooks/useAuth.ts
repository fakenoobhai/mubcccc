import { useState, useEffect } from 'react';
import { signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../lib/firebase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setAuthError(null);
      } else {
        try {
          // Try anonymous sign-in
          const result = await signInAnonymously(auth);
          setUser(result.user);
          setAuthError(null);
        } catch (error: any) {
          console.error('Firebase Auth Error:', error);
          
          if (error.code === 'auth/admin-restricted-operation') {
            setAuthError('Firebase Anonymous Authentication is disabled. Please enable it in Firebase Console.');
          } else {
            setAuthError(`Authentication error: ${error.message}`);
          }
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading, authError };
};
