import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

function FamilyLoanStatus({ data, totalLoanAmount }) {
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>가족대출현황</h3>
      <div style={styles.amount}>
        총 대출 잔액: {totalLoanAmount.toLocaleString()}원
      </div>
      <div style={styles.progressContainer}>
        <ProgressBar
          now={(totalLoanAmount / 1000000000) * 100} // 예산에 따른 대출 비율
          style={styles.progressBar}
        />
      </div>
      <div style={styles.loanDetails}>
        {data.map((loan, index) => (
          <div key={index} style={styles.loanItem}>
            <div style={styles.loanName}>
              {loan.name}{" "}
              <span style={styles.interestRate}>
                이자율: {loan.interestRate}%
              </span>
            </div>
            <div style={styles.loanPerson}>대출인: {loan.person}</div>
            <div style={styles.loanValue}>{loan.value.toLocaleString()}원</div>
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
    width: "44%",
  },
  title: {
    marginBottom: "10px",
    color: "#004d40",
    fontSize: "18px",
    fontWeight: "bold",
  },
  amount: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  progressContainer: {
    marginBottom: "20px",
  },
  progressBar: {
    height: "20px",
    backgroundColor: "#d9f7be",
    borderRadius: "10px",
    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
  },
  loanDetails: {
    marginTop: "20px",
  },
  loanItem: {
    marginBottom: "15px",
  },
  loanName: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "5px",
  },
  loanPerson: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "5px",
  },
  interestRate: {
    backgroundColor: "#e0e0e0",
    borderRadius: "5px",
    padding: "2px 5px",
    fontSize: "14px",
    color: "#666",
    marginLeft: "10px",
  },
  loanValue: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#555",
  },
};

export default FamilyLoanStatus;
