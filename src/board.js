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
exports.Board = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
require("./index.css");
const square_1 = require("./square");
class Board extends React.Component {
    renderSquare(i) {
        return ((0, jsx_runtime_1.jsx)(square_1.Square, { index: i, value: this.props.squares[i], onClick: () => this.props.onClick(i) }));
    }
    render() {
        const board = [];
        let i, j, counter = 0;
        for (i = 0; i < 3; i++) {
            const row = [];
            for (j = 0; j < 3; j++) {
                row.push(this.renderSquare(counter++));
            }
            board.push((0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'board-row' }, { children: row }), i));
        }
        return ((0, jsx_runtime_1.jsx)("div", { children: board }));
    }
}
exports.Board = Board;
