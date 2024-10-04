import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Collapse,
  Button,
  Modal,
  Row,
  Col,
  Form,
  Input,
  Select,
  Radio,
  Table,
} from "antd";
import axios from "axios";

const { Option } = Select;

function InviteeConfirmationPage() {
  const location = useLocation();
  const { invitationId, savingAccountNo } = location.state || {}; // 상태값 받기
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [autoTransferDate, setAutoTransferDate] = useState(""); // 자동이체일 설정
  const user = useSelector((state) => state.user.userInfo);
  const [smsOption, setSmsOption] = useState("신청함"); // SMS 통보
  const [amount, setAmount] = useState(0); // 신규 금액 상태 관리
  const [accountList, setAccountList] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [savingProduct, setSavingProduct] = useState(null);
  const [familyMembers, setFamilyMembers] = useState([]); // 가족 구성원 리스트
  const [participationDetails, setParticipationDetails] = useState({
    savingAccountNo: savingAccountNo,
    userId: user.userNo, // 로그인된 사용자 번호
    userAccountNo: selectedAccount,
    familyId: user.familyId, // 로그인된 사용자의 familyId
    totalAmount: 0,
    startDate: new Date(), // 현재 날짜를 시작일로
    autoTransferDate: autoTransferDate,
    autoTransferAmount: amount,
    autoTransferSmsYn: smsOption,
    maturitySmsYn: "N",
    successfulTransferYn: 0,
    bonusApplied: false,
  });
  // 참여 정보 업데이트 로직
  useEffect(() => {
    setParticipationDetails((prevDetails) => ({
      ...prevDetails,
      userAccountNo: selectedAccount?.accountNo || null,
      totalAmount: amount,
      autoTransferDate: autoTransferDate,
      autoTransferAmount: amount,
      autoTransferSmsYn: smsOption === "신청함" ? "Y" : "N",
    }));
  }, [selectedAccount, amount, autoTransferDate, smsOption]);
  // 금액 버튼 클릭 시 해당 금액을 Input에 더하는 함수
  const handleAddAmount = (value) => {
    setAmount((prevAmount) => prevAmount + value);
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/savings/account/list",
          {
            params: { userNo: user.userNo }, // 현재 사용자 번호로 API 호출
          }
        );
        setAccountList(response.data); // 계좌 목록 상태에 저장
      } catch (error) {
        console.error("계좌 목록을 불러오는 중 오류 발생:", error);
      }
    };

    const fetchSavings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/savings/saving-product",
          {
            params: { savingAccountNo: savingAccountNo },
          }
        );
        setSavingProduct(response.data);
      } catch (error) {
        console.error("적금 상품 정보를 불러오는 중 오류 발생:", error);
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
        setFamilyMembers(response.data);
      } catch (error) {
        console.error("가족 구성원을 불러오는 중 오류 발생:", error);
      }
    };

    fetchAccounts();
    fetchSavings();
    fetchFamilyMembers();
    console.log("savingProduct:", savingProduct);
    console.log("familyMembers:", familyMembers);
    // console.log(
    //   "representativeAccountNo:",
    //   savingProduct.representativeAccountNo
    // );
  }, [user.userNo, savingAccountNo]);

  // 최종 가입 실행 API 호출 함수
  const handleConfirm = async () => {
    try {
      const requestDTO = {
        invitationId: invitationId,
        participationDetails: {
          ...participationDetails,
        },
      };

      console.log("가입 정보:", requestDTO);
      await axios.post(
        "http://localhost:8080/api/savings/accept-invitation",
        requestDTO
      );
      // 가입 성공 후 모달을 띄움
      setIsModalVisible(true);
    } catch (error) {
      console.error("적금 가입 중 오류 발생:", error);
    }
  };

  // 모달 확인 버튼 클릭 시 실행되는 함수
  const handleModalOk = () => {
    setIsModalVisible(false); // 모달을 숨기고
    navigate("/jointassets"); // jointassets 페이지로 이동
  };
  const handleAccountChange = (value) => {
    const selected = accountList.find((account) => account.accountNo === value);
    setSelectedAccount(selected); // 선택된 계좌 정보를 상태로 저장

    // participationDetails에 userAccountNo를 업데이트
    setParticipationDetails((prevDetails) => ({
      ...prevDetails,
      userAccountNo: selected?.accountNo, // 선택된 계좌번호를 업데이트
    }));
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
  ];
  return (
    <div style={styles.container}>
      <h2 style={{ marginTop: "40px" }}>가입 정보 확인</h2>
      <hr />

      <div style={{ width: "90%", margin: "0 auto" }}>
        {/* 상품정보 섹션 */}
        <h4 style={styles.heading}>가입 상품 정보</h4>
        <div style={styles.section}>
          <div style={styles.productRow}>
            <div style={styles.formLabel}>상품종류</div>
            <div style={styles.formContent}>
              {/* savingProduct가 null이 아닐 때만 렌더링 */}
              {savingProduct
                ? savingProduct.productType || "함께 적금"
                : "로딩 중..."}
            </div>

            <div style={styles.formLabel}>적금 계좌번호</div>
            <div style={styles.formContent}>
              {savingAccountNo || "계좌번호 생성 중..."}
            </div>
          </div>
          <div style={styles.productRow}>
            <div style={styles.formLabel}>계좌 별명</div>
            <div style={styles.formContent}>
              {savingProduct
                ? savingProduct.accountName || "계좌 별명 없음"
                : "로딩 중..."}
            </div>
          </div>
          <div style={styles.productRow}>
            {" "}
            <div style={styles.formLabel}>목표금액</div>
            <div style={styles.formContent}>
              {savingProduct
                ? `${savingProduct.goalAmount.toLocaleString()} 원`
                : "로딩 중..."}
            </div>
          </div>
          <div style={styles.productRow}>
            <div style={styles.formLabel}>현재 적용금리</div>
            <div style={styles.formContent}>3.00%</div>
            <div style={styles.formLabel}>가입기간</div>
            <div style={styles.formContent}>
              {savingProduct ? savingProduct.term || "12개월" : "로딩 중..."}
            </div>
          </div>
          <div style={styles.productRow}>
            <div style={styles.formLabel}>만기해지구분</div>
            <div style={styles.formContent}>
              {savingProduct
                ? savingProduct.maturityOption || "만기시 자동해지"
                : "로딩 중..."}
            </div>
            <div style={styles.formLabel}>이자지급방식</div>
            <div style={styles.formContent}>
              {savingProduct
                ? savingProduct.interestMethod || "만기일시지급식"
                : "로딩 중..."}
            </div>
          </div>
        </div>

        {/* 가족 구성원 확인 섹션 */}
        <h4 style={styles.heading}>가족 구성원 확인</h4>
        <Table
          columns={familyMemberColumns}
          dataSource={familyMembers}
          pagination={false}
          rowKey="userId" // 데이터의 고유 키 설정
        />

        {/* 가입 정보 입력 섹션 */}
        <h4 style={styles.heading}>가입 정보 입력</h4>
        <form
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
            alignItems: "center",
            borderTop: "2px solid #d9d9d9",
          }}
        >
          <div style={styles.formItem}>
            출금계좌번호
            <span style={styles.required}>*</span>
          </div>
          <div
            style={{
              padding: "10px",
              borderBottom: "1px solid #d9d9d9",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Select
              placeholder="계좌를 선택하세요"
              style={{ width: "40%" }}
              onChange={handleAccountChange} // 변경된 핸들러 사용
            >
              {accountList.map((account) => (
                <Option key={account.accountNo} value={account.accountNo}>
                  {account.accountNo} [{account.accountName}]
                </Option>
              ))}
            </Select>
            <div style={styles.balanceInfo}>
              {selectedAccount && (
                <>
                  <span>계좌 이름: {selectedAccount.accountName}</span>
                  <span style={{ color: "#008485" }}>
                    잔액: {selectedAccount.accountBalance.toLocaleString()} 원
                  </span>
                </>
              )}
            </div>
          </div>

          <div style={styles.formItem}>
            계좌 비밀번호
            <span style={styles.required}>*</span>
          </div>
          <div
            style={{
              padding: "10px",
              borderBottom: "1px solid #d9d9d9",
              height: "100%",
            }}
          >
            <Input.Password
              placeholder="비밀번호 4자리를 입력하세요."
              maxLength={4}
              style={{ width: "40%" }}
            />
          </div>
          {/* 신규금액 */}
          <div style={styles.formItem}>
            신규금액
            <span style={styles.required}>*</span>
          </div>
          <div
            style={{
              padding: "10px",
              borderBottom: "1px solid #d9d9d9",
              height: "100%",
            }}
          >
            <Row gutter={8}>
              <Col>
                <Button onClick={() => handleAddAmount(1000000)}>
                  +100만원
                </Button>
              </Col>
              <Col>
                <Button onClick={() => handleAddAmount(500000)}>+50만원</Button>
              </Col>
              <Col>
                <Button onClick={() => handleAddAmount(100000)}>+10만원</Button>
              </Col>
              <Col>
                <Button onClick={() => handleAddAmount(50000)}>+5만원</Button>
              </Col>
              <Col>
                <Button onClick={() => handleAddAmount(10000)}>+1만원</Button>
              </Col>
              <Col>
                <Button onClick={() => setAmount(0)}>정정</Button>
              </Col>
            </Row>
            <Input
              style={{ marginTop: "10px" }}
              value={`${amount.toLocaleString()} 원`}
              readOnly
            />
          </div>
          {/* 자동이체일 */}
          <div style={styles.formItem}>
            자동이체일
            <span style={styles.required}>*</span>
          </div>
          <div
            style={{
              padding: "10px",
              borderBottom: "1px solid #d9d9d9",
              height: "100%",
            }}
          >
            <Select
              value={autoTransferDate}
              onChange={(value) => setAutoTransferDate(value)}
              style={{ width: "40%" }}
              placeholder="날짜를 선택하세요"
            >
              {[...Array(28).keys()].map((day) => (
                <Option key={day + 1} value={day + 1}>
                  {day + 1}일
                </Option>
              ))}
            </Select>
          </div>
          {/* 예/적금 만기 SMS 통보 */}
          <div style={styles.formItem}>
            예/적금 만기 SMS 통보
            <span style={styles.required}>*</span>
          </div>
          <div
            style={{
              padding: "10px",
              borderBottom: "1px solid #d9d9d9",
              height: "100%",
              alignContent: "center",
            }}
          >
            <Radio.Group
              value={smsOption}
              onChange={(e) => setSmsOption(e.target.value)}
            >
              <Radio value="신청함">신청함</Radio>
              <Radio value="신청안함">신청안함</Radio>
            </Radio.Group>
          </div>
        </form>
      </div>

      {/* 버튼 섹션 */}
      <div style={styles.buttonContainer}>
        <Button
          onClick={() => navigate(-1)}
          style={{ width: "30%", height: "45px", fontSize: "16px" }}
        >
          이전
        </Button>
        <Button
          type="primary"
          onClick={handleConfirm} // 확인 버튼 클릭 시 handleConfirm 함수 실행
          style={{
            width: "30%",
            height: "45px",
            fontSize: "16px",
            background: "#008485",
          }}
        >
          가입실행
        </Button>
        <Button
          onClick={() => navigate("/")}
          style={{ width: "30%", height: "45px", fontSize: "16px" }}
        >
          취소
        </Button>
      </div>

      {/* 가입 완료 모달 */}
      <Modal
        title="가입 완료"
        visible={isModalVisible}
        onOk={handleModalOk} // 확인 버튼 클릭 시 페이지 이동
        onCancel={() => setIsModalVisible(false)} // 취소 버튼 클릭 시 모달 닫기
        okText="확인"
        cancelText="취소"
      >
        <p>가입이 완료되었습니다!</p>
      </Modal>
    </div>
  );
}

