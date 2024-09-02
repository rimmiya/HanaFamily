import { MarginTwoTone } from "@mui/icons-material";
import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";

function FamilyAssetsStatus({ data, totalAmount }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const onLabelClick = (index) => {
    setActiveIndex(index);
  };

  const onPieClick = (_, index) => {
    setActiveIndex(index);
  };

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
          x={cx}
          y={cy - 10}
          dy={8}
          textAnchor="middle"
          fill={fill}
          fontSize={20}
          fontWeight="bold"
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
          x={cx}
          y={cy + 10}
          textAnchor="middle"
          fill={fill}
          fontSize={20}
          fontWeight="bold"
        >
          {`${(percent * 100).toFixed(2)}% (${value.toLocaleString()}원)`}
        </text>
      </g>
    );
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>가족자산현황</h3>
      <div style={styles.chartContainer}>
        <ResponsiveContainer width="50%" height={250}>
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              onClick={onPieClick}
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
          </PieChart>
        </ResponsiveContainer>
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
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={onPieLeave}
              onClick={() => onLabelClick(index)}
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
                {entry.people.map((person, i) => (
                  <p key={i} style={styles.detailValue}>
                    {person.name}: {person.amount.toLocaleString()}원
                  </p>
                ))}
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
    backgroundColor: "#f0f8ff",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    width: "44%",
  },
  title: {
    marginBottom: "10px",
    color: "#004d40",
  },
  chartContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  centerText: {
    fontSize: "16px",
    fontWeight: "bold",
    fill: "#333",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    textAlign: "left",
    width: "50%",
  },
  detailItem: {
    display: "flex",
    // alignItems: "center",
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
    // fontSize: "16px",
    color: "black",
  },
  detailValue: {
    margin: 0,
    // fontSize: "14px",
    color: "black",
    marginLeft: "30px",
  },
};

export default FamilyAssetsStatus;
