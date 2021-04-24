import React, { useState } from "react";
import "./styles.css";
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
function Board(props) {
  const [xIsNext, setXIsNext] = useState(true);
  const [value, setValue] = useState(Array(9).fill(null));
  const handleClick = (i) => {
    const copyValue = value.slice();
    if (calculateWinner(value) || value[i]) {
      return;
    }
    copyValue[i] = xIsNext ? "X" : "O";
    setXIsNext(!xIsNext);
    setValue(copyValue);
  };
  const renderSquare = (i) => {
    return <Square value={value[i]} onClick={() => handleClick(i)} />;
  };
  const winner = calculateWinner(value);
  let status;
  if (winner) {
    status = "Выиграл " + winner;
  } else {
    status = "Следующий ход: " + (xIsNext ? "X" : "O");
  }
  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}
export function Game(props) {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}
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
      return squares[a];
    }
  }
  return null;
}
