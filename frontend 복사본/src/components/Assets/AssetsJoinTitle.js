import React from "react";
import { Link } from "react-router-dom";
import "../../style/AssetsJoinTitle.css";

function AssetsJoinTitle() {
  return (
    <div className="assets-title-container">
      <div className="assets-title">
        <div className="left-assets-title">
          <p>마이데이터</p>
          <h2>
            마이데이터로 자산 및 지출을
            <br />
            한번에 관리해 보세요 !
          </h2>
        </div>
      </div>
    </div>
  );
}

export default AssetsJoinTitle;
