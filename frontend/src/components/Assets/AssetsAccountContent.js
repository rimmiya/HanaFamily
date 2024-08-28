import React, { useState } from "react";
import Modal from "react-modal"; // react-modal import
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosArrowForward,
} from "react-icons/io"; // react-icons에서 아이콘 임포트
import AccountRaderChart from "./Charts/AccountRaderChart";
import { ProgressBar } from "react-bootstrap"; // react-bootstrap의 ProgressBar 임포트
import "../../style/AssetsAccountContent.css";
import CustomProgressBar from "./Charts/CustomProgressBar";
import { Swiper, SwiperSlide } from "swiper/react"; // Swiper와 SwiperSlide를 import
import "swiper/swiper-bundle.css"; // Swiper 스타일 import
// import { CSSTransition, TransitionGroup } from "react-transition-group";

const hanalogo = `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`;
const data = [
  {
    category: "입출금",
    accounts: [
      {
        type: "저축예금",
        accountNumber: "443-910729-39307",
        amount: 360580,
        image: { hanalogo }, // 이미지 경로
      },
    ],
  },
  {
    category: "예적금",
    accounts: [
      {
        type: "하나 청년도약계좌",
        accountNumber: "",
        amount: 12600000,
        interestRate: "4.70%",
        maturityDate: "2029.02.26",
        image: "/images/saving.png", // 이미지 경로
      },
      {
        type: "하나 청년도약플러스 적금",
        accountNumber: "",
        amount: 2000000,
        interestRate: "4.00%",
        maturityDate: "2025.04.28 (D-254)",
        image: "/images/saving2.png", // 다른 이미지 경로
      },
    ],
  },
];

// 모달 스타일 설정
const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    borderRadius: "10px",
  },
};

// 레이더 차트 데이터
const radarData = [
  { subject: "입출금", value: 85 },
  { subject: "증권", value: 65 },
  { subject: "예적금", value: 90 },
  { subject: "페이/포인트", value: 75 },
  { subject: "기타", value: 60 },
];

const savingsProducts = [
  {
    type: "적금",
    products: [
      {
        name: "급여 하나 월복리 적금",
        rate: "3.35% ~ 5.65%",
        term: "1년",
        rank: 1,
        icon: { hanalogo },
      },
      {
        name: "하나 청년도약계좌",
        rate: "4.50% ~ 6.00%",
        term: "1년",
        rank: 2,
        icon: { hanalogo },
      },
      {
        name: "청년 주택드림 청약통장",
        rate: "2.50% ~ 4.20%",
        term: "1년",
        rank: 3,
        icon: { hanalogo },
      },
    ],
  },
];

const depositProducts = [
  {
    type: "예금",
    products: [
      {
        name: "하나 원큐 정기예금",
        rate: "2.00% ~ 3.00%",
        term: "1년",
        rank: 1,
        icon: { hanalogo },
      },
      {
        name: "하나 정기예금",
        rate: "1.80% ~ 2.80%",
        term: "1년",
        rank: 2,
        icon: { hanalogo },
      },
      {
        name: "하나 e-정기예금",
        rate: "2.10% ~ 3.10%",
        term: "1년",
        rank: 3,
        icon: { hanalogo },
      },
    ],
  },
];

