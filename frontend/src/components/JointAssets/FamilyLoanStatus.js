import React, { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";
import { useSelector } from "react-redux";

function FamilyLoanStatus() {
  const [loanData, setLoanData] = useState([]); // 대출 정보
  const [totalLoanAmount, setTotalLoanAmount] = useState(0); // 총 대출 금액
  const [totalLoanBalance, setTotalLoanBalance] = useState(0); // 총 대출 잔액
  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    fetchLoanData(); // 컴포넌트 마운트 시 대출 정보 불러오기
  }, []);

  // familyId가 있을 때와 없을 때 각각 다른 API를 호출하여 데이터 불러오기
  const fetchLoanData = async () => {
    try {
      if (!user.familyId) {
        // familyId가 없을 때 개인 자산 API 호출
        const response = await axios.get(
          "http://localhost:8080/api/mydata/loan/personal-list",
          {
            params: { userNo: user.userNo },
          }
        );
        setLoanData(response.data);
        const totalLoanAmount = response.data.reduce(
          (sum, loan) => sum + loan.loanAmount,
          0
        );
        const totalLoanBalance = response.data.reduce(
          (sum, loan) => sum + loan.loanBalance,
          0
        );
        setTotalLoanBalance(totalLoanBalance); // 총 대출 잔액 설정
        setTotalLoanAmount(totalLoanAmount); // 총 대출 금액 설정
      } else {
        // familyId가 있을 때 가족 자산 API 호출
        const response = await axios.get(
          "http://localhost:8080/api/mydata/loan/family-list",
          {
            params: { familyId: user.familyId },
          }
        );
        setLoanData(response.data);
        const total = response.data.reduce(
          (sum, loan) => sum + loan.loanAmount,
          0
        );
        const totalLoanBalance = response.data.reduce(
          (sum, loan) => sum + loan.loanBalance,
          0
        );
        setTotalLoanBalance(totalLoanBalance); // 총 대출 잔액 설정
        setTotalLoanAmount(total); // 총 대출 금액 설정
      }
    } catch (error) {
      console.error("대출 데이터를 불러오는 중 오류 발생:", error);
    }
  };

  // 총 대출 금액 대비 퍼센트 계산
  const progress =
    ((totalLoanAmount - totalLoanBalance) / totalLoanAmount) * 100; // 예산에 따른 대출 비율

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>가족대출현황</h3>
      <div style={styles.amount}>
        총 대출 잔액 {totalLoanBalance.toLocaleString()}원
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
        {loanData.map((loan, index) => (
          <div key={index} style={styles.loanItem}>
            <div style={styles.loanName}>
              {loan.loanName}{" "}
              <span style={styles.interestRate}>
                이자율: {loan.loanRate.toFixed(2)}%
              </span>
            </div>
            <div style={styles.loanPerson}>대출인: {loan.userName}</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                이번 달 예상 상환 금액:{" "}
                {loan.loanMonthlyRepayment
                  ? loan.loanMonthlyRepayment.toLocaleString()
                  : "데이터 없음"}
                원
              </div>
              <div style={styles.loanValue}>
                {loan.loanBalance.toLocaleString()}원
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
