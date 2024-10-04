import React, { useState, useEffect } from "react";
import { Button, Modal, Table } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function TerminateSavings() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [savingsDetails, setSavingsDetails] = useState(null); // 적금 세부사항
  const [familyParticipants, setFamilyParticipants] = useState([]); // 가족 구성원
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const savingAccountNo = "266-6160-1025";

  // 만기 처리 전 로그인 상태 확인
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    fetchSavingsDetails();
    fetchFamilyMembers();
  }, [user, navigate, savingAccountNo]);

  // 적금 세부사항 가져오기
  const fetchSavingsDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/savings/saving-product",
        {
          params: { savingAccountNo: savingAccountNo },
        }
      );
      console.log("적금 세부사항:", response.data);
      setSavingsDetails(response.data);
    } catch (error) {
      console.log("Error fetching savings details:", error);
    }
  };

  const fetchFamilyMembers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/savings/family-invitation",
        {
          params: { savingAccountNo: savingAccountNo },
        }
      );
      setFamilyParticipants(response.data);
    } catch (error) {
      console.error("가족 구성원을 불러오는 중 오류 발생:", error);
    }
  };

  // 적금 만기 처리
  const handleTerminate = () => {
    axios
      .post("http://localhost:8080/api/terminate-savings", {
        savingAccountNo,
      })
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: "UPDATE_USER",
            payload: response.data.user,
          });
          setIsModalVisible(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOk = () => {
    setIsModalVisible(false);
    navigate("/jointassets");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // 가족 구성원 테이블 컬럼 정의
  const familyMemberColumns = [
    {
      title: "가족 구성원 이름",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "계좌 번호",
      dataIndex: "userAccountNo",
      key: "userAccountNo",
    },
    {
      title: "자동이체 금액",
      dataIndex: "autoTransferAmount",
      key: "autoTransferAmount",
      render: (amount) => `${amount.toLocaleString()} 원`,
    },
    {
      title: "자동이체일",
      dataIndex: "autoTransferDate",
      key: "autoTransferDate",
      render: (date) => `${date}일`,
    },
    {
      title: "자동이체 횟수",
      dataIndex: "successfulTransfers",
      key: "successfulTransfers",
      render: (count) => `${count.toLocaleString()} 번`,
    },
    {
      title: "총 입금액",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => `${amount.toLocaleString()} 원`,
    },
  ];

  return (
    <div style={styles.container}>
      {/* savingsDetails가 로드되기 전에는 로딩 중 메시지 */}
      {!savingsDetails ? (
        <p>로딩 중...</p>
      ) : (
        <div style={{ width: "90%", margin: "0 auto", paddingTop: "30px" }}>
          <h3 style={styles.heading}>적금 만기 정보</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #d9d9d9",
              borderTop: "2px solid #d9d9d9",
              paddingBottom: "20px",
              paddingTop: "20px",
            }}
          >
            <div>
              <div
                style={{ fontSize: "25px", color: "black", fontWeight: "600" }}
              >
                이번 여름 여행지는 베트남
              </div>
              <span style={{ fontSize: "20px", color: "gray" }}>
                {savingsDetails.savingAccountNo}
              </span>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "20px", color: "gray" }}>받으실 금액</div>
              {/* <div
                style={{
                  fontSize: "30px",
                  fontWeight: "bold",
                  color: "#12b79b",
                }}
              >
                {savingsDetails.goalAmount.toLocaleString()}원
              </div> */}
              <div
                style={{
                  fontSize: "30px",
                  fontWeight: "bold",
                  color: "#12b79b",
                }}
              >
                3,048,856원
              </div>
            </div>
          </div>

          <div style={styles.savingsInfo}>
            {/* 적금 세부 정보 */}
            <div style={styles.section}>
              <div style={styles.detailRow}>
                <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                  적용금리
                </span>
                <span
                  style={{
                    fontSize: "22px",
                    fontWeight: "bold",
                    color: "#12b79b",
                  }}
                >
                  4.20%
                </span>
              </div>
              <div style={styles.detailRow}>
                <span>기본금리</span>
                <span style={{ fontWeight: "bold" }}>3.00%</span>
              </div>
              <div style={styles.detailRow}>
                <span>우대금리</span>
                {/* <span
                  style={{
                    fontWeight: "bold",
                    color: "#12b79b",
                  }}
                >
                  +{savingsDetails.bonusInterestRate}% 반영됨
                </span> */}
                <span
                  style={{
                    fontWeight: "bold",
                    color: "#12b79b",
                  }}
                >
                  +1.2% 반영됨
                </span>
              </div>
              <div style={styles.subDetailRow}>
                <span>목표 달성 우대금리</span>
                <span>+0.6%p</span>
              </div>
              <div style={styles.subDetailRow}>
                <span>가족 우대금리</span>
                <span>+0.6%p</span>
              </div>
              <div style={styles.detailRow}>
                <span>원금</span>
                <span>{savingsDetails.goalAmount.toLocaleString()}원</span>
              </div>
              <div style={styles.detailRow}>
                <span>이자(세전)</span>
                {/* <span>
                  {savingsDetails.interestBeforeTax?.toLocaleString()}원
                </span> */}
                <span>57,750원</span>
              </div>
              <div style={styles.detailRow}>
                <span>세금</span>
                <span>8,894원</span>
              </div>
              <div style={styles.detailRow}>
                <span>과세구분</span>
                <span>일반과세(15.4%)</span>
              </div>
              <div style={styles.detailRow}>
                <span>받으실 금액</span>
                <span>3,048,856원</span>
              </div>
              <div style={styles.detailRow}>
                <span>기준일</span>
                <span>2024.10.02</span>
              </div>
            </div>

            <h3 style={{ marginBottom: "20px" }}>참여 가족 정보</h3>
            <Table
              columns={familyMemberColumns}
              dataSource={familyParticipants}
              pagination={false}
              rowKey="userId"
            />

            <h3 style={{ marginTop: "40px", marginBottom: "20px" }}>
              만기 입금 정보
            </h3>
            <div style={styles.section}>
              <div style={styles.detailRow}>
                <span>대표자 계좌</span>
                <span>{savingsDetails.representativeAccountNo}</span>
              </div>
              <div style={styles.detailRow}>
                <span>대표자</span>
                <span>석예림</span>
              </div>
              <div style={styles.detailRow}>
                <span>입금일</span>
                <span>2024.10.02</span>
              </div>
            </div>

            <div style={styles.buttonContainer}>
              <Button type="primary">확인</Button>
            </div>
          </div>
        </div>
      )}

      <Modal
        title="Savings Terminated"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>저축 계좌가 성공적으로 만기되었습니다.</p>
      </Modal>
    </div>
  );
}

const styles = {
  container: {
    width: "80%",
    margin: "0 auto",
    paddingBottom: "40px",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: "30px",
  },
  section: {
    marginBottom: "30px",
    paddingBottom: "20px",
    alignItems: "center",
    borderTop: "2px solid #d9d9d9",
    // color: "#333",
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 3fr",
    borderBottom: "1px solid #d9d9d9",
  },
  formLabel: {
    backgroundColor: "#f0f0f0",
    padding: "20px",
    height: "100%",
  },
  formContent: {
    padding: "20px",
    textAlign: "left",
    alignContent: "center",
  },
  buttonContainer: {
    marginTop: "20px", // 버튼 위에 여백 추가
    display: "flex",
    justifyContent: "space-evenly",
    width: "40%",
    margin: "30px auto",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 10px",
    fontWeight: "bold",
    fontSize: "16px",
    borderBottom: "1px solid #d9d9d9",
  },
  subDetailRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 20px",
    fontSize: "16px",
    color: "#666",
    backgroundColor: "#f7f7f7",
  },
  participantHeading: {
    marginTop: "30px",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  button: {
    marginTop: "30px",
    width: "100%",
  },
};

export default TerminateSavings;
