import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// 예시 데이터
const data = [
  {
    name: "A",
    value1: 400,
    value2: 300,
    value3: 300,
    value4: 200, // 추가된 데이터
  },
];

const HorizontalStackedBarChart = () => {
  // 모든 데이터 키를 추출 (name 제외)
  const keys = Object.keys(data[0]).filter((key) => key !== "name");

  return (
    <ResponsiveContainer width="100%" height={30}>
      <BarChart
        layout="vertical"
        data={data}
        // margin={{ top: 0, right: 10, left: 10, bottom: 0 }} // 좌우 마진을 동일하게 설정
        barCategoryGap={0} // 바 사이의 간격 제거
      >
        <XAxis type="number" axisLine={false} tick={false} height={0} />
        <YAxis
          type="category"
          dataKey="name"
          axisLine={false}
          tick={false}
          width={0} // Y축 너비 최소화
        />
        <Tooltip />
        {keys.map((key, index) => (
          <Bar
            key={key}
            dataKey={key}
            stackId="a"
            fill={getColor(index)}
            radius={
              index === 0
                ? [10, 0, 0, 10] // 첫 번째 바의 왼쪽 끝 라운드 처리
                : index === keys.length - 1
                ? [0, 10, 10, 0] // 마지막 바의 오른쪽 끝 라운드 처리
                : 0 // 중간 바는 라운드 처리하지 않음
            }
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

// 색상을 동적으로 선택하는 함수
const getColor = (index) => {
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#d2691e"];
  return colors[index % colors.length];
};

export default HorizontalStackedBarChart;
