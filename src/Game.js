import React, { useState, useEffect, useRef } from 'react';
import FallingWord from './FallingWord';

function Game({ nextWords, setNextWords, getRandomWord, score, setScore }) {
  const [fallingWords, setFallingWords] = useState([]);
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(true);
  const containerRef = useRef(null);

  // Add a new falling word every 3 seconds
  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      const next = nextWords[0];
      const fontSize = Math.floor(Math.random() * (24 - 14 + 1)) + 14;
      const wordLength = next.length;
      const estimatedWidth = fontSize * wordLength * 0.9;
      const padding = 4;
      const maxX = Math.max(0, 300 - estimatedWidth - padding);
      const x = Math.random() * maxX;

      const newWord = {
        id: Date.now(),
        word: next,
        position: { x: Math.random() * maxX, y: 0 },
        fontSize,
        color: '#ffffff',
        speed: Math.random() * 1.5 + 0.5, // Falling speed
      };

      setFallingWords((prev) => [...prev, newWord]);
      setNextWords((prev) => [...prev.slice(1), getRandomWord()]);
    }, 3000);

    return () => clearInterval(interval);
  }, [gameActive, nextWords, getRandomWord, setNextWords]);

  // Animate words falling
  useEffect(() => {
    if (!gameActive) return;

    let animationFrame;

    const update = () => {
      setFallingWords((prevWords) =>
        prevWords
          .map((word) => ({
            ...word,
            position: { ...word.position, y: word.position.y + word.speed },
          }))
           .filter((word) => word.position.y < 500) 
      );

      animationFrame = requestAnimationFrame(update);
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [gameActive]);

  // Countdown timer
  useEffect(() => {
    if (!gameActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, timeLeft]);

  // Restart game
  const restartGame = () => {
    setScore(0);
    setTimeLeft(60);
    setInput('');
    setFallingWords([]);
    setNextWords([getRandomWord(), getRandomWord(), getRandomWord()]);
    setGameActive(true);
  };

  // Typing input handler
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    const matched = fallingWords.find((w) => w.word === value.trim());
    if (matched) {
      setFallingWords((prev) => prev.filter((w) => w.id !== matched.id));
      setInput('');
      setScore((prev) => prev + 1);
    }
  };

  return (
    <div style={{ textAlign: 'center', color: 'white' }}>
      <h2>Time Left: {timeLeft}s</h2>

      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '300px',
          height: '500px',
          margin: '0 auto',
          backgroundColor: 'black',
          border: '2px solid white',
          overflow: 'hidden',
        }}
      >
        {fallingWords.map((fw) => (
          <FallingWord
            key={fw.id}
            word={fw.word}
            position={fw.position}
            fontSize={fw.fontSize}
            color={fw.color}
          />
        ))}

        {!gameActive && (
          <div
            style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
              backgroundColor: 'white',
              color: 'black',
              padding: '20px',
              border: '2px solid black',
              borderRadius: '10px',
            }}
          >
            <p>Game Over!</p>
            <p>Your score: {score}</p>
            <button
              onClick={restartGame}
              style={{
                marginTop: '10px',
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',
                backgroundColor: '#000',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
              }}
            >
              Restart
            </button>
          </div>
        )}
      </div>

      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Type falling word here"
        disabled={!gameActive}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          width: '300px',
          textAlign: 'center',
        }}
      />
    </div>
  );
}

export default Game;
