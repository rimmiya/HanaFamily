import React, { useState } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";
import "../../../style/AssetsSecuritiesContent.css";

const myInvestmentData = [
  { name: "국내주식", value: 79, color: "#4A90E2" },
  { name: "해외주식", value: 11, color: "#F5A623" },
  { name: "기타(예수금등)", value: 3, color: "#F8E71C" },
  { name: "펀드", value: 2, color: "#7ED321" },
  { name: "신탁/ELS", value: 1, color: "#50E3C2" },
  { name: "ISA", value: 1, color: "#B8E986" },
];

const peerInvestmentData = [
  { name: "국내주식", value: 41, color: "#4A90E2" },
  { name: "해외주식", value: 18, color: "#F5A623" },
  { name: "기타(예수금등)", value: 27, color: "#F8E71C" },
  { name: "펀드", value: 7, color: "#7ED321" },
  { name: "신탁/ELS", value: 1, color: "#50E3C2" },
  { name: "ISA", value: 5, color: "#B8E986" },
];

// 가장 높은 자산과 가장 낮은 자산 찾기
const maxInvestment = myInvestmentData.reduce((prev, current) =>
  prev.value > current.value ? prev : current
);
const minInvestment = myInvestmentData.reduce((prev, current) =>
  prev.value < current.value ? prev : current
);

const SecuritiesPieChart = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // 마우스 호버 시 두 차트 모두에서 동일한 인덱스를 하이라이트
  const handleMouseEnter = (_, index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="investment-analysis-container">
      {/* 한 줄로 요약된 문장 추가 */}
      <div className="investment-analysis-header">
        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          나의 자산 중 {maxInvestment.name}이(가) {maxInvestment.value}%로 가장
          크고, {minInvestment.name}이(가) {minInvestment.value}%로 가장
          적습니다.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <div className="chart-container" style={{ width: "45%" }}>
          <h5 style={{ fontWeight: "600", textAlign: "center" }}>
            나의 자산 비율
          </h5>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={myInvestmentData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                activeIndex={activeIndex}
                activeShape={(props) => (
                  <g>
                    <text
                      x="50%"
                      y="45%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        fill: "#333",
                      }}
                    >
                      {props.name}
                    </text>
                    <text
                      x="50%"
                      y="55%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        fill: "#333",
                      }}
                    >
                      {props.value}%
                    </text>
                    <Sector
                      cx={props.cx}
                      cy={props.cy}
                      innerRadius={props.innerRadius}
                      outerRadius={props.outerRadius + 10}
                      startAngle={props.startAngle}
                      endAngle={props.endAngle}
                      fill={props.fill}
                    />
                  </g>
                )}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {myInvestmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container" style={{ width: "45%" }}>
          <h5 style={{ fontWeight: "600", textAlign: "center" }}>
            또래의 자산 비율
          </h5>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={peerInvestmentData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                activeIndex={activeIndex}
                activeShape={(props) => (
                  <g>
                    <text
                      x="50%"
                      y="45%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        fill: "#333",
                      }}
                    >
                      {props.name}
                    </text>
                    <text
                      x="50%"
                      y="55%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        fill: "#333",
                      }}
                    >
                      {props.value}%
                    </text>
                    <Sector
                      cx={props.cx}
                      cy={props.cy}
                      innerRadius={props.innerRadius}
                      outerRadius={props.outerRadius + 10}
                      startAngle={props.startAngle}
                      endAngle={props.endAngle}
                      fill={props.fill}
                    />
                  </g>
                )}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {peerInvestmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SecuritiesPieChart;
