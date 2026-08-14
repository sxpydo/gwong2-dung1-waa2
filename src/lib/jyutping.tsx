import type { JSX } from 'react';

const TONE_COLOR_VAR: Record<string, string> = {
  '1': 'var(--t1)',
  '2': 'var(--t2)',
  '3': 'var(--t3)',
  '4': 'var(--t4)',
  '5': 'var(--t5)',
  '6': 'var(--t6)',
};

export const TONE_NAMES: Record<string, string> = {
  '1': 'high level',
  '2': 'high rising',
  '3': 'mid level',
  '4': 'low falling',
  '5': 'low rising',
  '6': 'low level',
};

/**
 * Renders Jyutping romanization ("nei5 hou2") with each tone digit
 * colored consistently, so tone patterns become visually recognizable
 * over time rather than just memorized per-word.
 */
export function ColoredJyutping({ jyutping }: { jyutping: string }): JSX.Element {
  const syllables = jyutping.split(' ');
  return (
    <>
      {syllables.map((syll, i) => {
        const match = syll.match(/^([a-zA-Z]+)([1-6])$/);
        if (!match) {
          return (
            <span key={i}>
              {syll}
              {i < syllables.length - 1 ? ' ' : ''}
            </span>
          );
        }
        const [, base, tone] = match;
        return (
          <span key={i}>
            {base}
            <span style={{ fontWeight: 700, color: TONE_COLOR_VAR[tone] }}>{tone}</span>
            {i < syllables.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </>
  );
}
