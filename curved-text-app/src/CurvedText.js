import React from 'react';
import './CurvedText.css';

const CurvedText = ({ text, curve }) => {
  const characters = text.split('');
  const numChars = characters.length;

  if (numChars === 0) {
    return null;
  }

  if (parseInt(curve) === 0) {
    return <div className="curved-text-container">{text}</div>;
  }

  const FONT_SIZE = 24;
  const CHAR_WIDTH_GUESS = FONT_SIZE * 0.6;

  // --- Calculate Radius based on curve ---
  // A curve of 100 will put the text in a 360-degree circle.
  // The arc angle is proportional to the curve value.
  const arcAngleDegrees = Math.abs(curve) * 3.6;
  const arcAngleRadians = arcAngleDegrees * (Math.PI / 180);

  // The length of the text arc.
  const arcLength = numChars * CHAR_WIDTH_GUESS;

  // Calculate the radius of the circle defined by the arc.
  // R = L / theta
  const radius = arcLength / arcAngleRadians;

  return (
    <div
      className="curved-text-container"
      style={{
        minHeight: `${Math.min(radius, 400)}px`, // Cap the height for shallow curves
        border: '1px solid grey',
        padding: '2em'
      }}
    >
      {characters.map((char, i) => {
        // The horizontal position of the character if the text were straight.
        const xOffset = (i - (numChars - 1) / 2) * CHAR_WIDTH_GUESS;

        // The angle to rotate this character.
        // It's the angle equivalent of its xOffset on the circle.
        const rotateAngleRad = xOffset / radius;
        const rotateAngleDeg = (rotateAngleRad * 180) / Math.PI;

        const style = {
          // Position the character horizontally first.
          // Then rotate it around the distant transform origin.
          transform: `translateX(${xOffset}px) rotate(${sign * rotateAngleDeg}deg)`,
          // The transform origin's Y is the radius.
          transformOrigin: `center ${sign * radius}px`,
        };

        return (
          <span key={i} className="curved-char" style={style}>
            {char}
          </span>
        );
      })}
    </div>
  );
};

// Helper to get the sign of the curve, defaulting to 1 for 0.
const sign = (n) => (n === 0 ? 1 : Math.sign(n));

export default CurvedText;
