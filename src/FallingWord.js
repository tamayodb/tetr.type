import React from 'react';

function FallingWord({ word, position }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        color: '#ffffff', 
        fontWeight: 'bold',
        fontSize: '18px',
        fontFamily: '"Press Start 2P", monospace',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        transition: 'top 0.1s linear',
      }}
    >
      {word}
    </div>
  );
}

export default FallingWord;
