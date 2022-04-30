import React from 'react';
import {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
	const [value, setValue] = useState();
	return (
		<button className="square" onClick={() => {setValue('X')}}>
			{value}
		</button>
	);
}

function Board() {

	function renderSquare(i) {
		return <Square value={i}/>;
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