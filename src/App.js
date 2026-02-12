import React from 'react';
import Move from './components/move';
import Board from './components/board';
import './App.css';

function App() {
  return (
    <div className="App">
      <Board />
      <Move />
    </div>
  );
}

export default App;
