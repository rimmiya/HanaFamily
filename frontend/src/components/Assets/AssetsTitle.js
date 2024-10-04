import React from "react";
import { Link } from "react-router-dom";

function JointAssetsTitle() {
  return (
    <div
      style={{
        width: "100%",
        background:
          "linear-gradient(298deg, rgba(18, 161, 253, 0.54) 26%, rgba(15, 184, 149, 0.38) 71%)",
        fontFamily: "CustomFont",
        minHeight: "200px",
        display: "flex",
      }}
    >
      <div
        style={{
          width: "73%",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1 }}>
          <h2
            style={{
              fontSize: "35px",
              marginBottom: "15px",
            }}
          >
            함께 관리
          </h2>
          <p>자산을 연결하고 간편하게 한번에 확인하세요.</p>
        </div>
        <div
          style={{
            width: "250px",
          }}
        >
          <Link
            to="/assetsjoin"
            style={{
              width: "50px",
              paddingTop: "20px",
              paddingBottom: "20px",
              paddingLeft: "40px",
              paddingRight: "40px",
              backgroundColor: "#009178",
              fontSize: "19px",
              color: "white",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
              marginTop: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            가입하기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default JointAssetsTitle;
