import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./App.module.scss";
import { Hero } from "./components/Hero/Hero";
import { Tabs, type TabId } from "./components/Tabs/Tabs";
import { IntroCard } from "./components/IntroCard/IntroCard";
import { CategoryAccordion } from "./components/CategoryAccordion/CategoryAccordion";
import { PatternCard } from "./components/PatternCard/PatternCard";
import { Flashcard } from "./components/Flashcard/Flashcard";
import { CATEGORIES, ALL_PHRASES } from "./data/categories";
import { INTRO } from "./data/intro";
import { PATTERNS } from "./data/patterns";
import { useProgress } from "./hooks/useProgress";
import type { DrillMode, Phrase } from "./types";

const ALL_DRILLABLE: Phrase[] = [...INTRO, ...ALL_PHRASES];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function App() {
  const [tab, setTab] = useState<TabId>("reference");
  const [drillMode, setDrillMode] = useState<DrillMode>("all");
  const [, setQueue] = useState<Phrase[]>([]);
  const [current, setCurrent] = useState<Phrase | null>(null);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionSeen, setSessionSeen] = useState(0);
  const [streak, setStreak] = useState(0);

  const {
    reviews,
    grade,
    toggleStar,
    resetAll,
    dueIds,
    starredIds,
  } = useProgress();
  const starredSet = useMemo(() => new Set(starredIds), [starredIds]);

  const pool = useMemo(() => {
    if (drillMode === "starred")
      return ALL_DRILLABLE.filter((p) => starredSet.has(p.id));
    if (drillMode === "due") {
      const dueSet = new Set(dueIds);
      // phrases never reviewed are always "due" too
      return ALL_DRILLABLE.filter((p) => dueSet.has(p.id) || !reviews[p.id]);
    }
    return ALL_DRILLABLE;
  }, [drillMode, starredSet, dueIds, reviews]);

  const nextCard = useCallback(() => {
    setQueue((q) => {
      if (q.length > 0) {
        setCurrent(q[q.length - 1]);
        return q.slice(0, -1);
      }
      const shuffled = shuffle(pool);
      setCurrent(shuffled[shuffled.length - 1] ?? null);
      return shuffled.slice(0, -1);
    });
  }, [pool]);

  useEffect(() => {
    if (tab === "drill" && !current && pool.length > 0) {
      nextCard();
    }
  }, [tab, current, pool, nextCard]);

  const handleModeChange = (mode: DrillMode) => {
    setDrillMode(mode);
    setQueue([]);
    setCurrent(null);
  };

  const handleGrade = (g: "again" | "good") => {
    if (!current) return;
    grade(current.id, g);
    setSessionSeen((n) => n + 1);
    if (g === "good") {
      setSessionCorrect((n) => n + 1);
      setStreak((n) => n + 1);
    } else {
      setStreak(0);
    }
    setCurrent(null);
    nextCard();
  };

  const handleReset = async () => {
    if (!confirm("Reset all drill progress? Starred phrases stay.")) return;
    await resetAll();
    setSessionCorrect(0);
    setSessionSeen(0);
    setStreak(0);
    setCurrent(null);
    setQueue([]);
  };

  return (
    <div className={styles.wrap}>
      <Hero />
      <Tabs active={tab} onChange={setTab} />

      {tab === "reference" && (
        <div>
          <IntroCard starredIds={starredSet} onToggleStar={toggleStar} />
          {CATEGORIES.map((cat) => (
            <CategoryAccordion
              key={cat.id}
              category={cat}
              starredIds={starredSet}
              onToggleStar={toggleStar}
            />
          ))}
        </div>
      )}

      {tab === "builder" && (
        <div>
          {PATTERNS.map((pattern, i) => (
            <PatternCard key={i} pattern={pattern} />
          ))}
        </div>
      )}

      {tab === "drill" && (
        <div>
          <div className={styles.modeToggle}>
            <button
              className={`${styles.modeChip} ${drillMode === "all" ? styles.modeActive : ""}`}
              onClick={() => handleModeChange("all")}
            >
              All phrases
            </button>
            <button
              className={`${styles.modeChip} ${drillMode === "starred" ? styles.modeActive : ""}`}
              onClick={() => handleModeChange("starred")}
            >
              Starred only
            </button>
            <button
              className={`${styles.modeChip} ${drillMode === "due" ? styles.modeActive : ""}`}
              onClick={() => handleModeChange("due")}
            >
              Due for review
            </button>
          </div>

          <div className={styles.stats}>
            <div className={styles.statBox}>
              <div className={styles.statNum}>{sessionCorrect}</div>
              <div className={styles.statLabel}>Correct</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statNum}>{sessionSeen}</div>
              <div className={styles.statLabel}>Reviewed</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statNum}>{streak}</div>
              <div className={styles.statLabel}>Streak</div>
            </div>
          </div>

          {pool.length === 0 ? (
            <div className={styles.empty}>
              {drillMode === "starred"
                ? "No starred phrases yet — star some in the Reference tab."
                : "Nothing due right now — check back later or drill All phrases."}
            </div>
          ) : (
            current && <Flashcard phrase={current} onGrade={handleGrade} />
          )}

          <button className={styles.resetLink} onClick={handleReset}>
            Reset drill progress
          </button>
        </div>
      )}
    </div>
  );
}
