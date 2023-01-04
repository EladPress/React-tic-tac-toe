//import React, { useState } from 'react';
import * as React from 'react';
//import ReactDOM from 'react-dom/client';
import * as ReactDOM from 'react-dom/client';
import './index.css';

function Square(props: any) {
  return (
    <button 
      className="square"
      onClick={props.onClick}
      id={"square " + props.index}
      >
      {props.value}
    </button>
    
  );
}

class Board extends React.Component<any, any> {

  renderSquare(i: number) {
    return (
      <Square
        index={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  

  render() {
    const board = [];
    let i, j, counter = 0;
    for(i = 0; i < 3; i++)
    {
      const row = [];
      for(j = 0; j < 3; j++)
      {
        row.push(this.renderSquare(counter++));
      }
      board.push(<div className='board-row' key={i}>{row}</div>);
    }
    return (
      <div>
        {board}
      </div>
    );
  }
}

class Game extends React.Component<any, any> {
  

  constructor(props: any) {
    super(props);
    
    this.state = {
      history: [
        {
          squares: Array(9).fill(null), 
          pos: [],
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  reverseClick(){
    this.setState({
      isReversed: !this.state.isReversed,
    })
  }
  
  handleClick(i: number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const pos = current.pos.slice(0, current.pos.length + 1);

    if (calculateWinner(squares)|| squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    pos.push({row: Math.floor(i / 3) + 1, col: i % 3 + 1});
    this.setState({
      history: history.concat([
        {
          squares: squares,
          pos: pos,
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      pos: i,
    });
  }

  jumpTo(step: any, buttonId: any) {
    
    let i;
    for(i = 0; i < 9; i++)
    {
      document.getElementById("square " + i)!.style.borderWidth = '1px';
    }
    //console.log(this.state.history.length);
    for(i = 0; i < this.state.history.length; i++)
    {
      //console.log(`step ${i}`);
      //console.log(i);
      document.getElementById(`step ${i}`)!.style.fontWeight = 'normal';
    }
    document.getElementById(buttonId)!.style.fontWeight = 'bold';
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    // this.setState({
    //   isReversed: false,
    // });
    
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const pos = history.pos;
    //console.log(pos.length);
    const moves = history.map((step: { pos: string | any[]; }, move: React.Key | null | undefined) => {
      const pos = step.pos[step.pos.length - 1];
      const desc = move ?
        'Go to move #' + move + " (" + pos["col"] + ", " + pos["row"] + ")"://; + ", (" + col + ", " + row + ")":
        'Go to game start';
      const buttonId = `step ${move}`;
      //const isActive = false;
      return (
        <li key={move}>
          <button id={buttonId} onClick={() => this.jumpTo(move, buttonId)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i: number) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol style={{'flexDirection': (this.state.isReversed ? 'column-reverse' : 'column')}}>{moves}</ol>
          <button onClick={() => this.reverseClick()}>reverse</button>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<Game />);

function highlightWin(squares: any, toHighlight: any)
{
  for(let i = 0; i < toHighlight.length; i++)
  {
    document.getElementById("square " + toHighlight[i])!.style.borderWidth = '2px';
    //document.getElementById("square " + toHighlight[i]).style.borderco = '2px';
  }
}

function calculateWinner(squares: any) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      highlightWin(squares, lines[i]);
      return squares[a];
    }
  }

  //let isBoardFull = true;
  for(let i = 0; i < 9; i++)
  {
    if(squares[i] == null) 
    {
      return null;
    } 
  }
  
  alert("draw");
  return null;
}
