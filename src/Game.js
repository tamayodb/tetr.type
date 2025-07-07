import React, { useState, useEffect, useRef } from 'react';
import FallingWord from './FallingWord';

const WORDS = ['apple', 'banana', 'orange', 'grape', 'melon', 'kiwi'];

function Game() {
  const [fallingWords, setFallingWords] = useState([]);
  const [input, setInput] = useState('');
  const containerRef = useRef(null);

  // Add new word every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newWord = {
        id: Date.now(),
        word: WORDS[Math.floor(Math.random() * WORDS.length)],
        position: { x: Math.random() * 300, y: 0 }, // random x, y starts at 0
      };
      setFallingWords((prev) => [...prev, newWord]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Move words downward every 100ms
  useEffect(() => {
    const interval = setInterval(() => {
      setFallingWords((prevWords) =>
        prevWords.map((word) => ({
          ...word,
          position: { ...word.position, y: word.position.y + 5 },
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Handle typing input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    // Check if it matches any word
    const matched = fallingWords.find((w) => w.word === value.trim());
    if (matched) {
      setFallingWords((prev) => prev.filter((w) => w.id !== matched.id));
      setInput('');
    }
  };

  return (
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
    </div>
  );
}

export default Game;
