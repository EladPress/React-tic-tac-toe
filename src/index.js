"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
//import React, { useState } from 'react';
var React = require("react");
//import ReactDOM from 'react-dom/client';
var ReactDOM = require("react-dom/client");
require("./index.css");
function Square(props) {
    return ((0, jsx_runtime_1.jsx)("button", __assign({ className: "square", onClick: props.onClick, id: "square " + props.index }, { children: props.value })));
}
var Board = /** @class */ (function (_super) {
    __extends(Board, _super);
    function Board() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Board.prototype.renderSquare = function (i) {
        var _this = this;
        return ((0, jsx_runtime_1.jsx)(Square, { index: i, value: this.props.squares[i], onClick: function () { return _this.props.onClick(i); } }));
    };
    Board.prototype.render = function () {
        var board = [];
        var i, j, counter = 0;
        for (i = 0; i < 3; i++) {
            var row = [];
            for (j = 0; j < 3; j++) {
                row.push(this.renderSquare(counter++));
            }
            board.push((0, jsx_runtime_1.jsx)("div", __assign({ className: 'board-row' }, { children: row }), i));
        }
        return ((0, jsx_runtime_1.jsx)("div", { children: board }));
    };
    return Board;
}(React.Component));
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                    pos: []
                }
            ],
            stepNumber: 0,
            xIsNext: true
        };
        return _this;
    }
    Game.prototype.reverseClick = function () {
        this.setState({
            isReversed: !this.state.isReversed
        });
    };
    Game.prototype.handleClick = function (i) {
        var history = this.state.history.slice(0, this.state.stepNumber + 1);
        var current = history[history.length - 1];
        var squares = current.squares.slice();
        var pos = current.pos.slice(0, current.pos.length + 1);
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        pos.push({ row: Math.floor(i / 3) + 1, col: i % 3 + 1 });
        this.setState({
            history: history.concat([
                {
                    squares: squares,
                    pos: pos
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            pos: i
        });
    };
    Game.prototype.jumpTo = function (step, buttonId) {
        var i;
        for (i = 0; i < 9; i++) {
            document.getElementById("square " + i).style.borderWidth = '1px';
        }
        //console.log(this.state.history.length);
        for (i = 0; i < this.state.history.length; i++) {
            //console.log(`step ${i}`);
            //console.log(i);
            document.getElementById("step ".concat(i)).style.fontWeight = 'normal';
        }
        document.getElementById(buttonId).style.fontWeight = 'bold';
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    };
    Game.prototype.render = function () {
        // this.setState({
        //   isReversed: false,
        // });
        var _this = this;
        var history = this.state.history;
        var current = history[this.state.stepNumber];
        var winner = calculateWinner(current.squares);
        var pos = history.pos;
        //console.log(pos.length);
        var moves = history.map(function (step, move) {
            var pos = step.pos[step.pos.length - 1];
            var desc = move ?
                'Go to move #' + move + " (" + pos["col"] + ", " + pos["row"] + ")" : //; + ", (" + col + ", " + row + ")":
                'Go to game start';
            var buttonId = "step ".concat(move);
            //const isActive = false;
            return ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("button", __assign({ id: buttonId, onClick: function () { return _this.jumpTo(move, buttonId); } }, { children: desc })) }, move));
        });
        var status;
        if (winner) {
            status = "Winner: " + winner;
        }
        else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }
        return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "game" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "game-board" }, { children: (0, jsx_runtime_1.jsx)(Board, { squares: current.squares, onClick: function (i) { return _this.handleClick(i); } }) })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "game-info" }, { children: [(0, jsx_runtime_1.jsx)("div", { children: status }), (0, jsx_runtime_1.jsx)("ol", __assign({ style: { 'flexDirection': (this.state.isReversed ? 'column-reverse' : 'column') } }, { children: moves })), (0, jsx_runtime_1.jsx)("button", __assign({ onClick: function () { return _this.reverseClick(); } }, { children: "reverse" }))] }))] })));
    };
    return Game;
}(React.Component));
// ========================================
var root = ReactDOM.createRoot(document.getElementById("root"));
root.render((0, jsx_runtime_1.jsx)(Game, {}));
function highlightWin(squares, toHighlight) {
    for (var i = 0; i < toHighlight.length; i++) {
        document.getElementById("square " + toHighlight[i]).style.borderWidth = '2px';
        //document.getElementById("square " + toHighlight[i]).style.borderco = '2px';
    }
}
function calculateWinner(squares) {
    var lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (var i = 0; i < lines.length; i++) {
        var _a = lines[i], a = _a[0], b = _a[1], c = _a[2];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            highlightWin(squares, lines[i]);
            return squares[a];
        }
    }
    //let isBoardFull = true;
    for (var i = 0; i < 9; i++) {
        if (squares[i] == null) {
            return null;
        }
    }
    alert("draw");
    return null;
}
