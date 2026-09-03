import { initializeApp, type FirebaseOptions } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, type User } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const hasConfig = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

if (!hasConfig) {
  // eslint-disable-next-line no-console
  console.warn(
    'Firebase env vars are missing. Copy .env.example to .env and fill in your Firebase project config. ' +
      'Until then, progress will not persist across devices.'
  );
}

const app = hasConfig ? initializeApp(firebaseConfig) : null;
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;

/**
 * This app is single-user, so we use Firebase's anonymous auth
 * (enable it in Authentication > Sign-in method) purely to get a
 * stable user id for scoping documents under Firestore security rules.
 */
export async function ensureAnonUser(): Promise<User | null> {
  if (!auth) return null;
  if (auth.currentUser) return auth.currentUser;

  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();
      if (user) {
        resolve(user);
        return;
      }
      try {
        const cred = await signInAnonymously(auth);
        resolve(cred.user);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Anonymous sign-in failed:', err);
        resolve(null);
      }
    });
  });
}
