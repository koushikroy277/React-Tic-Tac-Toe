import React, { useEffect, useReducer, useState } from 'react'
import './App.scss'
import { conReducer } from './conReducer'

const App: React.FC = () => {
  const [cellArray, setCellArray] = useState([
    { id: Math.random(), cellPlayer: '', serialNo: 0 },
    { id: Math.random(), cellPlayer: '', serialNo: 1 },
    { id: Math.random(), cellPlayer: '', serialNo: 2 },
    { id: Math.random(), cellPlayer: '', serialNo: 3 },
    { id: Math.random(), cellPlayer: '', serialNo: 4 },
    { id: Math.random(), cellPlayer: '', serialNo: 5 },
    { id: Math.random(), cellPlayer: '', serialNo: 6 },
    { id: Math.random(), cellPlayer: '', serialNo: 7 },
    { id: Math.random(), cellPlayer: '', serialNo: 8 }
  ])
  const combArr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const [welcomeScreen, setWelcomeScreen] = useState(true)
  const [restart, setRestart] = useState(false)
  const [winner, setWinner] = useState(false)
  const [xTurn, setXTurn] = useState(false)
  const [cell, setCell] = useState<any>({})
  const [result, setResult] = useState('')

  const circleClass = 'o'
  const xClass = 'x'

  const currentClass = xTurn ? xClass : circleClass

  useEffect(() => {
    const checkWin = () => {
      return combArr.map((comb: any) => {
        const [a, b, c] = comb

        const checkDraw = () => {
          if (
            cellArray[a].cellPlayer &&
            cellArray[a].cellPlayer !== cellArray[b].cellPlayer &&
            cellArray[a].cellPlayer !== cellArray[c].cellPlayer
          ) {
            return cellArray.every(cell => {
              return cell.cellPlayer !== ''
            })
          }
        }

        if (
          cellArray[a].cellPlayer &&
          cellArray[a].cellPlayer === cellArray[b].cellPlayer &&
          cellArray[a].cellPlayer === cellArray[c].cellPlayer
        ) {
          setResult(`Player ${cellArray[a].cellPlayer} won`)
          setRestart(true)
          setWinner(true)
        }

        if (checkDraw()) {
          setResult('Game is drawn')
          setRestart(true)
        }
      })
    }

    checkWin()
  }, [cellArray, xTurn, currentClass])

  const handleClick = (d: any, i: any) => {
    if (d.cellPlayer !== '') return null

    setCell(d)
    filledCell(i)
    setXTurn(x => !x)
  }

  const filledCell = (d: number) => {
    const newCells = [...cellArray]
    if (newCells[d].cellPlayer !== '') return

    newCells[d].cellPlayer = currentClass
    setCellArray(newCells)
  }

  const handleRestart = () => {
    setWelcomeScreen(true)
    setRestart(res => !res)

    setCellArray(arr =>
      arr.map((d: any) => {
        return {
          ...d,
          cellPlayer: ''
        }
      })
    )
  }

  return (
    <>
      <div className="gameParent">
        <div
          className={
            xTurn ? `gameContainer ${xClass}` : `gameContainer ${circleClass}`
          }
        >
          <div className="playerTurn">
            <div className={xTurn ? 'player active' : 'player'}>
              <h1>Player X</h1>
            </div>
            <div className={xTurn ? 'player' : 'player active'}>
              <h1>Player O</h1>
            </div>
          </div>
          <div className="gameWrapper">
            {cellArray.map((d: any, i: any) => (
              <React.Fragment key={i}>
                <div
                  className={`gameCells ${d.cellPlayer}`}
                  onClick={() => handleClick(d, i)}
                ></div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      {restart && (
        <div className="restartContainer">
          <div className="restartWrapper">
            <div className="restartBtn">
              {result !== '' && <h1>{result}</h1>}
              <button onClick={handleRestart}>Restart</button>
            </div>
          </div>
        </div>
      )}
      {welcomeScreen && (
        <div className="welcomeParent">
          <div className="welcomeWrapper">
            <div className="playerChoose">
              <button
                onClick={() => {
                  setWelcomeScreen(false)
                  setXTurn(true)
                }}
              >
                Player X
              </button>
            </div>
            <div className="playerChoose">
              <button
                onClick={() => {
                  setWelcomeScreen(false)
                  setXTurn(false)
                }}
              >
                Player O
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
