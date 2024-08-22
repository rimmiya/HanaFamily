import React from "react";
import { Link } from "react-router-dom";
import "../../style/AssetsTitle.css";

function AssetsTitle() {
  return (
    <div className="assets-title-container">
      <div className="assets-title">
        <div className="left-assets-title">
          <h2>내 자산</h2>
          <p>자산을 연결하고 간편하게 한번에 확인하세요.</p>
        </div>
        <div className="right-assets-title">
          <div className="assets-register-button-container">
            <Link to="/assetsjoin" className="assets-register-button">
              가입하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssetsTitle;
