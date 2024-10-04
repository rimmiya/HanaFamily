import React from "react";
import { background } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import InterestCalculator from "./InterestCalculator";

function TogetherAccountDetails() {
  const periodeImg = `${process.env.PUBLIC_URL}/img/calendar-gif.gif`;
  const moneyGif = `${process.env.PUBLIC_URL}/img/money-gif.gif`;
  const growingImg = `${process.env.PUBLIC_URL}/img/growing-gif.gif`;

  const pigImg = `${process.env.PUBLIC_URL}/img/pig-img.png`;
  const puzzleImg = `${process.env.PUBLIC_URL}/img/puzzle.png`;
  const moneyImg = `${process.env.PUBLIC_URL}/img/money-img.png`;

  return (
    <div style={style.container}>
      <div style={style.content}>
        <div style={style.details}>
          <div style={style.gif}>
            <img src={periodeImg} alt="period" style={{ width: "80px" }} />
          </div>
          <div style={style.text}>
            <div style={{ fontSize: "20px" }}>최소기간</div>
            <div style={{ fontSize: "28px" }}>3개월</div>
          </div>
        </div>
        <div style={style.details}>
          <div style={style.gif}>
            <img src={moneyGif} alt="money" style={{ width: "80px" }} />
          </div>
          <div style={style.text}>
            {" "}
            <div style={{ fontSize: "20px" }}>금액</div>
            <div style={{ fontSize: "28px" }}>1만원 이상</div>
          </div>
        </div>
        <div style={style.details}>
          <div style={style.gif}>
            <img src={growingImg} alt="growing" style={{ width: "80px" }} />
          </div>
          <div style={style.text}>
            {" "}
            <div style={{ fontSize: "20px" }}>금리</div>
            <div style={{ fontSize: "28px" }}>연 2.3% ~ 3.75%</div>
          </div>
        </div>
      </div>
      <div style={style.content}>
        <Link
          to="/togetheraccountjoin"
          underline="none"
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            color: "#fff",
            width: "200px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              animation: "bounce 1s ease-in-out infinite",
              padding: "15px",
              borderRadius: "10px",
              background: "#0fb895",
            }}
          >
            가입하기
          </p>
        </Link>
      </div>
      <InterestCalculator />
      <div style={style.content2}>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>목표금액만 모으면 끝!</h2>
          <p>목표금액을 달성하면 자동해지 되어요.</p>
          <img src={moneyImg} alt="account" style={{ width: "100%" }} />
        </div>
        <div></div>
      </div>
      <div style={style.content}>
        <div style={{ textAlign: "center" }}>
          <h2>함께 모아 더 빨리,</h2>
          <p>가족을 초대해서 더 빨리 모아보세요.</p>
          <img src={puzzleImg} alt="puzzle" style={{ width: "100%" }} />
        </div>
      </div>
      {/* <div style={style.content}>
        <div style={{ textAlign: "center" }}>
          <h2>함께 모아 더 빨리,</h2>
          <p>가족을 초대해서 더 빨리 모아보세요.</p>
          <img src={puzzleImg} alt="puzzle" style={{ width: "100%" }} />
        </div>
      </div> */}
    </div>
  );
}

const style = {
  container: {
    width: "100%",
    fontFamily: "CustomFont",
    minHeight: "200px",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "40px",
  },
  content2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    margin: "20px auto",
    padding: "40px",
    background: "#f5f5f5",
  },
  details: {
    display: "flex",
    justifyContent: "center",
  },
  gif: {
    width: "100px",
    height: "100px",
    // marginRight: "50%",
    background: "#60d0b778",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: "20px",
    width: "220px",
  },
};

export default TogetherAccountDetails;
