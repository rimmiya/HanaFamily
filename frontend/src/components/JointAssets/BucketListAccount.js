import React, { useState, useEffect } from "react";
import CustomProgressBar from "../Assets/Charts/CustomProgressBar";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // familyId 가져오기 위해 사용
import axios from "axios"; // axios를 추가
import "../../style/BucketListAccount.css";

function BucketListAccount() {
  const [targetAccounts, setTargetAccounts] = useState([]);
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 사용
  const user = useSelector((state) => state.user.userInfo); // Redux에서 사용자 정보 가져오기

  useEffect(() => {
    // API 호출하여 가족 적금 목록 가져오기
    const fetchFamilySavings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/savings/family-savings",
          {
            params: { familyId: user.familyId }, // 로그인한 유저의 familyId를 기반으로 API 호출
          }
        );
        setTargetAccounts(response.data); // API로 받은 데이터를 상태로 저장
      } catch (error) {
        console.error("가족 적금 목록을 가져오는 중 오류 발생:", error);
      }
    };

    fetchFamilySavings();
  }, [user.familyId]); // familyId가 변경될 때마다 호출

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
        <button onClick={() => navigate("/togetheraccount")}>
          목표 달성 계좌 만들기
        </button>
      </div>

      <div className="target-account-content">
        {targetAccounts.length === 0 ? (
          <p style={{ textAlign: "center", color: "gray" }}>
            함께하는 가족과 적금계좌를 만들어 함께 모아보세요!
          </p>
        ) : (
          targetAccounts.map((account, index) => (
            <div key={index} className="target-account-item">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h4>{account.accountName}</h4> {/* 계좌 별칭 표시 */}
                <p>{account.savingAccountNo}</p> {/* 계좌 번호 표시 */}
                <button
                  onClick={() =>
                    navigate("/togetheraccountsetting", {
                      state: { account }, // 계좌 정보를 함께 넘김
                    })
                  }
                >
                  적금 관리하기
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ fontWeight: "600" }}>
                    {account.currentAmount.toLocaleString()}원 {/* 현재 금액 */}
                  </p>
                  <p style={{ color: "gray" }}>
                    &nbsp;/ {account.goalAmount.toLocaleString()}원{" "}
                    {/* 목표 금액 */}
                  </p>
                </div>
                <p>
                  ~{new Date(account.endDate).toLocaleDateString()}(D-
                  {calculateDDay(account.endDate)}) {/* D-day 계산 */}
                </p>
              </div>
              <CustomProgressBar
                currentAmount={account.currentAmount}
                goalAmount={account.goalAmount}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BucketListAccount;
