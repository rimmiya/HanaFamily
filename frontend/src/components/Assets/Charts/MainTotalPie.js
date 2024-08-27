import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const pieData = [
  { name: "scala", value: 514, color: "#82ca9d" },
  { name: "hack", value: 575, color: "#8884d8" },
  { name: "elixir", value: 530, color: "#ffc658" },
  { name: "go", value: 554, color: "#ff7300" },
  { name: "javascript", value: 180, color: "#00c49f" },
];

const COLORS = ["#82ca9d", "#8884d8", "#ffc658", "#ff7300", "#00c49f"];

const MainTotalPie = () => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={pieData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label={({ name, value }) => `${name} (${value})`}
      >
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend verticalAlign="right" height={36} />
    </PieChart>
  </ResponsiveContainer>
);

export default MainTotalPie;
