import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more"; // Packed Bubble charts 지원

HighchartsMore(Highcharts);

function FamilyConsumptionPattern({ data }) {
  // 카테고리별로 데이터를 그룹화하고 합계 계산
  const categories = data.reduce((acc, item) => {
    const categoryIndex = acc.findIndex((cat) => cat.name === item.category);
    if (categoryIndex !== -1) {
      acc[categoryIndex].value += item.value;
    } else {
      acc.push({ name: item.category, value: item.value });
    }
    return acc;
  }, []);

  // 각 카테고리별 색상을 설정
  const categoryColors = {
    쇼핑: "#FF8042",
    식비: "#00C49F",
    경조사비: "#FFBB28",
    "병원/의료": "#0088FE",
    고정지출: "#FF4444",
    기타: "#AAFF44",
  };

  // 최대값 설정
  const maxValue = Math.max(...categories.map((cat) => cat.value));

  const options = {
    chart: {
      type: "packedbubble",
      height: "100%",
    },
    title: {
      text: "가계 소비 패턴 분석",
    },
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
      <HighchartsReact highcharts={Highcharts} options={options} />
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
};

export default FamilyConsumptionPattern;
