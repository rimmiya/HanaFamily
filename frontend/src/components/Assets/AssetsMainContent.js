import React, { useState } from "react";
import MainTotalPie from "./Charts/MainTotalPie"; // Pie 차트 파일 경로
import TotalAssetsTrendChart from "./Charts/TotalAssetsTrendChart"; // 추세선이 포함된 바 차트
import "../../style/AssetsMainContent.css";

// 내 자산 데이터
const myAssetsData = [
  { id: "예적금", value: 55 },
  { id: "부동산", value: 20 },
  { id: "주식", value: 15 },
  { id: "기타", value: 10 },
];

// 총 자산 및 월별 자산 데이터
const totalAssets = 2000000000;
const monthlyAssetsData = {
  July: 2159854,
  August: 7659854,
};

// 자산 요약 데이터
const summaryData = [
  { label: "계좌/현금", amount: 5000000 },
  { label: "투자", amount: 3000000 },
  { label: "실물자산", amount: 500000 },
  { label: "보험 해지 환급금", amount: 200000 },
  { label: "신용카드 총 미결제 금액", amount: -1800000 },
  { label: "대출", amount: -3000000 },
];

function AssetsMainContent() {
  const [isHidden, setIsHidden] = useState(false);

  // 금액 숨기기 토글
  const toggleAmount = () => {
    setIsHidden(!isHidden);
  };

  // 7월과 8월 순자산 비교
  const assetDifference = monthlyAssetsData.August - monthlyAssetsData.July;
  const isIncreased = assetDifference > 0;

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
              <h4
                style={{
                  paddingLeft: "20px",
                  paddingTop: "20px",
                }}
              >
                내 자산 비율
              </h4>
              <MainTotalPie />
            </div>

            {/* 또래 자산 비교 */}
            <div className="assets-group-chart assets-container-style">
              <h4
                style={{
                  paddingLeft: "20px",
                  paddingTop: "20px",
                }}
              >
                또래 친구와 자산 비교하기
              </h4>
              <MainTotalPie />
            </div>
          </div>

          {/* 우측 데이터와 막대 차트 */}
          <div className="assets-right-container assets-container-style">
            <h4
              style={{
                paddingLeft: "20px",
                paddingTop: "20px",
              }}
            >
              총 자산 추이
            </h4>
            <TotalAssetsTrendChart /> {/* 추세선이 포함된 바 차트 */}
            <div
              style={{
                padding: "20px",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid #e0e0e0",
                  paddingRight: "20px",
                }}
              >
                <h4 style={{ margin: "0" }}>8월말 순자산</h4>
                <p>{monthlyAssetsData.August.toLocaleString()}원</p>
              </div>

              {/* 증가/감소 비교 섹션 */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0 20px",
                }}
              >
                {/* 조건에 따른 화살표와 색상 */}
                {isIncreased ? (
                  <>
                    <div
                      style={{
                        color: "red",
                        fontSize: "20px",
                        marginBottom: "-5px",
                      }}
                    >
                      ▲
                    </div>
                    <div style={{ color: "red", fontSize: "16px" }}>
                      +{assetDifference.toLocaleString()}원
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        color: "blue",
                        fontSize: "20px",
                        marginBottom: "-5px",
                      }}
                    >
                      ▼
                    </div>
                    <div style={{ color: "blue", fontSize: "16px" }}>
                      {assetDifference.toLocaleString()}원
                    </div>
                  </>
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  borderLeft: "1px solid #e0e0e0",
                  paddingLeft: "20px",
                }}
              >
                <h4 style={{ margin: "0" }}>7월말 순자산</h4>
                <p>{monthlyAssetsData.July.toLocaleString()}원</p>
              </div>
            </div>
            <div className="assets-summary-list">
              <ul className="summary-list">
                {/* summaryData를 기반으로 동적 리스트 렌더링 */}
                {summaryData.map((item, index) => (
                  <li key={index} className="summary-item">
                    <div className="summary-label">
                      {item.label}
                      {item.label === "신용카드 총 미결제 금액" && (
                        <span className="info-icon">ⓘ</span>
                      )}
                    </div>
                    <div className="summary-amount">
                      {item.amount.toLocaleString()}원
                      <span className="arrow-icon">〉</span>
                    </div>
                  </li>
                ))}
                <li className="summary-item">
                  <div className="summary-label">순자산</div>
                  <div
                    className="summary-amount"
                    style={{ fontWeight: "bold", color: "#13bd7e" }}
                  >
                    46,800,000원
                  </div>
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
