"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateWinner = exports.highlightWin = exports.Square = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
require("./index.css");
function Square(props) {
    return ((0, jsx_runtime_1.jsx)("button", Object.assign({ className: "square", onClick: props.onClick, id: "square " + props.index }, { children: props.value })));
}
exports.Square = Square;
function highlightWin(squares, toHighlight) {
    for (let i = 0; i < toHighlight.length; i++) {
        document.getElementById("square " + toHighlight[i]).style.borderWidth = '2px';
    }
}
exports.highlightWin = highlightWin;
function calculateWinner(squares) {
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
exports.calculateWinner = calculateWinner;
