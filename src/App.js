import React, { useState } from 'react';
import Game from './Game';
import './App.css';

const WORDS = ['apple', 'banana', 'orange', 'grape', 'melon', 'kiwi'];

const getRandomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];

function App() {
  const [nextWords, setNextWords] = useState([
    getRandomWord(),
    getRandomWord(),
    getRandomWord(),
  ]);

  return (
    <div className="app-container">
      <div className="tetr-ui">
        <div className="panel hold-panel">
          <h3>HOLD</h3>
          <div className="panel-box">-</div>
        </div>

        <div className="main-area">
          <Game nextWords={nextWords} setNextWords={setNextWords} getRandomWord={getRandomWord} />
        </div>

        <div className="panel next-panel">
          <h3>NEXT</h3>
          {nextWords.map((word, index) => (
            <div
              key={index}
              className="panel-box"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 'bold',
                color: 'white',
                fontFamily: 'monospace',
              }}
            >
              {word}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
