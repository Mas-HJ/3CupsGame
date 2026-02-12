import React, { useState } from 'react';
import Board from './components/Board';
import './App.css';

type Difficulty = 'easy' | 'medium' | 'hard';

const SHUFFLE_COUNTS: Record<Difficulty, number> = {
  easy: 3,
  medium: 6,
  hard: 10,
};

function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameKey, setGameKey] = useState(0);

  const handleGameEnd = (won: boolean) => {
    if (won) {
      setWins(w => w + 1);
    } else {
      setLosses(l => l + 1);
    }
    setGameOver(true);
  };

  const handlePlayAgain = () => {
    setGameOver(false);
    setGameKey(k => k + 1);
  };

  const handleDifficultyChange = (d: Difficulty) => {
    setDifficulty(d);
    setGameOver(false);
    setGameKey(k => k + 1);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>3 Cups Game</h1>
        <div className="difficulty-selector">
          {(['easy', 'medium', 'hard'] as Difficulty[]).map(d => (
            <button
              key={d}
              className={d === difficulty ? 'active' : ''}
              onClick={() => handleDifficultyChange(d)}
            >
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          ))}
        </div>
        <div className="score">
          <span className="wins">Wins: {wins}</span>
          <span className="losses">Losses: {losses}</span>
        </div>
      </div>

      <Board
        key={gameKey}
        shuffleCount={SHUFFLE_COUNTS[difficulty]}
        onGameEnd={handleGameEnd}
      />

      {gameOver && (
        <button className="play-again" onClick={handlePlayAgain}>
          Play Again
        </button>
      )}
    </div>
  );
}

export default App;
