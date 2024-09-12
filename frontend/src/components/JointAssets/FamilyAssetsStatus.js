import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";

function FamilyAssetsStatus({ data, totalAmount }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoveredEntry, setHoveredEntry] = useState(null); // Hover된 자산 데이터 저장
  const COLORS = ["#7173f4", "#489cd5", "#30b4c1", "#18ceae"];

  // 자산 중에서 가장 큰 값을 찾음
  const largestAsset = data.reduce((prev, current) => {
    return current.value > prev.value ? current : prev;
  });

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
    setHoveredEntry(data[index]); // Pie 차트에 호버 시 해당 항목 저장
  };

  const onPieLeave = () => {
    setActiveIndex(null);
    setHoveredEntry(null); // Pie 차트에서 마우스를 뗄 때 데이터 초기화
  };

  const onLabelHover = (index) => {
    setHoveredEntry(data[index]); // 레전드에 호버 시 해당 항목 저장
    setActiveIndex(index);
  };

  const onLabelLeave = () => {
    setHoveredEntry(null); // 레전드에서 마우스를 뗄 때 데이터 초기화
    setActiveIndex(null);
  };

  // 활성화된 섹터를 렌더링
  const renderActiveShape = (props) => {
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;

    return (
      <g>
        <text
          x="50%"
          y="40%"
          textAnchor="middle"
          fill={fill}
          style={{ fontSize: "18px", fontWeight: "bold" }}
        >
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          fill={fill}
          style={{ fontSize: "18px", fontWeight: "bold" }}
        >
          {`${(percent * 100).toFixed(2)}%`}
        </text>
        <text
          x="50%"
          y="60%"
          textAnchor="middle"
          fill={fill}
          style={{ fontSize: "18px", fontWeight: "bold" }}
        >
          {` (${value.toLocaleString()}원)`}
        </text>
      </g>
    );
  };

  return (
    <div style={styles.container}>
      <div style={{ height: "52px", display: "flex", alignItems: "center" }}>
        <h3 style={{ fontFamily: "CustomFont" }}>가족자산현황</h3>
      </div>
      {/* 가장 많은 자산에 대한 메시지 표시 */}
      <div style={styles.largestAssetMessage}>
        우리가족은 {largestAsset.name} 자산이 가장 많아요!
      </div>
      <div style={styles.chartContainer}>
        <ResponsiveContainer width="50%" height={250}>
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  fillOpacity={
                    activeIndex === null || activeIndex === index ? 1 : 0.5
                  }
                  cursor="pointer"
                />
              ))}
            </Pie>
            {/* 차트 중앙에 총 자산 금액을 표시 */}
            {activeIndex === null && (
              <>
                <text
                  x="50%"
                  y="40%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: "22px", fontWeight: "bold", fill: "#333" }}
                >
                  총 금액
                </text>
                <text
                  x="50%"
                  y="55%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: "18px", fontWeight: "bold", fill: "#333" }}
                >
                  {totalAmount.toLocaleString()}원
                </text>
              </>
            )}
          </PieChart>
        </ResponsiveContainer>
        {/* Legend - 2개씩 정렬 */}
        <div style={styles.details}>
          {data.map((entry, index) => (
            <div
              key={`detail-${index}`}
              style={{
                ...styles.detailItem,
                color:
                  activeIndex === null || activeIndex === index
                    ? COLORS[index % COLORS.length]
                    : "#666",
                fontWeight: activeIndex === index ? "bold" : "normal",
                cursor: "pointer",
                // width: "48%", // 2개씩 정렬하기 위해 각 항목의 너비를 48%로 설정
              }}
              onMouseEnter={() => onLabelHover(index)}
              onMouseLeave={onLabelLeave}
            >
              <div
                style={{
                  ...styles.labelColor,
                  backgroundColor: COLORS[index % COLORS.length],
                  opacity:
                    activeIndex === null || activeIndex === index ? 1 : 0.5,
                }}
              />
              <div>
                <p style={styles.detailTitle}>
                  {entry.name}&nbsp;
                  {((entry.value / totalAmount) * 100).toFixed(2)} %
                </p>
                {/* Hover 시 구성원 정보를 표시 */}
                {hoveredEntry === entry && (
                  <div>
                    {entry.people.map((person, i) => (
                      <p key={i} style={styles.detailValue}>
                        {person.name}: {person.amount.toLocaleString()}원
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    borderRadius: "10px",
    padding: "20px",
    background: "#ffffff",
    borderRadius: "20px",
  },
  chartContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    height: "80%",
  },
  details: {
    display: "flex",
    flexWrap: "wrap",
    height: "315px",
    justifyContent: "space-evenly",
    flexDirection: "column",
    width: "40%",
  },
  detailItem: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "10px",
  },
  labelColor: {
    width: "20px",
    height: "20px",
    marginTop: "5px",
    marginRight: "10px",
    borderRadius: "5px",
  },
  detailTitle: {
    margin: 0,
    color: "black",
  },
  detailValue: {
    margin: 0,
    color: "black",
    marginLeft: "30px",
  },
  largestAssetMessage: {
    // marginTop: "20px",
    // textAlign: "center",
    fontSize: "20px",
    // fontWeight: "bold",
    color: "#333",
  },
};

export default FamilyAssetsStatus;
