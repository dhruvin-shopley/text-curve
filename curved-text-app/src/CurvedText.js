import React from 'react';
import './CurvedText.css';

const CurvedText = ({ text, curve }) => {
  const characters = text.split('');
  const numChars = characters.length;

  if (numChars === 0) {
    return null;
  }

  const FONT_SIZE = 24;
  const CHAR_WIDTH = FONT_SIZE * 0.7; // A better heuristic for char width

  // Interpolation factor (from 0 to 1)
  const t = Math.abs(curve) / 100;
  const sign = Math.sign(curve);

  // --- Circle properties (for t = 1) ---
  const circleCircumference = numChars * CHAR_WIDTH * 1.5; // Add some spacing
  const circleRadius = circleCircumference / (2 * Math.PI);
  const anglePerCharCircle = (2 * Math.PI) / numChars;

  return (
    <div className="curved-text-container-final">
      {characters.map((char, i) => {
        // --- Position 1: Straight Line (t = 0) ---
        const xStraight = (i - (numChars - 1) / 2) * CHAR_WIDTH;
        const yStraight = 0;

        // --- Position 2: Full Circle (t = 1) ---
        const angle = (i - (numChars - 1) / 2) * anglePerCharCircle;
        const xCircle = circleRadius * Math.sin(angle);
        const yCircle = -sign * (circleRadius * Math.cos(angle) - circleRadius);

        // --- Interpolated Position ---
        const x = (1 - t) * xStraight + t * xCircle;
        const y = (1 - t) * yStraight + t * yCircle;

        // --- Interpolated Rotation ---
        const rotationCircle = (angle * 180) / Math.PI;
        const rotation = t * rotationCircle;

        const style = {
          transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
        };

        return (
          <span key={i} className="curved-char-final" style={style}>
            {char}
          </span>
        );
      })}
    </div>
  );
};

export default CurvedText;
