import React from 'react';
import './CurvedText.css';

const CurvedText = ({ text, curve }) => {
  const FONT_SIZE = 24;
  const FONT_WEIGHT_MULTIPLIER = 0.7; // Heuristic for character width

  // --- 1. Handle Straight Line Case ---
  if (parseInt(curve) === 0 || !text) {
    return (
      <div className="curved-text-wrapper" style={{ border: '1px solid grey' }}>
        <div className="straight-text">{text}</div>
      </div>
    );
  }

  // --- 2. Calculate Arc and SVG Dimensions ---
  const textLength = text.length * FONT_SIZE * FONT_WEIGHT_MULTIPLIER;
  const absCurve = Math.abs(curve);

  // Total angle of the arc in radians
  const totalAngle = (absCurve / 100) * 2 * Math.PI;
  // Radius of the circle
  const radius = textLength / totalAngle;

  // SVG viewBox dimensions
  let svgWidth, svgHeight;
  if (absCurve >= 50) { // More than a semi-circle
    svgWidth = radius * 2;
    svgHeight = radius * 2;
  } else {
    // For smaller arcs, calculate the chord and sagitta (height of the arc)
    svgWidth = radius * 2 * Math.sin(totalAngle / 2);
    const sagitta = radius * (1 - Math.cos(totalAngle / 2));
    svgHeight = sagitta;
  }

  // Add some padding
  const PADDING = FONT_SIZE * 2;
  const viewBoxWidth = svgWidth + PADDING;
  const viewBoxHeight = svgHeight + PADDING;


  // --- 3. Generate SVG Path ---
  // Start and end points of the arc
  const startX = (viewBoxWidth / 2) - (svgWidth / 2);
  const startY = curve > 0 ? viewBoxHeight - PADDING / 2 : PADDING / 2;
  const endX = startX + svgWidth;
  const endY = startY;

  // Arc flags
  const largeArcFlag = absCurve >= 50 ? 1 : 0;
  const sweepFlag = curve > 0 ? 1 : 0;

  const pathData = `M ${startX},${startY} A ${radius},${radius} 0 ${largeArcFlag},${sweepFlag} ${endX},${endY}`;

  return (
    <div
      className="curved-text-wrapper"
      style={{
        width: `${viewBoxWidth}px`,
        height: `${viewBoxHeight}px`,
        border: '1px solid grey',
      }}
    >
      <svg
        className="curved-text-svg"
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      >
        <path id="text-curve" d={pathData} fill="transparent" />
        <text className="curved-text-text" style={{ fontSize: `${FONT_SIZE}px` }}>
          <textPath xlinkHref="#text-curve" startOffset="50%" textAnchor="middle">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default CurvedText;
