import React from 'react';

function FallingWord({ word, position, fontSize, color }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        fontSize: `${fontSize}px`,
        fontFamily: '"Press Start 2P", monospace',
        color: color,
        textShadow: `
          -1px -1px 0 white,
          1px -1px 0 white,
          -1px  1px 0 white,
          1px  1px 0 white
        `,
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
      }}
    >
      {word}
    </div>
  );
}

export default FallingWord;
