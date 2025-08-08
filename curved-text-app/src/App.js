import React, { useState } from 'react';
import CurvedText from './CurvedText';
import './App.css';

function App() {
  const [curve, setCurve] = useState(0);
  const [text, setText] = useState("This is a curved text!");

  const handleCurveChange = (event) => {
    setCurve(Number(event.target.value));
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Curved Text Generator</h1>
        <CurvedText text={text} curve={curve} />
        <div className="controls">
          <div>
            <label>Text:</label>
            <input
              type="text"
              value={text}
              onChange={handleTextChange}
              style={{ marginLeft: '10px', width: '300px' }}
            />
          </div>
          <div>
            <label>Curve: {curve}</label>
            <input
              type="range"
              min="-100"
              max="100"
              value={curve}
              onChange={handleCurveChange}
            />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
