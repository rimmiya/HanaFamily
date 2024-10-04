import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Axios 라이브러리 임포트
import { useDispatch } from "react-redux";
import { setLoginSuccess } from "../../store.js";
import Modal from "@mui/material/Modal"; // MUI Modal import
import Box from "@mui/material/Box"; // Modal Content Box
import AuthTabs from "./AuthTabs"; // 탭 컴포넌트 불러오기
import "../../style/AuthPage.css"; // 필요한 스타일 추가

function AuthPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get("tab") || "login";
  const [activeTab, setActiveTab] = useState(initialTab);

  // 로그인 상태
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // 로더 상태 추가

  // 회원가입 상태
  const [regUserId, setRegUserId] = useState("");
  const [isIdAvailable, setIsIdAvailable] = useState(null);
  const [idCheckMessage, setIdCheckMessage] = useState("");
  const [idButtonDisabled, setIdButtonDisabled] = useState(false);

  const [regPassword, setRegPassword] = useState("");
  const [regPasswordConfirm, setRegPasswordConfirm] = useState("");
  const [passwordMatchMessage, setPasswordMatchMessage] = useState("");

  const [residentNumber, setResidentNumber] = useState("");

  const [phone, setPhone] = useState({ part1: "", part2: "", part3: "" });
  const [isSmsSent, setIsSmsSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [smsSentMessage, setSmsSentMessage] = useState("");
  const [verificationResultMessage, setVerificationResultMessage] =
    useState("");
  const [verificationButtonDisabled, setVerificationButtonDisabled] =
    useState(false);

  const [zoneCode, setZoneCode] = useState(""); // 우편번호
  const [roadAddress, setRoadAddress] = useState(""); // 도로명 주소
  const [detailAddress, setDetailAddress] = useState(""); // 상세주소

  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 로그인 처리 함수
  const handleLogin = async (e) => {
    setIsLoading(true); // 로그인 시도시 로더 활성화
    e.preventDefault();
    console.log("로그인 시도:", userId, password); // 나중에 삭제
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/login",
        {
          userId: userId,
          userPw: password,
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        // JWT 토큰을 Redux 스토어에 저장
        dispatch(setLoginSuccess({ token: response.data }));
        navigate("/"); // 홈페이지로 리디렉션
      } else {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("로그인 실패:", error.response);
      alert("로그인 실패. 다시 시도해주세요.");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // 아이디 중복확인 함수
  const handleIdCheck = async () => {
    try {
      // const response = await axios.post(
      //   "http://localhost:8080/api/user/checkId",
      //   {
      //     userId: regUserId,
      //   }
      // );
      // if (response.data.available) {
      setIsIdAvailable(true);
      setIdCheckMessage("사용가능한 아이디 입니다.");
      setIdButtonDisabled(true);
      // } else {
      //   setIsIdAvailable(false);
      //   setIdCheckMessage("이미 사용중인 아이디 입니다.");
      // }
    } catch (error) {
      console.error("아이디 중복확인 실패:", error);
    }
  };

  // 비밀번호 확인 로직
  useEffect(() => {
    if (regPassword && regPasswordConfirm) {
      if (regPassword === regPasswordConfirm) {
        setPasswordMatchMessage("비밀번호가 일치합니다.");
      } else {
        setPasswordMatchMessage("비밀번호가 일치하지 않습니다.");
      }
    } else {
      setPasswordMatchMessage("");
    }
  }, [regPassword, regPasswordConfirm]);

  // SMS 인증번호 발송 함수
  const handleSendSms = () => {
    // 실제 구현에서는 서버 API를 호출하여 SMS 발송
    try {
      const response = axios.post("http://localhost:8080/api/user/sms/send", {
        phone: `${phone.part1}-${phone.part2}-${phone.part3}`,
      });
    } catch (error) {
      console.error("SMS 발송 실패:", error);
    }

    setIsSmsSent(true);
    setSmsSentMessage("인증코드 SMS를 발송했습니다.");
  };

  // 인증번호 확인 함수
  const handleVerifyCode = () => {
    // 실제 구현에서는 서버와 통신하여 인증번호 검증
    if (verificationCode === "9216") {
      setIsVerified(true);
      setVerificationResultMessage("인증되었습니다.");
      setVerificationButtonDisabled(true);
    } else {
      setIsVerified(false);
      setVerificationResultMessage("인증번호가 일치하지 않습니다.");
    }
  };

  // 카카오 주소 검색 API 호출 함수
  const handleAddressSearch = () => {
    if (!window.daum) {
      const script = document.createElement("script");
      script.src =
        "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.onload = openDaumPostcode;
      document.head.appendChild(script);
    } else {
      openDaumPostcode();
    }
  };

  const openDaumPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setZoneCode(data.zonecode); // 우편번호 저장
        setRoadAddress(data.address); // 도로명 주소 저장
      },
    }).open();
  };

  // 회원가입 처리 함수
  const handleRegister = () => {
    // 실제 구현에서는 회원가입 로직 추가
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      setActiveTab("login");
    }, 2000);
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
                    value={regUserId}
                    onChange={(e) => setRegUserId(e.target.value)}
                    disabled={idButtonDisabled}
                  />
                  <button
                    className="confirm-button"
                    onClick={handleIdCheck}
                    disabled={idButtonDisabled}
                    style={{ backgroundColor: idButtonDisabled ? "grey" : "" }}
                  >
                    중복확인
                  </button>
                </div>
                {idCheckMessage && (
                  <p style={{ color: isIdAvailable ? "green" : "red" }}>
                    {idCheckMessage}
                  </p>
                )}
                <p>비밀번호 *</p>
                <div className="input-box">
                  <input
                    type="password"
                    className="input_common"
                    placeholder="비밀번호"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                  />
                </div>
                <p>비밀번호 확인 *</p>
                <div className="input-box">
                  <input
                    type="password"
                    className="input_common"
                    placeholder="비밀번호 확인"
                    required
                    value={regPasswordConfirm}
                    onChange={(e) => setRegPasswordConfirm(e.target.value)}
                  />
                </div>
                {passwordMatchMessage && (
                  <p
                    style={{
                      color:
                        passwordMatchMessage === "비밀번호가 일치합니다."
                          ? "green"
                          : "red",
                    }}
                  >
                    {passwordMatchMessage}
                  </p>
                )}
                <p>이름 *</p>
                <div className="input-box">
                  <input
                    type="text"
                    className="input_common"
                    placeholder="이름"
                    required
                    onChange={(e) => setResidentNumber(e.target.value)}
                  />
                </div>
                <p>주민등록번호 *</p>
                <div className="input-box">
                  <input
                    type="text"
                    className="input_common"
                    style={{ width: "calc(30% - 10px)" }}
                    placeholder="주민등록번호"
                    required
                    onChange={(e) => setResidentNumber(e.target.value)}
                  />
                  <p>&nbsp;-&nbsp;</p>
                  <input
                    type="password"
                    className="input_common"
                    style={{ width: "calc(30% - 10px)" }}
                    placeholder="주민등록번호"
                    required
                    onChange={(e) => setResidentNumber(e.target.value)}
                  />
                </div>
                {/* 나머지 회원가입 폼 필드 */}
                <p>휴대전화번호 *</p>
                <div className="phone-box">
                  <input
                    type="text"
                    placeholder=""
                    required
                    value={phone.part1}
                    onChange={(e) =>
                      setPhone({ ...phone, part1: e.target.value })
                    }
                  />
                  <p>-</p>
                  <input
                    type="text"
                    placeholder=""
                    required
                    value={phone.part2}
                    onChange={(e) =>
                      setPhone({ ...phone, part2: e.target.value })
                    }
                  />
                  <p>-</p>
                  <input
                    type="text"
                    placeholder=""
                    required
                    value={phone.part3}
                    onChange={(e) =>
                      setPhone({ ...phone, part3: e.target.value })
                    }
                  />
                  <button
                    className="confirm-button"
                    onClick={handleSendSms}
                    style={{ backgroundColor: isSmsSent ? "grey" : "" }}
                  >
                    인증번호 받기
                  </button>
                </div>
                {smsSentMessage && (
                  <p style={{ color: "green" }}>{smsSentMessage}</p>
                )}
                <p>인증번호 *</p>
                <div className="input-box">
                  <input
                    type="text"
                    className="input_common"
                    placeholder="인증번호"
                    required
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    disabled={verificationButtonDisabled}
                  />
                  <button
                    className="confirm-button"
                    onClick={handleVerifyCode}
                    disabled={verificationButtonDisabled}
                    style={{
                      backgroundColor: verificationButtonDisabled ? "grey" : "",
                    }}
                  >
                    인증번호 확인
                  </button>
                </div>
                {verificationResultMessage && (
                  <p style={{ color: isVerified ? "green" : "red" }}>
                    {verificationResultMessage}
                  </p>
                )}
                <p>이메일 *</p>
                <div className="input-box">
                  <input
                    type="text"
                    className="input_common"
                    style={{ width: "calc(30% - 10px)" }}
                    placeholder="이메일"
                    required
                    onChange={(e) => setResidentNumber(e.target.value)}
                  />
                  <p>&nbsp;@&nbsp;</p>
                  <select className="input_common">
                    <option value="naver.com">naver.com</option>
                    <option value="daum.net">daum.net</option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="nate.com">nate.com</option>
                    <option value="hotmail.com">hotmail.com</option>
                    <option value="yahoo.com">yahoo.com</option>
                    <option value="직접입력">직접입력</option>
                  </select>
                </div>
                <p>주소 *</p>
                <div className="address-box1">
                  <input type="text" value={zoneCode} readOnly required />
                  <button
                    className="confirm-button"
                    onClick={handleAddressSearch}
                  >
                    주소 검색
                  </button>
                </div>
                <div className="address-box2">
                  <input type="text" value={roadAddress} readOnly required />
                </div>
                <div className="address-box2">
                  <input
                    type="text"
                    placeholder="상세주소"
                    required
                    value={detailAddress}
                    onChange={(e) => setDetailAddress(e.target.value)}
                  />
                </div>
                <div className="agree-box">
                  <button className="cancel-button">취소</button>
                  <button className="register-button" onClick={handleRegister}>
                    회원가입
                  </button>
                </div>
              </div>
            </div>
            {/* 회원가입 완료 모달 (Material-UI) */}
            <Modal
              open={showModal}
              onClose={() => setShowModal(false)} // 모달 외부 클릭 시 닫힘
              aria-labelledby="회원 가입 완료"
              aria-describedby="회원 가입이 성공적으로 완료되었습니다."
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                  textAlign: "center",
                  borderRadius: 2,
                }}
              >
                <h2 id="회원 가입 완료">회원 가입 완료</h2>
                <p id="회원 가입이 성공적으로 완료되었습니다.">
                  회원 가입이 완료되었습니다! <br /> 잠시 후 로그인 페이지로
                  이동합니다.
                </p>
              </Box>
            </Modal>
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
