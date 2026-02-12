import React, { useState, useEffect } from 'react';
import './cup.css';
import cup from '../images/cup.png';

export default function Cup(props) {
  const [cupPositionX, cupPositionSetterX] = useState(0);
  const [cupPositionY, cupPositionSetterY] = useState(0);
  const [isOpen, isOpenSetter] = useState(true);

  useEffect(() => {
    if (props.position && props.cupIndex === 1) {
      const indexGap = 150;
      const posX = (window.innerWidth / 2) + indexGap;
      cupPositionSetterX(posX);
    } else if (props.position && props.cupIndex === 2) {
      const posX = window.innerWidth / 2;
      cupPositionSetterX(posX);
    } else if (props.position && props.cupIndex === 3) {
      const indexGap = 150;
      const posX = (window.innerWidth / 2) - indexGap;
      cupPositionSetterX(posX);
    }
  }, [props.position, props.cupIndex]);

  useEffect(() => {
    const posY = window.innerHeight / 2;
    cupPositionSetterY(posY);
    const timeout = setTimeout(() => {
      isOpenSetter(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="cup" style={{ left: cupPositionX + "px", top: cupPositionY + "px" }}>
      <img id={"cupimage-" + props.id} className={isOpen ? '--open' : ""} src={cup} alt='cup' />
    </div>
  );
}
