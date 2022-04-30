import React from 'react';
import {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {

	return (
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
	);
}

function Board() {

	const [squares, setSquares] = useState(Array(9).fill(null));

	function handleClick(i) {
		const tmp = squares.slice(0);
		tmp[i] = 'X';
		setSquares(tmp);
	}

	function renderSquare(i) {
		return <Square value={squares[i]} onClick={() => handleClick(i)} />;
	}

	const status = 'Next player: X';

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

function Game() {
	return (
		<div className="game">
			<div className="game-board">
				<Board />
			</div>

			<div className="game-info">
				<div>{/* status */}</div>
				<ol>{/* history */}</ol>
			</div>
		</div>
	);
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);