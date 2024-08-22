import React from "react";
import { Link } from "react-router-dom";
import "../../style/Header.css";

function Header() {
  const hanalogo = `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`;
  return (
    <header class="main">
      <div class="header-box main" style={{ left: "0px" }}>
        <div class="header-inner">
          <div class="logo-box">
            <h1>
              <Link to="/">
                <img src={hanalogo} alt="HanaFamily" />
              </Link>
            </h1>
            <div class="title">
              <p>
                <a className="font-medium text-black" href="/">
                  HanaFamily 하나패밀리
                </a>
              </p>
            </div>
          </div>
          <div class="nav-box">
            <nav>
              <ul id="ulMenu">
                <li class="nav-li">
                  <Link to="/assets" className="nav-alink">
                    내 자산
                  </Link>
                </li>
                <li class="nav-li">
                  <a href="/" class="nav-alink">
                    가계부
                  </a>
                </li>
                <li class="nav-li">
                  <a href="/" class="nav-alink">
                    함께 관리
                  </a>
                </li>
              </ul>
            </nav>
            <Link to="/auth?tab=login" class="btn-link login">
              로그인
            </Link>
            <Link to="/auth?tab=register" class="btn-link register">
              회원 가입
            </Link>
            {/* <button class="total-menu" onclick="$('#popMenu').modalOpen(this)"><span class="a11y-hide">전체메뉴 열기</span></button> */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
