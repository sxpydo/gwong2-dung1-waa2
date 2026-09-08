import { initializeApp, type FirebaseOptions } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  linkWithPopup,
  linkWithRedirect,
  signOut,
  type User,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
    "Firebase env vars are missing. Copy .env.example to .env and fill in your Firebase project config. " +
      "Until then, progress will not persist across devices.",
  );
}

const app = hasConfig ? initializeApp(firebaseConfig) : null;
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
const googleProvider = new GoogleAuthProvider();

/**
 * This app is single-user, so anonymous auth (Authentication > Sign-in method
 * > Anonymous) just gives you a stable UID with zero setup. Signing in with
 * Google on top of that gives you a *durable* identity that survives clearing
 * browser data, switching browsers, or reinstalling the PWA — anonymous UIDs
 * live in that browser's local storage and are lost if it's cleared.
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
        console.error("Anonymous sign-in failed:", err);
        resolve(null);
      }
    });
  });
}

/**
 * Sign in with Google. If the current session is anonymous, this *links*
 * the Google account to the existing anonymous user instead of replacing
 * it — same UID, so any progress already saved carries over automatically
 * rather than starting fresh under a new account.
 *
 * Popups are blocked in some contexts (notably standalone/installed PWAs on
 * iOS), so this falls back to a full-page redirect flow when the popup
 * fails for that reason. Call `completeRedirectSignIn()` once on app start
 * to pick up the result after the redirect returns.
 */
export async function signInWithGoogle(): Promise<User | null> {
  if (!auth) return null;
  const current = auth.currentUser;

  try {
    if (current?.isAnonymous) {
      const cred = await linkWithPopup(current, googleProvider);
      return cred.user;
    }
    const cred = await signInWithPopup(auth, googleProvider);
    return cred.user;
  } catch (err: any) {
    const code = err?.code as string | undefined;
    const popupBlocked =
      code === "auth/popup-blocked" ||
      code === "auth/operation-not-supported-in-this-environment" ||
      code === "auth/cancelled-popup-request";

    if (popupBlocked) {
      if (current?.isAnonymous) {
        await linkWithRedirect(current, googleProvider);
      } else {
        await signInWithRedirect(auth, googleProvider);
      }
      return null; // page will reload for the redirect; result picked up by completeRedirectSignIn()
    }

    // Google account already linked to a different user elsewhere — sign in
    // as that existing Google account instead of losing access to it.
    if (
      code === "auth/credential-already-in-use" ||
      code === "auth/email-already-in-use"
    ) {
      const cred = await signInWithPopup(auth, googleProvider);
      return cred.user;
    }

    // eslint-disable-next-line no-console
    console.error("Google sign-in failed:", err);
    return null;
  }
}

/** Call once on app start to finish a sign-in that fell back to redirect. */
export async function completeRedirectSignIn(): Promise<User | null> {
  if (!auth) return null;
  try {
    const result = await getRedirectResult(auth);
    return result?.user ?? null;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Redirect sign-in failed:", err);
    return null;
  }
}

export async function signOutUser(): Promise<void> {
  if (!auth) return;
  await signOut(auth);
}

export function onUserChanged(callback: (user: User | null) => void) {
  if (!auth) return () => {};
  return onAuthStateChanged(auth, callback);
}