function AssetsAccountContent() {
  const [isHidden, setIsHidden] = useState(false);
  const [isExpandedDeposit, setIsExpandedDeposit] = useState(true);
  const [isExpandedSavings, setIsExpandedSavings] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [targetModalIsOpen, setTargetModalIsOpen] = useState(false);
  const [targetAccounts, setTargetAccounts] = useState([]);

  const [newAccount, setNewAccount] = useState("");
  const [newName, setNewName] = useState("");
  const [newPeriod, setNewPeriod] = useState("");
  const [newGoalAmount, setNewGoalAmount] = useState("");

  const [activeTab, setActiveTab] = useState(0); // Initialize with 0 for "적금"
  const [swiperInstance, setSwiperInstance] = useState(null);

  const toggleAmount = () => {
    setIsHidden(!isHidden);
  };

  const toggleExpandedDeposit = () => {
    setIsExpandedDeposit(!isExpandedDeposit);
  };

  const toggleExpandedSavings = () => {
    setIsExpandedSavings(!isExpandedSavings);
  };

  const openModal = (account) => {
    setSelectedAccount(account);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedAccount(null);
  };

  const openTargetModal = () => {
    setTargetModalIsOpen(true);
  };

  const closeTargetModal = () => {
    setTargetModalIsOpen(false);
    setNewAccount("");
    setNewName("");
    setNewPeriod("");
    setNewGoalAmount("");
  };

  const addTargetAccount = () => {
    const accountData = data
      .flatMap((category) => category.accounts)
      .find((account) => account.type === newAccount);

    if (accountData) {
      const targetAccount = {
        account: newAccount,
        name: newName,
        period: newPeriod,
        goalAmount: parseInt(newGoalAmount, 10),
        currentAmount: accountData.amount,
      };
      setTargetAccounts([...targetAccounts, targetAccount]);
      closeTargetModal();
    }
  };

  const calculateProgress = (currentAmount, goalAmount) => {
    return (currentAmount / goalAmount) * 100;
  };

  const calculateDDay = (period) => {
    const endDate = new Date(period);
    const today = new Date();
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? diffDays : 0;
  };

  const calculateTotalAmount = (category) => {
    const categoryData = data.find((item) => item.category === category);
    if (categoryData) {
      return categoryData.accounts.reduce(
        (total, account) => total + account.amount,
        0
      );
    }
    return 0;
  };

  const findMaxCategory = () => {
    const maxData = radarData.reduce((prev, current) =>
      prev.value > current.value ? prev : current
    );
    return maxData.subject;
  };

  const handleSlideChange = (swiper) => {
    setActiveTab(swiper.activeIndex);
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (swiperInstance) swiperInstance.slideTo(index); // Slide to the selected tab
  };

  return (
    <div className="assets-account-container">
      <div className="assets-account-content">
        <div className="assets-account-left">
          <div className="total-account-container">
            <div style={{ display: "flex", alignItems: "center" }}>
              <h2 style={{ paddingRight: "10px", width: "150px" }}>
                총 계좌 금액
              </h2>
              <button onClick={toggleAmount} className="toggle-amount-btn">
                {isHidden ? "보이기" : "숨기기"}
              </button>
            </div>
            <h1>
              {isHidden
                ? "???"
                : `${(
                    calculateTotalAmount("입출금") +
                    calculateTotalAmount("예적금")
                  ).toLocaleString()}원`}
            </h1>
          </div>

          <div className="account-section">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={toggleExpandedDeposit}
            >
              <h4 style={{ fontWeight: "600" }}>
                입출금{" "}
                <span style={{ fontWeight: "bold", color: "#00978d" }}>
                  {
                    data.find((item) => item.category === "입출금").accounts
                      .length
                  }
                </span>
              </h4>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {calculateTotalAmount("입출금").toLocaleString()}원
                </p>
                <span style={{ paddingLeft: "10px" }}>
                  {isExpandedDeposit ? (
                    <IoIosArrowUp size={20} />
                  ) : (
                    <IoIosArrowDown size={20} />
                  )}
                </span>
              </div>
            </div>

            {isExpandedDeposit && (
              <div className="account-card">
                {data
                  .find((item) => item.category === "입출금")
                  .accounts.map((account, index) => (
                    <div key={index} className="account-details-row">
                      <div
                        className="account-detail-item"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{ display: "flex", alignItems: "flex-start" }}
                        >
                          <img
                            src={hanalogo}
                            alt={account.type}
                            style={{ width: "30px", height: "30px" }}
                          />
                          <div style={{ marginLeft: "15px" }}>
                            <p style={{ fontWeight: "600" }}>{account.type}</p>
                            {account.accountNumber && (
                              <p
                                style={{
                                  color: "gray",
                                  paddingBottom: "5px",
                                  paddingTop: "5px",
                                }}
                              >
                                {account.accountNumber}
                              </p>
                            )}
                            <p style={{ fontWeight: "600" }}>
                              {account.amount.toLocaleString()}원
                            </p>
                          </div>
                        </div>
                        <IoIosArrowForward
                          size={20}
                          onClick={() => openModal(account)}
                          style={{
                            cursor: "pointer",
                            color: "#00978d",
                            marginLeft: "auto",
                          }}
                        />
                      </div>
                      {index <
                        data.find((item) => item.category === "입출금").accounts
                          .length -
                          1 && (
                        <hr
                          style={{
                            borderColor: "#e0e0e0",
                            margin: "10px 0",
                            border: "0.7px solid",
                          }}
                        />
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="account-section">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={toggleExpandedSavings}
            >
              <h4 style={{ fontWeight: "600" }}>
                예적금{" "}
                <span style={{ fontWeight: "bold", color: "#00978d" }}>
                  {
                    data.find((item) => item.category === "예적금").accounts
                      .length
                  }
                </span>
              </h4>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {calculateTotalAmount("예적금").toLocaleString()}원
                </p>
                <span style={{ paddingLeft: "10px" }}>
                  {isExpandedSavings ? (
                    <IoIosArrowUp size={20} />
                  ) : (
                    <IoIosArrowDown size={20} />
                  )}
                </span>
              </div>
            </div>

            {isExpandedSavings && (
              <div className="account-card">
                {data
                  .find((item) => item.category === "예적금")
                  .accounts.map((account, index) => (
                    <div key={index} className="account-details-row">
                      <div
                        className="account-detail-item"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{ display: "flex", alignItems: "flex-start" }}
                        >
                          <img
                            src={account.image}
                            alt={account.type}
                            style={{ width: "30px", height: "30px" }}
                          />
                          <div style={{ marginLeft: "15px" }}>
                            <p
                              style={{ fontWeight: "600", marginBottom: "5px" }}
                            >
                              {account.type}
                            </p>
                            <p
                              style={{ fontWeight: "600", marginBottom: "5px" }}
                            >
                              {account.amount.toLocaleString()}원
                            </p>
                            {account.interestRate && (
                              <p
                                style={{
                                  fontSize: "15px",
                                  color: "#26b3b0",
                                  fontWeight: "600",
                                }}
                              >
                                이자율 {account.interestRate}
                              </p>
                            )}
                            {account.maturityDate && (
                              <p
                                style={{
                                  fontSize: "15px",
                                  color: "#879deb",
                                  fontWeight: "600",
                                }}
                              >
                                만기일 {account.maturityDate}
                              </p>
                            )}
                          </div>
                        </div>
                        <IoIosArrowForward
                          size={20}
                          onClick={() => openModal(account)}
                          style={{
                            cursor: "pointer",
                            color: "#00978d",
                            marginLeft: "auto",
                          }}
                        />
                      </div>
                      {index <
                        data.find((item) => item.category === "예적금").accounts
                          .length -
                          1 && (
                        <hr
                          style={{
                            borderColor: "#e0e0e0",
                            margin: "10px 0",
                            border: "0.7px solid",
                          }}
                        />
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={modalStyles}
          contentLabel="Account Details Modal"
        >
          {selectedAccount && (
            <div>
              <h2>{selectedAccount.type}</h2>
              <p>{selectedAccount.amount.toLocaleString()}원</p>
              {selectedAccount.interestRate && (
                <p>이자율: {selectedAccount.interestRate}</p>
              )}
              {selectedAccount.maturityDate && (
                <p>만기일: {selectedAccount.maturityDate}</p>
              )}
              <button onClick={closeModal}>닫기</button>
            </div>
          )}
        </Modal>

        <Modal
          isOpen={targetModalIsOpen}
          onRequestClose={closeTargetModal}
          style={modalStyles}
          contentLabel="Target Account Modal"
        >
          <h2>목표 계좌 추가</h2>
          <div>
            <label>계좌 유형:</label>
            <select
              value={newAccount}
              onChange={(e) => setNewAccount(e.target.value)}
            >
              <option value="">선택하세요</option>
              {data
                .flatMap((category) => category.accounts)
                .map((account, index) => (
                  <option key={index} value={account.type}>
                    {account.type}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label>이름:</label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div>
            <label>목표 기간:</label>
            <input
              type="date"
              value={newPeriod}
              onChange={(e) => setNewPeriod(e.target.value)}
            />
          </div>
          <div>
            <label>목표 금액:</label>
            <input
              type="number"
              value={newGoalAmount}
              onChange={(e) => setNewGoalAmount(e.target.value)}
            />
          </div>
          <button onClick={addTargetAccount}>추가</button>
          <button onClick={closeTargetModal}>취소</button>
        </Modal>

        <div className="assets-account-right">
          <h4 style={{ fontWeight: "600", marginBottom: "20px" }}>계좌 분포</h4>
          <div className="radar-chart-container">
            <div
              style={{
                marginTop: "20px",
                paddingTop: "20px",
                paddingLeft: "20px",
              }}
            >
              <p style={{ fontSize: "20px", fontWeight: "600" }}>
                {findMaxCategory()} 계좌가 가장 많아요 !
              </p>
            </div>
            <AccountRaderChart />
          </div>

          <div className="target-account-container">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <h4 style={{ fontWeight: "600" }}>목표 금액 모으기</h4>
              <button onClick={openTargetModal}>목표 추가하기</button>
            </div>
            <div className="target-account-content">
              {targetAccounts.map((target, index) => (
                <div key={index} className="target-account-item">
                  <h4>{target.name}</h4>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <p style={{ fontWeight: "600" }}>
                        {target.currentAmount.toLocaleString()}원
                      </p>
                      <p style={{ color: "gray" }}>
                        &nbsp;/ {target.goalAmount.toLocaleString()}원
                      </p>
                    </div>
                    <p>
                      ~{target.period}(D-{calculateDDay(target.period)})
                    </p>
                  </div>
                  <CustomProgressBar {...target} />
                </div>
              ))}
            </div>
          </div>

          <div className="popular-financial-products">
            <h4 style={{ fontWeight: "600" }}>또래 인기 금융상품</h4>
            <div
              style={{
                width: "90%",
                marginRight: "auto",
                marginLeft: "auto",
                marginTop: "20px",
              }}
            >
              <div className="financial-product-tabs">
                <button
                  className={`tab-button ${activeTab === 0 ? "active" : ""}`}
                  onClick={() => handleTabClick(0)}
                >
                  적금
                </button>
                <button
                  className={`tab-button ${activeTab === 1 ? "active" : ""}`}
                  onClick={() => handleTabClick(1)}
                >
                  예금
                </button>
              </div>
              <Swiper
                onSwiper={setSwiperInstance}
                onSlideChange={handleSlideChange}
                initialSlide={activeTab}
              >
                <SwiperSlide>
                  <div className="financial-products-list">
                    {savingsProducts[0].products.map((product) => (
                      <div
                        key={product.rank}
                        className="financial-product-item"
                      >
                        <div className="product-rank">{product.rank}</div>
                        <img
                          // src={product.icon}
                          src={hanalogo}
                          alt="product icon"
                          className="product-icon"
                        />
                        <div className="product-details">
                          <p className="product-name">{product.name}</p>
                          <div style={{ display: "flex" }}>
                            <p className="product-rate">{product.rate} </p>
                            <p className="product-term">
                              &nbsp; 연(세전, {product.term})
                            </p>
                          </div>
                        </div>
                        <IoIosArrowForward
                          size={20}
                          className="product-arrow"
                        />
                      </div>
                    ))}
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="financial-products-list">
                    {depositProducts[0].products.map((product) => (
                      <div
                        key={product.rank}
                        className="financial-product-item"
                      >
                        <div className="product-rank">{product.rank}</div>
                        <img
                          // src={product.icon}
                          src={hanalogo}
                          alt="product icon"
                          className="product-icon"
                        />
                        <div className="product-details">
                          <p className="product-name">{product.name}</p>
                          <div style={{ display: "flex" }}>
                            <p className="product-rate">{product.rate}</p>
                            &nbsp;
                            <p className="product-term">({product.term})</p>
                          </div>
                        </div>
                        <IoIosArrowForward
                          size={20}
                          className="product-arrow"
                        />
                      </div>
                    ))}
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssetsAccountContent;