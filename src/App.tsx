import { useCallback, useEffect, useState } from "react"
import { EndGame } from "./components/EndGame"
import { HangmanDrawing } from "./components/HangmanDrawing"
import { HangmanWord } from "./components/HangmanWord"
import { Keyboard } from "./components/Keyboard"
import { SetWord } from "./components/SetWord"
import words from './wordList.json'

function getWord() {
  return words[Math.floor(Math.random() * words.length)].normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

function App() {
  const [customWord, setCustomWord] = useState(false)
  const [wordToGuess, setWordToGuess] = useState(getWord())
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const incorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))
  const isLoser = incorrectLetters.length >= 6
  const isWinner = wordToGuess.split('').every(letter => guessedLetters.includes(letter))
  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isWinner || isLoser) return
    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters, isWinner, isLoser])
  
  useEffect(() => {
    if (!customWord) {
      const handler = (e: KeyboardEvent) => {
        const key = e.key
        if (!key.match(/^[a-z]$/)) return
        e.preventDefault()
        addGuessedLetter(key)
      }
      document.addEventListener('keypress', handler)
  
      return () => {
        document.removeEventListener('keypress', handler)
      }
    }
  }, [guessedLetters, customWord])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      if (key !== 'Enter') return
      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
    }
    document.addEventListener('keypress', handler)

    return () => {
      document.removeEventListener('keypress', handler)
    }
  })

  return (
    <div style={{ maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1rem', margin: '0 auto', alignItems: 'center'}}>
      <EndGame isWinner={isWinner} isLoser={isLoser} />
      <SetWord guessedLetters={guessedLetters} setCustomWord={setCustomWord} customWord={customWord} setWordToGuess={setWordToGuess} />
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div style={{ alignSelf: 'stretch' }}>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  )
}

export default App
