type EndGameProps = {
  isWinner?: boolean
  isLoser?: boolean
}

export function EndGame({ isWinner = false, isLoser = false }: EndGameProps) {
  return (
    <div style={{
      fontSize: '7rem',
      margin: '30px',
      width: '500px',
      textAlign: 'center',
      position: 'absolute',
      color: 'white',
      zIndex: 10 }}
    >
      { isWinner && (
        <div style={{ background: 'green', border: '5px solid black', }}>Ganaste!
          <div style={{ fontSize: '1.7rem', marginBottom: '10px' }}>ENTER para reiniciar</div>
        </div>
        ) }
      { isLoser && (
        <div style={{ background: 'red', border: '5px solid black', }}>Perdiste!
          <div style={{ fontSize: '1.7rem', marginBottom: '10px' }}>ENTER para reiniciar</div>
        </div>
        ) }
    </div>
  )
}