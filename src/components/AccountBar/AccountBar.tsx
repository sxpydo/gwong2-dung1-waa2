import styles from "./AccountBar.module.scss";

interface Props {
  loaded: boolean;
  isGoogleLinked: boolean;
  displayName: string | null;
  photoURL: string | null;
  onSignIn: () => void;
  onSignOut: () => void;
}

export function AccountBar({
  loaded,
  isGoogleLinked,
  displayName,
  photoURL,
  onSignIn,
  onSignOut,
}: Props) {
  if (!loaded) return null;

  if (isGoogleLinked) {
    return (
      <div className={styles.bar}>
        {photoURL && (
          <img
            className={styles.avatar}
            src={photoURL}
            alt=""
            referrerPolicy="no-referrer"
          />
        )}
        <span className={styles.label}>
          Synced as {displayName ?? "you"} — your progress follows you to any
          device.
        </span>
        <button className={styles.action} onClick={onSignOut}>
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className={styles.bar}>
      <span className={styles.label}>
        Progress is only saved on this device right now.
      </span>
      <button className={styles.action} onClick={onSignIn}>
        Sign in with Google to sync
      </button>
    </div>
  );
}
