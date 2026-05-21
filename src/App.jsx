import { useState, useEffect } from 'react'
import WelcomeScreen from './components/WelcomeScreen'
import QuizScreen from './components/QuizScreen'
import ResultsScreen from './components/ResultsScreen'

function App() {
  const [screen, setScreen] = useState('welcome')
  const [questions, setQuestions] = useState([])
  const [score, setScore] = useState(0)
  const [quizKey, setQuizKey] = useState(0)

  useEffect(() => {
    fetch('./questions.json')
      .then(r => r.json())
      .then(setQuestions)
      .catch(console.error)
  }, [])

  const handleFinish = (finalScore) => {
    setScore(finalScore)
    setScreen('results')
  }

  const handleRestart = () => {
    setScore(0)
    setQuizKey(k => k + 1)
    setScreen('quiz')
  }

  if (questions.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2.5rem',
      }}>
        💍
      </div>
    )
  }

  return (
    <>
      {screen === 'welcome' && (
        <WelcomeScreen
          onStart={() => setScreen('quiz')}
          questionCount={questions.length}
        />
      )}
      {screen === 'quiz' && (
        <QuizScreen
          key={quizKey}
          questions={questions}
          onFinish={handleFinish}
        />
      )}
      {screen === 'results' && (
        <ResultsScreen
          score={score}
          total={questions.length}
          onRestart={handleRestart}
        />
      )}
    </>
  )
}

export default App
