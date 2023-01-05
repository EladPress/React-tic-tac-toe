import * as React from 'react';
//import ReactDOM from 'react-dom/client';
import * as ReactDOM from 'react-dom/client';
import './index.css';
import {Square}  from './square';

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

export {Board};