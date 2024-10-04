import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Axios 라이브러리 임포트
import { useDispatch, useSelector } from "react-redux";
import { setLoginSuccess } from "../../store.js";
import AuthTabs from "./AuthTabs.js"; // 탭 컴포넌트 불러오기
import "../../style/AuthPage.css"; // 필요한 스타일 추가
import Modal from "@mui/material/Modal"; // Material-UI 모달 컴포넌트 사용
import Box from "@mui/material/Box"; // Material-UI Box 컴포넌트

function FamilyJoinAuthPage({ inviteKey }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get("tab") || "login";
  const [activeTab, setActiveTab] = useState(initialTab);

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // 로더 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    setIsLoading(true); // 로그인 시도 시 로더 활성화
    e.preventDefault();
    console.log("로그인 시도:", userId, password); // 나중에 삭제

    try {
      // 로그인 API 호출
      const response = await axios.post(
        "http://localhost:8080/api/user/login",
        {
          userId: userId,
          userPw: password,
          // inviteKey: inviteKey, // 초대장 키 함께 전달
        }
      );

      if (response.status === 200) {
        console.log(response.data);
        // JWT 토큰을 Redux 스토어에 저장
        dispatch(setLoginSuccess({ token: response.data }));

        // 초대장 검증 API 호출
        const verifyResponse = await axios.post(
          "http://localhost:8080/api/invitations/verify",
          {
            inviteKey: inviteKey,
            userId: userId, // 로그인된 사용자의 전화번호
          }
        );

        if (verifyResponse.status === 200) {
          setIsModalOpen(true); // 초대 성공 시 모달 열기
          setTimeout(() => {
            setIsModalOpen(false);
            navigate("/assetsjoin"); // 3초 후 초대 성공 페이지로 이동
          }, 3000);
        } else {
          navigate("/invite-failed"); // 초대 실패 페이지로 이동
        }
      } else {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("로그인 실패:", error.response);
      alert("로그인 실패. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/register",
        {
          userId: userId,
          userPw: password,
          // inviteKey: inviteKey, // 초대장 키 함께 전달
        }
      );

      if (response.status === 200) {
        // 회원가입 성공 처리
        const verifyResponse = await axios.post(
          "http://localhost:8080/api/invitations/verify",
          {
            inviteKey: inviteKey,
            userId: userId, // 등록된 사용자의 전화번호
          }
        );

        if (verifyResponse.status === 200) {
          setIsModalOpen(true); // 초대 성공 시 모달 열기
          setTimeout(() => {
            setIsModalOpen(false);
            navigate("/assetsjoin"); // 3초 후 초대 성공 페이지로 이동
          }, 3000);
        } else {
          navigate("/invite-failed"); // 초대 실패 페이지로 이동
        }
      } else {
        alert("회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 실패:", error.response);
      alert("회원가입 실패. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    // URL이 변경될 때 쿼리 파라미터를 다시 확인하여 탭을 설정합니다.
    const newTab = queryParams.get("tab") || "login";
    setActiveTab(newTab);
  }, [location]);

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
                <input
                  type="text"
                  id="userId"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="아이디"
                />
                <p>비밀번호</p>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호"
                />
                <button onClick={handleLogin} className="submit-button">
                  로그인
                </button>
                <p className="center">
                  <span onClick={() => setActiveTab("findId")}>
                    아이디/비밀번호 찾기
                  </span>{" "}
                  |{" "}
                  <span onClick={() => setActiveTab("register")}>회원가입</span>
                </p>
              </div>
            </div>
          </div>
        );
      case "findId":
        return (
          <div className="auth-form-container">
            <h2>아이디/비밀번호 찾기</h2>
            <div className="find-form">
              <div className="find-form-inner">
                <div className="inner-title">아이디/비밀번호 찾기</div>
                <p>이름</p>
                <input type="text" placeholder="이름" />
                <p>전화번호</p>
                <input type="phone" placeholder="전화번호" />
                <button className="submit-button">아이디 찾기</button>
              </div>
            </div>
          </div>
        );
      case "register":
        return (
          <div className="auth-form-container">
            <h2>회원가입</h2>
            <div className="register-form">
              <div className="register-form-inner">
                <div className="inner-title">회원가입</div>
                <p>아이디 *</p>
                <div className="input-box">
                  <input
                    type="text"
                    name="c_id"
                    className="input_common"
                    placeholder="아이디"
                    required
                  />
                  <button className="confirm-button" required>
                    중복확인
                  </button>
                </div>
                <p>비밀번호 *</p>
                <div className="input-box">
                  <input
                    type="password"
                    className="input_common"
                    placeholder="비밀번호"
                    required
                  />
                </div>
                <p>비밀번호 확인 *</p>
                <div className="input-box">
                  <input
                    type="password"
                    className="input_common"
                    placeholder="비밀번호 확인"
                    required
                  />
                </div>
                <p>이름 *</p>
                <div className="input-box">
                  <input
                    type="text"
                    className="input_common"
                    placeholder="이름"
                    required
                  />
                </div>
                <p>생년월일 *</p>
                <div className="birth-box">
                  <select
                    name="c_birth_year"
                    className="select_common"
                    required
                  >
                    <option value="">년도</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                    <option value="2009">2009</option>
                    <option value="2008">2008</option>
                    <option value="2007">2007</option>
                    <option value="2006">2006</option>
                    <option value="2005">2005</option>
                    <option value="2004">2004</option>
                    <option value="2003">2003</option>
                    <option value="2002">2002</option>
                    <option value="2001">2001</option>
                    <option value="2000">2000</option>
                    <option value="1999">1999</option>
                    <option value="1998">1998</option>
                    <option value="1997">1997</option>
                    <option value="1996">1996</option>
                    <option value="1995">1995</option>
                    <option value="1994">1994</option>
                    <option value="1993">1993</option>
                    <option value="1992">1992</option>
                    <option value="1991">1991</option>
                    <option value="1990">1990</option>
                    <option value="1989">1989</option>
                    <option value="1988">1988</option>
                    <option value="1987">1987</option>
                    <option value="1986">1986</option>
                    <option value="1985">1985</option>
                    <option value="1984">1984</option>
                    <option value="1983">1983</option>
                    <option value="1982">1982</option>
                    <option value="1981">1981</option>
                    <option value="1980">1980</option>
                    <option value="1979">1979</option>
                    <option value="1978">1978</option>
                    <option value="1977">1977</option>
                    <option value="1976">1976</option>
                    <option value="1975">1975</option>
                    <option value="1974">1974</option>
                    <option value="1973">1973</option>
                    <option value="1972">1972</option>
                    <option value="1971">1971</option>
                    <option value="1970">1970</option>
                    <option value="1969">1969</option>
                    <option value="1968">1968</option>
                    <option value="1967">1967</option>
                    <option value="1966">1966</option>
                    <option value="1965">1965</option>
                    <option value="1964">1964</option>
                    <option value="1963">1963</option>
                    <option value="1962">1962</option>
                    <option value="1961">1961</option>
                    <option value="1960">1960</option>
                    <option value="1959">1959</option>
                    <option value="1958">1958</option>
                    <option value="1957">1957</option>
                    <option value="1956">1956</option>
                    <option value="1955">1955</option>
                    <option value="1954">1954</option>
                    <option value="1953">1953</option>
                    <option value="1952">1952</option>
                    <option value="1951">1951</option>
                    <option value="1950">1950</option>
                    <option value="1949">1949</option>
                    <option value="1948">1948</option>
                    <option value="1947">1947</option>
                    <option value="1946">1946</option>
                    <option value="1945">1945</option>
                    <option value="1944">1944</option>
                    <option value="1943">1943</option>
                    <option value="1942">1942</option>
                    <option value="1941">1941</option>
                    <option value="1940">1940</option>
                    <option value="1939">1939</option>
                    <option value="1938">1938</option>
                    <option value="1937">1937</option>
                    <option value="1936">1936</option>
                    <option value="1935">1935</option>
                  </select>{" "}
                  <p>년</p>
                  <select
                    name="c_birth_month"
                    className="select_common"
                    required
                  >
                    <option value="">월</option>
                    <option value="01">1</option>
                    <option value="02">2</option>
                    <option value="03">3</option>
                    <option value="04">4</option>
                    <option value="05">5</option>
                    <option value="06">6</option>
                    <option value="07">7</option>
                    <option value="08">8</option>
                    <option value="09">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </select>{" "}
                  <p>월</p>
                  <select name="c_birth_day" className="select_common" required>
                    <option value="">일</option>
                    <option value="01">1</option>
                    <option value="02">2</option>
                    <option value="03">3</option>
                    <option value="04">4</option>
                    <option value="05">5</option>
                    <option value="06">6</option>
                    <option value="07">7</option>
                    <option value="08">8</option>
                    <option value="09">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                  </select>{" "}
                  <p>일</p>
                </div>
                <p>휴대전화번호 *</p>
                <div className="phone-box">
                  <input type="phone1" placeholder="" required />
                  <p>-</p>
                  <input type="phone2" placeholder="" required />
                  <p>-</p>
                  <input type="phone3" placeholder="" required />
                  <button className="confirm-button">인증번호 받기</button>
                </div>
                <p>인증번호 *</p>
                <div className="input-box">
                  <input
                    type="text"
                    className="input_common"
                    placeholder="인증번호"
                    required
                  />
                  <button className="confirm-button">인증번호 확인</button>
                </div>
                <p>이메일 *</p>
                <div className="email-box">
                  <input type="email" placeholder="이메일" required />
                  <p>@</p>
                  <input type="email" placeholder="이메일" required />
                  <select name="email" className="select_common" required>
                    <option value="">직접입력</option>
                    <option value="naver.com">naver.com</option>
                    <option value="daum.net">daum.net</option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="nate.com">nate.com</option>
                    <option value="hotmail.com">hotmail.com</option>
                    <option value="yahoo.com">yahoo.com</option>
                    <option value="hanmail.net">hanmail.net</option>
                    <option value="empas.com">empas.com</option>
                    <option value="dreamwiz.com">dreamwiz.com</option>
                    <option value="korea.com">korea.com</option>
                    <option value="lycos.co.kr">lycos.co.kr</option>
                    <option value="paran.com">paran.com</option>
                    <option value="freechal.com">freechal.com</option>
                    <option value="hanmir.com">hanmir.com</option>
                    <option value="hitel.net">hitel.net</option>
                    <option value="chol.com">chol.com</option>
                    <option value="netian.com">netian.com</option>
                    <option value="hanafos.com">hanafos.com</option>
                    <option value="kornet.net">kornet.net</option>
                  </select>
                </div>
                <p>주소 *</p>
                <div className="address-box1">
                  <input type="text" required />
                  <button className="address-button">주소 검색</button>
                </div>
                <div className="address-box2">
                  <input type="text" placeholder="상세주소" required />
                  <input type="text" placeholder="상세주소" required />
                </div>
                <div className="agree-box">
                  <button className="cancel-button">취소</button>
                  <button onClick={handleRegister} className="submit-button">
                    회원가입
                  </button>
                </div>
              </div>
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
      {/* 모달 UI */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: "10px",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>초대 완료</h2>
          <p>가족 초대가 완료되었습니다!</p>
        </Box>
      </Modal>
    </div>
  );
}

export default FamilyJoinAuthPage;
