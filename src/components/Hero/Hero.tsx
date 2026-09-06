import { useMemo } from "react";
import styles from "./Hero.module.scss";
import { ToneLegend } from "../ToneLegend/ToneLegend";

const TRIP_DATE = new Date("2026-11-05T00:00:00");

export function Hero() {
  const daysLeft = useMemo(() => {
    const now = new Date();
    return Math.max(
      0,
      Math.ceil((TRIP_DATE.getTime() - now.getTime()) / 86_400_000),
    );
  }, []);

  return (
    <div className={styles.hero}>
      <p className={styles.eyebrow}>
        <span className={styles.dot} />
        Trip prep &middot; Hong Kong
      </p>
      <h1 className={styles.title}>
        Build your <span className={styles.cjk}>廣東話</span>
      </h1>
      <p className={styles.sub}>
        Built from your actual lessons with Bessie - real vocab, the grammar
        patterns you've covered, and the tone traps she flagged. Practice makes
        perfect!
      </p>
      <div className={styles.countdown}>
        <b>{daysLeft}</b>&nbsp;days until November
      </div>
      <ToneLegend />
    </div>
  );
}
