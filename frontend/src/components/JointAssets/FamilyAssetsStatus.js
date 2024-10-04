import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";

function FamilyAssetsStatus() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoveredEntry, setHoveredEntry] = useState(null);
  const COLORS = ["#7173f4", "#489cd5", "#30b4c1", "#18ceae"];
  const [totalAssets, setTotalAssets] = useState(0);
  const [assetsData, setAssetsData] = useState([]);
  const [largestAsset, setLargestAsset] = useState(null); // 가장 큰 자산 저장
  const user = useSelector((state) => state.user.userInfo);
  const [totalAmount, setTotalAmount] = useState(0); // 총 자산 금액
  const [familyAssetsDetail, setFamilyAssetsDetail] = useState([]);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
    setHoveredEntry(assetsData[index]);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
    setHoveredEntry(null);
  };

  const onLabelHover = (index) => {
    setHoveredEntry(assetsData[index]);
    setActiveIndex(index);
  };

  const onLabelLeave = () => {
    setHoveredEntry(null);
    setActiveIndex(null);
  };

  useEffect(() => {
    fetchAccountBalance();
  }, []);

  const fetchAccountBalance = async () => {
    try {
      if (!user.familyId) {
        // familyId가 없을 때 (개인 자산 조회)
        const totalresponse = await axios.get(
          "http://localhost:8080/api/family/no-members",
          {
            params: { userNo: user.userNo },
          }
        );
        const responseList = await axios.get(
          "http://localhost:8080/api/savings/account/personal-list",
          {
            params: { userNo: user.userNo },
          }
        );

        setTotalAssets(totalresponse.data); // 총 자산 설정
        processAssetsData(responseList.data); // 파이차트용 데이터 처리
      } else {
        // familyId가 있을 때 (가족 자산 조회)
        const totalresponse = await axios.get(
          "http://localhost:8080/api/family/account-balance",
          {
            params: { familyId: user.familyId },
          }
        );

        const responseList = await axios.get(
          "http://localhost:8080/api/savings/account/family-list",
          {
            params: { familyId: user.familyId },
          }
        );

        setTotalAssets(totalresponse.data); // 총 자산 설정
        processAssetsData(responseList.data); // 파이차트용 데이터 처리
      }
    } catch (error) {
      console.error("자산 데이터를 불러오는 중 오류 발생:", error);
    }
  };

  // 자산 데이터를 파싱하여 파이차트 및 상세 정보 구성
  const processAssetsData = (data) => {
    const categories = {
      적금: { total: 0, people: {} },
      예금: { total: 0, people: {} },
      입출금: { total: 0, people: {} },
      기타: { total: 0, people: {} },
    };

    data.forEach((account) => {
      const { accountType, accountBalance, userName } = account;

      const categoryKey =
        accountType === 1
          ? "적금"
          : accountType === 2
          ? "예금"
          : accountType === 3
          ? "입출금"
          : "기타";

      categories[categoryKey].total += accountBalance;
      if (categories[categoryKey].people[userName]) {
        categories[categoryKey].people[userName] += accountBalance;
      } else {
        categories[categoryKey].people[userName] = accountBalance;
      }
    });

    // 카테고리를 파이차트 형식에 맞게 변환
    const formattedData = Object.keys(categories).map((key) => ({
      name: key,
      value: categories[key].total,
      people: categories[key].people, // 가족 구성원별 자산 정보
    }));

    // 총 자산 계산
    const total = formattedData.reduce((sum, entry) => sum + entry.value, 0);

    setAssetsData(formattedData);
    setTotalAmount(total);

    // 가장 큰 자산을 계산
    const largest = formattedData.reduce(
      (prev, current) => {
        return current.value > prev.value ? current : prev;
      },
      { name: "", value: 0 }
    );

    setLargestAsset(largest);
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
      {largestAsset && (
        <div style={styles.largestAssetMessage}>
          우리가족은 {largestAsset.name} 자산이 가장 많아요!
        </div>
      )}
      <div style={styles.chartContainer}>
        <ResponsiveContainer width="50%" height={250}>
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={assetsData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={110}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
            >
              {assetsData.map((entry, index) => (
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
                  {totalAssets.toLocaleString()}원
                </text>
              </>
            )}
          </PieChart>
        </ResponsiveContainer>
        {/* Legend - 자산 항목과 가족 구성원의 자산 비율 표시 */}
        <div style={styles.details}>
          {assetsData.map((entry, index) => (
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
                {/* Hover 시 구성원들의 자산 금액과 비율을 표시 */}
                {hoveredEntry === entry && (
                  <div>
                    {Object.entries(entry.people).map(([name, amount], i) => {
                      const percentage = ((amount / entry.value) * 100).toFixed(
                        2
                      ); // 구성원의 자산 비율 계산
                      return (
                        <p key={i} style={styles.detailValue}>
                          {name}: {amount.toLocaleString()}원 ({percentage}%)
                        </p>
                      );
                    })}
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
    // marginBottom: "10px",
  },
  labelColor: {
    width: "20px",
    height: "20px",
    marginTop: "3px",
    marginRight: "10px",
    borderRadius: "5px",
  },
  detailTitle: {
    margin: 0,
    color: "black",
  },
  detailValue: {
    margin: 0,
    color: "#555",
  },
  largestAssetMessage: {
    fontSize: "20px",
    color: "#333",
  },
};

export default FamilyAssetsStatus;
