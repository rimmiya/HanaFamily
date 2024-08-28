import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Legend } from "recharts";

// 데이터
const data = [
  { name: "입출금", value: 23, fill: "#f1c40f" },
  { name: "주식", value: 14, fill: "#e67e22" },
  { name: "예적금", value: 50, fill: "#3498db" },
  { name: "펀드/ETF", value: 10, fill: "#9b59b6" },
  { name: "신탁/ELS", value: 3, fill: "#34495e" },
];

// 활성화된 섹터 스타일
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);

  const sx = cx + (outerRadius + 5) * cos;
  const sy = cy + (outerRadius + 5) * sin;
  const mx = cx + (outerRadius + 15) * cos;
  const my = cy + (outerRadius + 15) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 12;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 5}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${payload.name}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >{`(${(percent * 100).toFixed(2)}%)`}</text>
    </g>
  );
};

// 커스텀 Legend 컴포넌트
const renderCustomizedLegend = () => {
  const totalValue = data.reduce((acc, entry) => acc + entry.value, 0);

  return (
    <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
      {data.map((entry, index) => {
        const percent = ((entry.value / totalValue) * 100).toFixed(2);

        return (
          <li
            key={`item-${index}`}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: entry.fill,
                marginRight: "10px",
              }}
            ></div>
            <span style={{ marginRight: "10px", color: "#333" }}>
              {`${entry.name}: ${percent}%`}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default class CustomPieChart extends PureComponent {
  state = {
    activeIndex: 0,
  };

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            activeIndex={this.state.activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="45%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            dataKey="value"
            onMouseEnter={this.onPieEnter}
            isAnimationActive={true}
            animationDuration={500} // 애니메이션 지속시간 조정
            animationBegin={0} // 애니메이션 시작 시간
            animationEasing="ease-out" // 부드러운 애니메이션 이징
          />
          <Legend
            content={renderCustomizedLegend}
            layout="vertical"
            align="right"
            verticalAlign="middle"
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
