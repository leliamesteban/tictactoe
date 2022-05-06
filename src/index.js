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

// The Board component renders 3 rows of 3 squares
function Board(props) {

	function renderSquare(i) {
		return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />;
	}

	return (
		<div>
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

// The Game component renders the board and contains all logic and state
function Game() {

	const [history, setHistory] = useState([
		{
			squares: Array(9).fill(null)
		}
	]);
	const [nextPlayer, setNextPlayer] = useState("X");
	const [stepNumber, setStepNumber] = useState(0);

	const current = history[stepNumber];
	const winner = calculateWinner(current.squares);

	const moves = history.map((step, move) => {
		const description = move ?
		'Go to move #' + move :
		'Go to game start';

		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{description}</button>
			</li>
		);
	})

	function jumpTo(step) {
		setStepNumber(step);
		if ((step % 2) === 0) {
			setNextPlayer("X");
		} else {
			setNextPlayer("O");
		}
	}

	let status;
	if (winner) {
		status = "Winner: " + winner;
	}
	else {
		status = 'Next player: ' + nextPlayer;
	}

	function handleClick(i) {
		const squares = current.squares;
		if (calculateWinner(squares) || squares[i]) {
			return;
		}

		const squaresCopy = squares.slice(0);
		squaresCopy[i] = nextPlayer;

		// Make a copy of the history array up to the current move, so that if the user makes a new move, it overwrites the history from that point onwards
		const historyCopy = history.slice(0, stepNumber + 1);
		setHistory(historyCopy.concat(
			{ squares: squaresCopy }
		));

		setStepNumber(historyCopy.length);

		if (nextPlayer == "X") {
			setNextPlayer("O");
		}

		else {
			setNextPlayer("X");
		}
	}

	return (
		<div className="game">
			<div className="game-board">
				<Board squares={current.squares} onClick={(i) => handleClick(i)} />
			</div>

			<div className="game-info">
				<div>{status}</div>
				<ol>{moves}</ol>
			</div>
		</div>
	);
}

// Helper function
function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);