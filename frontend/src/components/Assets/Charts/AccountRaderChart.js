import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Defs,
  LinearGradient,
  Stop,
} from "recharts";

// const radarData = [
//   { subject: "입출금", value: 85, fullMark: 100 },
//   { subject: "예금", value: 65, fullMark: 100 },
//   { subject: "적금", value: 90, fullMark: 100 },
//   { subject: "기타", value: 60, fullMark: 100 },
// ];

function AccountRaderChart({ radarData }) {
  const maxValue = Math.max(...radarData.map((d) => d.value), 100); // 데이터의 최대값에 맞추어 도메인 설정

  console.log(radarData);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
        {/* 그라데이션 정의 */}
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00978d" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#1a73e8" stopOpacity={0.3} />
          </linearGradient>
        </defs>
        {/* 배경 그리드 */}
        <PolarGrid stroke="#ccc" strokeDasharray="3 3" />
        {/* 각도 축 */}
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: "#666", fontSize: 12, fontWeight: 600 }}
        />
        {/* 반지름 축 */}
        <PolarRadiusAxis
          domain={[0, maxValue]} // 데이터 최대값에 맞춘 도메인 설정
        />

        {/* 툴팁 */}
        <Tooltip />
        {/* 레이더 */}
        <Radar
          name="자산 분포"
          dataKey="value"
          stroke="url(#colorUv)"
          fill="url(#colorUv)"
          fillOpacity={0.35}
          strokeWidth={3}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export default AccountRaderChart;
