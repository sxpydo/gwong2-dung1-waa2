import styles from './GrammarSection.module.scss';
import { GRAMMAR } from '../../data/grammar';
import { ColoredJyutping } from '../../lib/jyutping';

export function GrammarSection() {
  return (
    <div>
      {/* Basic sentence structures */}
      <div className={styles.block}>
        <div className={styles.blockTitle}>Basic Sentence Structures</div>
        <div className={styles.blockNote}>
          Cantonese word order is close to English: Subject, then Verb, then Object.
        </div>
        {GRAMMAR.structures.map((s, i) => (
          <div className={styles.gRow} key={i}>
            <div className={styles.gPattern}>{s.pattern}</div>
            <div className={styles.gCjk}>{s.c}</div>
            <div className={styles.gJyut}>
              <ColoredJyutping jyutping={s.j} />
            </div>
            <div className={styles.gEng}>{s.e}</div>
            <div className={styles.gBreakdown}>{s.breakdown}</div>
          </div>
        ))}
      </div>

      {/* Tense table */}
      <div className={styles.block}>
        <div className={styles.blockTitle}>The Four Tenses</div>
        <div className={styles.blockNote}>
          Verbs don't conjugate — instead you drop in a small marker word (or just a time word) to
          show when something happens.
        </div>
        <div className={styles.tenseTable}>
          {GRAMMAR.tenseTable.map((t, i) => (
            <div className={styles.tenseRow} key={i}>
              <div className={styles.tenseLabel}>
                {t.label}
                <span className={styles.tenseMarker}>{t.marker}</span>
              </div>
              <div className={styles.tenseContent}>
                <div className={styles.gCjk}>{t.c}</div>
                <div className={styles.gJyut}>
                  <ColoredJyutping jyutping={t.j} />
                </div>
                <div className={styles.gEng}>{t.e}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marker cheat sheet */}
      <div className={styles.block}>
        <div className={styles.blockTitle}>Markers at a Glance</div>
        <div className={styles.markerGrid}>
          {GRAMMAR.markers.map((m, i) => (
            <div className={styles.markerCard} key={i}>
              <div className={styles.markerBadge}>
                {m.badge}
                <div className={styles.markerJyut}>{m.jyut}</div>
              </div>
              <div>
                <div className={styles.markerInfoTitle}>{m.title}</div>
                <div className={styles.markerInfoDesc}>{m.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience marker */}
      <div className={styles.block}>
        <div className={styles.blockTitle}>Talking About Experience: 過【gwo3】</div>
        <div className={styles.blockNote}>
          Different from 咗 — 過 says "this has happened to me at some point," not "I just did this."
        </div>
        {GRAMMAR.experience.map((s, i) => (
          <div className={styles.gRow} key={i}>
            <div className={styles.gPattern}>{s.pattern}</div>
            <div className={styles.gCjk}>{s.c}</div>
            <div className={styles.gJyut}>
              <ColoredJyutping jyutping={s.j} />
            </div>
            <div className={styles.gEng}>{s.e}</div>
          </div>
        ))}
      </div>

      {/* Callout */}
      <div className={styles.block}>
        <div className={styles.callout}>
          ⚠️ Adjectives and 係 (verb "to be") never change form for tense. Only the time word or a
          marker on the main verb shows when something happened — 我今日好開心 (happy today) and
          我尋日好開心 (happy yesterday) use the exact same adjective.
        </div>
      </div>

      {/* Time words grid */}
      <div className={styles.block}>
        <div className={styles.blockTitle}>Time Words: Past / Present / Future</div>
        <div className={styles.timeGrid}>
          <div className={styles.timeGridHead}>
            <div>Past</div>
            <div>Present</div>
            <div>Future</div>
          </div>
          {GRAMMAR.timeGrid.map((row, i) => (
            <div className={styles.timeGridRow} key={i}>
              <div>
                <span className={styles.tgC}>{row.past}</span>
                <span className={styles.tgJ}>
                  <ColoredJyutping jyutping={row.pastJ} />
                </span>
                <span className={styles.tgJ}>{row.pastE}</span>
              </div>
              <div className={styles.present}>
                <span className={styles.tgC}>{row.present}</span>
                <span className={styles.tgJ}>
                  <ColoredJyutping jyutping={row.presentJ} />
                </span>
                <span className={styles.tgJ}>{row.presentE}</span>
              </div>
              <div>
                <span className={styles.tgC}>{row.future}</span>
                <span className={styles.tgJ}>
                  <ColoredJyutping jyutping={row.futureJ} />
                </span>
                <span className={styles.tgJ}>{row.futureE}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
