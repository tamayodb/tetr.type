import React, { useState, useEffect, useRef } from 'react';
import FallingWord from './FallingWord';

function Game({ nextWords, setNextWords, getRandomWord }) {
  const [fallingWords, setFallingWords] = useState([]);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(true);
  const containerRef = useRef(null);
  const colors = ['#B63B42', '#BBA33D', '#B56533', '#8BB93C', '#6F57E1', '#40B98D', '#1B42D4'];

  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      const BOX_WIDTH = 300;
      const WORD_WIDTH_ESTIMATE = 80; // approx width in px
      const maxX = BOX_WIDTH - WORD_WIDTH_ESTIMATE;
      const next = nextWords[0];
      const newWord = {
        id: Date.now(),
        word: next,
        position: { x: Math.random() * maxX, y: 0 },

        fontSize: Math.floor(Math.random() * (24 - 14 + 1)) + 14,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      setFallingWords((prev) => [...prev, newWord]);
      setNextWords((prev) => [...prev.slice(1), getRandomWord()]);
    }, 3000);

    return () => clearInterval(interval);
  }, [gameActive, nextWords, getRandomWord, setNextWords]);

  // Move words downward based on difficulty
  useEffect(() => {
    if (!gameActive) return;

    let fallSpeed = 100;
    if (timeLeft <= 45) fallSpeed = 75;
    if (timeLeft <= 30) fallSpeed = 50;
    if (timeLeft <= 15) fallSpeed = 30;

    const interval = setInterval(() => {
      setFallingWords((prevWords) =>
        prevWords.map((word) => ({
          ...word,
          position: { ...word.position, y: word.position.y + 5 },
        }))
      );
    }, fallSpeed);

    return () => clearInterval(interval);
  }, [gameActive, timeLeft]);

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
    setNextWords([
      getRandomWord(),
      getRandomWord(),
      getRandomWord()
    ]);
    setGameActive(true);
  };

  // Handle input
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
    <h2>Score: {score}</h2>

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
