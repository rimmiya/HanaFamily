import { background } from "@chakra-ui/react";
import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

function FamilyLoanStatus({ data, totalLoanAmount }) {
  // 총 대출 금액 대비 퍼센트 계산
  const progress = (totalLoanAmount / 1000000000) * 100; // 예산에 따른 대출 비율

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>가족대출현황</h3>
      <div style={styles.amount}>
        대출 잔액 {totalLoanAmount.toLocaleString()}원
      </div>
      <div style={styles.progressContainer}>
        {/* ProgressBar 디자인 수정 */}
        <ProgressBar now={progress} style={{ height: "25px" }}>
          <div
            className="progress-bar"
            style={{
              width: `${progress}%`,
              backgroundColor: "#13aec3", // 바 색상 변경
              textAlign: "right",
              paddingRight: "15px",
              color: "#fff", // 텍스트 색상
              fontWeight: "bold",
            }}
          >
            {progress.toFixed(2)}%
          </div>
        </ProgressBar>
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
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                이번 달 예상 상환 금액: {loan.monthlyPayment.toLocaleString()}원
              </div>
              <div style={styles.loanValue}>
                {loan.value.toLocaleString()}원
              </div>
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
    // width: "45%",
    background: "#ffffff",
    borderRadius: "20px",
  },
  title: {
    marginBottom: "10px",
    // color: "#004d40",
    fontFamily: "CustomFont",
  },
  amount: {
    fontSize: "22px",
    // fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  progressContainer: {
    marginBottom: "20px",
  },
  loanDetails: {
    marginTop: "20px",
  },
  loanItem: {
    marginBottom: "15px",
    background: "#f8f8f8",
    padding: "20px",
    borderRadius: "10px",
  },
  loanName: {
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
