"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
require("./index.css");
const functions_1 = require("./functions");
function Board(props) {
    function renderSquare(i) {
        return ((0, jsx_runtime_1.jsx)(functions_1.Square, { index: i, value: props.squares[i], onClick: () => props.onClick(i) }));
    }
    const board = [];
    let i, j, counter = 0;
    for (i = 0; i < 3; i++) {
        const row = [];
        for (j = 0; j < 3; j++) {
            row.push(renderSquare(counter++));
        }
        board.push((0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'board-row' }, { children: row }), i));
    }
    return ((0, jsx_runtime_1.jsx)("div", { children: board }));
}
exports.Board = Board;
