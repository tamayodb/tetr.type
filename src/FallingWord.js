import React from 'react';

function FallingWord({ word, position, fontSize, color }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        fontSize: `${fontSize}px`,
        color,
        fontFamily: "'Press Start 2P', monospace",
        userSelect: 'none',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        overflow: 'hidden',          
        maxWidth: '100%',     
      }}
    >
      {word}
    </div>
  );
}

export default FallingWord;
