import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// 랜덤 계좌번호 생성 함수
function generateRandomAccountNo() {
  // 세 부분으로 나눈 계좌번호 생성 (XXX-XXXX-XXXX 형식)
  const part1 = Math.floor(100 + Math.random() * 900); // 100 ~ 999
  const part2 = Math.floor(1000 + Math.random() * 9000); // 1000 ~ 9999
  const part3 = Math.floor(1000 + Math.random() * 9000); // 1000 ~ 9999
  return `${part1}-${part2}-${part3}`;
}

function ConfirmationPage() {
  const navigate = useNavigate();
  const { state } = useLocation(); // TogetherAccountJoinContent에서 전달된 state 값
  const [isModalVisible, setIsModalVisible] = useState(false);
  const selectedFamilyMembers = state.selectedFamilyMembers || [];
  const user = useSelector((state) => state.user.userInfo);

  // 계좌번호 상태 관리 (랜덤 생성)
  const [randomAccountNo, setRandomAccountNo] = useState("");

  // 컴포넌트 마운트 시 랜덤 계좌번호 생성
  useEffect(() => {
    const generatedAccountNo = generateRandomAccountNo(); // 랜덤 계좌번호 생성
    setRandomAccountNo(generatedAccountNo); // 상태로 저장
    // console.log("가족 구성원:", selectedFamilyMembers);
  }, []);

  // 최종 가입 실행 API 호출 함수
  const handleConfirm = async () => {
    const savingProduct = {
      savingAccountNo: randomAccountNo, // 랜덤 생성된 계좌번호
      accountName: state.accountAlias, // 계좌 별칭
      accountPassword: state.newPassword, // 계좌 비밀번호
      bankCode: 101, // 은행 코드
      userNo: user.userNo, // 로그인된 사용자 번호
      familyId: user.familyId, // 로그인된 사용자의 familyId
      currentAmount: 0, // 목표 금액
      goalAmount: parseInt(state.goalAmount, 10), // 목표 금액
      startDate: new Date(), // 현재 날짜를 시작일로
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // 종료일 (1년 후)
      interestRate: 3.0, // 이자율 (예시로 설정, 백엔드와 협의하여 동적으로 변경 가능)
      savingStatus: "ACTIVE", // 적금 상태
      productId: 1, // 상품 ID
      representativeAccountNo: state.representativeAccountNo, // 대표자 계좌
    };

    const createSavingsRequest = {
      initialDepositAmount: state.amount, // 초기 입금액
      autoTransferDate: state.autoTransferDate, // 자동 이체일
      autoTransferAmount: state.amount, // 자동 이체 금액 (12개월 기준)
      autoTransferSmsYn: state.smsOption === "신청함" ? "Y" : "N", // SMS 알림 여부
      maturitySmsYn: state.smsOption === "신청함" ? "Y" : "N", // 만기 SMS 알림 여부
      userAccountNo: state.representativeAccountNo, // 사용자의 계좌번호
    };

    const requestDTO = {
      savingProduct,
      inviteeUserIds: selectedFamilyMembers.map((member) => member.userNo), // 선택한 가족 구성원의 ID 리스트
      createSavingsRequest,
    };
    console.log("상품 정보:", savingProduct);
    console.log("적금 가입 요청:", createSavingsRequest);
    console.log("최종 가입 요청:", requestDTO);
    try {
      // 최종 가입 API 요청
      const response = await axios.post(
        "http://localhost:8080/api/savings/create", // 적금 가입 API 엔드포인트
        requestDTO
      );
      console.log("적금 가입 성공:", response.data);

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

  return (
    <div style={styles.container}>
      <h2 style={{ marginTop: "40px" }}>정보 확인</h2>
      <hr />

      <div style={{ width: "90%", margin: "0 auto" }}>
        {/* 기본정보 섹션 */}
        <h4 style={styles.heading}>기본정보</h4>
        <div style={styles.section}>
          <div style={styles.formRow}>
            <div style={styles.formLabel}>출금계좌번호</div>
            <div style={styles.formContent}>
              {state.representativeAccountNo || "계좌 정보 없음"}
            </div>
          </div>
          <div style={styles.formRow}>
            <div style={styles.formLabel}>계좌명</div>
            <div style={styles.formContent}>
              {state.selectedAccount
                ? state.selectedAccount.accountName
                : "계좌명 없음"}
            </div>
          </div>
        </div>

        {/* 상품정보 섹션 */}
        <h4 style={styles.heading}>상품정보</h4>
        <div style={styles.section}>
          <div style={styles.productRow}>
            <div style={styles.formLabel}>상품종류</div>
            <div style={styles.formContent}>
              {state.productType || "함께 적금"}
            </div>

            <div style={styles.formLabel}>적금 계좌번호</div>
            <div style={styles.formContent}>
              {randomAccountNo || "계좌번호 생성 중..."}
            </div>
          </div>
          <div style={styles.productRow}>
            <div style={styles.formLabel}>계좌 별명</div>
            <div style={styles.formContent}>
              {state.accountAlias || "계좌 별명 없음"}
            </div>
            <div style={styles.formLabel}>가입기간</div>
            <div style={styles.formContent}>{state.term || "12개월"}</div>
          </div>
          <div style={styles.productRow}>
            {" "}
            <div style={styles.formLabel}>목표금액</div>
            <div style={styles.formContent}>
              {`${state.goalAmount.toLocaleString()} 원` || "0 원"}
            </div>
            <div style={styles.formLabel}>신규금액</div>
            <div style={styles.formContent}>
              {`${state.amount.toLocaleString()} 원` || "0 원"}
            </div>
          </div>
          <div style={styles.productRow}>
            <div style={styles.formLabel}>현재 적용금리</div>
            <div style={styles.formContent}>3.00%</div>
            <div style={styles.formLabel}>이자지급방식</div>
            <div style={styles.formContent}>
              {state.interestMethod || "만기일시지급식"}
            </div>
          </div>
          <div style={styles.productRow}>
            <div style={styles.formLabel}>만기해지구분</div>
            <div style={styles.formContent}>
              {state.maturityOption || "만기시 자동해지"}
            </div>
            <div style={styles.formLabel}>자동이체일</div>
            <div style={styles.formContent}>
              {state.autoTransferDate
                ? `${state.autoTransferDate}일`
                : "선택되지 않음"}
            </div>
          </div>
        </div>

        {/* 가족 구성원 확인 섹션 */}
        <h4 style={styles.heading}>가족 구성원 확인</h4>
        <div style={styles.section}>
          {selectedFamilyMembers.length > 0 ? (
            selectedFamilyMembers.map((member, index) => (
              <div style={styles.formRow} key={index}>
                <div style={styles.formLabel}>가족 구성원 {index + 1}</div>
                <div style={styles.formContent}>{member.userName}</div>
              </div>
            ))
          ) : (
            <div style={styles.formContent}>선택된 가족 구성원이 없습니다.</div>
          )}
        </div>
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
  container: {
    width: "80%",
    margin: "0 auto",
    paddingBottom: "40px",
  },
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
  buttonContainer: {
    marginTop: "20px", // 버튼 위에 여백 추가
    display: "flex",
    justifyContent: "space-evenly",
    width: "40%",
    margin: "30px auto",
  },
};

export default ConfirmationPage;
