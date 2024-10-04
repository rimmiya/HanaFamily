import React from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 훅
import FamilyAssetsStatus from "./FamilyAssetsStatus";
import FamilyLoanStatus from "./FamilyLoanStatus";
import JointAssetsList from "./JointAssetsList";
import JointAssetsMainContent from "./JointAssetsMainContent";
import HouseHoldAccount from "./HouseHoldAccount";
import FixedExpenditureManagement from "./FamilyCalendar";
import BucketListAccount from "./BucketListAccount";
import FamilyInsurance from "./FamilyInsurance";

function FamilyDashboard() {
  const navigate = useNavigate(); // useNavigate 훅 사용

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
            padding: "20px",
            background: "#ffffff",
            borderRadius: "20px",
          }}
        >
          <JointAssetsMainContent />
          <JointAssetsList />
        </div>
        <BucketListAccount />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            background: "#ffffff",
            borderRadius: "20px",
          }}
        >
          <HouseHoldAccount />
        </div>
        <FixedExpenditureManagement />
      </div>
      <div style={styles.column}>
        {/* FamilyAssetsStatus 클릭 시 /assetsaccount로 이동 */}
        <div onClick={() => navigate("/assetsaccount")}>
          <FamilyAssetsStatus />
        </div>

        {/* FamilyLoanStatus 클릭 시 /assetsloan로 이동 */}
        <div onClick={() => navigate("/assetsloan")}>
          <FamilyLoanStatus />
        </div>

        {/* FamilyInsurance 클릭 시 /assetsinsurance로 이동 */}
        <div onClick={() => navigate("/assetsinsurance")}>
          <FamilyInsurance />
        </div>
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
