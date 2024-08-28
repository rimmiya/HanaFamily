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

const radarData = [
  { subject: "입출금", value: 85, fullMark: 100 },
  { subject: "증권", value: 65, fullMark: 100 },
  { subject: "예적금", value: 90, fullMark: 100 },
  { subject: "페이/포인트", value: 75, fullMark: 100 },
  { subject: "기타", value: 60, fullMark: 100 },
];

function AccountRaderChart() {
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
          //   angle={30}
          domain={[0, 100]}
          //   tick={false} // 이 축의 눈금 표시 제거
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
