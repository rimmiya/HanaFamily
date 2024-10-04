import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { useSelector } from "react-redux";
import BucketListAccount from "../JointAssets/BucketListAccount";
import { Table, Select } from "antd";

const { Option } = Select;

const hanalogo = `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`;

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // 현재 달 설정
  const [transactions, setTransactions] = useState([]); // 모든 거래 내역
  const [filteredTransactions, setFilteredTransactions] = useState([]); // 필터링된 거래 내역
  const [data, setData] = useState([]); // 서버에서 불러온 데이터를 저장할 상태
  const [totalAssets, setTotalAssets] = useState(0); // 총 자산
  const user = useSelector((state) => state.user.userInfo); // Redux에서 사용자 정보 가져오기

  const [radarData, setRadarData] = useState([]);
  const [activeTab, setActiveTab] = useState(0); // Initialize active tab state
  const [swiperInstance, setSwiperInstance] = useState(null); // Store Swiper instance

  // Function to handle tab clicks
  const handleTabClick = (index) => {
    setActiveTab(index); // Update the active tab index
    if (swiperInstance) {
      swiperInstance.slideTo(index); // Slide to the corresponding Swiper slide
    }
  };

  useEffect(() => {
    fetchAccountData(); // 컴포넌트 마운트 시 계좌 데이터 불러오기
  }, []);

  const handleSlideChange = (swiper) => {
    setActiveTab(swiper.activeIndex); // Update active tab when slide changes
  };

  const fetchAccountData = async () => {
    try {
      if (!user.familyId) {
        // familyId가 없을 때 개인 자산 API 호출
        const totalResponse = await axios.get(
          "http://localhost:8080/api/family/no-members",
          {
            params: { userNo: user.userNo },
          }
        );
        const responseList = await axios.get(
          "http://localhost:8080/api/savings/account/personal-list",
          {
            params: { userNo: user.userNo },
          }
        );
        setTotalAssets(totalResponse.data);
        processAccountData(responseList.data); // 받은 데이터를 처리
      } else {
        // familyId가 있을 때 가족 자산 API 호출
        const totalResponse = await axios.get(
          "http://localhost:8080/api/family/account-balance",
          {
            params: { familyId: user.familyId },
          }
        );
        const responseList = await axios.get(
          "http://localhost:8080/api/savings/account/family-list",
          {
            params: { familyId: user.familyId },
          }
        );
        setTotalAssets(totalResponse.data);
        processAccountData(responseList.data); // 받은 데이터를 처리
      }
      console.log("총 자산:", totalAssets);
    } catch (error) {
      console.error("자산 데이터를 불러오는 중 오류 발생:", error);
    }
  };

  const processAccountData = (responseList) => {
    const categorizedData = [
      {
        category: "입출금",
        accounts: responseList.filter((account) => account.accountType === 3),
      },
      {
        category: "적금",
        accounts: responseList.filter((account) => account.accountType === 1),
      },
      {
        category: "예금",
        accounts: responseList.filter((account) => account.accountType === 2),
      },
    ];

    const radarChartData = [
      {
        subject: "입출금",
        value: calculateTotalAmountFromList(responseList, "입출금"),
      },
      {
        subject: "예금",
        value: calculateTotalAmountFromList(responseList, "예금"),
      },
      {
        subject: "적금",
        value: calculateTotalAmountFromList(responseList, "적금"),
      },
    ];

    setRadarData(radarChartData); // 레이더 차트 데이터 설정
    setData(categorizedData); // 카테고리 데이터 설정
  };

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
    fetchAccountTransactions(account.accountNo); // 계좌 거래 내역 호출
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedAccount(null);
  };

  const calculateTotalAmount = (category) => {
    const categoryData = data.find((item) => item.category === category);
    if (categoryData) {
      return categoryData.accounts.reduce(
        (total, account) => total + account.accountBalance,
        0
      );
    }
    return 0;
  };

  const calculateTotalAmountFromList = (responseList, category) => {
    const categoryType =
      category === "입출금" ? 3 : category === "적금" ? 1 : 2;
    const categoryData = responseList.filter(
      (account) => account.accountType === categoryType
    );
    if (categoryData.length > 0) {
      return categoryData.reduce(
        (total, account) => total + (account.accountBalance || 0),
        0
      );
    }
    return 0;
  };

  const findMaxCategory = () => {
    if (radarData.length === 0) return "";

    const maxData = radarData.reduce((prev, current) =>
      prev.value > current.value ? prev : current
    );
    return maxData.subject;
  };

  const handleMonthChange = (value) => {
    setSelectedMonth(value);
    filterTransactionsByMonth(transactions, value); // 달 변경 시 필터링
  };

  const fetchAccountTransactions = async (accountNo) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/transactions/by-account-no`,
        {
          params: { accountNo: accountNo }, // accountNo 전달
        }
      );
      setTransactions(response.data); // 전체 거래 내역 저장
      filterTransactionsByMonth(response.data, selectedMonth); // 선택된 달에 맞춰 필터링
    } catch (error) {
      console.error("거래 내역을 불러오는 중 오류 발생:", error);
    }
  };

  const filterTransactionsByMonth = (transactions, month) => {
    const filtered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.transactionDate);
      return transactionDate.getMonth() + 1 === month; // 선택한 달에 맞는 거래 필터링
    });
    setFilteredTransactions(filtered);
  };

  const columns = [
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
      title: "거래 내역",
      dataIndex: "transactionDetail",
      key: "transactionDetail",
    },
  ];

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
            <h1>{isHidden ? "???" : `${totalAssets.toLocaleString()}원`}</h1>
          </div>

          {/* 입출금 카테고리 */}
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
                  {data.find((item) => item.category === "입출금")?.accounts
                    .length || 0}
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
                  ?.accounts.map((account, index) => (
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
                            <p style={{ fontWeight: "600" }}>
                              {account.accountName}
                            </p>
                            {account.accountNo && (
                              <p
                                style={{
                                  color: "gray",
                                  paddingBottom: "5px",
                                  paddingTop: "5px",
                                }}
                              >
                                {account.accountNo}
                              </p>
                            )}
                            <p style={{ fontWeight: "600" }}>
                              {account.userName}
                            </p>
                            <p style={{ fontWeight: "600" }}>
                              {account.accountBalance.toLocaleString()}원
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
                        data.find((item) => item.category === "입출금")
                          ?.accounts.length -
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

          {/* 예적금 카테고리 */}
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
                적금{" "}
                <span style={{ fontWeight: "bold", color: "#00978d" }}>
                  {data.find((item) => item.category === "적금")?.accounts
                    .length || 0}
                </span>
              </h4>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {calculateTotalAmount("적금").toLocaleString()}원
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
                  .find((item) => item.category === "적금")
                  ?.accounts.map((account, index) => (
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
                            src={account.image || hanalogo}
                            alt={account.type}
                            style={{ width: "30px", height: "30px" }}
                          />
                          <div style={{ marginLeft: "15px" }}>
                            <p
                              style={{ fontWeight: "600", marginBottom: "5px" }}
                            >
                              {account.accountName}
                            </p>
                            <p
                              style={{ fontWeight: "600", marginBottom: "5px" }}
                            >
                              {account.accountNo}
                            </p>
                            <p
                              style={{ fontWeight: "600", marginBottom: "5px" }}
                            >
                              {account.accountBalance.toLocaleString()}원
                            </p>
                            <p style={{ fontWeight: "600" }}>
                              {account.userName}
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
                        data.find((item) => item.category === "적금")?.accounts
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

            {/* 예적금 카테고리 */}
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
                  예금{" "}
                  <span style={{ fontWeight: "bold", color: "#00978d" }}>
                    {data.find((item) => item.category === "예금")?.accounts
                      .length || 0}
                  </span>
                </h4>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                    {calculateTotalAmount("예금").toLocaleString()}원
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
                    .find((item) => item.category === "예금")
                    ?.accounts.map((account, index) => (
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
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                            }}
                          >
                            <img
                              src={account.image || hanalogo}
                              alt={account.type}
                              style={{ width: "30px", height: "30px" }}
                            />
                            <div style={{ marginLeft: "15px" }}>
                              <p
                                style={{
                                  fontWeight: "600",
                                  marginBottom: "5px",
                                }}
                              >
                                {account.type}
                              </p>
                              <p
                                style={{
                                  fontWeight: "600",
                                  marginBottom: "5px",
                                }}
                              >
                                {account.accountBalance.toLocaleString()}원
                              </p>
                              <p style={{ fontWeight: "600" }}>
                                {account.userName}
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
                          data.find((item) => item.category === "예금")
                            ?.accounts.length -
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
        </div>

        {/* 거래 내역 모달 */}
        <Modal
          isOpen={isModalVisible}
          onRequestClose={closeModal}
          style={modalStyles}
          contentLabel="Account Details Modal"
        >
          {selectedAccount && (
            <div>
              <h2>{selectedAccount.type}</h2>
              <p>{selectedAccount.accountBalance.toLocaleString()}원</p>
              {selectedAccount.interestRate && (
                <p>이자율: {selectedAccount.interestRate}</p>
              )}
              {selectedAccount.maturityDate && (
                <p>만기일: {selectedAccount.maturityDate}</p>
              )}

              {/* 월 선택기 */}
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

              {/* 거래 내역 테이블 */}
              <Table
                columns={columns}
                dataSource={filteredTransactions}
                pagination={false} // 페이징 없음
              />

              <button onClick={closeModal}>닫기</button>
            </div>
          )}
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
            <AccountRaderChart radarData={radarData} />
          </div>

          <BucketListAccount />

          <div className="popular-financial-products">
            <h4 style={{ fontWeight: "600" }}>인기 금융상품</h4>
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
