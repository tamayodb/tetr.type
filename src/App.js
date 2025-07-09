import React, { useState, useEffect, useCallback, useRef } from 'react';
import Game from './Game';
import './App.css';

const WORDS = ['apple', 'banana', 'orange', 'grape', 'melon', 'kiwi'];

// Helper
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function App() {
  const wordIndexRef = useRef(0);
  const shuffledRef = useRef(shuffle([...WORDS]));

  const getRandomWord = useCallback(() => {
    if (wordIndexRef.current >= shuffledRef.current.length) {
      shuffledRef.current = shuffle([...WORDS]);
      wordIndexRef.current = 0;
    }
    return shuffledRef.current[wordIndexRef.current++];
  }, []);

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
          <Game
            nextWords={nextWords}
            setNextWords={setNextWords}
            getRandomWord={getRandomWord}
          />
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
