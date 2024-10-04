import React, { useState } from "react";

function InterestCalculator() {
  const [familyCount, setFamilyCount] = useState(1); // 가족 수
  const [monthlyDeposits, setMonthlyDeposits] = useState([0]); // 가족별 월납입액
  const [contractPeriod, setContractPeriod] = useState(0); // 적립기간 (개월 단위)
  const [interestRate, setInterestRate] = useState(2.3); // 기본 이율
  const [isResultVisible, setIsResultVisible] = useState(false); // 결과 표시 여부
  const [isCalculatorVisible, setCalculatorVisible] = useState(false); // 계산기 표시 여부
  const [preferentialRate, setPreferentialRate] = useState(false); // 우대 이율 여부
  const [goalAmount, setGoalAmount] = useState(3000000); // 목표 금액 (기본값: 300만원)
  const maxGoalAmount = 36000000; // 최대 목표 금액

  // 가족 수 변경에 따라 월 납입금 설정
  const handleFamilyCountChange = (e) => {
    const count = parseInt(e.target.value);
    setFamilyCount(count);

    // 목표 금액 / 가족 수 계산하여 기본 월 납입금 설정
    const basicDeposit = Math.floor(goalAmount / count);

    const newDeposits = Array.from({ length: count }, (_, i) => basicDeposit);
    setMonthlyDeposits(newDeposits);
  };

  // 월 납입금 수동 입력 받기
  const handleMonthlyDepositChange = (index, value) => {
    const updatedDeposits = [...monthlyDeposits];
    updatedDeposits[index] = Math.max(10000, value); // 최소 월 1만원 이상 제한
    setMonthlyDeposits(updatedDeposits);
  };

  // 목표 금액 버튼으로 값 추가
  const handleGoalAmountChange = (value) => {
    setGoalAmount((prevAmount) => Math.min(prevAmount + value, maxGoalAmount));

    // 가족별 월 납입금 자동 업데이트 (가족 수로 나눈 금액)
    const basicDeposit = Math.floor((goalAmount + value) / familyCount);
    const newDeposits = Array.from(
      { length: familyCount },
      (_, i) => basicDeposit
    );
    setMonthlyDeposits(newDeposits);
  };

  // 적립기간 버튼으로 값 변경
  const handlePeriodChange = (months) => {
    setContractPeriod(months);
  };

  // 총 월 납입금 계산
  const totalMonthlyDeposit = monthlyDeposits.reduce(
    (acc, deposit) => acc + deposit,
    0
  );

  // 이자 계산 함수 (단리 방식)
  const calculateInterest = () => {
    const totalPrincipal = totalMonthlyDeposit * contractPeriod; // 총 원금

    // 우대 이율 적용 여부에 따라 이율 변경
    const applicableInterestRate = preferentialRate ? 3.5 : interestRate;

    // 단리 방식: 원금에 대해서만 이자 계산
    const preTaxInterest =
      (totalPrincipal * (applicableInterestRate / 100)) / 12; // 세전 이자 계산
    const tax = preTaxInterest * 0.154; // 15.4% 이자 과세
    const postTaxInterest = preTaxInterest - tax; // 세후 이자
    const totalAmount = totalPrincipal + postTaxInterest; // 총 수령액

    return {
      totalPrincipal: totalPrincipal.toLocaleString(), // 원금 합계
      preTaxInterest: preTaxInterest.toLocaleString(), // 세전 이자
      tax: tax.toLocaleString(), // 이자 과세 금액
      totalAmount: totalAmount.toLocaleString(), // 총 수령액 (세후)
    };
  };

  const { totalPrincipal, preTaxInterest, tax, totalAmount } =
    calculateInterest();

  const toggleCalculator = () => {
    setCalculatorVisible(!isCalculatorVisible);
    setIsResultVisible(false); // 계산 결과 초기화
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      {/* 이자 계산기 버튼 */}
      <div
        onClick={toggleCalculator}
        style={{
          cursor: "pointer",
          fontSize: "24px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
        className="hvr-pulse-shrink"
      >
        이자 계산기
        <br />
        <span className="material-symbols-outlined">
          {isCalculatorVisible
            ? "keyboard_double_arrow_up"
            : "keyboard_double_arrow_down"}
        </span>
      </div>

      {/* 계산기 표시 부분 */}
      {isCalculatorVisible && (
        <div
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "10px",
            width: "500px",
          }}
        >
          <form>
            {/* 목표 금액 설정 (버튼) */}
            <div style={{ marginBottom: "10px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <label>목표 금액 (최대 3600만 원): </label>{" "}
                <div>
                  <input
                    type="number"
                    value={goalAmount}
                    readOnly
                    style={{
                      width: "150px",
                      padding: "5px",
                      textAlign: "right",
                      borderBottom: "1px solid #3f3f3f",
                    }}
                  />
                  <span>&nbsp;&nbsp;&nbsp; 원</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                <button
                  type="button"
                  onClick={() => handleGoalAmountChange(100000)}
                  style={{
                    padding: "5px 10px",
                    cursor: "pointer",
                    borderRadius: "10px",
                    backgroundColor: "#f0f0f0",
                    width: "150px",
                  }}
                >
                  +10만
                </button>
                <button
                  type="button"
                  onClick={() => handleGoalAmountChange(1000000)}
                  style={{
                    padding: "5px 10px",
                    cursor: "pointer",
                    borderRadius: "10px",
                    backgroundColor: "#f0f0f0",
                    width: "150px",
                  }}
                >
                  +100만
                </button>
                <button
                  type="button"
                  onClick={() => handleGoalAmountChange(10000000)}
                  style={{
                    padding: "5px 10px",
                    cursor: "pointer",
                    borderRadius: "10px",
                    backgroundColor: "#f0f0f0",
                    width: "150px",
                  }}
                >
                  +1,000만
                </button>
              </div>
            </div>

            {/* 가족 구성원 수 (Select) */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <label>가족 수: </label>
              <select
                value={familyCount}
                onChange={handleFamilyCountChange}
                style={{
                  padding: "5px",
                  textAlign: "right",
                  borderBottom: "1px solid #3f3f3f",
                  width: "70%",
                }}
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}명
                  </option>
                ))}
              </select>
            </div>

            {/* 각 가족 구성원의 월 납입금 설정 */}
            {Array.from({ length: familyCount }).map((_, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <label>{`가족 ${index + 1} 월납입액`}</label>
                <div
                  style={{
                    width: "70%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <input
                    type="number"
                    value={monthlyDeposits[index]}
                    onChange={(e) =>
                      handleMonthlyDepositChange(
                        index,
                        parseInt(e.target.value)
                      )
                    }
                    min={10000}
                    max={1000000}
                    step={10000}
                    style={{
                      padding: "5px",
                      textAlign: "right",
                      borderBottom: "1px solid #3f3f3f",
                      width: "70%",
                    }}
                  />

                  <span>&nbsp;&nbsp;&nbsp; 원</span>
                </div>
              </div>
            ))}

            {/* 적립기간 - 버튼으로 기간 선택 */}
            <div style={{ marginBottom: "10px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <label>적립기간: </label>
                <div>
                  <input
                    type="number"
                    value={contractPeriod}
                    readOnly
                    style={{
                      padding: "5px",
                      textAlign: "right",
                      borderBottom: "1px solid #3f3f3f",
                    }}
                  />
                  <span> 개월</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                <button
                  type="button"
                  onClick={() => handlePeriodChange(6)}
                  style={{
                    padding: "5px 10px",
                    cursor: "pointer",
                    borderRadius: "10px",
                    backgroundColor: "#f0f0f0",
                    width: "150px",
                  }}
                >
                  +6개월
                </button>
                <button
                  type="button"
                  onClick={() => handlePeriodChange(12)}
                  style={{
                    padding: "5px 10px",
                    cursor: "pointer",
                    borderRadius: "10px",
                    backgroundColor: "#f0f0f0",
                    width: "150px",
                  }}
                >
                  +12개월
                </button>
                <button
                  type="button"
                  onClick={() => handlePeriodChange(24)}
                  style={{
                    padding: "5px 10px",
                    cursor: "pointer",
                    borderRadius: "10px",
                    backgroundColor: "#f0f0f0",
                    width: "150px",
                  }}
                >
                  +24개월
                </button>
              </div>
            </div>

            {/* 우대 이율 적용 여부 */}
            <div style={{ marginBottom: "10px" }}>
              <label>우대 이율 적용 : &nbsp;</label>
              <input
                type="checkbox"
                checked={preferentialRate}
                onChange={(e) => setPreferentialRate(e.target.checked)}
              />
            </div>

            {/* 계산하기 버튼 */}
            <button
              type="button"
              onClick={() => setIsResultVisible(true)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#12b79b",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                width: "100%",
                fontSize: "16px",
              }}
            >
              계산하기
            </button>
          </form>
        </div>
      )}

      {/* 결과 표시 */}
      {isResultVisible && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h5>
            매월 {totalMonthlyDeposit.toLocaleString()}원씩 {contractPeriod}
            개월동안
          </h5>
          <h5>연 이율 {preferentialRate ? 3.5 : interestRate}%로 저축하면</h5>
          <h4>
            총 <span style={{ color: "#12b79b" }}>{totalAmount}원</span>을
            수령하실 수 있습니다.
          </h4>
          <hr />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>원금합계</span>
            <span>{totalPrincipal}원</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>세전이자</span>
            <span>{preTaxInterest}원</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>이자과세(15.4%)</span>
            <span>{tax}원</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              단리 {preferentialRate ? 3.5 : interestRate}%, 일반과세 기준
            </span>
          </div>
          <hr />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>세후 수령액</h3>
            <h3 style={{ color: "green" }}>{totalAmount}원</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default InterestCalculator;
