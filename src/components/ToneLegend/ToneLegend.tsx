import styles from './ToneLegend.module.scss';
import { TONE_NAMES } from '../../lib/jyutping';

const TONES = ['1', '2', '3', '4', '5', '6'];

export function ToneLegend() {
  return (
    <div className={styles.tones}>
      {TONES.map((t) => (
        <div className={styles.pill} key={t}>
          <span className={styles.swatch} style={{ background: `var(--t${t})` }} />
          Tone {t} &middot; {TONE_NAMES[t]}
        </div>
      ))}
    </div>
  );
}
