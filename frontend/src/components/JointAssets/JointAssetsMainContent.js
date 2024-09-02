import React, { useState } from "react";

function JointAssetsMainContent() {
  const [isHidden, setIsHidden] = useState(false);

  // 금액 숨기기 토글
  const toggleAmount = () => {
    setIsHidden(!isHidden);
  };

  const totalAssets = 200000000000;

  return (
    <div
      className="joint-assets-total-container"
      style={
        {
          // border: "1px solid #d9d9d9",
          // borderRadius: "10px",
          // padding: "30px",
          // margin: "20px auto",
          // width: "90%",
        }
      }
    >
      <div
        className="joint-assets-total-title"
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h3 style={{ margin: "0" }}>우리 자산</h3>
        <button
          onClick={toggleAmount}
          className="change-joint-assets-amount"
          style={{
            backgroundColor: "#e0e0e0",
            borderRadius: "15px",
            padding: "5px 10px",
            border: "none",
            cursor: "pointer",
            color: "#757575",
          }}
        >
          {isHidden ? "보이기" : "숨기기"}
        </button>
      </div>
      <div
        className="joint-assets-total-amount"
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "#000000",
        }}
      >
        {isHidden ? "???원" : totalAssets.toLocaleString() + " 원"}
      </div>
    </div>
  );
}

export default JointAssetsMainContent;
