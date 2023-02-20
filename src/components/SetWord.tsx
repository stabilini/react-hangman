import { useState } from "react"

type SetWordProps = {
  guessedLetters: string[]
  customWord: boolean
  setCustomWord: any
  setWordToGuess: any
}

export function SetWord ({ guessedLetters, customWord, setCustomWord, setWordToGuess }: SetWordProps) {
  const [input, setInput] = useState('')

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setInput(e.target.value)
  }
  
  const handleShowInput = (e: any) => {
    e.preventDefault()
    setCustomWord(!customWord)
  }
  
  const handleSetCustomWord = (e: any) => {
    e.preventDefault()
    setWordToGuess(input)
    setCustomWord(false)
    setInput('')
  }

  return (
    <>
      { guessedLetters.length === 0 && (
        <div style={{ position: 'relative', left: 0 }}>
          <button onClick={handleShowInput}>¿Ingresar palabra?</button>
          { customWord && (
            <>
            <input onChange={handleInput} value={input}></input>
            { input.length > 0 && <button onClick={handleSetCustomWord}>OK</button> }
            </>
          ) 
        }
        </div>
        )
      }
    </>
  )
}