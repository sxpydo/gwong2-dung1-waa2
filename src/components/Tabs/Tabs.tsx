import styles from './Tabs.module.scss';

export type TabId = 'reference' | 'builder' | 'drill';

const TABS: { id: TabId; label: string }[] = [
  { id: 'reference', label: 'Reference' },
  { id: 'builder', label: 'Sentence Builder' },
  { id: 'drill', label: 'Drill' },
];

export function Tabs({ active, onChange }: { active: TabId; onChange: (id: TabId) => void }) {
  return (
    <div className={styles.tabs}>
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tabBtn} ${active === tab.id ? styles.active : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
