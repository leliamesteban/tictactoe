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

	function renderSquare(index) {
		return <Square value={props.board[index]} onClick={() => props.onClick(index)} />;
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

	const [boards, setBoards] = useState([
		{
			squares: Array(9).fill(null)
		}
	]);
	const [nextPlayer, setNextPlayer] = useState("X");
	const [move, setMove] = useState(0);

	const currentBoard = boards[move].squares;
	const winner = calculateWinner(currentBoard);
	const status = winner ?
	"Winner: " + winner :
	"Next player: " + nextPlayer;

	const moves = boards.map((step, move) => {
		const description = move ?
		'Go to move #' + move :
		'Go to game start';

		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{description}</button>
			</li>
		);
	})

	function jumpTo(move) {
		setMove(move);
		if ((move % 2) === 0) {
			setNextPlayer("X");
		} else {
			setNextPlayer("O");
		}
	}

	function addMove(move) {
		if (calculateWinner(currentBoard) || currentBoard[move]) {
			return;
		}

		const nextBoard = currentBoard.slice(0);
		nextBoard[move] = nextPlayer;

		const boardsCopy = boards.slice(0, move + 1);
		setBoards(boardsCopy.concat(
			{ squares: nextBoard }
		));

		setMove(boardsCopy.length);

		if (nextPlayer === "X") {
			setNextPlayer("O");
		}

		else {
			setNextPlayer("X");
		}
	}

	return (
		<div className="game">
			<div className="game-board">
				<Board board={currentBoard} onClick={(move) => addMove(move)} />
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