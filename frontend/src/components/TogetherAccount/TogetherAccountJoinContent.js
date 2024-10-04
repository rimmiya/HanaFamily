import React, { useState, useEffect } from "react";
import {
  Collapse,
  Button,
  Checkbox,
  Row,
  Col,
  Form,
  Input,
  Select,
  Radio,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 사용
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const { Panel } = Collapse;
const { Option } = Select;

function TogetherAccountJoinContent() {
  const user = useSelector((state) => state.user.userInfo);
  const [allChecked, setAllChecked] = useState(false);
  const [checkedList, setCheckedList] = useState({
    basic: false,
    installment: false,
    exemption: false,
    autoTransfer: false,
    specialTerms: false,
  });

  const [familyMembers, setFamilyMembers] = useState([]); // 가족 구성원 리스트
  const [selectedFamilyMembers, setSelectedFamilyMembers] = useState([]); // 선택한 가족 구성원 상태 관리
  const [amount, setAmount] = useState(0); // 신규 금액 상태 관리
  const [useDifferentPassword, setUseDifferentPassword] = useState(false); // 신규 비밀번호 사용 여부
  const [newPassword, setNewPassword] = useState(""); // 신규 비밀번호 상태 관리
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 상태 관리
  const [productType, setProductType] = useState("함께 적금"); // 상품종류
  const [term, setTerm] = useState("12개월"); // 가입기간
  const [interestMethod, setInterestMethod] = useState("만기일시지급식"); // 이자지급방식
  const [maturityOption, setMaturityOption] = useState("만기시 자동해지"); // 만기해지구분
  const [smsOption, setSmsOption] = useState("신청함"); // SMS 통보
  const [accountAlias, setAccountAlias] = useState(""); // 적금 별명 관리
  const [autoTransferDate, setAutoTransferDate] = useState(""); // 자동이체일 설정
  const [representativeAccountNo, setRepresentativeAccountNo] = useState(""); // 대표 계좌 저장
  const [accountList, setAccountList] = useState([]); // 계좌 목록 저장
  const [selectedAccount, setSelectedAccount] = useState(null); // 선택된 계좌 정보 저장
  const [goalAmount, setGoalAmount] = useState(""); // 목표 금액 상태 관리

  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate

  // 금액 버튼 클릭 시 해당 금액을 Input에 더하는 함수
  const handleAddAmount = (value) => {
    setAmount((prevAmount) => prevAmount + value);
  };

  // 가족 구성원 선택 시 체크박스 상태 업데이트
  const handleFamilyMemberChange = (checkedValues) => {
    const selectedMembers = familyMembers
      .filter((member) => checkedValues.includes(member.value))
      .map((member) => ({ userNo: member.value, userName: member.label }));
    setSelectedFamilyMembers(selectedMembers); // userNo와 userName 객체로 저장
  };

  const handleAccountChange = (value) => {
    // 계좌에 따라 대표자 계좌와 사용자 계좌 설정
    // if (value === "111-1111-1111") {
    //   setRepresentativeAccountNo("111-1111-1111"); // 영하나플러스통장일 경우 대표자 계좌
    // } else if (value === "222-2222-2222") {
    //   setRepresentativeAccountNo("222-2222-2222"); // 다른 계좌일 경우
    // }
    const selected = accountList.find((account) => account.accountNo === value);
    setSelectedAccount(selected); // 선택된 계좌 정보를 상태로 저장
    setRepresentativeAccountNo(selected.accountNo);
  };

  // 확인 버튼 클릭 시 페이지 이동
  const handleConfirm = () => {
    navigate("/confirmationaccount", {
      state: {
        amount,
        useDifferentPassword,
        newPassword,
        confirmPassword,
        productType,
        term,
        interestMethod,
        maturityOption,
        smsOption,
        checkedList,
        goalAmount, // 목표 금액 전달
        accountAlias, // 적금 별명 전달
        autoTransferDate, // 자동이체일 전달
        selectedFamilyMembers, // 선택한 가족 구성원 전달
        representativeAccountNo, // 대표 계좌번호 전달
        selectedAccount, // 선택된 계좌 정보 전달
      },
    });
  };

  // 가족 구성원 데이터를 백엔드에서 가져오는 함수
  const fetchFamilyMembers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/family/members/without-me",
        {
          params: { familyId: user.familyId, userNo: user.userNo }, // user.familyId로 API 호출
        }
      );
      console.log("가족 구성원 목록:", response.data);
      // 가족 구성원 이름과 번호를 설정
      const familyMemberList = response.data.familyMembers.map((member) => ({
        label: member.userName, // 유저 이름 표시
        value: member.userNo, // 유저 번호 (식별자)
      }));
      setFamilyMembers(familyMemberList); // 가족 구성원 리스트 설정
    } catch (error) {
      console.error("가족 구성원 목록을 불러오는 중 오류 발생:", error);
    }
  };

  // 컴포넌트가 렌더링될 때 가족 구성원 목록 가져오기
  useEffect(() => {
    fetchFamilyMembers();
  }, []);

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
    fetchAccounts();
  }, [user.userNo]);

  return (
    <div style={styles.container}>
      <h2 style={{ marginTop: "40px" }}>상품 가입</h2>
      <hr />
      <div style={styles.container2}>
        {/* 기본정보 섹션 */}
        <div style={styles.basicInfoSection}>
          <h4>기본정보</h4>
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
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            {/* <div style={styles.formItem}>이메일주소</div>
            <div
              style={{
                padding: "10px",
                borderBottom: "1px solid #d9d9d9",
                height: "100%",
              }}
            >
              <Input
                style={{ width: "40%" }}
                disabled
                value="********@naver.com"
              />
            </div> */}
          </form>
        </div>

        {/* 상품정보 섹션 */}
        <div style={styles.productInfoSection}>
          <h4>상품정보</h4>
          <form
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 3fr",
              alignItems: "center",
              borderTop: "2px solid #d9d9d9",
            }}
          >
            {" "}
            {/* 적금 별명 */}
            <div style={styles.formItem}>
              적금 별명
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
              <Input
                value={accountAlias}
                onChange={(e) => setAccountAlias(e.target.value)}
                placeholder="별명을 입력하세요"
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
                  <Button onClick={() => handleAddAmount(500000)}>
                    +50만원
                  </Button>
                </Col>
                <Col>
                  <Button onClick={() => handleAddAmount(100000)}>
                    +10만원
                  </Button>
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
              {/* <Checkbox style={{ marginTop: "10px" }}>하나머니로 납부</Checkbox> */}
            </div>
            {/* 목표 금액 추가 */}
            <div style={styles.formItem}>
              목표 금액 <span style={styles.required}>*</span>
            </div>
            <div
              style={{
                padding: "10px",
                borderBottom: "1px solid #d9d9d9",
                height: "100%",
              }}
            >
              <Input
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
                placeholder="목표 금액을 입력하세요"
                style={{ width: "40%" }}
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
              >
                {[...Array(28).keys()].map((day) => (
                  <Option key={day + 1} value={day + 1}>
                    {day + 1}일
                  </Option>
                ))}
              </Select>
            </div>
            {/* 가입 기간 */}
            <div style={styles.formItem}>
              가입 기간
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
              <Select value={term} onChange={setTerm} style={{ width: "40%" }}>
                <Option value="12개월">12개월</Option>
                <Option value="6개월">6개월</Option>
              </Select>
            </div>
            {/* 이자 지급 방식 */}
            <div style={styles.formItem}>
              이자 지급 방식
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
              <Select
                value={interestMethod}
                onChange={setInterestMethod}
                style={{ width: "40%" }}
              >
                <Option value="만기일시지급식">만기일시지급식</Option>
                <Option value="분기별 지급">분기별 지급</Option>
              </Select>
            </div>
            {/* 만기 해지 구분 */}
            <div style={styles.formItem}>
              만기 해지 구분
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
                value={maturityOption}
                onChange={(e) => setMaturityOption(e.target.value)}
              >
                <Radio value="직접해지">직접해지</Radio>
                <Radio value="만기시 자동해지">만기시 자동해지</Radio>
              </Radio.Group>
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
        {/* 가족 선택 섹션 */}
        <div style={styles.productInfoSection}>
          <h4>함께 할 가족 구성원</h4>
          <Checkbox.Group
            options={familyMembers} // familyMembers 배열 사용
            value={selectedFamilyMembers.map((member) => member.userNo)} // 선택된 userNo 배열로 관리
            onChange={handleFamilyMemberChange} // 선택 상태 업데이트
          />
        </div>
      </div>

      {/* 버튼 섹션 */}
      <div style={styles.buttonContainer}>
        <Button
          onClick={() => navigate("/")}
          style={{ width: "30%", height: "45px", fontSize: "16px" }}
        >
          이전
        </Button>
        <Button
          type="primary"
          onClick={handleConfirm}
          style={{
            width: "30%",
            height: "45px",
            fontSize: "16px",
            background: "#008485",
          }}
        >
          확인
        </Button>
      </div>
    </div>
  );
}

const styles = {
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

export default TogetherAccountJoinContent;
