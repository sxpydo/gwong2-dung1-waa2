import { useCallback, useEffect, useMemo, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import type { User } from "firebase/auth";
import {
  auth,
  db,
  ensureAnonUser,
  completeRedirectSignIn,
  onUserChanged,
  signInWithGoogle,
  signOutUser,
} from "../lib/firebase";
import { createInitialReview, isDue, nextReviewState } from "../lib/srs";
import type { DrillGrade, ReviewState } from "../types";

type ReviewMap = Record<string, ReviewState>;

interface FirestoreReviewDoc {
  phraseId: string;
  repetitions: number;
  intervalDays: number;
  easeFactor: number;
  dueAt: string;
  lastReviewedAt: string | null;
  correctCount: number;
  seenCount: number;
  starred: boolean;
}

function fromDoc(data: FirestoreReviewDoc): ReviewState {
  return { ...data };
}

function toDoc(state: ReviewState): FirestoreReviewDoc {
  return { ...state };
}

const LOCAL_KEY = "cantonese:review-state";

function loadLocal(): ReviewMap {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as ReviewMap) : {};
  } catch {
    return {};
  }
}

function saveLocal(map: ReviewMap) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(map));
  } catch {
    // ignore quota errors
  }
}

// Firestore layout: users/{uid}/reviews/{phraseId}
function reviewsCollection(uid: string) {
  if (!db) throw new Error("Firestore not initialized");
  return collection(db, "users", uid, "reviews");
}

export function useProgress() {
  const [reviews, setReviews] = useState<ReviewMap>({});
  const [loaded, setLoaded] = useState(false);
  const [syncEnabled, setSyncEnabled] = useState(false);
  const [uid, setUid] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const loadForUser = useCallback(async (u: User) => {
    setSyncEnabled(true);
    setUid(u.uid);
    setUser(u);
    const snapshot = await getDocs(reviewsCollection(u.uid));
    const map: ReviewMap = {};
    snapshot.forEach((docSnap) => {
      map[docSnap.id] = fromDoc(docSnap.data() as FirestoreReviewDoc);
    });
    setReviews(map);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!db || !auth) {
      setReviews(loadLocal());
      setLoaded(true);
      return;
    }

    let unsubscribed = false;

    (async () => {
      // Pick up the result if we're returning from a redirect-based Google sign-in.
      await completeRedirectSignIn();
      // Make sure there's at least an anonymous session so sync works immediately,
      // even before the person chooses to sign in with Google.
      await ensureAnonUser();
    })();

    const unsubscribe = onUserChanged(async (u) => {
      if (unsubscribed) return;
      if (u) {
        await loadForUser(u);
      } else {
        setSyncEnabled(false);
        setUid(null);
        setUser(null);
        setReviews(loadLocal());
        setLoaded(true);
      }
    });

    return () => {
      unsubscribed = true;
      unsubscribe();
    };
  }, [loadForUser]);

  const signIn = useCallback(async () => {
    await signInWithGoogle();
    // If a popup was used, onUserChanged fires and reloads automatically.
    // If it fell back to redirect, the page navigates away and this line never runs.
  }, []);

  const signOutOfGoogle = useCallback(async () => {
    await signOutUser();
    // After sign-out, re-establish an anonymous session so the app keeps working.
    if (auth) await ensureAnonUser();
  }, []);

  const persist = useCallback(
    async (state: ReviewState) => {
      setReviews((prev) => {
        const next = { ...prev, [state.phraseId]: state };
        if (!syncEnabled) saveLocal(next);
        return next;
      });
      if (syncEnabled && db && uid) {
        await setDoc(doc(reviewsCollection(uid), state.phraseId), toDoc(state));
      }
    },
    [syncEnabled, uid],
  );

  const getOrCreate = useCallback(
    (phraseId: string): ReviewState =>
      reviews[phraseId] ?? createInitialReview(phraseId),
    [reviews],
  );

  const grade = useCallback(
    (phraseId: string, drillGrade: DrillGrade) => {
      const current = getOrCreate(phraseId);
      const next = nextReviewState(current, drillGrade);
      persist(next);
    },
    [getOrCreate, persist],
  );

  const toggleStar = useCallback(
    (phraseId: string) => {
      const current = getOrCreate(phraseId);
      persist({ ...current, starred: !current.starred });
    },
    [getOrCreate, persist],
  );

  const resetAll = useCallback(async () => {
    const idsToClear = Object.keys(reviews);
    setReviews({});
    if (!syncEnabled) {
      saveLocal({});
      return;
    }
    if (syncEnabled && db && uid) {
      await Promise.all(
        idsToClear.map((phraseId) =>
          deleteDoc(doc(reviewsCollection(uid), phraseId)),
        ),
      );
    }
  }, [reviews, syncEnabled, uid]);

  const dueIds = useMemo(
    () =>
      Object.values(reviews)
        .filter(isDue)
        .map((r) => r.phraseId),
    [reviews],
  );
  const starredIds = useMemo(
    () =>
      Object.values(reviews)
        .filter((r) => r.starred)
        .map((r) => r.phraseId),
    [reviews],
  );

  return {
    reviews,
    loaded,
    syncEnabled,
    getOrCreate,
    grade,
    toggleStar,
    resetAll,
    dueIds,
    starredIds,
    user,
    isGoogleLinked: Boolean(user && !user.isAnonymous),
    signIn,
    signOut: signOutOfGoogle,
  };
}
