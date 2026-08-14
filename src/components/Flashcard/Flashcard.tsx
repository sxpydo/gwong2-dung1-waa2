import { useMemo, useState } from 'react';
import styles from './Flashcard.module.scss';
import { ColoredJyutping } from '../../lib/jyutping';
import type { DrillGrade, Phrase } from '../../types';

interface Props {
  phrase: Phrase;
  onGrade: (grade: DrillGrade) => void;
}

export function Flashcard({ phrase, onGrade }: Props) {
  const [flipped, setFlipped] = useState(false);
  // Randomise direction per-card: sometimes Cantonese -> English, sometimes English -> Cantonese.
  const askEnglishFirst = useMemo(() => Math.random() < 0.5, [phrase.id]);

  const grade = (g: DrillGrade) => {
    setFlipped(false);
    onGrade(g);
  };

  return (
    <div>
      <div
        className={`${styles.card} ${flipped ? styles.flipped : ''}`}
        tabIndex={0}
        role="button"
        aria-pressed={flipped}
        onClick={() => setFlipped(true)}
        onKeyDown={(e) => e.key === 'Enter' && setFlipped(true)}
      >
        {!flipped ? (
          <div>
            <div className={styles.cjkBig}>{askEnglishFirst ? phrase.e : phrase.c}</div>
            <div className={styles.hint}>Tap to reveal</div>
          </div>
        ) : (
          <div>
            <div className={styles.cjkBack}>{phrase.c}</div>
            <div className={styles.jyutBack}>
              <ColoredJyutping jyutping={phrase.j} />
            </div>
            <div className={styles.engBack}>{phrase.e}</div>
          </div>
        )}
      </div>

      {flipped && (
        <div className={styles.actions}>
          <button className={styles.again} onClick={() => grade('again')}>
            Still learning
          </button>
          <button className={styles.good} onClick={() => grade('good')}>
            Got it
          </button>
        </div>
      )}
    </div>
  );
}
