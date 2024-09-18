import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // 전달받은 계좌 정보를 가져오기 위해 추가
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import axios from "axios"; // API 호출을 위한 axios
import AnimatedProgressProvider from "./Charts/AnimatedProgressProvider";
import "react-circular-progressbar/dist/styles.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Table, Modal, Button, Form, Select, Input } from "antd";
import { easeQuadInOut } from "d3-ease";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const { Option } = Select;

function TogetherAccountSettingContent() {
  const location = useLocation(); // 전달된 계좌 정보를 가져옴
  const account = location.state?.account || {}; // 전달된 계좌 정보가 없을 때 빈 객체 사용
  const [userAccountNo, setUserAccountNo] = useState(""); // 로그인된 유저의 계좌번호

  const [participationDetails, setParticipationDetails] = useState([]); // 가족 납입 현황
  const [transactionHistory, setTransactionHistory] = useState([]); // 거래 내역
  const [monthlyTotalDeposit, setMonthlyTotalDeposit] = useState(0); // 이번 달 총 납입 금액
  const [isModalVisible, setIsModalVisible] = useState(false); // 납입 정보 변경 모달 상태 관리
  const [isAddDepositModalVisible, setIsAddDepositModalVisible] =
    useState(false); // 추가 납입 모달 상태 관리
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false); // 정보 확인 모달 상태 관리
  const [form] = Form.useForm();
  const [addDepositForm] = Form.useForm();
  const [confirmData, setConfirmData] = useState({});
  const [userNames, setUserNames] = useState({}); // userNo와 userName 매핑 객체
  const colors = ["#3e98c7", "#ffa500", "#00bc9c", "#ff6347"]; // 가족 구성원 색상
  // 최대 납입금액은 100만원으로 고정
  const maxDepositAmount = 1000000;

  const user = useSelector((state) => state.user.userInfo);
  const loggedInUserId = user?.userNo; // 로그인된 유저의 userNo

  useEffect(() => {
    // 계좌 정보 갱신
    const updateAccount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/savings/saving-product",
          { params: { savingAccountNo: account.savingAccountNo } }
        );
        const updatedAccount = response.data;
        location.state.account.currentAmount = updatedAccount.currentAmount;
      } catch (error) {
        console.error("계좌 정보를 가져오는 중 오류 발생:", error);
      }
    };

    // 가족 납입 현황 API 호출
    const fetchParticipationDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/savings/participation-details",
          { params: { savingAccountNo: account.savingAccountNo } }
        );
        const participationDetails = response.data;
        console.log("가족 납입 현황:", participationDetails);
        setParticipationDetails(participationDetails);

        // 로그인된 유저의 계좌번호를 찾음
        const userDetails = participationDetails.find(
          (member) => member.userId === loggedInUserId
        );
        if (userDetails) {
          setUserAccountNo(userDetails.userAccountNo);
        }

        // API를 통해 사용자 정보를 가져와서 userNo에 맞게 이름을 저장
        if (participationDetails.length > 0) {
          const userNos = participationDetails.map((member) => member.userId);
          console.log("userNos:", userNos); // [1, 2, 3]
          // participationDetails가 설정된 후에만 userNames를 가져옴
          const userNamesResponse = await axios.post(
            "http://localhost:8080/api/user/get-user-names",
            { userNos }
          );
          setUserNames(userNamesResponse.data); // [{ userNo: 1, userName: 'John' }, { userNo: 2, userName: 'Jane' }]
        }
      } catch (error) {
        console.error("가족 납입 현황을 가져오는 중 오류 발생:", error);
      }
    };

    // 거래 내역 API 호출
    const fetchTransactionHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/savings/transactions",
          { params: { savingAccountNo: account.savingAccountNo } }
        );
        setTransactionHistory(response.data);
      } catch (error) {
        console.error("거래 내역을 가져오는 중 오류 발생:", error);
      }
    };

    updateAccount();
    fetchParticipationDetails();
    fetchTransactionHistory();
  }, [account.savingAccountNo]);

  console.log("userNames:", userNames);
  console.log("memberDetails:", participationDetails);

  // 현재 월의 거래 내역을 필터링
  const getCurrentMonthTransactions = () => {
    const now = new Date();
    const currentMonth = now.getMonth(); // 현재 달 (0부터 시작)
    const currentYear = now.getFullYear(); // 현재 연도

    return transactionHistory.filter((transaction) => {
      const transactionDate = new Date(transaction.transactionDate);
      return (
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      );
    });
  };

  // 이번 달 각 가족의 총 납입금 계산
  const familyDepositsThisMonth = participationDetails.map((member) => {
    const memberTransactions = getCurrentMonthTransactions().filter(
      (transaction) => transaction.userNo === member.userId
    );

    const totalDeposit = memberTransactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );

    return {
      userId: member.userId,
      totalDeposit,
      autoTransferAmount: member.autoTransferAmount, // 월 납입금
      autoTransferDate: member.autoTransferDate, // 자동이체일
    };
  });

  // 이번 달 가족 구성원이 납입한 금액의 합계 계산
  const totalFamilyDepositThisMonth = familyDepositsThisMonth.reduce(
    (acc, member) => acc + member.totalDeposit,
    0
  );

  const transactionColumns = [
    {
      title: "거래 날짜",
      dataIndex: "transactionDate",
      key: "transactionDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "거래자", // 새로운 열 추가
      dataIndex: "userNo",
      key: "userNo",
      render: (userNo) => userNames[userNo - 1]?.userName || "알 수 없음", // userNo로 이름을 매핑
    },
    {
      title: "거래 내용",
      dataIndex: "transactionType",
      key: "transactionType",
    },
    {
      title: "금액",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `${amount.toLocaleString()}원`,
    },
    {
      title: "거래 후 잔액",
      dataIndex: "afterAmount",
      key: "afterAmount",
      render: (afterAmount) => `${afterAmount.toLocaleString()}원`,
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showAddDepositModal = () => {
    setIsAddDepositModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddDepositCancel = () => {
    setIsAddDepositModalVisible(false);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Updated Values:", values);
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleAddDepositSubmit = () => {
    addDepositForm
      .validateFields()
      .then((values) => {
        setConfirmData(values); // 사용자가 입력한 값을 저장
        setIsAddDepositModalVisible(false); // 추가 납입 모달을 닫고
        setIsConfirmModalVisible(true); // 정보 확인 모달을 열기
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleConfirmOk = async () => {
    try {
      // Confirmed Data에서 필요한 정보 가져오기
      const depositData = {
        savingAccountNo: account.savingAccountNo, // 계좌 번호
        userNo: loggedInUserId, // 로그인된 사용자 ID
        amount: confirmData.additionalAmount, // 추가 납입 금액
      };

      // 백엔드로 POST 요청 전송
      const response = await axios.post(
        "http://localhost:8080/api/savings/deposit", // 백엔드에 연결할 API 엔드포인트
        depositData
      );

      console.log("추가 납입 완료");

      // 추가 납입 후, 갱신된 계좌 정보를 다시 가져와서 상태 업데이트
      const updatedAccountResponse = await axios.get(
        "http://localhost:8080/api/savings/saving-product",
        { params: { savingAccountNo: account.savingAccountNo } }
      );
      const updatedAccount = updatedAccountResponse.data;

      // account 상태 업데이트
      location.state.account.currentAmount = updatedAccount.currentAmount;

      // 모달 닫기 및 후처리
      setIsConfirmModalVisible(false);
    } catch (error) {
      console.error("추가 납입 중 오류 발생:", error);
    }
  };

  const calculateDDay = (period) => {
    const endDate = new Date(period);
    const today = new Date();
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? diffDays : 0;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div style={styles.container}>
      {/* Progress Bar Section */}
      <div style={styles.ContentContainer}>
        <div style={styles.row1}>
          <h2>{account.accountName}</h2> {/* 계좌 이름 표시 */}
          <div style={{ display: "flex", padding: "20px" }}>
            <div style={{ width: "50%", margin: "0" }}>
              <AnimatedProgressProvider
                valueStart={0}
                valueEnd={(account.currentAmount / account.goalAmount) * 100}
                duration={1.4}
                easingFunction={easeQuadInOut}
              >
                {(value) => {
                  const roundedValue = Math.round(value);
                  return (
                    <>
                      {/* SVG 그라데이션 정의 */}
                      <svg style={{ height: 0 }}>
                        <defs>
                          <linearGradient
                            id="gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                          >
                            <stop offset="0%" stopColor="#31b5cd" />
                            <stop offset="50%" stopColor="#5dafeb" />
                            <stop offset="100%" stopColor="#00bc9c" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <CircularProgressbarWithChildren
                        value={value}
                        styles={buildStyles({
                          pathTransition: "none",
                          pathColor: `url(#gradient)`,
                          trailColor: "#d6d6d6",
                          textColor: "#3e98c7",
                        })}
                      >
                        <div style={styles.textContainer}>
                          <div style={styles.usageText}>목표 금액</div>
                          <strong style={styles.percentageText}>
                            {roundedValue.toFixed(2)}%
                          </strong>
                        </div>
                      </CircularProgressbarWithChildren>
                    </>
                  );
                }}
              </AnimatedProgressProvider>
            </div>
            <div
              style={{
                width: "50%",
                margin: "0",
                textAlign: "right",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                모은 금액
                <span
                  style={{
                    color: "#3e98c7",
                    fontSize: "30px",
                    fontWeight: "bold",
                  }}
                >
                  {account.currentAmount.toLocaleString()}원
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                목표 금액
                <span
                  style={{
                    color: "#3e98c7",
                    fontSize: "30px",
                    fontWeight: "bold",
                  }}
                >
                  {account.goalAmount.toLocaleString()}원
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                적금 만기기한
                <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                  ~{new Date(account.endDate).toLocaleDateString()}(D-
                  {calculateDDay(account.endDate)})
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                만기시 입금 계좌
                <span>{account.representativeAccountNo}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 가족 납입 현황 (Stacked Progressbar) */}
        <div style={styles.row1}>
          <h2>가족 납입 현황</h2>
          <div
            style={{
              display: "flex",
              padding: "20px",
              flexDirection: "column",
            }}
          >
            <div style={{ width: "100%" }}>
              <ProgressBar>
                {familyDepositsThisMonth.map((member, index) => (
                  <ProgressBar
                    key={index}
                    now={(member.totalDeposit / maxDepositAmount) * 100} // 100만원 대비 비율로 계산
                    label={`${(
                      (member.totalDeposit / maxDepositAmount) *
                      100
                    ).toFixed(2)}%`}
                    style={{ backgroundColor: colors[index % colors.length] }}
                  />
                ))}
              </ProgressBar>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                현재 납입금
                <span>{totalFamilyDepositThisMonth}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                최대 납입 가능 금액
                <span>1000000</span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: "20px",
                marginTop: "30px",
                height: "100%",
              }}
            >
              <div style={{ width: "50%" }}>
                {/* 버튼 클릭 시 모달 표시 */}
                <Button type="primary" onClick={showModal}>
                  납입 정보 변경
                </Button>
                <Button
                  type="default"
                  onClick={showAddDepositModal}
                  style={{ marginTop: "10px" }}
                >
                  추가 납입하기
                </Button>
              </div>
            </div>

            <Slider {...settings}>
              {familyDepositsThisMonth.map((member, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      borderRadius: "10px",
                      background: colors[index % colors.length],
                      width: "30px",
                      height: "30px",
                    }}
                  ></div>
                  <div>
                    {userNames[member.userId - 1]?.userName || "이름 없음"}
                  </div>{" "}
                  <div>
                    이번 달 납입 금액: {member.totalDeposit.toLocaleString()}원
                  </div>
                  <div>
                    월 납입금: {member.autoTransferAmount?.toLocaleString()}원
                  </div>
                  <div>자동이체일: {member.autoTransferDate}일</div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      {/* 거래 내역 테이블 */}
      <div style={styles.ContentContainer}>
        <div style={styles.row2}>
          <h2>납입 내역 조회</h2>
          <Table
            dataSource={transactionHistory}
            columns={transactionColumns}
            pagination={false}
          />
        </div>
      </div>

      {/* 납입 정보 변경 모달 */}
      <Modal
        title="납입 정보 변경"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          {/* 계좌번호를 Select로 변경 */}
          <Form.Item
            label="계좌번호"
            name="accountNumber"
            rules={[{ required: true, message: "계좌번호를 선택하세요." }]}
          >
            <Select placeholder={userAccountNo}>
              <Option value="1234-5678-1234">1234-5678-1234</Option>
              <Option value="9876-5432-1111">9876-5432-1111</Option>
            </Select>
          </Form.Item>

          {/* 자동이체 금액 입력 */}
          <Form.Item
            label="월 자동이체 금액"
            name="amount"
            rules={[{ required: true, message: "금액을 입력하세요." }]}
          >
            <Input placeholder="금액 입력" />
          </Form.Item>

          {/* 자동이체 날짜를 Select로 변경 */}
          <Form.Item
            label="자동이체 날짜"
            name="transferDate"
            rules={[{ required: true, message: "날짜를 선택하세요." }]}
          >
            <Select placeholder="날짜 선택">
              {Array.from({ length: 31 }, (_, i) => (
                <Option key={i + 1} value={i + 1}>
                  {i + 1}일
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* 추가 납입 모달 */}
      <Modal
        title="추가 납입하기"
        visible={isAddDepositModalVisible}
        onCancel={handleAddDepositCancel}
        onOk={handleAddDepositSubmit}
      >
        <Form form={addDepositForm} layout="vertical">
          <Form.Item label="계좌번호">
            <span>{userAccountNo}</span>
          </Form.Item>
          <Form.Item label="이번 달 추가 가능 납입 금액">
            <span>{1000000 - totalFamilyDepositThisMonth} 원</span>
          </Form.Item>
          <Form.Item
            label="추가 납입 금액"
            name="additionalAmount"
            rules={[{ required: true, message: "금액을 입력하세요." }]}
          >
            <Input placeholder="추가 납입 금액 입력" />
          </Form.Item>
          <Form.Item
            label="계좌 비밀번호"
            name="password"
            rules={[{ required: true, message: "비밀번호를 입력하세요." }]}
          >
            <Input.Password placeholder="비밀번호 입력" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 정보 확인 모달 */}
      <Modal
        title="정보 확인"
        visible={isConfirmModalVisible}
        onCancel={() => setIsConfirmModalVisible(false)}
        onOk={handleConfirmOk}
      >
        <p>추가 납입 금액: {confirmData.additionalAmount} 원</p>
        <p>계좌 번호: {userAccountNo}</p>
        <p>계좌 잔액: {account.currentAmount.toLocaleString()} 원</p>
      </Modal>
    </div>
  );
}

const styles = {
  container: {
    width: "80%",
    margin: "0 auto",
    paddingBottom: "40px", // 하단에 여백 추가
    paddingTop: "40px", // 상단에 여백 추가
  },
  ContentContainer: {
    gap: "20px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    margin: "0 auto",
  },
  row1: {
    width: "50%",
    background: "#ffffff",
    borderRadius: "5px",
    padding: "20px",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
  },
  row2: {
    width: "100%",
    background: "#ffffff",
    borderRadius: "5px",
    padding: "20px",
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
  },
  textContainer: {
    textAlign: "center",
  },
  percentageText: {
    fontSize: "30px",
    color: "#3e98c7",
  },
  usageText: {
    fontSize: "16px",
    color: "#666",
  },
};

export default TogetherAccountSettingContent;
