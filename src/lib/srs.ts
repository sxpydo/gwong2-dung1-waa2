import type { DrillGrade, ReviewState } from '../types';

/**
 * SM-2 spaced repetition — the same core algorithm behind Anki.
 * We only expose two grades to the user ("Again" / "Good") and map
 * them onto SM-2's 0-5 quality scale, which is plenty of resolution
 * for a phrase-drill app.
 */
const GRADE_QUALITY: Record<DrillGrade, number> = {
  again: 2, // below the "remembered" threshold (3) -> resets repetitions
  good: 4,
};

const MIN_EASE_FACTOR = 1.3;

export function createInitialReview(phraseId: string): ReviewState {
  const now = new Date().toISOString();
  return {
    phraseId,
    repetitions: 0,
    intervalDays: 0,
    easeFactor: 2.5,
    dueAt: now,
    lastReviewedAt: null,
    correctCount: 0,
    seenCount: 0,
    starred: false,
  };
}

export function nextReviewState(state: ReviewState, grade: DrillGrade): ReviewState {
  const quality = GRADE_QUALITY[grade];
  const now = new Date();

  let { repetitions, intervalDays, easeFactor } = state;

  if (quality < 3) {
    // Forgotten — restart the interval ladder, but keep some ease-factor penalty.
    repetitions = 0;
    intervalDays = 1;
  } else {
    repetitions += 1;
    if (repetitions === 1) intervalDays = 1;
    else if (repetitions === 2) intervalDays = 6;
    else intervalDays = Math.round(intervalDays * easeFactor);
  }

  easeFactor = Math.max(
    MIN_EASE_FACTOR,
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );

  const dueAt = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000).toISOString();

  return {
    ...state,
    repetitions,
    intervalDays,
    easeFactor,
    dueAt,
    lastReviewedAt: now.toISOString(),
    seenCount: state.seenCount + 1,
    correctCount: state.correctCount + (grade === 'good' ? 1 : 0),
  };
}

export function isDue(state: ReviewState): boolean {
  return new Date(state.dueAt).getTime() <= Date.now();
}
