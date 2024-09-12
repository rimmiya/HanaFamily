import React, { useState } from "react";
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
  Modal,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 사용

const { Panel } = Collapse;
const { Option } = Select;

function TogetherAccountJoinContent() {
  const [allChecked, setAllChecked] = useState(false);
  const [checkedList, setCheckedList] = useState({
    basic: false,
    installment: false,
    exemption: false,
    autoTransfer: false,
    specialTerms: false,
  });

  const [amount, setAmount] = useState(0); // 신규 금액 상태 관리
  const [useDifferentPassword, setUseDifferentPassword] = useState(false); // 신규 비밀번호 사용 여부
  const [newPassword, setNewPassword] = useState(""); // 신규 비밀번호 상태 관리
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 상태 관리
  const [keyboardVisible, setKeyboardVisible] = useState(false); // 마우스 키보드 상태

  const [productType, setProductType] = useState("369 정기예금"); // 상품종류
  const [term, setTerm] = useState("12개월"); // 가입기간
  const [interestMethod, setInterestMethod] = useState("만기일시지급식"); // 이자지급방식
  const [maturityOption, setMaturityOption] = useState("만기시 자동해지"); // 만기해지구분
  const [smsOption, setSmsOption] = useState("신청안함"); // SMS 통보

  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate

  // 금액 버튼 클릭 시 해당 금액을 Input에 더하는 함수
  const handleAddAmount = (value) => {
    setAmount((prevAmount) => prevAmount + value);
  };

  // 전체 동의 클릭 시 모든 항목을 체크하는 함수
  const handleAllCheck = () => {
    const newCheckedState = !allChecked;
    setAllChecked(newCheckedState);
    setCheckedList({
      basic: newCheckedState,
      installment: newCheckedState,
      exemption: newCheckedState,
      autoTransfer: newCheckedState,
      specialTerms: newCheckedState,
    });
  };

  // 개별 항목 체크 시 상태 변경 함수
  const handleIndividualCheck = (key) => {
    const newCheckedList = {
      ...checkedList,
      [key]: !checkedList[key],
    };

    const isAllChecked = Object.values(newCheckedList).every(
      (checked) => checked
    );

    setCheckedList(newCheckedList);
    setAllChecked(isAllChecked);
  };

  // 마우스 키보드로 비밀번호 입력 처리
  const handleKeyboardClick = (num) => {
    if (newPassword.length < 4) {
      setNewPassword(newPassword + num);
    }
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
      },
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={{ marginTop: "40px" }}>상품 가입</h2>
      <hr />
      <div style={styles.container2}>
        <div style={styles.agreeAllContainer}>
          <h4 style={{ margin: "0", alignContent: "center" }}>
            상품가입 약관 전체 동의
          </h4>
          <Col>
            <Button
              type={allChecked ? "primary" : "default"}
              onClick={handleAllCheck}
              style={styles.agreeAllButton}
            >
              전체동의
            </Button>
          </Col>
        </div>

        <Collapse
          expandIconPosition="right"
          expandIcon={({ isActive }) => (
            <DownOutlined
              rotate={isActive ? 180 : 0}
              style={styles.expandIcon}
            />
          )}
          ghost
        >
          <Panel
            header="예금거래기본 약관"
            key="1"
            style={styles.panel}
            extra={
              <Checkbox
                checked={checkedList.basic}
                onClick={(e) => e.stopPropagation()}
                onChange={() => handleIndividualCheck("basic")}
              >
                약관동의
              </Checkbox>
            }
          >
            예금거래에 대한 기본 약관 내용입니다.
          </Panel>

          <Panel
            header="거치식예금 약관"
            key="2"
            style={styles.panel}
            extra={
              <Checkbox
                checked={checkedList.installment}
                onClick={(e) => e.stopPropagation()}
                onChange={() => handleIndividualCheck("installment")}
              >
                약관동의
              </Checkbox>
            }
          >
            거치식 예금 약관 내용입니다.
          </Panel>

          <Panel
            header="비과세종합저축 특약"
            key="3"
            style={styles.panel}
            extra={
              <Checkbox
                checked={checkedList.exemption}
                onClick={(e) => e.stopPropagation()}
                onChange={() => handleIndividualCheck("exemption")}
              >
                약관동의
              </Checkbox>
            }
          >
            비과세 저축 특약 내용입니다.
          </Panel>

          <Panel
            header="계좌간 자동이체 약관"
            key="4"
            style={styles.panel}
            extra={
              <Checkbox
                checked={checkedList.autoTransfer}
                onClick={(e) => e.stopPropagation()}
                onChange={() => handleIndividualCheck("autoTransfer")}
              >
                약관동의
              </Checkbox>
            }
          >
            계좌간 자동이체 약관 내용입니다.
          </Panel>

          <Panel
            header="[3·6·9 정기예금] 상품특약"
            key="5"
            style={styles.panel}
            extra={
              <Checkbox
                checked={checkedList.specialTerms}
                onClick={(e) => e.stopPropagation()}
                onChange={() => handleIndividualCheck("specialTerms")}
              >
                약관동의
              </Checkbox>
            }
          >
            3·6·9 정기예금 상품에 대한 특약 내용입니다.
          </Panel>
        </Collapse>
      </div>

      {/* 기본정보 섹션 */}
      <div style={styles.basicInfoSection}>
        <h3>기본정보</h3>
        <Form layout="vertical">
          <Form.Item label="출금계좌번호" required>
            <Select defaultValue="111-1111-1111[영하나플러스통장]">
              <Option value="1">111-1111-1111[영하나플러스통장]</Option>
              <Option value="2">111-1111-1111[다른계좌]</Option>
            </Select>
            <div style={styles.balanceInfo}>
              <span>현재 잔액: 75,181원</span>
              <span>출금 가능 금액: 75,181원</span>
            </div>
          </Form.Item>

          <Form.Item label="계좌 비밀번호" required>
            <Input.Password
              placeholder="비밀번호 4자리를 입력하세요."
              maxLength={4}
            />
          </Form.Item>

          <Form.Item label="이메일주소">
            <Input disabled value="********@naver.com" />
          </Form.Item>
        </Form>
      </div>

      {/* 상품정보 섹션 */}
      <div style={styles.productInfoSection}>
        <h3>상품정보</h3>
        <Form layout="vertical">
          <Form.Item label="신규금액">
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
              value={`${amount} 원`}
              readOnly
            />
            <Checkbox style={{ marginTop: "10px" }}>하나머니로 납부</Checkbox>
          </Form.Item>

          <Form.Item>
            <Checkbox
              checked={useDifferentPassword}
              onChange={() => setUseDifferentPassword(!useDifferentPassword)}
            >
              신규 비밀번호는 출금계좌와 다르게 하기
            </Checkbox>
          </Form.Item>

          {useDifferentPassword && (
            <>
              <Form.Item label="신규 비밀번호" required>
                <Input.Password
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  maxLength={4}
                  placeholder="비밀번호 4자리를 입력하세요."
                />
                <Button onClick={() => setKeyboardVisible(true)}>
                  마우스 키보드로 입력
                </Button>
              </Form.Item>

              <Form.Item label="비밀번호 확인" required>
                <Input.Password
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  maxLength={4}
                  placeholder="비밀번호 4자리를 다시 입력하세요."
                />
              </Form.Item>
            </>
          )}

          <Form.Item label="상품종류" required>
            <Select value={productType} onChange={setProductType}>
              <Option value="369 정기예금">369 정기예금</Option>
              <Option value="다른 상품">다른 상품</Option>
            </Select>
          </Form.Item>

          <Form.Item label="가입기간" required>
            <Select value={term} onChange={setTerm}>
              <Option value="12개월">12개월</Option>
              <Option value="6개월">6개월</Option>
            </Select>
          </Form.Item>

          <Form.Item label="이자지급방식" required>
            <Select value={interestMethod} onChange={setInterestMethod}>
              <Option value="만기일시지급식">만기일시지급식</Option>
              <Option value="분기별 지급">분기별 지급</Option>
            </Select>
          </Form.Item>

          <Form.Item label="만기해지구분" required>
            <Radio.Group
              value={maturityOption}
              onChange={(e) => setMaturityOption(e.target.value)}
            >
              <Radio value="직접해지">직접해지</Radio>
              <Radio value="만기시 자동해지">만기시 자동해지</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="예/적금 만기 SMS 통보">
            <Radio.Group
              value={smsOption}
              onChange={(e) => setSmsOption(e.target.value)}
            >
              <Radio value="신청함">신청함</Radio>
              <Radio value="신청안함">신청안함</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>

      {/* 마우스 키보드 모달 */}
      <Modal
        title="마우스 키보드"
        visible={keyboardVisible}
        onCancel={() => setKeyboardVisible(false)}
        footer={null}
      >
        <div style={styles.keyboard}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
            <Button key={num} onClick={() => handleKeyboardClick(num)}>
              {num}
            </Button>
          ))}
        </div>
        <Button onClick={() => setKeyboardVisible(false)}>확인</Button>
      </Modal>

      {/* 버튼 섹션 */}
      <div style={styles.buttonContainer}>
        <Button onClick={() => navigate("/")}>이전</Button>
        <Button type="primary" onClick={handleConfirm}>
          확인
        </Button>
        <Button onClick={() => navigate("/")}>취소</Button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "80%",
    margin: "0 auto",
  },
  container2: {
    width: "90%",
    margin: "0 auto",
    alignContent: "center",
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  agreeAllContainer: {
    marginBottom: "16px",
    display: "flex",
    justifyContent: "space-between",
  },
  agreeAllButton: {
    borderRadius: "20px",
    width: "100px",
    height: "36px",
  },
  panel: {
    backgroundColor: "#f0f4f8",
    borderTop: "1px solid #d9d9d9",
    borderBottom: "1px solid #d9d9d9",
    height: "70px",
    alignContent: "center",
    fontSize: "18px",
    padding: "0 10px",
  },
  expandIcon: {
    alignSelf: "center",
    fontSize: "16px",
  },
  basicInfoSection: {
    marginTop: "40px",
    border: "1px solid #d9d9d9",
    padding: "20px",
    borderRadius: "8px",
  },
  balanceInfo: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
  productInfoSection: {
    marginTop: "40px",
    border: "1px solid #d9d9d9",
    padding: "20px",
    borderRadius: "8px",
  },
  keyboard: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-around",
  },
};

export default TogetherAccountJoinContent;
