import React from "react";
import "../../../style/CustomProgressBar.css"; // CSS 파일 경로

function CustomProgressBar({ currentAmount, goalAmount }) {
  const progress = (currentAmount / goalAmount) * 100;

  return (
    <div className="progress-wrapper">
      <div className="progress-bar-container">
        <div
          className="custom-progress-bar"
          style={{ width: `${progress}%` }}
        ></div>
        <div
          className="progress-tooltip"
          style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
        >
          {`${progress.toFixed(2)}%`}
        </div>
      </div>
    </div>
  );
}

export default CustomProgressBar;
