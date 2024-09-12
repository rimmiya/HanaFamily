import React from "react";

function FamilyInsurance({ data }) {
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>가족 보험 현황</h3>
      <div style={styles.insuranceDetails}>
        {data.map((insurance, index) => (
          <div key={index} style={styles.insuranceItem}>
            <div style={styles.insuranceName}>
              {insurance.type}{" "}
              <span style={styles.insuranceRate}>{insurance.name}</span>
            </div>
            <div style={styles.loanPerson}>피보험자: {insurance.person}</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>월 보험료</div>
              <div>{insurance.premium.toLocaleString()}원</div>
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
