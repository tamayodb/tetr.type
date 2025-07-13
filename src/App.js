import React, { useState, useEffect, useCallback, useRef } from 'react';
import Game from './Game';
import './App.css';

function App() {
  const [nextWords, setNextWords] = useState([]);
  const wordQueue = useRef([]);
  const [score, setScore] = useState(0);
  const [scoreAnimated, setScoreAnimated] = useState(false);

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

  // Animate score change
  useEffect(() => {
    if (score > 0) {
      setScoreAnimated(true);
      const timer = setTimeout(() => setScoreAnimated(false), 500);
      return () => clearTimeout(timer);
    }
  }, [score]);

  const getRandomWord = useCallback(() => {
    if (wordQueue.current.length === 0) {
      fetchWords();
      return '...';
    }
    return wordQueue.current.shift();
  }, []);

  return (
    <div className="app-container">
      <div className="tetr-ui">
        <div className="panel hold-panel">
          <h3>SCORE</h3>
          <div className={`panel-box ${scoreAnimated ? 'animate-score' : ''}`}>
            {score}
          </div>
        </div>

        <div className="main-area">
          <Game
            nextWords={nextWords}
            setNextWords={setNextWords}
            getRandomWord={getRandomWord}
            score={score}
            setScore={setScore}
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
