import React, { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";
import { useSelector } from "react-redux";
import "../../style/AssetsLoanContent.css";

const AssetsLoanContent = () => {
  const [loansData, setLoansData] = useState([]); // 대출 정보
  const [totalPrincipal, setTotalPrincipal] = useState(0); // 총 원금
  const [totalLoanAmount, setTotalLoanAmount] = useState(0); // 총 대출 금액
  const [repaymentAmount, setRepaymentAmount] = useState(0); // 상환된 금액
  const user = useSelector((state) => state.user.userInfo);

  // 코드와 이름 매핑 객체
  const bankCodeMapping = {
    130: "하나은행",
    110: "신한은행",
    100: "국민은행",
    120: "우리은행",
    140: "IBK기업은행",
    150: "농협은행",
    160: "외환은행",
    170: "SC제일은행",
    180: "씨티은행",
    190: "대구은행",
    200: "부산은행",
  };

  useEffect(() => {
    fetchLoanData(); // 컴포넌트 마운트 시 대출 정보 불러오기
  }, []);

  // familyId가 있을 때와 없을 때 각각 다른 API를 호출하여 데이터 불러오기
  const fetchLoanData = async () => {
    try {
      let response;
      if (!user.familyId) {
        // familyId가 없을 때 개인 자산 API 호출
        response = await axios.get(
          "http://localhost:8080/api/mydata/loan/personal-list",
          {
            params: { userNo: user.userNo },
          }
        );
      } else {
        // familyId가 있을 때 가족 자산 API 호출
        response = await axios.get(
          "http://localhost:8080/api/mydata/loan/family-list",
          {
            params: { familyId: user.familyId },
          }
        );
      }

      if (response.data) {
        setLoansData(response.data);

        // 총 원금 계산
        const totalPrincipal = response.data.reduce(
          (sum, loan) => sum + loan.loanAmount,
          0
        );
        setTotalPrincipal(totalPrincipal);

        // 상환된 금액 계산 (loanBalance - loanAmount)
        const totalRepayment = response.data.reduce(
          (sum, loan) => sum + (loan.loanAmount - loan.loanBalance),
          0
        );
        setRepaymentAmount(totalRepayment);

        // 대출 금액 합계 계산
        const totalLoanAmount = response.data.reduce(
          (sum, loan) => sum + loan.loanBalance,
          0
        );
        setTotalLoanAmount(totalLoanAmount);
      } else {
        console.error("API에서 데이터가 없습니다.");
      }
    } catch (error) {
      console.error("대출 데이터를 불러오는 중 오류 발생:", error);
    }
  };

  // 상환 비율 계산 (백분율)
  const repaymentRate = totalPrincipal
    ? ((repaymentAmount / totalPrincipal) * 100).toFixed(2)
    : 0;

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${year}년 ${month}월 ${day}일`;
  };

  const hanalogo = `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`;

  return (
    <div className="assets-loan-container">
      <div className="assets-loan-content">
        <div className="assets-loan-left">
          <div className="assets-loan-title">
            <h2>남은 대출금</h2>
            <h1>{totalLoanAmount.toLocaleString()} 원</h1>
          </div>
          <div className="assets-loan-notice">
            <p>보유 대출 총 {loansData.length}개</p>
          </div>

          {/* 대출 상환 상태 바 */}
          <div className="loan-status-bar">
            <ProgressBar
              now={repaymentRate}
              label={`${repaymentRate}%`}
              variant="success"
              className="loan-custom-progress-bar"
              style={{ height: "25px", borderRadius: "20px" }}
            />
            <div className="loan-status-text">
              <span style={{ color: "#089f84", fontWeight: "600" }}>
                {repaymentAmount.toLocaleString()}원 상환
              </span>
              <span style={{ color: "#b3b3b3" }}>
                전체 {totalPrincipal.toLocaleString()}원
              </span>
            </div>
          </div>

          <div className="assets-loan-list">
            {loansData.map((loan, index) => (
              <div key={index} className="loan-item">
                <div className="loan-item-header">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        marginRight: "10px",
                        marginBottom: "5px",
                        overflow: "hidden",
                        borderRadius: "50%",
                      }}
                    >
                      <img
                        src={hanalogo}
                        alt={`${loan.loanName} logo`}
                        style={{
                          width: "100%",
                          height: "auto",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <h3>{loan.loanName}</h3>
                  </div>
                  <h3 style={{ fontWeight: "600" }}>
                    {loan.loanBalance.toLocaleString()}원
                  </h3>
                </div>
                <div className="loan-details">
                  <div className="loan-detail-item">
                    <p>대출 원금</p>
                    <p>{loan.loanAmount.toLocaleString()}원</p>
                  </div>
                  <div className="loan-detail-item">
                    <p>적용 금리</p>
                    <p>{loan.loanRate.toFixed(2)}%</p>
                  </div>
                  <div className="loan-detail-item">
                    <p>상환방법</p>
                    <p>{loan.loanType}</p>
                  </div>
                  <div className="loan-detail-item">
                    <p>상환일</p>
                    <p>{loan.loanRepaymentDate}일</p>
                  </div>
                  <div className="loan-detail-item">
                    <p>만기일</p>
                    <p>{formatDate(loan.loanEndDate)}</p>
                  </div>
                  {loan.loanAccount && (
                    <div className="loan-detail-item">
                      <p>자동 이체 계좌</p>
                      <p>
                        {bankCodeMapping[loan.loanBank]} {loan.loanAccount}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="assets-loan-right"></div>
      </div>
    </div>
  );
};

export default AssetsLoanContent;
