import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more"; // Packed Bubble charts 지원
import axios from "axios";
import { useSelector } from "react-redux";

HighchartsMore(Highcharts);

function FamilyConsumptionPattern() {
  const [filteredTransactions, setFilteredTransactions] = useState([]); // 필터링된 지출 내역
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // 선택된 월 (기본: 현재 월)
  const user = useSelector((state) => state.user.userInfo); // Redux에서 사용자 정보 가져오기

  const defaultCategories = [
    { categoryId: 1, categoryName: "식사" },
    { categoryId: 2, categoryName: "카페/간식" },
    { categoryId: 3, categoryName: "의료/건강" },
    { categoryId: 4, categoryName: "술/유흥" },
    { categoryId: 5, categoryName: "의복/미용" },
    { categoryId: 6, categoryName: "자동차" },
    { categoryId: 7, categoryName: "교통" },
    { categoryId: 8, categoryName: "주거/통신" },
    { categoryId: 9, categoryName: "생활" },
    { categoryId: 10, categoryName: "문화/여가" },
    { categoryId: 11, categoryName: "여행/숙박" },
    { categoryId: 12, categoryName: "교육" },
    { categoryId: 13, categoryName: "육아" },
    { categoryId: 14, categoryName: "기타" },
    { categoryId: 15, categoryName: "경조사" },
  ];

  useEffect(() => {
    fetchAllTransactions(); // 컴포넌트 마운트 시 거래 내역 불러오기
  }, [selectedMonth]);

  // 모든 지출 내역 가져오기
  const fetchAllTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/transactions/family",
        {
          params: { familyId: user.familyId },
        }
      );
      // console.log("모든 지출 내역:", response.data[0].transactions);
      filterTransactionsByMonth(response.data[0].transactions, selectedMonth); // 현재 선택된 달에 맞춰 필터링
    } catch (error) {
      console.error("지출 내역을 가져오는 중 오류 발생:", error);
    }
  };

  // 달별로 지출 내역 필터링
  const filterTransactionsByMonth = (transactions, month) => {
    const filtered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.transactionDate);
      return transactionDate.getMonth() + 1 === month; // 해당 달에 맞는 데이터 필터링
    });
    setFilteredTransactions(filtered);
  };

  // 카테고리별로 데이터를 그룹화하고 합계 계산
  const categories = defaultCategories
    .map((category) => {
      const categoryTotal = filteredTransactions
        .filter((transaction) => transaction.category === category.categoryId)
        .reduce((sum, transaction) => sum + transaction.transactionAmount, 0); // 카테고리별로 합계 계산
      return {
        name: category.categoryName,
        value: categoryTotal,
      };
    })
    .filter((category) => category.value > 0); // 0인 카테고리는 제외

  // 가장 많이 소비된 카테고리 찾기
  const mostSpentCategory = categories.length
    ? categories.reduce((prev, curr) => (curr.value > prev.value ? curr : prev))
    : null; // 빈 배열일 경우 처리

  // 각 카테고리별 색상을 설정
  const categoryColors = {
    식사: "#FF8042",
    "카페/간식": "#00C49F",
    "의료/건강": "#FFBB28",
    "술/유흥": "#0088FE",
    "의복/미용": "#FF4444",
    자동차: "#AAFF44",
    교통: "#DD4444",
    "주거/통신": "#00A5E0",
    생활: "#FEC57B",
    "문화/여가": "#EA80FC",
    "여행/숙박": "#795548",
    교육: "#42A5F5",
    육아: "#FF7043",
    기타: "#AB47BC",
    경조사: "#EC407A",
  };

  // 최대값 설정
  const maxValue = Math.max(...categories.map((cat) => cat.value));

  const options = {
    chart: {
      type: "packedbubble",
      height: "100%",
    },
    title: null, // 제목 제거
    tooltip: {
      useHTML: true,
      pointFormat: "<b>{point.name}:</b> {point.value}원",
    },
    plotOptions: {
      packedbubble: {
        minSize: "30%",
        maxSize: "100%",
        zMin: 0,
        zMax: maxValue, // 데이터의 최대 값에 따라 조정
        layoutAlgorithm: {
          gravitationalConstant: 0.02, // 버블 간의 거리 조정
          splitSeries: false,
        },
        dataLabels: {
          enabled: true,
          align: "center", // 텍스트를 수평으로 중앙에 정렬
          verticalAlign: "middle", // 텍스트를 수직으로 중앙에 정렬
          format: "{point.name}", // HTML 태그 없이 텍스트만 리턴
          style: {
            color: "black",
            textOutline: "none",
            fontWeight: "bold",
            fontSize: function () {
              return `${Math.sqrt(this.point.value)}px`; // 현재 포인트의 값에 따라 폰트 크기 조정
            },
          },
        },
      },
    },
    series: [
      {
        name: "가계 소비",
        data: categories.map((category) => ({
          name: category.name,
          value: category.value,
          color: categoryColors[category.name], // 카테고리별 색상 지정
        })),
      },
    ],
  };

  return (
    <div style={styles.container}>
      <h3 style={{ fontFamily: "CustomFont" }}>가계 소비 패턴</h3>
      {/* 가장 많이 소비한 카테고리 표시 */}
      {mostSpentCategory && (
        <p style={{ marginTop: "20px", fontWeight: "bold" }}>
          우리가족은{" "}
          <span style={{ color: categoryColors[mostSpentCategory.name] }}>
            {mostSpentCategory.name}
          </span>
          에 가장 많은 소비를 했어요!
        </p>
      )}
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#f0f8ff",
    borderRadius: "10px",
    padding: "20px",
    background: "#ffffff",
    borderRadius: "20px",
  },
};

export default FamilyConsumptionPattern;
