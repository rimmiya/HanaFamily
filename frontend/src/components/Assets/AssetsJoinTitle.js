import React from "react";
import { Link } from "react-router-dom";

function AssetsJoinTitle() {
  const mydataImg = `${process.env.PUBLIC_URL}/img/mydata-join-title.png`;

  return (
    <div
      style={{
        width: "100%",
        background:
          "linear-gradient(135deg, rgba(249,233,255,1) 0%, rgba(223,220,255,1) 49%, rgba(185,198,253,1) 100%)",
        fontFamily: "CustomFont",
        minHeight: "200px",
        display: "flex",
        color: "#363636",
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
          <p>마이데이터</p>
          <h2
            style={{
              fontSize: "35px",
              marginTop: "10px",
            }}
          >
            마이데이터로 자산 및 지출을
            <br />
            한번에 관리해 보세요 !
          </h2>
        </div>
        {/* <div style={{ marginRight: "200px" }}>
          <img src={mydataImg} alt="mydata" style={{ height: "150px" }} />
        </div> */}
      </div>
    </div>
  );
}

export default AssetsJoinTitle;
