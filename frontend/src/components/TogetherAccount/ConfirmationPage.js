import React from "react";
import { Button, Table } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

function ConfirmationPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const basicInfoData = [
    { key: "1", label: "출금계좌번호", value: "1111111111" },
    { key: "2", label: "이메일주소", value: "********@naver.com" },
  ];

  const productInfoData = [
    { key: "1", label: "상품종류", value: "369 정기예금" },
    { key: "2", label: "신규금액", value: `${state.amount} 원` },
    { key: "3", label: "가입기간", value: state.term },
    { key: "4", label: "현재 적용금리", value: "3.00% (적용우대금리포함)" },
    { key: "5", label: "적용 우대금리", value: "0.00%" },
    { key: "6", label: "이자지급방식", value: state.interestMethod },
    { key: "7", label: "이자지급간격", value: "만기지급식" },
    { key: "8", label: "만기해지구분", value: state.maturityOption },
    { key: "9", label: "예/적금 만기 SMS통보", value: state.smsOption },
    { key: "10", label: "세금우대", value: "일반과세" },
  ];

  const columns = [
    { title: "항목", dataIndex: "label", key: "label", width: "50%" },
    { title: "내용", dataIndex: "value", key: "value", width: "50%" },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>기본정보</h2>
      <Table
        dataSource={basicInfoData}
        columns={columns}
        pagination={false}
        showHeader={false}
        bordered
        style={styles.table}
      />

      <h2 style={styles.title}>상품정보</h2>
      <Table
        dataSource={productInfoData}
        columns={columns}
        pagination={false}
        showHeader={false}
        bordered
        style={styles.table}
      />

      <div style={styles.buttonContainer}>
        <Button onClick={() => navigate(-1)}>이전</Button>
        <Button type="primary" onClick={() => alert("가입이 완료되었습니다.")}>
          가입실행
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
    padding: "20px",
  },
  title: {
    marginTop: "20px",
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  table: {
    marginBottom: "30px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
};

export default ConfirmationPage;
