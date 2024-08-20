import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "../../style/Login.css"; // 기본 스타일 적용

function AuthTabs({ activeTab, onTabChange }) {
  return (
    <div className="tabs">
      <button
        className={`tab-button ${activeTab === "login" ? "active" : ""}`}
        onClick={() => onTabChange("login")}
      >
        로그인
      </button>
      <button
        className={`tab-button ${activeTab === "findId" ? "active" : ""}`}
        onClick={() => onTabChange("findId")}
      >
        아이디/비밀번호 찾기
      </button>
      <button
        className={`tab-button ${activeTab === "register" ? "active" : ""}`}
        onClick={() => onTabChange("register")}
      >
        회원가입
      </button>
    </div>
  );
}

export default AuthTabs;
