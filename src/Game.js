import React, { useState, useEffect, useRef } from 'react';
import FallingWord from './FallingWord';

const WORDS = ['apple', 'banana', 'orange', 'grape', 'melon', 'kiwi'];

function Game() {
  const [fallingWords, setFallingWords] = useState([]);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(true);
  const containerRef = useRef(null);

  // Add new word every 3 seconds
  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      const newWord = {
        id: Date.now(),
        word: WORDS[Math.floor(Math.random() * WORDS.length)],
        position: { x: Math.random() * 300, y: 0 },
      };
      setFallingWords((prev) => [...prev, newWord]);
    }, 3000);

    return () => clearInterval(interval);
  }, [gameActive]);

  // Move words downward every 100ms
  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      setFallingWords((prevWords) =>
        prevWords.map((word) => ({
          ...word,
          position: { ...word.position, y: word.position.y + 5 },
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, [gameActive]);

  // Timer countdown
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
        setGameActive(true);
        };

  // Handle typing input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    // Check for match
    const matched = fallingWords.find((w) => w.word === value.trim());
    if (matched) {
      setFallingWords((prev) => prev.filter((w) => w.id !== matched.id));
      setInput('');
      setScore((prev) => prev + 1);
    }
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <h2>Time Left: {timeLeft}s</h2>
        <h2>Score: {score}</h2>
      </div>

      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '500px',
          border: '1px solid black',
          overflow: 'hidden',
        }}
      >
        {fallingWords.map((fw) => (
          <FallingWord key={fw.id} word={fw.word} position={fw.position} />
        ))}

        {gameActive ? (
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            style={{
              position: 'absolute',
              bottom: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '10px',
              fontSize: '16px',
            }}  
          />
        ) : (
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
    </div>
  );
}
export default Game;
