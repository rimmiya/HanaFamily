import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function JointAssetsMainContent() {
  const [isHidden, setIsHidden] = useState(false);
  const user = useSelector((state) => state.user.userInfo);
  const [totalAssets, setTotalAssets] = useState(0);

  // 금액 숨기기 토글
  const toggleAmount = () => {
    setIsHidden(!isHidden);
  };

  useEffect(() => {
    fetchAccountBalance(); // 컴포넌트 마운트 시 가족 자산 불러오기
  }, []);

  // 가족 자산 가져오기
  const fetchAccountBalance = async () => {
    if (!user.familyId) {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/family/no-members",
          {
            params: { userNo: user.userNo },
          }
        );
        setTotalAssets(response.data);
      } catch (error) {
        console.error("개인 계좌 총합 가져오는 중 오류 발생:", error);
      }
    } else {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/family/account-balance",
          {
            params: { familyId: user.familyId },
          }
        );
        setTotalAssets(response.data);
      } catch (error) {
        console.error("가족 자산을 가져오는 중 오류 발생:", error);
      }
    }
  };

  return (
    <div
      className="joint-assets-total-container"
      style={{
        // border: "1px solid #d9d9d9",
        // borderRadius: "10px",
        // padding: "30px",
        // margin: "20px auto",
        // width: "90%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div
        className="joint-assets-total-title"
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          // marginBottom: "15px",
        }}
      >
        <h3 style={{ margin: "0", fontFamily: "CustomFont" }}>
          우리 가족 자산
        </h3>
        {/* <button
          onClick={toggleAmount}
          className="change-joint-assets-amount"
          style={{
            backgroundColor: "#e0e0e0",
            borderRadius: "15px",
            padding: "5px 10px",
            border: "none",
            cursor: "pointer",
            color: "#757575",
          }}
        >
          {isHidden ? "보이기" : "숨기기"}
        </button> */}
      </div>
      <div
        className="joint-assets-total-amount"
        style={{
          fontSize: "30px",
          fontWeight: "bold",
          // marginBottom: "20px",
          color: "#000000",
          textAlign: "right",
          fontFamily: "CustomFont",
        }}
      >
        {totalAssets.toLocaleString() + " 원"}
      </div>
    </div>
  );
}

export default JointAssetsMainContent;
