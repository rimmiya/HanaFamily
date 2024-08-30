import React from "react";
import "../../style/AssetsInsuranceContent.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import { IoIosArrowForward } from "react-icons/io";

const insuranceList = [
  {
    id: 1,
    insuranceName: "무배당하이플랜종합보험",
    insuranceCompany: "삼성화재",
    insuranceId: "L2098H5020102020000",
    insuredPerson: "홍길동",
    monthlyPremium: 20360,
    startDate: "2020-03-30",
    endDate: "2040-03-30",
    logo: "/images/tesla-logo.png",
  },
  {
    id: 2,
    insuranceName: "차량손해보험",
    insuranceCompany: "DB손해보험",
    insuranceId: "D1098H5020102020001",
    insuredPerson: "김철수",
    monthlyPremium: 15000,
    startDate: "2021-01-01",
    endDate: "2031-01-01",
    logo: "/images/tesla-logo.png",
  },
  {
    id: 3,
    insuranceName: "화재종합보험",
    insuranceCompany: "한화손해보험",
    insuranceId: "H1098H5020102020002",
    insuredPerson: "이영희",
    monthlyPremium: 30000,
    startDate: "2022-05-15",
    endDate: "2042-05-15",
    logo: "/images/tesla-logo.png",
  },
  {
    id: 4,
    insuranceName: "생명보험",
    insuranceCompany: "메리츠화재",
    insuranceId: "M2098H5020102020003",
    insuredPerson: "박영수",
    monthlyPremium: 45000,
    startDate: "2019-11-20",
    endDate: "2039-11-20",
    logo: "/images/tesla-logo.png",
  },
  {
    id: 4,
    insuranceName: "생명보험",
    insuranceCompany: "메리츠화재",
    insuranceId: "M2098H5020102020003",
    insuredPerson: "박영수",
    monthlyPremium: 45000,
    startDate: "2019-11-20",
    endDate: "2039-11-20",
    logo: "/images/tesla-logo.png",
  },
  {
    id: 4,
    insuranceName: "생명보험",
    insuranceCompany: "메리츠화재",
    insuranceId: "M2098H5020102020003",
    insuredPerson: "박영수",
    monthlyPremium: 45000,
    startDate: "2019-11-20",
    endDate: "2039-11-20",
    logo: "/images/tesla-logo.png",
  },
  {
    id: 4,
    insuranceName: "생명보험",
    insuranceCompany: "메리츠화재",
    insuranceId: "M2098H5020102020003",
    insuredPerson: "박영수",
    monthlyPremium: 45000,
    startDate: "2019-11-20",
    endDate: "2039-11-20",
    logo: "/images/tesla-logo.png",
  },
  // 더 많은 보험 항목 추가 가능
];

const hanalogo = `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`;
function AssetsInsuranceContent() {
  const calculateProgress = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();
    const total = end - start;
    const progress = now - start;
    return (progress / total) * 100 > 100 ? 100 : (progress / total) * 100;
  };

  const totalInsurancePremium = insuranceList.reduce(
    (total, insurance) => total + insurance.monthlyPremium,
    0
  );
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
            <p>총 보혐료 합계</p>
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
                    //   src={require("../../assets/images/hanalogo.png").default}
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
                  <p>{insurance.insuredPerson}</p>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <p>월 납입 보험료</p>
                  <h3 style={{ fontWeight: "600" }}>
                    {insurance.monthlyPremium.toLocaleString()}원
                  </h3>
                </div>
                <div className="insurance-item-details-date">
                  <ProgressBar
                    now={`${calculateProgress(
                      insurance.startDate,
                      insurance.endDate
                    )}`}
                  />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>가입일: {insurance.startDate}</p>
                    <p>만기일: {insurance.endDate}</p>
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
