import React from "react";
import { ProgressBar } from "react-bootstrap";
import "../../style/AssetsLoanContent.css";

const loansData = [
  {
    bank: "국민은행 주택담보대출",
    amount: 200000000, // 2억
    principal: 380000000, // 3.8억
    interestRate: 4.1,
    repaymentMethod: "원리금 균등분할상환",
    paymentDate: 11,
    maturityDate: "2037-3-15",
    autoDebitAccount: "국민은행 123456789012",
    logo: "/images/tesla-logo.png",
  },
  {
    bank: "현대카드 장기카드대출",
    amount: 5000000, // 500만
    principal: 5000000, // 500만
    interestRate: 11.2,
    repaymentMethod: "만기일시상환",
    paymentDate: null,
    maturityDate: "2022-11-11",
    logo: "/images/tesla-logo.png",
  },
];

const AssetsLoanContent = () => {
  // 전체 원금의 합계 계산
  const totalPrincipal = loansData.reduce(
    (total, loan) => total + loan.principal,
    0
  );

  // 상환된 금액의 합계 계산 (principal - amount)
  const repaymentAmount = loansData.reduce(
    (total, loan) => total + (loan.principal - loan.amount),
    0
  );

  // 상환 비율 계산 (백분율)
  const repaymentRate = ((repaymentAmount / totalPrincipal) * 100).toFixed(2);

  // 대출 금액 합계 계산
  const totalLoanAmount = loansData.reduce(
    (total, loan) => total + loan.amount,
    0
  );

  const formatDate = (dateString) => {
    // 년, 월, 일로 나누기
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
                        // src={loansData.logo}
                        src={hanalogo}
                        alt={`${loansData.name} logo`}
                        style={{
                          width: "100%",
                          height: "auto",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <h3>{loan.bank}</h3>
                  </div>
                  <h3 style={{ fontWeight: "600" }}>
                    {loan.amount.toLocaleString()}원
                  </h3>
                </div>
                <div className="loan-details">
                  <div className="loan-detail-item">
                    <p>대출 원금</p>
                    <p>{loan.principal.toLocaleString()}원</p>
                  </div>
                  <div className="loan-detail-item">
                    <p>적용 금리</p>
                    <p>{loan.interestRate}%</p>
                  </div>
                  <div className="loan-detail-item">
                    <p>상환방법</p>
                    <p>{loan.repaymentMethod}</p>
                  </div>
                  <div className="loan-detail-item">
                    <p>상환일</p>
                    <p>
                      {loan.paymentDate
                        ? `${loan.paymentDate}일`
                        : "상환일 없음"}
                    </p>
                  </div>
                  <div className="loan-detail-item">
                    <p>만기일</p>
                    <p>{formatDate(loan.maturityDate)}</p>
                  </div>
                  {loan.autoDebitAccount && (
                    <div className="loan-detail-item">
                      <p>자동이체 계좌</p>
                      <p>{loan.autoDebitAccount}</p>
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
