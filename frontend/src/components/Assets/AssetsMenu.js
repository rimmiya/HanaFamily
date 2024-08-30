import React from "react";
import { Link } from "react-router-dom";
import "../../style/AssetsMainTitle.css";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import { LineChartOutlined } from "@ant-design/icons";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";

function AssetsMainTitle() {
  return (
    <div className="assets-main-menu-container">
      <div className="assets-menu-content">
        <Link to="/assetsmain" className="assets-menu">
          <LightbulbOutlinedIcon></LightbulbOutlinedIcon>
          <p>자산</p>
        </Link>
        <Link to="/assetsaccount" className="assets-menu">
          <AccountBalanceOutlinedIcon></AccountBalanceOutlinedIcon>
          <p>계좌</p>
        </Link>

        <Link to="/assetssecurities" className="assets-menu">
          <LineChartOutlined style={{ fontSize: "24px" }} />
          <p>투자</p>
        </Link>

        <Link to="/assetsloan" className="assets-menu">
          <PaidOutlinedIcon></PaidOutlinedIcon>
          <p>대출</p>
        </Link>

        <Link to="/assetsinsurance" className="assets-menu">
          <HealthAndSafetyOutlinedIcon></HealthAndSafetyOutlinedIcon>
          <p>보험</p>
        </Link>
      </div>
    </div>
  );
}

export default AssetsMainTitle;
