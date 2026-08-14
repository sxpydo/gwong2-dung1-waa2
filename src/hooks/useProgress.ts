import { useCallback, useEffect, useMemo, useState } from 'react';
import { ensureAnonSession, supabase } from '../lib/supabase';
import { createInitialReview, isDue, nextReviewState } from '../lib/srs';
import type { DrillGrade, ReviewState } from '../types';

type ReviewMap = Record<string, ReviewState>;

interface DbRow {
  phrase_id: string;
  repetitions: number;
  interval_days: number;
  ease_factor: number;
  due_at: string;
  last_reviewed_at: string | null;
  correct_count: number;
  seen_count: number;
  starred: boolean;
}

function fromDbRow(row: DbRow): ReviewState {
  return {
    phraseId: row.phrase_id,
    repetitions: row.repetitions,
    intervalDays: row.interval_days,
    easeFactor: row.ease_factor,
    dueAt: row.due_at,
    lastReviewedAt: row.last_reviewed_at,
    correctCount: row.correct_count,
    seenCount: row.seen_count,
    starred: row.starred,
  };
}

function toDbRow(state: ReviewState) {
  return {
    phrase_id: state.phraseId,
    repetitions: state.repetitions,
    interval_days: state.intervalDays,
    ease_factor: state.easeFactor,
    due_at: state.dueAt,
    last_reviewed_at: state.lastReviewedAt,
    correct_count: state.correctCount,
    seen_count: state.seenCount,
    starred: state.starred,
  };
}

const LOCAL_KEY = 'cantonese:review-state';

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

export function useProgress() {
  const [reviews, setReviews] = useState<ReviewMap>({});
  const [loaded, setLoaded] = useState(false);
  const [syncEnabled, setSyncEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      if (supabase) {
        const session = await ensureAnonSession();
        if (session) {
          setSyncEnabled(true);
          const { data, error } = await supabase.from('review_state').select('*');
          if (!error && data) {
            const map: ReviewMap = {};
            (data as DbRow[]).forEach((row) => {
              map[row.phrase_id] = fromDbRow(row);
            });
            setReviews(map);
            setLoaded(true);
            return;
          }
        }
      }
      // Fallback: local-only mode (no Supabase env vars configured).
      setReviews(loadLocal());
      setLoaded(true);
    })();
  }, []);

  const persist = useCallback(
    async (state: ReviewState) => {
      setReviews((prev) => {
        const next = { ...prev, [state.phraseId]: state };
        if (!syncEnabled) saveLocal(next);
        return next;
      });
      if (syncEnabled && supabase) {
        const session = await ensureAnonSession();
        await supabase.from('review_state').upsert({
          ...toDbRow(state),
          user_id: session?.user.id,
        });
      }
    },
    [syncEnabled]
  );

  const getOrCreate = useCallback(
    (phraseId: string): ReviewState => reviews[phraseId] ?? createInitialReview(phraseId),
    [reviews]
  );

  const grade = useCallback(
    (phraseId: string, drillGrade: DrillGrade) => {
      const current = getOrCreate(phraseId);
      const next = nextReviewState(current, drillGrade);
      persist(next);
    },
    [getOrCreate, persist]
  );

  const toggleStar = useCallback(
    (phraseId: string) => {
      const current = getOrCreate(phraseId);
      persist({ ...current, starred: !current.starred });
    },
    [getOrCreate, persist]
  );

  const resetAll = useCallback(async () => {
    setReviews({});
    if (!syncEnabled) saveLocal({});
    if (syncEnabled && supabase) {
      const session = await ensureAnonSession();
      if (session) await supabase.from('review_state').delete().eq('user_id', session.user.id);
    }
  }, [syncEnabled]);

  const dueIds = useMemo(
    () => Object.values(reviews).filter(isDue).map((r) => r.phraseId),
    [reviews]
  );
  const starredIds = useMemo(
    () => Object.values(reviews).filter((r) => r.starred).map((r) => r.phraseId),
    [reviews]
  );

  return { reviews, loaded, syncEnabled, getOrCreate, grade, toggleStar, resetAll, dueIds, starredIds };
}
