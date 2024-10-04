import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function FamilyInsurance() {
  const user = useSelector((state) => state.user.userInfo);
  const [insuranceData, setInsuranceData] = useState([]);

  useEffect(() => {
    fetchFamilyInsurance();
  }, []);

  // familyId가 있을 때와 없을 때 각각 다른 API를 호출하여 데이터 불러오기
  const fetchFamilyInsurance = async () => {
    try {
      let response;
      if (user.familyId) {
        response = await axios.get(
          "http://localhost:8080/api/mydata/insurance/family-list",
          {
            params: { familyId: user.familyId },
          }
        );
      } else {
        response = await axios.get(
          "http://localhost:8080/api/mydata/insurance/personal-list",
          {
            params: { userNo: user.userNo },
          }
        );
      }
      setInsuranceData(response.data);

      console.log("가족 보험 현황:", response.data);
    } catch (error) {
      console.error("가족 보험 현황을 가져오는 중 오류 발생:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>가족 보험 현황</h3>
      <div style={styles.insuranceDetails}>
        {insuranceData.map((insurance, index) => (
          <div key={index} style={styles.insuranceItem}>
            <div style={styles.insuranceName}>
              {insurance.insuranceType}{" "}
              <span style={styles.insuranceRate}>
                {insurance.insuranceName}
              </span>
            </div>
            <div style={styles.loanPerson}>피보험자: {insurance.userName}</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>월 보험료</div>
              <div>
                {insurance.insuranceMonthlyPayment
                  ? `${insurance.insuranceMonthlyPayment.toLocaleString()}원`
                  : "데이터 없음"}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>보험 기간</div>
              <div>
                {new Date(insurance.insuranceStartDate).toLocaleDateString()} ~{" "}
                {new Date(insurance.insuranceEndDate).toLocaleDateString()}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>보험 금액</div>
              <div>{insurance.insuranceAmount.toLocaleString()}원</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#f0f8ff",
    borderRadius: "10px",
    padding: "20px",
    background: "#ffffff",
  },
  title: {
    marginBottom: "10px",
    fontFamily: "CustomFont",
  },
  insuranceDetails: {
    marginTop: "20px",
    display: "flex",
    flexWrap: "wrap", // 줄바꿈을 가능하게 설정
    gap: "20px",
  },
  insuranceItem: {
    marginBottom: "15px",
    background: "#f8f8f8",
    padding: "20px",
    borderRadius: "10px",
    width: "calc(50% - 10px)", // 두 개씩 배치되도록 설정
    boxSizing: "border-box",
  },
  insuranceName: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "5px",
    alignItems: "center",
    display: "flex",
  },
  loanPerson: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "5px",
  },
  insuranceRate: {
    backgroundColor: "#e0e0e0",
    borderRadius: "5px",
    padding: "2px 5px",
    fontSize: "14px",
    color: "#666",
    marginLeft: "10px",
  },
};

export default FamilyInsurance;
