import React from 'react';
import './cup.css';
import cupImg from '../images/cup.png';

interface CupProps {
  cupId: number;
  x: number;
  y: number;
  isOpen: boolean;
  transitionMs: number;
  clickable: boolean;
  onClick: (cupId: number) => void;
}

export default function Cup({ cupId, x, y, isOpen, transitionMs, clickable, onClick }: CupProps) {
  const handleClick = () => {
    if (clickable) {
      onClick(cupId);
    }
  };

  return (
    <div
      className={`cup${clickable ? ' cup--clickable' : ''}`}
      style={{
        left: x,
        top: y,
        transition: `left ${transitionMs}ms ease, top ${transitionMs}ms ease`,
      }}
      onClick={handleClick}
    >
      <img
        className="cup-image"
        src={cupImg}
        alt="cup"
        style={{
          transform: isOpen ? 'translateY(-200px)' : 'translateY(0)',
          transition: `transform 0.5s ease`,
        }}
      />
    </div>
  );
}
