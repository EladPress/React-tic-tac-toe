import * as React from 'react';
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

function highlightWin(squares: any, toHighlight: any) {
    for (let i = 0; i < toHighlight.length; i++) {
        document.getElementById("square " + toHighlight[i])!.style.borderWidth = '2px';
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
    for (let i = 0; i < 9; i++) {
        if (squares[i] == null) {
            return null;
        }
    }

    alert("draw");
    return null;
}

export { Square, highlightWin, calculateWinner }