import React from "react";
import FamilyAssetsStatus from "./FamilyAssetsStatus";
import FamilyLoanStatus from "./FamilyLoanStatus";
import JointAssetsList from "./JointAssetsList";
import JointAssetsMainContent from "./JointAssetsMainContent";
import HouseHoldAccount from "./HouseHoldAccount";
import FixedExpenditureManagement from "./FamilyCalendar";
import FamilyConsumptionPattern from "./FamilyConsumptionPattern";
import BucketListAccount from "./BucketListAccount";
import FamilyInsurance from "./FamilyInsurance";

function FamilyDashboard() {
  const assetsData = [
    {
      name: "적금",
      value: 400000000,
      people: [
        { name: "김하나", amount: 240000000 },
        { name: "김두율", amount: 160000000 },
      ],
    },
    {
      name: "예금",
      value: 300000000,
      people: [
        { name: "김하나", amount: 180000000 },
        { name: "김두율", amount: 120000000 },
      ],
    },
    {
      name: "주식",
      value: 200000000,
      people: [
        { name: "김하나", amount: 120000000 },
        { name: "김두율", amount: 80000000 },
      ],
    },
    {
      name: "기타",
      value: 100000000,
      people: [
        { name: "김하나", amount: 60000000 },
        { name: "김두율", amount: 40000000 },
      ],
    },
  ];

  const totalAssets = assetsData.reduce((acc, item) => acc + item.value, 0);

  const loanData = [
    {
      name: "전세대출",
      value: 500000000,
      interestRate: 2.5,
      person: "김하나",
      monthlyPayment: 2000000,
    },
    {
      name: "신용대출",
      value: 50000000,
      interestRate: 3.1,
      person: "김두율",
      monthlyPayment: 500000,
    },
  ];

  const totalLoanAmount = loanData.reduce((acc, item) => acc + item.value, 0);

  const consumptionData = [
    // 쇼핑 카테고리
    {
      category: "쇼핑",
      name: "백화점 쇼핑",
      value: 1500000,
      type: "지출",
      date: new Date(2024, 3, 1),
    },
    {
      category: "쇼핑",
      name: "온라인 쇼핑몰",
      value: 800000,
      type: "지출",
      date: new Date(2024, 3, 15),
    },
    {
      category: "쇼핑",
      name: "옷 구매",
      value: 950000,
      type: "지출",
      date: new Date(2024, 3, 28),
    },

    // 식비 카테고리
    {
      category: "식비",
      name: "마트 장보기",
      value: 500000,
      type: "지출",
      date: new Date(2024, 3, 2),
    },
    {
      category: "식비",
      name: "외식",
      value: 600000,
      type: "지출",
      date: new Date(2024, 3, 18),
    },
    {
      category: "식비",
      name: "배달 음식",
      value: 700000,
      type: "지출",
      date: new Date(2024, 3, 30),
    },

    // 경조사비 카테고리
    {
      category: "경조사비",
      name: "친구 결혼식",
      value: 200000,
      type: "지출",
      date: new Date(2024, 3, 5),
    },
    {
      category: "경조사비",
      name: "친척 장례식",
      value: 150000,
      type: "지출",
      date: new Date(2024, 3, 20),
    },
    {
      category: "경조사비",
      name: "직장 동료 결혼식",
      value: 180000,
      type: "지출",
      date: new Date(2024, 3, 30),
    },

    // 병원/의료 카테고리
    {
      category: "병원/의료",
      name: "병원 진료",
      value: 300000,
      type: "지출",
      date: new Date(2024, 3, 8),
    },
    {
      category: "병원/의료",
      name: "약국 구매",
      value: 250000,
      type: "지출",
      date: new Date(2024, 3, 22),
    },
    {
      category: "병원/의료",
      name: "건강 검진",
      value: 300000,
      type: "지출",
      date: new Date(2024, 3, 30),
    },

    // 고정지출 카테고리
    {
      category: "고정지출",
      name: "월세",
      value: 1000000,
      type: "지출",
      date: new Date(2024, 3, 10),
    },
    {
      category: "고정지출",
      name: "인터넷 요금",
      value: 900000,
      type: "지출",
      date: new Date(2024, 3, 25),
    },
    {
      category: "고정지출",
      name: "전기세",
      value: 1200000,
      type: "지출",
      date: new Date(2024, 3, 30),
    },

    // 기타 카테고리
    {
      category: "기타",
      name: "자동차 보험료",
      value: 450000,
      type: "지출",
      date: new Date(2024, 3, 12),
    },
    {
      category: "기타",
      name: "취미활동",
      value: 350000,
      type: "지출",
      date: new Date(2024, 3, 27),
    },
    {
      category: "기타",
      name: "교통비",
      value: 500000,
      type: "지출",
      date: new Date(2024, 3, 30),
    },
  ];

  const totalConsumption = consumptionData.reduce(
    (acc, item) => acc + item.value,
    0
  );

  const insuranceData = [
    {
      name: "삼성생명",
      type: "생명보험",
      coverageAmount: 100000000, // 보장 금액
      premium: 500000, // 월 보험료
      person: "김하나",
    },
    {
      name: "현대해상",
      type: "자동차 보험",
      coverageAmount: 30000000, // 보장 금액
      premium: 150000, // 월 보험료
      person: "김두율",
    },
    {
      name: "DB손해보험",
      type: "상해보험",
      coverageAmount: 20000000, // 보장 금액
      premium: 200000, // 월 보험료
      person: "김하나",
    },
  ];

  return (
    <div style={styles.dashboard}>
      <div style={styles.column}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            // width: "45%",
            padding: "20px",
            // marginLeft: "15px",
            // border: "1px solid #d9d9d9",
            background: "#ffffff",
            borderRadius: "20px",
          }}
        >
          <JointAssetsMainContent></JointAssetsMainContent>
          <JointAssetsList></JointAssetsList>
        </div>
        <BucketListAccount></BucketListAccount>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            // width: "45%",
            background: "#ffffff",
            borderRadius: "20px",
          }}
        >
          <HouseHoldAccount></HouseHoldAccount>
        </div>
        <FixedExpenditureManagement initialData={consumptionData} />
      </div>
      <div style={styles.column}>
        <FamilyAssetsStatus data={assetsData} totalAmount={totalAssets} />
        <FamilyLoanStatus data={loanData} totalLoanAmount={totalLoanAmount} />
        <FamilyInsurance data={insuranceData}></FamilyInsurance>
        {/* <FamilyConsumptionPattern data={consumptionData} /> */}
      </div>
    </div>
  );
}

const styles = {
  dashboard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: "40px",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "34px",
    marginBottom: "40px",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    gap: "30px",
  },
};

export default FamilyDashboard;