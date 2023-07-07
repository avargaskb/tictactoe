'use client';
import { useState } from 'react';

export default function Home() {
	const Square = ({ value, onSquareClick }) => {
		return (
			<button
				className="font-bold text-center border-2 border-white float-left leading-9 mr-[-1px] mt-[-1px] p-0 w-24 h-24 text-4xl"
				onClick={onSquareClick}
			>
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
						<button
							className=" text-xl bg-orange-400 rounded-3xl p-4 hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-300"
							onClick={handleReset}
						>
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
			<div className="min-h-screen bg-[url('/wood-bg.jpg')] bg-cover bg-center text-white">
				<div className="grid justify-center pt-20 text-center  ">
					<div className="text-3xl md:text-5xl font-bold my-10 ">
						Tic Tac Toe
					</div>
					<>
						<div>
							{renderSquare(0)}
							{renderSquare(1)}
							{renderSquare(2)}
						</div>
						<div>
							{renderSquare(3)}
							{renderSquare(4)}
							{renderSquare(5)}
						</div>
						<div>
							{renderSquare(6)}
							{renderSquare(7)}
							{renderSquare(8)}
						</div>
					</>
					<div className="mt-6 text-2xl font-bold">{status}</div>
					<div className="mt-8 ">
						<ResetButton />
					</div>
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
