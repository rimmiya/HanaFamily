import React from "react";

const data = [
  {
    name: "국내주식",
    value: 41,
    color: "#4A90E2",
    percentage: 99,
  },
  {
    name: "해외주식",
    value: 18,
    color: "#F5A623",
    percentage: 1,
  },
  {
    name: "기타(예수금등)",
    value: 27,
    color: "#F8E71C",
    percentage: 0,
  },
  {
    name: "펀드",
    value: 7,
    color: "#7ED321",
    percentage: "-",
  },
  {
    name: "신탁/ELS",
    value: 1,
    color: "#50E3C2",
    percentage: "-",
  },
  {
    name: "ISA",
    value: 5,
    color: "#B8E986",
    percentage: "-",
  },
];

const InvestmentTable = () => {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        fontFamily: "Pretendard-Regular",
      }}
    >
      <tbody>
        {data.map((item, index) => (
          <tr
            key={index}
            style={{ borderBottom: "1px solid #e0e0e0", height: "40px" }}
          >
            {/* 왼쪽 값 */}
            <td
              style={{
                width: "25%",
                textAlign: "right",
                // paddingRight: "px",
                fontWeight: "600",
                verticalAlign: "middle",
              }}
            >
              {item.value}%
            </td>

            {/* 중앙 내용: 아이콘과 텍스트 */}
            <td
              style={{
                width: "50%",
                // textAlign: "center",
                // display: "flex",
                // alignItems: "center",
                // justifyContent: "center",
                paddingLeft: "90px",
                fontWeight: "600",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  backgroundColor: item.color,
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              ></span>
              {item.name}
            </td>

            {/* 오른쪽 값 */}
            <td
              style={{
                width: "25%",
                textAlign: "right",
                paddingRight: "90px",
                fontWeight: "600",
                verticalAlign: "middle",
              }}
            >
              {item.percentage}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InvestmentTable;
