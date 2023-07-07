'use client';
import { useState } from 'react';

export default function Home() {
	const Square = ({ value, onSquareClick }) => {
		return (
			<button className="square" onClick={onSquareClick}>
				{value}
			</button>
		);
	};

	const Board = () => {
		const [squares, setSquares] = useState(Array(9).fill(null));
		const [isXNext, setIsXNext] = useState(true);

		const handleClick = (i) => {
			if (calculateWinner(squares) || squares[i]) {
				return;
			}
			squares[i] = isXNext ? 'X' : 'O';
			setSquares(squares);
			setIsXNext(!isXNext);
		};

		function calculateWinner(squares) {
			const winnerPatterns = [
				[0, 1, 2],
				[3, 4, 5],
				[6, 7, 8],
				[0, 3, 6],
				[1, 4, 7],
				[2, 5, 8],
				[2, 4, 6],
				[0, 4, 8],
			];
			for (let i = 0; i < winnerPatterns.length; i++) {
				const [a, b, c] = winnerPatterns[i];
				if (
					squares[a] &&
					squares[a] === squares[b] &&
					squares[a] === squares[c]
				) {
					return squares[a];
				}
			}
			return null;
		}

		const winner = calculateWinner(squares);
		let status;
		if (squares.every((i) => i !== null)) {
			status = 'Game over ';
		} else if (winner) {
			status = `Winner is ${winner}`;
		} else {
			status = `Is ${isXNext ? 'X' : 'O'} turn to play`;
		}

		const handleReset = () => {
			setSquares(Array(9).fill(null));
			setIsXNext(true);
		};

		const ResetButton = () => {
			return (
				<div>
					{squares.indexOf('X' || 'O') > -1 ? (
						<button className="reset" onClick={handleReset}>
							{' '}
							Restart Game!
						</button>
					) : (
						' '
					)}
				</div>
			);
		};

		const renderSquare = (i) => {
			return (
				<Square
					value={squares[i]}
					onSquareClick={() => {
						handleClick(i);
					}}
				/>
			);
		};
		return (
			<div className="container">
				<div className='text-4xl font-bold my-10'>Tic Tac Toe</div>
				<>
					<div className="row">
						{renderSquare(0)}
						{renderSquare(1)}
						{renderSquare(2)}
					</div>
					<div className="row">
						{renderSquare(3)}
						{renderSquare(4)}
						{renderSquare(5)}
					</div>
					<div className="row">
						{renderSquare(6)}
						{renderSquare(7)}
						{renderSquare(8)}
					</div>
				</>
				<div className="status">{status}</div>
				<div className="restart">
					<ResetButton />
				</div>
			</div>
		);
	};

	return (
		<div>
			<Board />
		</div>
	);
}
