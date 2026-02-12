import React from 'react';
import './ball.css';

interface BallProps {
  x: number;
  y: number;
  transitionMs: number;
}

export default function Ball({ x, y, transitionMs }: BallProps) {
  return (
    <div
      className="ball"
      style={{
        left: x,
        top: y,
        transition: `left ${transitionMs}ms ease, top ${transitionMs}ms ease`,
      }}
    >
      <div className="ball-sphere" />
    </div>
  );
}
