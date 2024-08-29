import React, { useState } from "react";
import {
  IoIosArrowUp,
  IoIosArrowDown,
  IoMdArrowDropdown,
  IoMdArrowDropup,
} from "react-icons/io";
import "../../style/AssetsSecuritiesContent.css";
import SecuritiesPieChart from "./Charts/SecuritiesPieChart";
import InvestmentTable from "./Charts/InvestmentTable";
import StackedBarChart from "./Charts/StackedBarChart";

const securitiesData = [
  {
    name: "테슬라",
    amount: 10894,
    change: 8.95,
    logo: "/images/tesla-logo.png",
    prevAmount: 10000,
  },
  {
    name: "삼성전자우",
    amount: 3536500,
    change: -9.05,
    logo: "/images/samsung-logo.png",
    prevAmount: 3600000,
  },
  {
    name: "삼성전자",
    amount: 1534000,
    change: 1.94,
    logo: "/images/samsung-logo.png",
    prevAmount: 1500000,
  },
  {
    name: "LG전자우",
    amount: 127800,
    change: 9.23,
    logo: "/images/lg-logo.png",
    prevAmount: 120000,
  },
  {
    name: "대한항공",
    amount: 104000,
    change: -20.03,
    logo: "/images/korean-air-logo.png",
    prevAmount: 130000,
  },
  {
    name: "이노션",
    amount: 45700,
    change: -13.12,
    logo: "/images/innocean-logo.png",
    prevAmount: 52000,
  },
  {
    name: "애플",
    amount: 34618,
    change: 32.0,
    logo: "/images/apple-logo.png",
    prevAmount: 27000,
  },
];

function AssetsSecuritiesContent() {
  const [isHidden, setIsHidden] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleAmount = () => setIsHidden(!isHidden);
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const totalAmount = securitiesData.reduce(
    (total, security) => total + security.amount,
    0
  );

  const totalPrevAmount = securitiesData.reduce(
    (total, security) => total + security.prevAmount,
    0
  );

  const totalChange = totalAmount - totalPrevAmount;

  return (
    <div className="assets-securities-container">
      <div className="assets-securities-content">
        <div className="assets-securities-left">
          <div className="total-securities-container">
            <div style={{ display: "flex", alignItems: "center" }}>
              <h2 style={{ paddingRight: "10px", width: "150px" }}>
                총 투자 금액
              </h2>
              <button onClick={toggleAmount} className="toggle-amount-btn">
                {isHidden ? "보이기" : "숨기기"}
              </button>
            </div>
            <h1>{isHidden ? "???" : `${totalAmount.toLocaleString()}원`}</h1>
            <p
              style={{
                color: totalChange >= 0 ? "#d32f2f" : "#2287d2",
                fontWeight: "600",
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              1일 전 보다&nbsp;
              {totalChange >= 0 ? (
                <IoMdArrowDropup size={20} />
              ) : (
                <IoMdArrowDropdown size={20} />
              )}
              {totalChange >= 0
                ? totalChange.toLocaleString()
                : (-totalChange).toLocaleString()}
              원 ({(totalChange / totalPrevAmount) * 100 >= 0 ? "+" : ""}
              {((totalChange / totalPrevAmount) * 100).toFixed(2)}%)
            </p>
          </div>

          <div className="securities-section">
            <StackedBarChart></StackedBarChart>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={toggleExpanded}
            >
              <h4
                style={{
                  fontWeight: "600",
                  marginTop: "10px",
                  marginBottom: "20px",
                }}
              >
                보유 종목
              </h4>
              <span style={{ paddingLeft: "10px" }}>
                {isExpanded ? (
                  <IoIosArrowUp size={20} />
                ) : (
                  <IoIosArrowDown size={20} />
                )}
              </span>
            </div>

            {isExpanded && (
              <div className="securities-card">
                {securitiesData.map((security, index) => (
                  <div key={index} className="securities-details-row">
                    <div className="securities-detail-item">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={security.logo}
                          alt={`${security.name} logo`}
                          style={{
                            width: "30px",
                            height: "30px",
                            marginRight: "10px",
                          }}
                        />
                        <div>
                          <p style={{ fontWeight: "500" }}>{security.name}</p>
                          <p style={{ fontWeight: "600", marginBottom: "5px" }}>
                            {security.amount.toLocaleString()}원
                          </p>
                        </div>
                      </div>
                      <p
                        style={{
                          color: security.change >= 0 ? "#d32f2f" : "#2287d2",
                          fontWeight: "600",
                        }}
                      >
                        {security.change >= 0 ? "+" : ""}
                        {security.change}%
                      </p>
                    </div>
                    {index < securitiesData.length - 1 && (
                      <hr
                        style={{
                          borderColor: "#bcbcbc",
                          margin: "10px 0",
                          border: "0.7px solid",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="assets-securities-right">
          <h4 style={{ fontWeight: "600", marginBottom: "20px" }}>
            투자 자산 현황
          </h4>
          <div className="assets-securities-chart">
            <SecuritiesPieChart />
            <InvestmentTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssetsSecuritiesContent;
