import React, { useState } from "react";
import MainTotalPie from "./Charts/MainTotalPie"; // Pie 차트 파일 경로
import TotalAssetsTrendChart from "./Charts/TotalAssetsTrendChart"; // 추세선이 포함된 바 차트
import "../../style/AssetsMainContent.css";

const myAssetsData = [
  { id: "예적금", value: 55 },
  { id: "부동산", value: 20 },
  { id: "주식", value: 15 },
  { id: "기타", value: 10 },
];

const totalAssets = 2000000000;
const monthlyAssetsData = {
  July: 2159854,
  August: 7659854,
};

function AssetsMainContent() {
  const [isHidden, setIsHidden] = useState(false);

  const toggleAmount = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className="assets-main-container">
      <div className="assets-main-content">
        {/* 총 자산 및 숨기기 기능 */}
        <div className="assets-total-container assets-container-style">
          <div className="assets-total-title">
            <h3 style={{ margin: "0" }}>총 자산</h3>
            <button onClick={toggleAmount} className="change-assets-amount">
              {isHidden ? "보이기" : "숨기기"}
            </button>
          </div>
          <div className="assets-total-amount">
            {isHidden ? "??원" : totalAssets.toLocaleString() + "원"}
          </div>
        </div>

        {/* 차트 및 데이터 섹션 */}
        <div className="assets-sub-container">
          <div className="assets-left-container">
            {/* 내 자산 비율 차트 */}
            <div className="assets-ratio-chart assets-container-style">
              <h4>내 자산 비율</h4>
              <MainTotalPie />
            </div>

            {/* 또래 자산 비교 */}
            <div className="assets-group-chart assets-container-style">
              <h4>또래 친구와 자산 비교하기</h4>
              <MainTotalPie />
            </div>
          </div>

          {/* 우측 데이터와 막대 차트 */}
          <div className="assets-right-container assets-container-style">
            <h4>총 자산 추이</h4>
            <TotalAssetsTrendChart /> {/* 추세선이 포함된 바 차트 */}
            <div className="assets-summary-list">
              <h4>8월말 순자산</h4>
              <p>{monthlyAssetsData.August.toLocaleString()}원</p>
              <h4>7월말 순자산</h4>
              <p>{monthlyAssetsData.July.toLocaleString()}원</p>
              <ul>
                <li>계좌/현금: 5,000,000원</li>
                <li>투자: 3,000,000원</li>
                <li>실물자산: 500,000원</li>
                <li>보험 해지 환급금: 200,000원</li>
                <li>신용카드 미결제 금액: -1,800,000원</li>
                <li>대출: -3,000,000원</li>
                <li style={{ fontWeight: "bold", color: "#009178" }}>
                  순자산: 46,800,000원
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssetsMainContent;
