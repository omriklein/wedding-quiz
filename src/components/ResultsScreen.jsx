import styles from './ResultsScreen.module.css'

function getMessage(pct) {
  if (pct === 100) return { text: 'מושלם! אתם מכירים אותנו על בוריו!', emoji: '🌟' }
  if (pct >= 80)  return { text: 'כל הכבוד! אתם מכירים אותנו ממש טוב!', emoji: '🎉' }
  if (pct >= 60)  return { text: 'לא רע! יש לכם עוד מה ללמוד עלינו', emoji: '😄' }
  return { text: 'הגיע הזמן להכיר אותנו טוב יותר!', emoji: '😂' }
}

export default function ResultsScreen({ score, total, onRestart }) {
  const pct = Math.round((score / total) * 100)
  const { text, emoji } = getMessage(pct)

  return (
    <div className={styles.screen}>
      <div className={styles.blobTop} aria-hidden="true" />
      <div className={styles.blobBottom} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.photoWrap}>
          {/* TODO: replace with <img src="path-to-photo.jpg" alt="עמרי ושיר" className={styles.photo} /> */}
          <div className={styles.photoPlaceholder} aria-hidden="true">
            <span>{emoji}</span>
          </div>
          <div className={styles.ringInner} aria-hidden="true" />
          <div className={styles.ringOuter} aria-hidden="true" />
        </div>

        <div className={styles.scoreWrap}>
          <span className={styles.scoreNum}>{score}</span>
          <span className={styles.scoreSlash}>/</span>
          <span className={styles.scoreTotal}>{total}</span>
        </div>

        <h2 className={styles.message}>{text}</h2>
        <p className={styles.pct}>{pct}% נכון</p>

        <button className={styles.restart} onClick={onRestart}>
          שחק שוב
        </button>
      </div>
    </div>
  )
}
