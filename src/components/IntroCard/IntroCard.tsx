import styles from './IntroCard.module.scss';
import { INTRO } from '../../data/intro';
import { PhraseRow } from '../PhraseRow/PhraseRow';

interface Props {
  starredIds: Set<string>;
  onToggleStar: (id: string) => void;
}

export function IntroCard({ starredIds, onToggleStar }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.title}>✦ Your self-introduction</div>
      <div className={styles.sub}>
        Learn it line by line and you have a ready-made way to introduce
        yourself in Hong Kong.
      </div>
      {INTRO.map((phrase) => (
        <PhraseRow
          key={phrase.id}
          phrase={phrase}
          starred={starredIds.has(phrase.id)}
          onToggleStar={onToggleStar}
        />
      ))}
    </div>
  );
}
