import React, { useState, useEffect } from 'react';
import './TicTacToe.css';

const X_CLASS = 'X';
const O_CLASS = 'O';

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill(''));
  const [turn, setTurn] = useState<number>(0);
  const [gameActive, setGameActive] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('');
  const [scoreX, setScoreX] = useState<number>(0);
  const [scoreO, setScoreO] = useState<number>(0);

  useEffect(() => {
    if (turn === 9 && !checkWin(board, turn % 2 === 0 ? X_CLASS : O_CLASS)) {
      setTitle('Draw');
      setGameActive(false);
    }
  }, [turn, board]);

  const handleClick = (index: number): void => {
    if (!gameActive || board[index] !== '') return;

    const currentClass = turn % 2 === 0 ? X_CLASS : O_CLASS;
    const newBoard = board.slice();
    newBoard[index] = currentClass;

    setBoard(newBoard);
    setTurn(turn + 1);

    if (checkWin(newBoard, currentClass)) {
      setTitle(`${currentClass} wins!`);
      setGameActive(false);
      if (currentClass === X_CLASS) {
        setScoreX(scoreX + 1);
      } else {
        setScoreO(scoreO + 1);
      }
    }
  };

  const checkWin = (board: string[], currentClass: string): boolean => {
    const winPatterns: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winPatterns.some(pattern =>
      pattern.every(index => board[index] === currentClass)
    );
  };

  const resetGame = (): void => {
    setBoard(Array(9).fill(''));
    setTurn(0);
    setGameActive(true);
    setTitle('');
  };

  return (
    <div className="game-container">
      <div className="nav">
        <h3 id="title">{title}</h3>
      </div>
      <main>
        <div className="board">
          {board.map((cell, index) => (
            <div
              key={index}
              className={`box ${cell}`}
              onClick={() => handleClick(index)}
              id={index.toString()}
            >
             
            </div>
          ))}
        </div>
      </main>
      <div id="players">
        <h2 className="p1">
          Player X <p id="scoreX">Score: {scoreX}</p>
        </h2>
        <button id="reset" onClick={resetGame}>Play again</button>
        <h2 className="p2">
          Player O <p id="scoreO">Score: {scoreO}</p>
        </h2>
      </div>
    </div>
  );
};

export default TicTacToe;
