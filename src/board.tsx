import * as React from 'react';
import './index.css';
import { Square } from './functions';

function Board(props: any) {

  function renderSquare(i: number) {
    return (
      <Square
        index={i}
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />
    );
  }

  const board = [];
  let i, j, counter = 0;
  for (i = 0; i < 3; i++) {
    const row = [];
    for (j = 0; j < 3; j++) {
      row.push(renderSquare(counter++));
    }
    board.push(<div className='board-row' key={i}>{row}</div>);
  }
  return (
    <div>
      {board}
    </div>
  );
}


export { Board };