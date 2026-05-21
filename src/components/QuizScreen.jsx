import { useState, useEffect, useRef } from 'react'
import styles from './QuizScreen.module.css'

export default function QuizScreen({ questions, onFinish }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [cardKey, setCardKey] = useState(0)
  const scoreRef = useRef(0)

  const question = questions[currentIndex]
  const total = questions.length
  const isLast = currentIndex === total - 1
  const isAnswered = selectedAnswer !== null
  const progressPct = ((currentIndex + (isAnswered ? 1 : 0)) / total) * 100

  const handleAnswer = (index) => {
    if (isAnswered) return
    if (index === question.correct) scoreRef.current += 1
    setSelectedAnswer(index)
  }

  const handleNext = () => {
    setCurrentIndex(i => i + 1)
    setSelectedAnswer(null)
    setCardKey(k => k + 1)
  }

  useEffect(() => {
    if (!isAnswered || !isLast) return
    const timer = setTimeout(() => onFinish(scoreRef.current), 2000)
    return () => clearTimeout(timer)
  }, [isAnswered, isLast, onFinish])

  const getOptionState = (index) => {
    if (!isAnswered) return 'default'
    if (index === question.correct) return 'correct'
    if (index === selectedAnswer) return 'wrong'
    return 'dimmed'
  }

  return (
    <div className={styles.screen}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.counter}>{currentIndex + 1}/{total}</span>
      </div>

      {/* Progress */}
      <div className={styles.progressWrap}>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Question + options */}
      <div className={styles.cardWrap}>
        <div key={cardKey} className={styles.card}>
          <p className={styles.question}>{question.question}</p>
        </div>

        <div className={styles.options}>
          {question.options.map((opt, i) => {
            const state = getOptionState(i)
            return (
              <button
                key={i}
                className={`${styles.option} ${styles[state]}`}
                onClick={() => handleAnswer(i)}
                disabled={isAnswered}
              >
                {opt}
                {isAnswered && state === 'correct' && ' ✓'}
                {isAnswered && state === 'wrong' && ' ✗'}
              </button>
            )
          })}
        </div>

        {isAnswered && !isLast && (
          <button className={styles.nextBtn} onClick={handleNext}>
            הבא
          </button>
        )}

        {isAnswered && isLast && (
          <p className={styles.finishHint}>מחשבים תוצאות...</p>
        )}
      </div>
    </div>
  )
}
