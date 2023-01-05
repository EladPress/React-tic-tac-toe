import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import { Board } from './board'
import { calculateWinner } from './functions';

function Game(props: any) {

  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      pos: [],
    }
  ])
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isReversed, setIsReversed] = useState(false);


  function reverseClick() {
    setIsReversed(!isReversed);
  }

  function handleClick(i: number) {
    //const history: any = history.slice(0, this.state.stepNumber + 1);
    setHistory(history.slice(0, stepNumber + 1));
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const pos: any = current.pos.slice(0, current.pos.length + 1);

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    pos.push({ row: Math.floor(i / 3) + 1, col: i % 3 + 1 });

    setHistory(history.concat([{
      squares: squares,
      pos: pos,
    }]));
    setStepNumber(history.length);
    setXIsNext(!xIsNext);

  }

  function jumpTo(step: any, buttonId: any) {

    let i;
    for (i = 0; i < 9; i++) {
      document.getElementById("square " + i)!.style.borderWidth = '1px';
    }

    for (i = 0; i < history.length; i++) {
      document.getElementById(`step ${i}`)!.style.fontWeight = 'normal';
    }
    document.getElementById(buttonId)!.style.fontWeight = 'bold';
    // this.setState({
    //   stepNumber: step,
    //   xIsNext: (step % 2) === 0
    // });
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }



  //const history = this.state.history;
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step: { pos: string | any[]; }, move: React.Key | null | undefined) => {
    const pos = step.pos[step.pos.length - 1];
    const desc = move ?
      'Go to move #' + move + " (" + pos["col"] + ", " + pos["row"] + ")" ://; + ", (" + col + ", " + row + ")":
      'Go to game start';
    const buttonId = `step ${move}`;
    //const isActive = false;
    return (
      <li key={move}>
        <button id={buttonId} onClick={() => jumpTo(move, buttonId)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i: number) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol style={{ 'flexDirection': (isReversed ? 'column-reverse' : 'column') }}>{moves}</ol>
        <button onClick={() => reverseClick()}>reverse</button>
      </div>
    </div>
  );
}


// ========================================

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<Game />);


