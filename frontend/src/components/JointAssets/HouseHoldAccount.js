import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Table, Button, Select } from "antd";
import { useSelector } from "react-redux";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Tab } from "react-bootstrap";
import { render } from "@testing-library/react";

const { Option } = Select;

function HouseHoldAccount() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false); // 수입 모달 상태 추가
  const [allTransactions, setAllTransactions] = useState([]); // 모든 지출 내역 저장
  const [allLoans, setAllLoans] = useState([]); // 모든 대출 내역 저장
  const [allInsurances, setAllInsurances] = useState([]); // 모든 보험 내역 저장
  const [filteredTransactions, setFilteredTransactions] = useState([]); // 필터링된 지출 내역
  const [filteredLoans, setFilteredLoans] = useState([]); // 필터링된 대출 내역
  const [filteredInsurances, setFilteredInsurances] = useState([]); // 필터링된 보험 내역
  const [loanTotal, setLoanTotal] = useState(0); // 대출 합계
  const [insuranceTotal, setInsuranceTotal] = useState(0); // 보험 합계
  const [allIncomes, setAllIncomes] = useState([]); // 모든 수입 내역 저장
  const [filteredIncomes, setFilteredIncomes] = useState([]); // 필터링된 수입 내역
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // 선택된 월 (기본: 현재 월)
  const [budgetSum, setBudgetSum] = useState(0); // 이번 달 예산 합계
  const [currentMonthExpenses, setCurrentMonthExpenses] = useState(0); // 이번 달 지출 합계
  const [currentMonthIncome, setCurrentMonthIncome] = useState(0); // 이번 달 수입 합계
  const [currentPageExpenditure, setCurrentPageExpenditure] = useState(1);
  const [currentPageLoan, setCurrentPageLoan] = useState(1);
  const [currentPageInsurance, setCurrentPageInsurance] = useState(1);
  const [currentPageIncome, setCurrentPageIncome] = useState(1);
  const itemsPerPage = 20; // 한 페이지에 표시할 항목 수

  const user = useSelector((state) => state.user.userInfo);

  const incomeimg = `${process.env.PUBLIC_URL}/img/income.png`;
  const walletimg = `${process.env.PUBLIC_URL}/img/wallet.png`;

  const nowMonth = new Date().getMonth() + 1;

  // 남은 예산과 진행률 계산
  const leftAmount = budgetSum - currentMonthExpenses;
  const progress = Math.min(
    (currentMonthExpenses / (budgetSum || 1)) * 100, // Ensure no division by zero
    100 // Limit progress to 100%
  );

  // 이번 달 예산 합계 가져오기
  const fetchBudgetSum = async (month) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/budget/family/${user.familyId}/sum/${month}`
      );
      setBudgetSum(response.data); // 예산 합계 저장
    } catch (error) {
      console.error("예산 데이터를 가져오는 중 오류 발생", error);
    }
  };

  // 이번 달 지출 합계 가져오기
  const fetchCurrentMonthExpenses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/budget/family/${user.familyId}/expenses/current-month`
      );
      const totalExpenses =
        response.data +
        allLoans.reduce(
          (acc, loan) => acc + Number(loan.loanMonthlyRepayment),
          0
        ) +
        allInsurances.reduce(
          (acc, insurance) => acc + Number(insurance.insuranceMonthlyPayment),
          0
        );
      setCurrentMonthExpenses(totalExpenses); // 지출 합계 저장
    } catch (error) {
      console.error("지출 데이터를 가져오는 중 오류 발생", error);
    }
  };

  // 이번 달 수입 합계 가져오기
  const fetchCurrentMonthIncome = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/budget/family/${user.familyId}/income/current-month`
      );
      setCurrentMonthIncome(response.data); // 수입 합계 저장
    } catch (error) {
      console.error("수입 데이터를 가져오는 중 오류 발생", error);
    }
  };

  // 모달 열기 (지출)
  const showModal = () => {
    setIsModalVisible(true);
    filterTransactionsByMonth(allTransactions, selectedMonth); // 모달 열릴 때 현재 선택된 달 필터링
  };

  // 모달 닫기 (지출)
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // 모달 열기 (수입)
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
    filterIncomesByMonth(allIncomes, selectedMonth); // 모달 열릴 때 현재 선택된 달 필터링
  };

  // 모달 닫기 (수입)
  const handleIncomeModalCancel = () => {
    setIsIncomeModalVisible(false);
  };

  // 모든 지출 내역 가져오기
  const fetchAllTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/transactions/family",
        {
          params: { familyId: user.familyId },
        }
      );

      // console.log("모든 지출 내역:", response.data);

      // Ensure transactions exist in the response data
      const transactions = response.data[0]?.transactions || [];
      const loans = response.data[0]?.loans || [];
      const insurances = response.data[0]?.insurances || [];

      // Set transactions in state
      setAllTransactions(transactions);
      setAllLoans(loans);
      setAllInsurances(insurances);

      filterTransactionsByMonth(transactions, selectedMonth);

      // Calculate totals after filtering
      const loanTotalAmount = loans.reduce(
        (sum, loan) => sum + loan.loanMonthlyRepayment,
        0
      );
      const insuranceTotalAmount = insurances.reduce(
        (sum, insurance) => sum + insurance.insuranceMonthlyPayment,
        0
      );

      setLoanTotal(loanTotalAmount);
      setInsuranceTotal(insuranceTotalAmount);
    } catch (error) {
      console.error("지출 내역을 가져오는 중 오류 발생:", error);
    }
  };

  // 모든 수입 내역 가져오기
  const fetchAllIncomes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/transactions/income",
        {
          params: { familyId: user.familyId },
        }
      );
      setAllIncomes(response.data); // 서버에서 전체 수입 내역을 가져옴
      filterIncomesByMonth(response.data, selectedMonth); // 현재 선택된 달에 맞춰 필터링
    } catch (error) {
      console.error("수입 내역을 가져오는 중 오류 발생:", error);
    }
  };

  // 달별로 지출 내역 필터링
  const filterTransactionsByMonth = (transactions, month) => {
    if (!Array.isArray(transactions)) {
      return [];
    }
    const filtered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.transactionDate);
      return transactionDate.getMonth() + 1 === month; // 해당 달에 맞는 데이터 필터링
    });
    setFilteredTransactions(filtered);
  };

  // 달별로 대출 내역 필터링
  const filterLoansByMonth = (loans, month) => {
    const filtered = loans.filter((loan) => {
      const loanDate = new Date(loan.loanRepaymentDate);
      return loanDate.getMonth() + 1 === month; // 해당 달에 맞는 대출 데이터 필터링
    });
    setFilteredLoans(filtered);
  };

  // 달별로 보험 내역 필터링
  const filterInsurancesByMonth = (insurances, month) => {
    const filtered = insurances.filter((insurance) => {
      const insuranceDate = new Date(insurance.insurancePaymentDate);
      return insuranceDate.getMonth() + 1 === month; // 해당 달에 맞는 보험 데이터 필터링
    });
    setFilteredInsurances(filtered);
  };

  // 달별로 수입 내역 필터링
  const filterIncomesByMonth = (incomes, month) => {
    const filtered = incomes.filter((income) => {
      const transactionDate = new Date(income.transactionDate);
      return transactionDate.getMonth() + 1 === month; // 해당 달에 맞는 수입 데이터 필터링
    });
    setFilteredIncomes(filtered);
  };

  // 달 선택 핸들러
  const handleMonthChange = (value) => {
    setSelectedMonth(value); // 선택된 달 설정
    filterTransactionsByMonth(allTransactions, value); // 선택한 달에 맞춰 지출 필터링
    // filterLoansByMonth(allLoans, value); // 선택한 달에 맞춰 대출 필터링
    // filterInsurancesByMonth(allInsurances, value); // 선택한 달에 맞춰 보험 필터링
    filterIncomesByMonth(allIncomes, value); // 선택한 달에 맞춰 수입 필터링
  };

  const handleTableChange = (pagination) => {
    setCurrentPageExpenditure(pagination.current);
  };

  const handleLoanTableChange = (pagination) => {
    setCurrentPageLoan(pagination.current);
  };

  const handleInsuranceTableChange = (pagination) => {
    setCurrentPageInsurance(pagination.current);
  };

  const handleIncomeTableChange = (pagination) => {
    setCurrentPageIncome(pagination.current);
  };

  // 지출 테이블 컬럼 설정
  const expenditureColumns = [
    {
      title: "거래 ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "카드 번호",
      dataIndex: "cardNo",
      key: "cardNo",
    },
    {
      title: "거래 금액",
      dataIndex: "transactionAmount",
      key: "transactionAmount",
      render: (amount) => `${amount.toLocaleString()} 원`,
    },
    {
      title: "거래 일자",
      dataIndex: "transactionDate",
      key: "transactionDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "카테고리",
      dataIndex: "category",
      key: "category",
    },
  ];

  // 보험 납입 테이블 컬럼 설정
  const insuranceColumns = [
    {
      title: "보험 ID",
      dataIndex: "insuranceId",
      key: "insuranceId",
    },
    {
      title: "보험 종류",
      dataIndex: "insuranceType",
      key: "insuranceType",
    },
    {
      title: "보험 상품",
      dataIndex: "insuranceName",
      key: "insuranceName",
    },
    {
      title: "보험사",
      dataIndex: "insuranceCompany",
      key: "insuranceCompany",
    },
    {
      title: "납입 금액",
      dataIndex: "insuranceMonthlyPayment",
      key: "insuranceMonthlyPayment",
      render: (amount) => `${amount.toLocaleString()} 원`,
    },
    {
      title: "납입 일자",
      dataIndex: "insurancePaymentDate",
      key: "insurancePaymentDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  // 대출 테이블 컬럼 설정
  const loanColumns = [
    {
      title: "대출 ID",
      dataIndex: "loanId",
      key: "loanId",
    },
    {
      title: "대출 상품",
      dataIndex: "loanName",
      key: "loanName",
    },
    {
      title: "월 납입금",
      dataIndex: "loanMonthlyRepayment",
      key: "loanMonthlyRepayment",
      render: (amount) => `${amount.toLocaleString()} 원`,
    },
    {
      title: "대출 금액",
      dataIndex: "loanAmount",
      key: "loanAmount",
      render: (amount) => `${amount.toLocaleString()} 원`,
    },
    {
      title: "대출 만기일",
      dataIndex: "loanRepaymentDate",
      key: "loanRepaymentDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  // 수입 테이블 컬럼 설정
  const incomeColumns = [
    {
      title: "거래 번호",
      dataIndex: "transactionNo",
      key: "transactionNo",
    },
    {
      title: "계좌 번호",
      dataIndex: "accountNo",
      key: "accountNo",
    },
    {
      title: "수입 금액",
      dataIndex: "transactionAmount",
      key: "transactionAmount",
      render: (amount) => `${amount.toLocaleString()} 원`,
    },
    {
      title: "거래 일자",
      dataIndex: "transactionDate",
      key: "transactionDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "거래 내역",
      dataIndex: "accountNoTo",
      key: "accountNoTo",
    },
  ];

  useEffect(() => {
    // 페이지 로드 시 예산, 지출, 수입 합계를 가져옴
    fetchBudgetSum(selectedMonth);
    fetchAllTransactions();
    fetchCurrentMonthExpenses();
    fetchCurrentMonthIncome();
    fetchAllIncomes();
  }, []);

  return (
    <div
      className="joint-assets-income-expenditure-container"
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        padding: "20px",
        // marginLeft: "15px",
        // marginRight: "15px",
      }}
    >
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <h3 style={{ fontFamily: "CustomFont" }}>공동 가계부</h3>&nbsp;&nbsp;
        <h3 style={{ color: "#009178" }}>{nowMonth}월</h3>
      </div>
      <div>
        <div style={{ display: "flex", gap: "10px" }}>
          <h4>이번 달 예산까지</h4>
          <h4 style={{ color: "#009178", fontWeight: "bold" }}>
            {leftAmount.toLocaleString()}원
          </h4>
          <h4>남았어요 !</h4>
        </div>
        <div className="house-hold-account-progress-bar">
          <ProgressBar
            now={progress}
            label={`${Math.round(progress)}%`}
            style={{ height: "25px" }}
          >
            <div
              className="progress-bar"
              style={{
                width: `${progress}%`,
                backgroundColor: "#0fb895", // 바 색상 변경
                textAlign: "right",
                paddingRight: "15px",
              }}
            >
              {Math.round(progress)}%
            </div>
          </ProgressBar>

          <p
            style={{
              color: "gray",
              marginBottom: "15px",
              textAlign: "right",
            }}
          >
            이번 달 예산 : {budgetSum.toLocaleString()}원
          </p>
        </div>
      </div>
      <div style={{ display: "flex", gap: "20px" }}>
        <div
          className="joint-assets-income-container"
          style={{
            width: "50%",
            // backgroundColor: "#f5f5f5",
            borderRadius: "10px",
            padding: "20px",
            // textAlign: "center",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              borderRadius: "50%",
              width: "70px",
              height: "70px",
              //   padding: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              marginBottom: "20px",
              //   boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#ebfff7",
            }}
          >
            <img
              src={incomeimg}
              alt="income"
              style={{
                overflow: "hidden",
                width: "90%",
                height: "auto",
                objectFit: "cover",
              }}
            />
          </div>
          <p
            style={{
              fontSize: "20px",
              margin: "0",
              fontWeight: "500",
            }}
          >
            이번 달 수입
          </p>
          <div
            className="joint-assets-income-amount"
            style={{
              fontSize: "18px",
              fontWeight: "900",
              marginTop: "5px",
              color: "#000000",
            }}
          >
            {currentMonthIncome.toLocaleString() + " 원"}
          </div>
          {/* 수입 내역 보기 버튼 */}
          <Button
            type="primary"
            onClick={showIncomeModal}
            style={{ marginTop: "20px" }}
          >
            이번 달 수입 내역 보기
          </Button>
        </div>
        <div
          className="joint-assets-expenditure-container"
          style={{
            width: "50%",
            // backgroundColor: "#f5f5f5",
            borderRadius: "10px",
            padding: "20px",
            // textAlign: "center",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              borderRadius: "50%",
              width: "70px",
              height: "70px",
              //   padding: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              marginBottom: "20px",
              //   boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#ebfff7",
            }}
          >
            <img
              src={walletimg}
              alt="wallet"
              style={{
                overflow: "hidden",
                width: "80%",
                height: "auto",
                objectFit: "cover",
              }}
            />
          </div>
          <p
            style={{
              fontSize: "20px",
              margin: "0",
              fontWeight: "500",
            }}
          >
            이번 달 지출
          </p>
          <div
            className="joint-assets-expenditure-amount"
            style={{
              fontSize: "18px",
              fontWeight: "900",
              marginTop: "5px",
              color: "#000000",
            }}
          >
            {currentMonthExpenses.toLocaleString() + "원"}
          </div>
          {/* 지출 내역 보기 버튼 */}
          <Button
            type="primary"
            onClick={showModal}
            style={{ marginTop: "20px" }}
          >
            이번 달 지출 내역 보기
          </Button>
        </div>
      </div>
      {/* 지출 내역 모달 */}
      <Modal
        title="지출 내역"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        {/* 달 선택 */}
        <Select
          value={selectedMonth}
          onChange={handleMonthChange}
          style={{ width: 120, marginBottom: "20px" }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <Option key={i + 1} value={i + 1}>
              {i + 1}월
            </Option>
          ))}
        </Select>
        {/* 보험 내역 테이블 */}
        <p>보험 납입금 총합: {insuranceTotal.toLocaleString()} 원</p>
        <Table
          columns={insuranceColumns}
          dataSource={allInsurances}
          pagination={{
            current: currentPageInsurance,
            pageSize: itemsPerPage,
            total: allInsurances.length,
          }}
          onChange={handleInsuranceTableChange}
        />
        {/* 대출 내역 테이블 */}
        <p>대출 월 납입금 총합: {loanTotal.toLocaleString()} 원</p>
        <Table
          columns={loanColumns}
          dataSource={allLoans}
          pagination={{
            current: currentPage,
            pageSize: itemsPerPage,
            total: allLoans.length,
          }}
          onChange={handleLoanTableChange}
        />

        {/* 지출 내역 테이블 */}
        <Table
          columns={expenditureColumns}
          dataSource={filteredTransactions}
          pagination={{
            current: currentPage,
            pageSize: itemsPerPage,
            total: filteredTransactions.length,
          }}
          onChange={handleTableChange}
        />
      </Modal>

      {/* 수입 내역 모달 */}
      <Modal
        title="수입 내역"
        visible={isIncomeModalVisible}
        onCancel={handleIncomeModalCancel}
        footer={null}
        width={800}
      >
        {/* 달 선택 */}
        <Select
          value={selectedMonth}
          onChange={handleMonthChange}
          style={{ width: 120, marginBottom: "20px" }}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <Option key={i + 1} value={i + 1}>
              {i + 1}월
            </Option>
          ))}
        </Select>

        {/* 수입 내역 테이블 */}
        <Table
          columns={incomeColumns}
          dataSource={filteredIncomes}
          pagination={{
            current: currentPage,
            pageSize: itemsPerPage,
            total: filteredIncomes.length,
          }}
          onChange={handleIncomeTableChange}
        />
      </Modal>
    </div>
  );
}

export default HouseHoldAccount;
