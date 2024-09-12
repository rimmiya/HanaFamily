import React, { useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

function HouseHoldAccount() {
  const [isHidden, setIsHidden] = useState(false);
  const incomeimg = `${process.env.PUBLIC_URL}/img/income.png`;
  const walletimg = `${process.env.PUBLIC_URL}/img/wallet.png`;

  const income = 30000000;
  const expenditure = 20000000;

  const nowMonth = new Date().getMonth() + 1;

  const budget = 50000000;
  const leftAmount = budget - expenditure;
  const progress = (expenditure / budget) * 100;

  return (
    <div
      className="joint-assets-income-expenditure-container"
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        padding: "20px",
        // marginLeft: "15px",
        // marginRight: "15px",
      }}
    >
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <h3 style={{ fontFamily: "CustomFont" }}>공동 가계부</h3>&nbsp;&nbsp;
        <h3 style={{ color: "#009178" }}>{nowMonth}월</h3>
      </div>
      <div>
        <div style={{ display: "flex", gap: "10px" }}>
          <h4>이번 달 예산까지</h4>
          <h4 style={{ color: "#009178", fontWeight: "bold" }}>
            {leftAmount.toLocaleString()}원
          </h4>
          <h4>남았어요 !</h4>
        </div>
        <div className="house-hold-account-progress-bar">
          <ProgressBar
            now={progress}
            label={`${progress}%`}
            style={{ height: "25px" }}
          >
            <div
              className="progress-bar"
              style={{
                width: `${progress}%`,
                backgroundColor: "#0fb895", // 바 색상 변경
                textAlign: "right",
                paddingRight: "15px",
              }}
            >
              {progress}%
            </div>
          </ProgressBar>

          <p
            style={{
              color: "gray",
              marginBottom: "15px",
              textAlign: "right",
            }}
          >
            이번 달 예산 : {budget.toLocaleString()}원
          </p>
        </div>
      </div>
      <div style={{ display: "flex", gap: "20px" }}>
        <div
          className="joint-assets-income-container"
          style={{
            width: "50%",
            // backgroundColor: "#f5f5f5",
            borderRadius: "10px",
            padding: "20px",
            // textAlign: "center",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              borderRadius: "50%",
              width: "70px",
              height: "70px",
              //   padding: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              marginBottom: "20px",
              //   boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#ebfff7",
            }}
          >
            <img
              src={incomeimg}
              alt="income"
              style={{
                overflow: "hidden",
                width: "90%",
                height: "auto",
                objectFit: "cover",
              }}
            />
          </div>
          <p
            style={{
              fontSize: "20px",
              margin: "0",
              fontWeight: "500",
            }}
          >
            이번 달 수입
          </p>
          <div
            className="joint-assets-income-amount"
            style={{
              fontSize: "18px",
              fontWeight: "900",
              marginTop: "5px",
              color: "#000000",
            }}
          >
            {income.toLocaleString() + " 원"}
          </div>
        </div>
        <div
          className="joint-assets-expenditure-container"
          style={{
            width: "50%",
            // backgroundColor: "#f5f5f5",
            borderRadius: "10px",
            padding: "20px",
            // textAlign: "center",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              borderRadius: "50%",
              width: "70px",
              height: "70px",
              //   padding: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              marginBottom: "20px",
              //   boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#ebfff7",
            }}
          >
            <img
              src={walletimg}
              alt="wallet"
              style={{
                overflow: "hidden",
                width: "80%",
                height: "auto",
                objectFit: "cover",
              }}
            />
          </div>
          <p
            style={{
              fontSize: "20px",
              margin: "0",
              fontWeight: "500",
            }}
          >
            이번 달 지출
          </p>
          <div
            className="joint-assets-expenditure-amount"
            style={{
              fontSize: "18px",
              fontWeight: "900",
              marginTop: "5px",
              color: "#000000",
            }}
          >
            {expenditure.toLocaleString() + "원"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HouseHoldAccount;
