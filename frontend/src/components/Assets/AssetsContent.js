import React from "react";
import { Link } from "react-router-dom";

function AssetsContent() {
  const familyImg = `${process.env.PUBLIC_URL}/img/familyImg.png`;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "90%",
          height: "100%",
        }}
      >
        <h2>함께 사용하고, 함께 모아요</h2>
        <img src={familyImg} alt="family" />
      </div>
    </div>
  );
}

export default AssetsContent;
