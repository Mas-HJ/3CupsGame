import React, { useState, useRef, useCallback } from 'react';
import Cup from './Cup';
import Ball from './Ball';

type Phase = 'idle' | 'reveal' | 'hide' | 'shuffling' | 'guess' | 'result';

interface BoardProps {
  shuffleCount: number;
  onGameEnd: (won: boolean) => void;
}

function slotToX(slot: number): number {
  return window.innerWidth / 2 + (slot - 1) * 150;
}

const CUP_Y = 250;
const BALL_Y = CUP_Y + 95;

export default function Board({ shuffleCount, onGameEnd }: BoardProps) {
  const [cupSlots, setCupSlots] = useState<[number, number, number]>([0, 1, 2]);
  const [ballCupId, setBallCupId] = useState<number>(0);
  const [cupsOpen, setCupsOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>('idle');
  const [transitionMs, setTransitionMs] = useState(500);
  const [message, setMessage] = useState('');

  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const addTimeout = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  const performShuffles = useCallback(() => {
    const startSpeed = 800;
    const endSpeed = 200;
    let cumulativeDelay = 0;

    for (let i = 0; i < shuffleCount; i++) {
      const speed = startSpeed - ((startSpeed - endSpeed) * i) / Math.max(shuffleCount - 1, 1);
      cumulativeDelay += speed;

      const stepIndex = i;
      addTimeout(() => {
        setTransitionMs(speed);

        const a = Math.floor(Math.random() * 3);
        let b = Math.floor(Math.random() * 2);
        if (b >= a) b++;

        setCupSlots(prev => {
          const next: [number, number, number] = [...prev];
          const tmp = next[a];
          next[a] = next[b];
          next[b] = tmp;
          return next;
        });

        if (stepIndex === shuffleCount - 1) {
          addTimeout(() => {
            setPhase('guess');
            setMessage('Pick a cup!');
            setTransitionMs(500);
          }, speed + 200);
        }
      }, cumulativeDelay);
    }
  }, [shuffleCount, addTimeout]);

  const startGame = useCallback(() => {
    // Clear any existing timeouts
    timeoutsRef.current.forEach(id => clearTimeout(id));
    timeoutsRef.current = [];

    // Reset slots
    setCupSlots([0, 1, 2]);
    setTransitionMs(500);

    // Pick random cup
    const randomCup = Math.floor(Math.random() * 3);
    setBallCupId(randomCup);

    // Reveal phase: lift cups to show ball
    setCupsOpen(true);
    setPhase('reveal');
    setMessage('Watch the ball!');

    // After 2s, lower cups
    addTimeout(() => {
      setCupsOpen(false);
      setPhase('hide');
      setMessage('');
    }, 2000);

    // After 3.2s total, start shuffling
    addTimeout(() => {
      setPhase('shuffling');
      setMessage('Shuffling...');
      performShuffles();
    }, 3200);
  }, [addTimeout, performShuffles]);

  const handleCupClick = (cupId: number) => {
    if (phase !== 'guess') return;

    setPhase('result');
    setCupsOpen(true);
    setTransitionMs(500);

    const won = cupId === ballCupId;
    setMessage(won ? 'You Win!' : 'You Lose!');
    onGameEnd(won);
  };

  return (
    <div className="board">
      <div className="table-surface" />
      {[0, 1, 2].map(id => (
        <Cup
          key={id}
          cupId={id}
          x={slotToX(cupSlots[id])}
          y={CUP_Y}
          isOpen={cupsOpen}
          transitionMs={transitionMs}
          clickable={phase === 'guess'}
          onClick={handleCupClick}
        />
      ))}
      <Ball
        x={slotToX(cupSlots[ballCupId])}
        y={BALL_Y}
        transitionMs={transitionMs}
      />
      {phase === 'idle' && (
        <button className="start-button" onClick={startGame}>
          Start
        </button>
      )}
      {message && (
        <div className={`message${message === 'You Win!' ? ' message--win' : ''}${message === 'You Lose!' ? ' message--lose' : ''}`}>
          {message}
        </div>
      )}
    </div>
  );
}
