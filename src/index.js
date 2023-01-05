"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ReactDOM = __importStar(require("react-dom/client"));
require("./index.css");
const board_1 = require("./board");
const square_1 = require("./square");
function Game(props) {
    const [history, setHistory] = (0, react_1.useState)([
        {
            squares: Array(9).fill(null),
            pos: [],
        }
    ]);
    const [stepNumber, setStepNumber] = (0, react_1.useState)(0);
    const [xIsNext, setXIsNext] = (0, react_1.useState)(true);
    const [isReversed, setIsReversed] = (0, react_1.useState)(false);
    function reverseClick() {
        setIsReversed(!isReversed);
    }
    function handleClick(i) {
        //const history: any = history.slice(0, this.state.stepNumber + 1);
        setHistory(history.slice(0, stepNumber + 1));
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const pos = current.pos.slice(0, current.pos.length + 1);
        if ((0, square_1.calculateWinner)(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? "X" : "O";
        pos.push({ row: Math.floor(i / 3) + 1, col: i % 3 + 1 });
        // this.setState({
        //   history: history.concat([
        //     {
        //       squares: squares,
        //       pos: pos,
        //     }
        //   ]),
        //   stepNumber: history.length,
        //   xIsNext: !xIsNext,
        //   pos: i,
        // });
        setHistory(history.concat([{
                squares: squares,
                pos: pos,
            }]));
        setStepNumber(history.length);
        setXIsNext(!xIsNext);
    }
    function jumpTo(step, buttonId) {
        let i;
        for (i = 0; i < 9; i++) {
            document.getElementById("square " + i).style.borderWidth = '1px';
        }
        for (i = 0; i < history.length; i++) {
            document.getElementById(`step ${i}`).style.fontWeight = 'normal';
        }
        document.getElementById(buttonId).style.fontWeight = 'bold';
        // this.setState({
        //   stepNumber: step,
        //   xIsNext: (step % 2) === 0
        // });
        setStepNumber(step);
        setXIsNext((step % 2) === 0);
    }
    //const history = this.state.history;
    const current = history[stepNumber];
    const winner = (0, square_1.calculateWinner)(current.squares);
    const moves = history.map((step, move) => {
        const pos = step.pos[step.pos.length - 1];
        const desc = move ?
            'Go to move #' + move + " (" + pos["col"] + ", " + pos["row"] + ")" : //; + ", (" + col + ", " + row + ")":
            'Go to game start';
        const buttonId = `step ${move}`;
        //const isActive = false;
        return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ id: buttonId, onClick: () => jumpTo(move, buttonId) }, { children: desc })) }, move));
    });
    let status;
    if (winner) {
        status = "Winner: " + winner;
    }
    else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "game" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "game-board" }, { children: (0, jsx_runtime_1.jsx)(board_1.Board, { squares: current.squares, onClick: (i) => handleClick(i) }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "game-info" }, { children: [(0, jsx_runtime_1.jsx)("div", { children: status }), (0, jsx_runtime_1.jsx)("ol", Object.assign({ style: { 'flexDirection': (isReversed ? 'column-reverse' : 'column') } }, { children: moves })), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => reverseClick() }, { children: "reverse" }))] }))] })));
}
// ========================================
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render((0, jsx_runtime_1.jsx)(Game, {}));
