import React, { useState } from "react";
import AuthTabs from "./AuthTabs"; // 탭 컴포넌트 불러오기
import "../../style/AuthPage.css"; // 필요한 스타일 추가

function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  const renderContent = () => {
    switch (activeTab) {
      case "login":
        return (
          <div className="auth-form-container">
            <h2>로그인</h2>
            <div className="auth-form">
              <div className="auth-form-inner">
                <div className="inner-title">LOGIN</div>
                <p>아이디</p>
                <input type="text" placeholder="아이디" />
                <p>비밀번호</p>
                <input type="password" placeholder="비밀번호" />
                <button className="submit-button">로그인</button>
                <p className="center">
                  <span onClick={() => setActiveTab("findId")}>
                    아이디/비밀번호 찾기
                  </span>{" "}
                  |{" "}
                  <span onClick={() => setActiveTab("register")}>회원가입</span>
                </p>
                <button className="submit-button">로그인</button>
              </div>
            </div>
          </div>
        );
      case "findId":
        return (
          <div className="auth-form-container">
            <h2>아이디/비밀번호 찾기</h2>
            <div className="find-form">
              <input type="text" placeholder="이메일 또는 전화번호" />
              <button className="submit-button">아이디 찾기</button>
            </div>
          </div>
        );
      case "register":
        return (
          <div className="auth-form-container">
            <h2>회원가입</h2>
            <div className="register-form">
              <input type="text" placeholder="아이디" />
              <input type="email" placeholder="이메일" />
              <input type="password" placeholder="비밀번호" />
              <input type="password" placeholder="비밀번호 확인" />
              <button className="submit-button">회원가입</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="auth-page">
        <div className="auth-page-title">
          <p>회원서비스</p>
          <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        <div className="auth-page-content">
          <div className="content">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
