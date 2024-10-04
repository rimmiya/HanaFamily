import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store.js";
import InvitationNotifications from "./InvitationNotifications.js";
import axios from "axios";

function Header() {
  const hanalogo = `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`;
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // 클릭된 메뉴 상태 관리
  const [activeMenu, setActiveMenu] = useState(null);

  const handleLogout = () => {
    navigate("/"); // 홈페이지로 리디렉션
    dispatch(logout()); // Redux store에서 로그아웃 처리
  };

  const handleTogetherAccountClick = async () => {
    setActiveMenu("/togetheraccount"); // 클릭된 상태로 메뉴 업데이트
    navigate("/togetheraccount");
  };

  const handleManageClick = async () => {
    setActiveMenu("/jointassets"); // 클릭된 상태로 메뉴 업데이트

    try {
      const response = await axios.get(
        "http://localhost:8080/api/hanafamily/mydata/connection-status",
        {
          params: { userNo: user.userNo },
        }
      );
      const connectionStatus = response.data;

      if (connectionStatus === 0) {
        navigate("/assets");
      } else if (connectionStatus === 1) {
        navigate("/jointassets"); // '/jointassets' 경로로 명확하게 이동
      }
    } catch (error) {
      console.error("연결 상태를 확인하는 중 오류 발생:", error);
    }
  };

  // 클릭된 메뉴에 따라 스타일 적용
  const isActive = (path) => activeMenu === path || location.pathname === path;

  return (
    <header className="main bg-white h-[100px] border-b border-gray-300">
      <div className="header-box flex justify-center items-center w-full min-w-[1140px] h-[100px] shadow-[inset_0_-1px_#eee]">
        <div className="header-inner flex justify-between items-center w-[1120px] h-full">
          <div className="logo-box flex items-center justify-center">
            <h1>
              <Link to="/">
                <img src={hanalogo} alt="HanaFamily" className="w-[3.5rem]" />
              </Link>
            </h1>
            <div className="title relative inline-block ml-[12px] pl-[16px]">
              <p className="text-[23px] text-black font-semibold m-0">
                HanaFamily 하나패밀리
              </p>
              <span className="absolute top-1/2 left-0 w-px h-6 mt-[-12px] bg-gray-500 opacity-30" />
            </div>
          </div>

          <div className="nav-box flex justify-center items-center">
            <nav>
              <ul className="flex m-0">
                <li className="nav-li w-[100px]">
                  <a
                    onClick={handleManageClick}
                    className={`nav-alink flex justify-center items-center h-[80px] font-semibold text-[18px] ${
                      isActive("/jointassets") ? "active" : "text-gray-800"
                    }`}
                    style={isActive("/jointassets") ? activeStyle : {}}
                  >
                    함께 관리
                  </a>
                </li>
                <li className="nav-li w-[100px]">
                  <Link
                    to="/accountbook"
                    className={`nav-alink flex justify-center items-center h-[80px] font-semibold text-[18px] ${
                      isActive("/accountbook") ? "active" : "text-gray-800"
                    }`}
                    style={isActive("/accountbook") ? activeStyle : {}}
                    onClick={() => setActiveMenu("/accountbook")}
                  >
                    가계부
                  </Link>
                </li>
                <li className="nav-li w-[100px]">
                  <a
                    onClick={handleTogetherAccountClick}
                    className={`nav-alink flex justify-center items-center h-[80px] text-[18px] font-semibold ${
                      isActive("/togetheraccount") ? "active" : "text-gray-800"
                    }`}
                    style={isActive("/togetheraccount") ? activeStyle : {}}
                  >
                    함께 적금
                  </a>
                </li>
              </ul>
            </nav>

            {user ? (
              <>
                <span className="mx-4 text-[18px] text-black">
                  {user.userName}
                </span>
                <InvitationNotifications />
                <button
                  onClick={handleLogout}
                  className="btn-link register w-[100px] h-[30px] leading-[30px] mx-4 px-3 text-sm font-normal text-black bg-[#e7eaf1] rounded-full text-center font-semibold"
                  style={{ textDecoration: "none" }}
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth?tab=login"
                  className="btn-link login h-[30px] leading-[30px] mx-3 px-3 text-sm font-normal text-white bg-[#009178] rounded-full w-[100px] text-center font-semibold"
                  onClick={() => setActiveMenu("/auth?tab=login")}
                >
                  로그인
                </Link>
                <Link
                  to="/auth?tab=register"
                  className="btn-link register w-[100px] h-[30px] leading-[30px] mx-3 px-3 text-sm font-normal text-black bg-[#e7eaf1] rounded-full text-center font-semibold"
                  onClick={() => setActiveMenu("/auth?tab=register")}
                >
                  회원 가입
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

const activeStyle = {
  color: "#12b79b",
  borderBottom: "2px solid #12b79b",
};

export default Header;
