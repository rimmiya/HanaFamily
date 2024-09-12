import React, { useState } from "react";
import Modal from "react-modal";
import CustomProgressBar from "../Assets/Charts/CustomProgressBar";
import "../../style/BucketListAccount.css";
import { IoIosArrowForward } from "react-icons/io";

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

function BucketListAccount() {
  const [targetModalIsOpen, setTargetModalIsOpen] = useState(false);
  const [targetAccounts, setTargetAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState("");
  const [newName, setNewName] = useState("");
  const [newPeriod, setNewPeriod] = useState("");
  const [newGoalAmount, setNewGoalAmount] = useState("");

  const data = [
    {
      type: "저축예금",
      amount: 360580,
    },
    {
      type: "하나 청년도약계좌",
      amount: 12600000,
    },
  ];

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
    const accountData = data.find((account) => account.type === newAccount);

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

  return (
    <div className="target-account-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <h3 style={{ fontFamily: "CustomFont" }}>함께 적금</h3>
        <button onClick={openTargetModal}>목표 달성 계좌 만들기</button>
        {/* <Link to="/joint-assets/bucket-list-account">
          <button>목표 달성 계좌 만들기</button>
        </Link> */}
      </div>
      <div className="target-account-content">
        {targetAccounts.length === 0 ? (
          <p style={{ textAlign: "center", color: "gray" }}>
            함께하는 가족과 적금계좌를 만들어 함께 모아보세요!
          </p>
        ) : (
          targetAccounts.map((target, index) => (
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
              <CustomProgressBar
                currentAmount={target.currentAmount}
                goalAmount={target.goalAmount}
              />
            </div>
          ))
        )}
      </div>

      {/* 목표 추가 모달 */}
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
            {data.map((account, index) => (
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
    </div>
  );
}

export default BucketListAccount;
