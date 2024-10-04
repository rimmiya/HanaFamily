import React, { useState, useEffect } from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import "../../style/AssetsInsuranceContent.css";

function AssetsInsuranceContent() {
  const [insuranceList, setInsuranceList] = useState([]);
  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    fetchInsuranceData();
  }, []);

  const fetchInsuranceData = async () => {
    try {
      let response;
      if (user.familyId) {
        // 가족 보험 API 호출
        response = await axios.get(
          "http://localhost:8080/api/mydata/insurance/family-list",
          {
            params: { familyId: user.familyId },
          }
        );
      } else {
        // 개인 보험 API 호출
        response = await axios.get(
          "http://localhost:8080/api/mydata/insurance/personal-list",
          {
            params: { userNo: user.userNo },
          }
        );
      }
      setInsuranceList(response.data);
    } catch (error) {
      console.error("보험 데이터를 불러오는 중 오류 발생:", error);
    }
  };

  const calculateProgress = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();
    const total = end - start;
    const progress = now - start;
    return (progress / total) * 100 > 100 ? 100 : (progress / total) * 100;
  };

  const totalInsurancePremium = insuranceList.reduce(
    (total, insurance) => total + (insurance.insuranceMonthlyPayment || 0),
    0
  );

  const hanalogo = `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`;

  return (
    <div className="assets-insurance-container">
      <div className="assets-insurance-content">
        <div className="assets-insurance-title">
          <div style={{ display: "flex" }}>
            <h2 style={{ fontSize: "24px" }}>가입한 보험</h2>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "600",
                paddingLeft: "10px",
                color: "#00765f",
              }}
            >
              {insuranceList.length}
            </h2>
          </div>
          <div>
            <p>총 보험료 합계</p>
            <h2>{`${totalInsurancePremium.toLocaleString()}`}원</h2>
          </div>
        </div>
        <div className="assets-insurance-list">
          {insuranceList.map((insurance, index) => (
            <div key={index} className="insurance-item">
              <div className="insurance-item-header">
                <h5 style={{ fontWeight: "600" }}>{insurance.insuranceName}</h5>
                <IoIosArrowForward style={{ marginBottom: "8px" }} />
              </div>
              <div className="insurance-item-footer">
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    marginRight: "5px",
                    marginBottom: "5px",
                    overflow: "hidden",
                    borderRadius: "50%",
                  }}
                >
                  <img
                    src={hanalogo}
                    alt={`${insurance.insuranceCompany} logo`}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <p>{insurance.insuranceCompany}</p>
                &nbsp;&nbsp;
                <p>{insurance.insuranceId}</p>
              </div>
              <div className="insurance-item-details">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>피보험자</p>
                  <p>{insurance.userName}</p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>월 납입 보험료</p>
                  <h3 style={{ fontWeight: "600" }}>
                    {insurance.insuranceMonthlyPayment
                      ? insurance.insuranceMonthlyPayment.toLocaleString()
                      : "데이터 없음"}
                    원
                  </h3>
                </div>
                <div className="insurance-item-details-date">
                  <ProgressBar
                    now={`${calculateProgress(
                      insurance.insuranceStartDate,
                      insurance.insuranceEndDate
                    )}`}
                  />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>
                      가입일:{" "}
                      {new Date(
                        insurance.insuranceStartDate
                      ).toLocaleDateString()}
                    </p>
                    <p>
                      만기일:{" "}
                      {new Date(
                        insurance.insuranceEndDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AssetsInsuranceContent;
