import React, { useEffect, useState } from 'react';
import './ball.css';
import ball from '../images/ball.png';

export default function Ball(props) {
  const [ballPosition, positionSetter] = useState(0);

  useEffect(() => {
    if (props.ballIndex) {
      positionSetter(props.ballIndex * 400);
    }
  }, [props.ballIndex]);

  return (
    <div className="ball">
      <img style={{ left: ballPosition + "px" }} className='ballimage' src={ball} alt='ball' />
    </div>
  );
}
