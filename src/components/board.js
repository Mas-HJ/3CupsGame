import React, { useState, useEffect } from 'react';
import Ball from './ball';
import './cup.css';
import Cup from './cup';

export default function Board() {
  const [cup1, cup1Setter] = useState({ index: 1, goal: false, position: 1 });
  useState({ index: 2, goal: true, position: 2 });
  const [cup3, cup3Setter] = useState({ index: 3, goal: false, position: 3 });
  const [ballIndex, ballindexSetter] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      ballindexSetter(2);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const nums = [1, 2, 3];

    const swap = (index1, index2) => {
      cup1Setter((prev) => ({ ...prev, position: index1 }));
      cup3Setter((prev) => ({ ...prev, position: index2 }));
    };

    const interval = setInterval(() => {
      const num = nums[Math.floor(Math.random() * nums.length)];
      swap(num, num);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Cup id='1'
        cupIndex={cup1.index}
        goal={cup1.goal}
        position={cup1.position}
      />
      <Cup id='2'
        cupIndex={2}
        goal={true}
        position={2}
      />
      <Cup id='3'
        cupIndex={cup3.index}
        goal={cup3.goal}
        position={cup3.position}
      />
      <Ball ballIndex={ballIndex} />
    </div>
  );
}
