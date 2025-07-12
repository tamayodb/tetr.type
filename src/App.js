import React, { useState, useEffect, useCallback, useRef } from 'react';
import Game from './Game';
import './App.css';

function App() {
  const [nextWords, setNextWords] = useState([]);
  const wordQueue = useRef([]);

  const fetchWords = async () => {
    try {
      const res = await fetch('https://random-word-api.vercel.app/api?words=10');
      const data = await res.json();
      setNextWords(data.slice(0, 3));
      wordQueue.current = data.slice(3);
    } catch (err) {
      console.error('Failed to fetch words:', err);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  const getRandomWord = useCallback(() => {
    if (wordQueue.current.length === 0) {
      fetchWords(); // refresh queue in background
      return '...'; // fallback placeholder
    }
    return wordQueue.current.shift();
  }, []);

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
