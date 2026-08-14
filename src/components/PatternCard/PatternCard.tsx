import { useState } from 'react';
import styles from './PatternCard.module.scss';
import { ColoredJyutping } from '../../lib/jyutping';
import type { Pattern, PatternOption } from '../../types';

export function PatternCard({ pattern }: { pattern: Pattern }) {
  const [selected, setSelected] = useState<PatternOption | null>(null);

  const blankC = pattern.template_c.split('___');
  const blankJ = pattern.template_j.split('___');

  return (
    <div className={styles.card}>
      <div className={styles.tag}>{pattern.tag}</div>
      <div className={styles.cjk}>
        {blankC.map((part, i) => (
          <span key={i}>
            {part}
            {i < blankC.length - 1 && <span className={styles.slot}>___</span>}
          </span>
        ))}
      </div>
      <div className={styles.jyut}>
        {blankJ.map((part, i) => (
          <span key={i}>
            <ColoredJyutping jyutping={part} />
            {i < blankJ.length - 1 && <span className={styles.slotJ}>___</span>}
          </span>
        ))}
      </div>
      <div className={styles.eng}>{pattern.template_e}</div>

      <div className={styles.chipRow}>
        {pattern.options.map((opt, i) => (
          <button
            key={i}
            className={`${styles.chip} ${selected === opt ? styles.active : ''}`}
            onClick={() => setSelected(opt)}
          >
            {opt.c}
          </button>
        ))}
      </div>

      {selected && (
        <div className={styles.built}>
          <div className={styles.cjkBuilt}>{pattern.template_c.split('___').join(selected.c)}</div>
          <div className={styles.jyutBuilt}>
            <ColoredJyutping jyutping={pattern.template_j.split('___').join(selected.j)} />
          </div>
          <div className={styles.engBuilt}>{pattern.template_e.split('___').join(selected.e)}</div>
        </div>
      )}
    </div>
  );
}
