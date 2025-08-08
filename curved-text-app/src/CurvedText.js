import React from 'react';
import './CurvedText.css';

const CurvedText = ({ text, curve }) => {
  const characters = text.split('');
  const degree = curve * 3.6; // From -360 to 360
  const radius = 200;

  // If curve is 0, render text in a straight line
  if (curve === 0) {
    return <div className="curved-text-container straight-text">{text}</div>;
  }

  const textHeight = 100;
  const arc = (Math.PI * (radius + textHeight)) / 2;
  const angle = (degree * Math.PI) / 180;
  const totalAngle = characters.length * (arc / radius);
  const startAngle = -totalAngle / 2;

  return (
    <div className="curved-text-container">
      {characters.map((char, i) => {
        const charAngle = startAngle + i * (arc / radius) * (degree/100);
        const x = radius * Math.sin(charAngle);
        const y = -radius * Math.cos(charAngle);
        const rotate = (charAngle * 180) / Math.PI + 90;

        const charStyle = {
          transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)`,
        };

        return (
          <span key={i} className="curved-char" style={charStyle}>
            {char}
          </span>
        );
      })}
    </div>
  );
};

export default CurvedText;
