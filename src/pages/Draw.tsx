/* eslint-disable */

import './Draw.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import TextLoop from 'react-text-loop';
import Confetti from 'react-dom-confetti';
import BackButton from 'components/BackButton';

const Draw = () => {
  const location = useLocation();
  const data = Object.entries(location.state as string[]);
  const dataArray = [...data[0][1]];
  const [drawEnabled, setDrawEnabled] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [drawResult, setDrawResult] = useState({});

  const sleep = (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  const randomDrawItem = () => {
    setShowResult(false);
    setDrawEnabled(false);
    const maxItemIndex = dataArray.length;
    const randomIndex = Math.floor(Math.random() * maxItemIndex);
    sleep(3000).then(() => {
      let result = dataArray[randomIndex];

      if (Array.isArray(result)) {
        result = dataArray[randomIndex][0];
      }

      setDrawResult(result);
      setShowResult(true);
      setDrawEnabled(true);
    });
  };

  return (
    <div>
      <div className="Hello">
        {!showResult && (
          <TextLoop
            className="draw-text"
            interval={100}
            mask
            springConfig={{ stiffness: 180, damping: 8 }}
            children={dataArray.map((x) => {
              return x[0];
            })}
          />
        )}
        <div id="drawn-name">
          {showResult && drawResult}
          <Confetti active={showResult} />
        </div>
      </div>
      <div className="Hello">
        <button type="button" onClick={randomDrawItem}>
          {drawEnabled ? 'Draw!' : 'Drawing...'}
        </button>
      </div>
      <div className="Hello">
        <BackButton />
      </div>
    </div>
  );
};

export default Draw;
