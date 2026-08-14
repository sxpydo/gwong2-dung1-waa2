import styles from './PhraseRow.module.scss';
import { ColoredJyutping } from '../../lib/jyutping';
import type { Phrase } from '../../types';

interface Props {
  phrase: Phrase;
  starred: boolean;
  onToggleStar: (id: string) => void;
}

export function PhraseRow({ phrase, starred, onToggleStar }: Props) {
  return (
    <div className={styles.row}>
      <div className={styles.main}>
        <div className={styles.cjk}>{phrase.c}</div>
        <div className={styles.jyut}>
          <ColoredJyutping jyutping={phrase.j} />
        </div>
        <div className={styles.eng}>{phrase.e}</div>
        {phrase.n && <div className={styles.note}>{phrase.n}</div>}
      </div>
      <button
        className={`${styles.star} ${starred ? styles.starred : ''}`}
        aria-label={starred ? 'Unstar this phrase' : 'Star this phrase'}
        aria-pressed={starred}
        onClick={() => onToggleStar(phrase.id)}
      >
        ★
      </button>
    </div>
  );
}
