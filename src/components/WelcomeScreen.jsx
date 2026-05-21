import styles from './WelcomeScreen.module.css'

export default function WelcomeScreen({ onStart, questionCount }) {
  const minutes = Math.ceil(questionCount * 0.4)

  return (
    <div className={styles.screen}>
      <div className={styles.blobTop} aria-hidden="true" />
      <div className={styles.blobBottom} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.photoWrap}>
          {/* TODO: replace with <img src="path-to-photo.jpg" alt="עמרי ושיר" className={styles.photo} /> */}
          <div className={styles.photoPlaceholder} aria-hidden="true">
            <span>💍</span>
          </div>
          <div className={styles.ringInner} aria-hidden="true" />
          <div className={styles.ringOuter} aria-hidden="true" />
        </div>

        <h1 className={styles.title}>כמה אתם מכירים אותנו?</h1>
        <p className={styles.subtitle}>ברוכים הבאים לחידון של עמרי ושיר 💍</p>

        <button className={styles.cta} onClick={onStart}>
          בואו נתחיל!
        </button>

        <p className={styles.meta}>
          {questionCount} שאלות · כ‍~{minutes} דקות
        </p>
      </div>
    </div>
  )
}
