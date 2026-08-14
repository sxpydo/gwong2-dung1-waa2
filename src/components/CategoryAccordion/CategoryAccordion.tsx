import { useState } from 'react';
import styles from './CategoryAccordion.module.scss';
import { PhraseRow } from '../PhraseRow/PhraseRow';
import { GrammarSection } from '../GrammarSection/GrammarSection';
import type { Category } from '../../types';

interface Props {
  category: Category;
  starredIds: Set<string>;
  onToggleStar: (id: string) => void;
}

export function CategoryAccordion({ category, starredIds, onToggleStar }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.cat} ${open ? styles.open : ''}`}>
      <button className={styles.head} onClick={() => setOpen((o) => !o)}>
        <span className={styles.name}>
          <span className={styles.emoji}>{category.emoji}</span>
          {category.name}
        </span>
        <span className={styles.right}>
          <span className={styles.count}>{category.phrases.length}</span>
          <span className={styles.chev}>&#8250;</span>
        </span>
      </button>
      <div className={styles.body}>
        {category.desc && <div className={styles.desc}>{category.desc}</div>}
        {category.type === 'grammar' && <GrammarSection />}
        {category.type === 'grammar' && category.phrases.length > 0 && (
          <div className={styles.practiceLabel}>Practice these sentences ↓ (starrable, drillable)</div>
        )}
        {category.phrases.map((phrase) => (
          <PhraseRow
            key={phrase.id}
            phrase={phrase}
            starred={starredIds.has(phrase.id)}
            onToggleStar={onToggleStar}
          />
        ))}
      </div>
    </div>
  );
}
