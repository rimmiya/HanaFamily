import React, { PureComponent } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "3월", 자산: 35000000, 부채: -15000000, 순자산: 20000000 },
  { name: "4월", 자산: 38000000, 부채: -14000000, 순자산: 24000000 },
  { name: "5월", 자산: 40000000, 부채: -13000000, 순자산: 27000000 },
  { name: "6월", 자산: 42000000, 부채: -12000000, 순자산: 30000000 },
  { name: "7월", 자산: 44000000, 부채: -11000000, 순자산: 33000000 },
  { name: "8월", 자산: 48000000, 부채: -10000000, 순자산: 38000000 },
];

// 숫자를 K(천), M(백만) 단위로 포맷하는 함수
const formatYAxis = (tickItem) => {
  if (Math.abs(tickItem) >= 1000000) {
    return `${tickItem / 1000000}만원`;
  } else if (Math.abs(tickItem) >= 1000) {
    return `${tickItem / 1000}천원`;
  }
  return tickItem;
};

export default class TotalAssetsTrendChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={data}
          stackOffset="sign"
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis
            tickFormatter={formatYAxis}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip />
          <Legend />
          {/* y=0 기준선 */}
          <ReferenceLine
            y={0}
            stroke="#ddd"
            strokeWidth={3}
            strokeDasharray="0"
          />

          {/* 부채는 음수로 아래쪽에 스택됨, 아래쪽에만 radius 적용 */}
          <Bar
            dataKey="부채"
            fill="#ff6f61"
            stackId="a"
            radius={[10, 10, 0, 0]}
            barSize={35}
          />

          {/* 자산은 양수로 위쪽에 스택됨, 위쪽에만 radius 적용 */}
          <Bar
            dataKey="자산"
            fill="#82ca9d"
            stackId="a"
            radius={[10, 10, 0, 0]}
            barSize={35}
          />

          {/* 순자산 추세선 */}
          <Line
            type="monotone"
            dataKey="순자산"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}