const styles = {
  heading: {
    fontWeight: "bold",
    marginBottom: "10px",
  },
  section: {
    marginBottom: "30px",
    paddingBottom: "20px",
    alignItems: "center",
    borderTop: "2px solid #d9d9d9",
    color: "#333",
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
  productRow: {
    display: "grid",
    gridTemplateColumns: "1fr 3fr 1fr 3fr",
    borderBottom: "1px solid #d9d9d9",
  },
  balanceInfo: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  container: {
    width: "80%",
    margin: "0 auto",
    paddingBottom: "40px", // 하단에 여백 추가
  },
  container2: {
    width: "90%",
    margin: "0 auto",
    alignContent: "center",
  },
  basicInfoSection: {
    marginTop: "40px",
    // borderTop: "2px solid #d9d9d9",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  balanceInfo: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  productInfoSection: {
    marginTop: "40px",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonContainer: {
    marginTop: "20px", // 버튼 위에 여백 추가
    display: "flex",
    justifyContent: "space-evenly",
    width: "40%",
    margin: "30px auto",
  },
  required: {
    color: "red",
    marginLeft: "5px", // 레이블과 별 사이에 약간의 여백 추가
  },
  formItem: {
    backgroundColor: "#f0f0f0",
    width: "100%",
    height: "100%",
    padding: "20px",
    alignContent: "center",
    borderBottom: "1px solid #d9d9d9",
    color: "black",
  },
};

export default InviteeConfirmationPage;
