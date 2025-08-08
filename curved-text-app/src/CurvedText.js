import React from 'react';
import './CurvedText.css';

const CurvedText = ({ text, curve }) => {
  // Handle the straight line case
  if (curve === 0) {
    return <div className="straight-text">{text}</div>;
  }

  const characters = text.split('');
  const radius = 200; // A fixed radius for the circle

  // Map curve prop to a total angle. 100 curve = 360 degrees.
  const totalAngleDegrees = curve * 3.6;
  // The angle between the centers of each character
  const anglePerChar = characters.length > 1 ? totalAngleDegrees / (characters.length -1) : 0;

  return (
    <div className="curved-text-container" style={{ height: `${radius * 2}px` }}>
      {characters.map((char, i) => {
        // Calculate the rotation for this character's container.
        // The middle of the text should be at the 0-degree mark (top of the circle).
        const charAngle = (i - (characters.length - 1) / 2) * anglePerChar;

        const containerStyle = {
          transform: `rotate(${charAngle}deg)`,
        };

        return (
          <div key={i} className="char-container" style={containerStyle}>
            <span className="char-itself">{char}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CurvedText;
