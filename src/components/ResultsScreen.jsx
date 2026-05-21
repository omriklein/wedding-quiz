import { useState, useRef, useCallback, useEffect } from 'react'
import styles from './ResultsScreen.module.css'

function getMessage(pct) {
  if (pct === 100) return { text: 'מושלם! אתם מכירים אותנו על בוריו!', emoji: '🌟' }
  if (pct >= 80)  return { text: 'כל הכבוד! אתם מכירים אותנו ממש טוב!', emoji: '🎉' }
  if (pct >= 60)  return { text: 'לא רע! יש לכם עוד מה ללמוד עלינו', emoji: '😄' }
  return { text: 'הגיע הזמן להכיר אותנו טוב יותר!', emoji: '😂' }
}

const COLORS = ['#E8409E', '#FF6BB5', '#FF3366', '#FF8C42', '#FF5EBD', '#C0307E']

let nextId = 0

export default function ResultsScreen({ score, total, onRestart }) {
  const pct = Math.round((score / total) * 100)
  const { text, emoji } = getMessage(pct)

  useEffect(() => {
    if (pct !== 100) return
    const audio = new Audio(`${import.meta.env.BASE_URL}sounds/cheer.wav`)
    audio.volume = 0.7
    audio.play().catch(() => {})
  }, [])

  const [sparks, setSparks] = useState([])
  const wrapRef = useRef(null)

  const handlePhotoClick = useCallback((e) => {
    const rect = wrapRef.current.getBoundingClientRect()
    const cx = e.clientX - rect.left
    const cy = e.clientY - rect.top
    const count = 16

    const newSparks = Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * 360 + (Math.random() - 0.5) * 25
      const distance = 70 + Math.random() * 90
      const rad = (angle * Math.PI) / 180
      const id = nextId++
      return {
        id,
        cx,
        cy,
        dx: Math.cos(rad) * distance,
        dy: Math.sin(rad) * distance,
        size: 13 + Math.random() * 10,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 80,
      }
    })

    setSparks(prev => [...prev, ...newSparks])
    const ids = new Set(newSparks.map(s => s.id))
    setTimeout(() => setSparks(prev => prev.filter(s => !ids.has(s.id))), 1000)
  }, [])

  return (
    <div className={styles.screen}>
      <div className={styles.blobTop} aria-hidden="true" />
      <div className={styles.blobBottom} aria-hidden="true" />

      <div className={styles.content}>
        <div className={styles.photoWrap} ref={wrapRef} onClick={handlePhotoClick}>
          {/* TODO: replace with <img src="path-to-photo.jpg" alt="עמרי ושיר" className={styles.photo} /> */}
          <div className={styles.photoPlaceholder} aria-hidden="true">
            <span>{emoji}</span>
          </div>
          <div className={styles.ringInner} aria-hidden="true" />
          <div className={styles.ringOuter} aria-hidden="true" />
          {sparks.map(s => (
            <span
              key={s.id}
              className={styles.spark}
              aria-hidden="true"
              style={{
                left: s.cx,
                top: s.cy,
                fontSize: s.size,
                color: s.color,
                '--dx': `${s.dx}px`,
                '--dy': `${s.dy}px`,
                animationDelay: `${s.delay}ms`,
              }}
            >
              ♥
            </span>
          ))}
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
