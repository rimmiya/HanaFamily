import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Navigation } from "swiper/modules";
import {
  Button,
  message,
  Steps,
  Tooltip,
  theme,
  DatePicker,
  Input,
} from "antd";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "../../style/AssetsJoinContent.css";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import { useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton"; // Material UI imports
import CheckIcon from "@mui/icons-material/Check";
import Link from "@mui/material/Link";
import TermsContent1 from "./Terms/TermContent1";
import TermsContent2 from "./Terms/TermContent2";
import SyncLoader from "react-spinners/SyncLoader";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

// Material-UI의 체크박스 아이콘 커스텀
const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  "& .MuiSvgIcon-root": {
    borderRadius: "50%", // 원형으로 만듭니다
    color: "#9e9e9e", // 비선택 상태의 색상
  },
  "&.Mui-checked .MuiSvgIcon-root": {
    color: "#009178", // 선택된 상태의 색상
  },
}));

const steps = [
  {
    title: "약관동의",
  },
  {
    title: "기관 선택",
  },
  {
    title: "본인 인증",
  },
  {
    title: "자산 연결",
  },
  {
    title: "완료",
  },
];

const categoryTranslation = {
  bank: "은행",
  card: "카드",
  insurance: "보험",
};

const tabsData = {
  bank: [
    {
      name: "하나은행",
      imageUrl: `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`,
    },
    {
      name: "신한은행",
      imageUrl: `${process.env.PUBLIC_URL}/img/sh-logo.png`,
    },
    {
      name: "국민은행",
      imageUrl: `${process.env.PUBLIC_URL}/img/kb-logo.png`,
    },
    {
      name: "우리은행",
      imageUrl: `${process.env.PUBLIC_URL}/img/wr-logo.png`,
    },
    {
      name: "농협은행",
      imageUrl: `${process.env.PUBLIC_URL}/img/nh-logo.png`,
    },
    {
      name: "IBK기업은행",
      imageUrl: `${process.env.PUBLIC_URL}/img/ibk-logo.png`,
    },
  ],
  card: [
    {
      name: "하나카드",
      imageUrl: `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`,
    },
    {
      name: "신한카드",
      imageUrl: `${process.env.PUBLIC_URL}/img/sh-logo.png`,
    },
    {
      name: "국민카드",
      imageUrl: `${process.env.PUBLIC_URL}/img/kb-logo.png`,
    },
    {
      name: "우리카드",
      imageUrl: `${process.env.PUBLIC_URL}/img/wr-logo.png`,
    },
    {
      name: "현대카드",
      imageUrl: `${process.env.PUBLIC_URL}/img/hd-logo.png`,
    },
  ],
  insurance: [
    {
      name: "삼성화재",
      imageUrl: `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`,
    },
    {
      name: "현대해상",
      imageUrl: `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`,
    },
    {
      name: "메리츠화재",
      imageUrl: `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`,
    },
    {
      name: "흥국화재",
      imageUrl: `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`,
    },
    {
      name: "DB손해보험",
      imageUrl: `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`,
    },
    {
      name: "롯데손해보험",
      imageUrl: `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`,
    },
    {
      name: "KB손해보험",
      imageUrl: `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`,
    },
    {
      name: "MG손해보험",
      imageUrl: `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`,
    },
    {
      name: "동양화재",
      imageUrl: `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`,
    },
    {
      name: "한화손해보험",
      imageUrl: `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`,
    },
    {
      name: "하나손해보험",
      imageUrl: `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`,
    },
  ],
};

function AssetsJoinContent() {
  const [current, setCurrent] = useState(0);
  const swiperRef = useRef(null);
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅 사용

  const [selectedOption, setSelectedOption] = useState("전체");
  const [customDate, setCustomDate] = useState(null);

  const [termsAccepted, setTermsAccepted] = useState({
    term1: false,
    term2: false,
  });

  // 문자인증 관련 상태 주석 처리
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [verificationCode, setVerificationCode] = useState("");
  // const [isPhoneVerified, setIsPhoneVerified] = useState(false); // 문자인증 완료 여부
  // const [isVerificationSent, setIsVerificationSent] = useState(false); // 인증코드 발송 여부
  // const [loadingVerification, setLoadingVerification] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [myDataApiData, setMydataApiData] = useState(null); // API 응답 데이터를 저장할 상태
  const [isComplete, setIsComplete] = useState(false); // 완료 상태 관리
  const [transactionData, setTransactionData] = useState([]); // 거래 내역 데이터 상태
  const [loadingTransactions, setLoadingTransactions] = useState(false); // 거래 내역 로딩 상태

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

  // isNextEnabled 변수 수정 (isPhoneVerified 제거)
  const isNextEnabled = termsAccepted.term1 && termsAccepted.term2;
  const hanafamilyImg = `${process.env.PUBLIC_URL}/img/hanafamily-character.png`;

  const next = async () => {
    if (!isNextEnabled) {
      message.warning("약관 동의를 모두 완료해야 합니다.");
    } else if (current === 0) {
      swiperRef.current.slideNext();
    } else if (current === 1) {
      await fetchApiData();

      // 슬라이드 4으로 넘어갈 때 체크박스 선택 초기화
      setSelections({
        card: [],
        account: [],
        loan: [],
        security: [],
        insurance: [],
      });
    } else if (current === 2) {
      swiperRef.current.slideNext();
    } else if (current === 3) {
      console.log("선택된 자산들:", selections);
      setIsModalVisible(true); // 로딩 모달 표시
      setIsLoading(true); // 스피너 시작
      setIsComplete(false); // 완료 상태 초기화
      // 2초 뒤에 완료 상태로 전환
      setTimeout(() => {
        console.log("선택된 자산들(before):", selections);
        setIsLoading(false); // 스피너 종료
        setIsComplete(true); // 완료 상태로 변경
        setTimeout(() => {
          console.log("선택된 자산들(after):", selections);
          setIsModalVisible(false); // 1초 뒤에 모달 닫기
          swiperRef.current.slideNext(); // 슬라이드 넘기기
        }, 2500);
      }, 3000);
    }
  };

  const handleCategorySelectAll = (category) => {
    const allItems =
      myDataApiData?.[category]?.map((institution) =>
        category === "security"
          ? institution.securityAccount // 증권 계좌의 경우 securityAccount 사용
          : institution[`${category}Id`] || institution[`${category}No`]
      ) || [];

    const isAllSelected = selections[category]?.length === allItems.length;

    setSelections((prev) => ({
      ...prev,
      [category]: isAllSelected ? [] : allItems, // 전체 선택/해제
    }));
  };

  const prev = () => {
    if (swiperRef.current && current > 0) {
      swiperRef.current.slidePrev();
    }
  };

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
    if (verificationCode === "6456") {
      setIsVerified(true);
      setVerificationResultMessage("인증되었습니다.");
      setVerificationButtonDisabled(true);
    } else {
      setIsVerified(false);
      setVerificationResultMessage("인증번호가 일치하지 않습니다.");
    }
  };

  // API 호출 함수
  const fetchApiData = async () => {
    setIsLoading(true);
    setIsModalVisible(true); // 로딩 모달 표시
    setIsComplete(false); // 완료 상태 초기화
    const apiData = prepareApiData(); // 준비된 API 데이터를 가져옴
    console.log("API 요청 데이터:", apiData);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/hanafamily/mydata/request",
        apiData
      );

      setTimeout(() => {
        setIsLoading(false);
        setMydataApiData(response.data); // API 응답 데이터 저장
        message.success("자산 연결이 완료되었습니다!");
        setIsComplete(true); // 완료 상태로 변경
        setTimeout(() => {
          setIsModalVisible(false); // 1초 뒤에 모달 닫기
          swiperRef.current.slideNext(); // 슬라이드 넘기기
        }, 2500);
      }, 3000); // 모달이 닫히기 전 잠시 멈춤
    } catch (error) {
      console.error("API 요청 실패:", error);
      setIsLoading(false);
      setIsModalVisible(false); // 로딩 모달 표시
      message.error("자산 연결 실패. 다시 시도해주세요.");
    }
  };

  // handleSlideChange 함수에서 선택 상태 동기화 추가
  const handleSlideChange = (swiper) => {
    setCurrent(swiper.activeIndex);
    console.log("swiper.activeIndex:", swiper.activeIndex);
    console.log("selections:", selections);
  };

  const handleCheckboxChange = (e) => {
    setTermsAccepted((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.checked,
    }));
  };

  const items = steps.map((item, index) => ({
    key: item.title,
    title: (
      <span
        style={{
          color: current === index ? "#009178" : "#d9d9d9",
          fontWeight: "500",
        }}
      >
        {item.title}
      </span>
    ),
    icon: (
      <div
        style={{
          backgroundColor: current >= index ? "#009178" : "#d9d9d9",
          borderRadius: "50%",
          width: "32px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "Arial",
          fontSize: "16px",
        }}
      >
        {index + 1}
      </div>
    ),
  }));

  const [currentTab, setCurrentTab] = useState("bank");
  const [selections, setSelections] = useState({
    card: [],
    bank: [],
    security: [],
    insurance: [],
    loan: [],
  });

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
  };

  const handleItemClick = (item) => {
    setSelections((prev) => {
      const selectedItems = prev[currentTab];
      const isSelected = selectedItems.includes(item.name);

      return {
        ...prev,
        [currentTab]: isSelected
          ? selectedItems.filter((selected) => selected !== item.name)
          : [...selectedItems, item.name],
      };
    });
  };

  // 모두 선택 핸들러
  const handleSelectAll = () => {
    if (tabsData[currentTab]) {
      const allSelected =
        selections[currentTab].length === tabsData[currentTab].length;

      setSelections((prev) => ({
        ...prev,
        [currentTab]: allSelected
          ? []
          : tabsData[currentTab].map((item) => item.name),
      }));
    }
  };

  // 개별 자산 선택/해제
  const handleItemClick2 = (category, key, institution) => {
    setSelections((prev) => ({
      ...prev,
      [category]: prev[category].includes(key)
        ? prev[category].filter((i) => i !== key) // 이미 선택된 항목을 해제
        : [...prev[category], key], // 선택되지 않은 경우 추가
    }));
  };

  const user = useSelector((state) => state.user.userInfo);

  const prepareApiData = () => {
    return {
      userNo: Number(user.userNo), // 사용자 번호 숫자형으로 변환
      bankCode: (selections.bank || []).map((item) => getBankCode(item)), // 선택한 은행을 bankCode로 변환
      cardCode: (selections.card || []).map((item) => getCardCode(item)), // 선택한 카드 정보를 cardCode로 변환
      loanBank: (selections.bank || []).map((item) =>
        String(getBankCode(item))
      ), // 선택한 대출 정보를 loanCode로 변환
      insuranceCode: (selections.insurance || []).map((item) =>
        String(getInsuranceCode(item))
      ), // 선택한 보험 정보를 insuranceCode로 변환
      securityCode: (selections.security || []).map((item) =>
        getSecurityCode(item)
      ), // 선택한 증권 정보를 securityCode로 변환
    };
  };

  // 은행 코드를 반환하는 함수
  const getBankCode = (item) => {
    // 은행 항목을 bankCode로 변환하는 로직
    if (item === "하나은행") return 130;
    if (item === "신한은행") return 110;
    if (item === "국민은행") return 100;
    if (item === "우리은행") return 120;
    if (item === "농협은행") return 150;
    if (item === "IBK기업은행") return 140;
    // 다른 은행 추가 가능
  };

  // 카드 코드를 반환하는 함수
  const getCardCode = (item) => {
    if (item === "하나카드") return 600;
    if (item === "신한카드") return 100;
    if (item === "국민카드") return 200;
    if (item === "우리카드") return 1100;
    if (item === "현대카드") return 400;
    // 다른 카드 추가 가능
  };

  // 보험 코드를 반환하는 함수
  const getInsuranceCode = (item) => {
    if (item === "삼성화재") return 100;
    if (item === "현대해상") return 200;
    if (item === "메리츠화재") return 300;
    if (item === "흥국화재") return 800;
    if (item === "DB손해보험") return 400;
    if (item === "롯데손해보험") return 500;
    if (item === "KB손해보험") return 600;
    if (item === "MG손해보험") return 700;
    if (item === "동양화재") return 900;
    if (item === "한화손해보험") return 1000;
    if (item === "하나손해보험") return 1100;
  };

  // 증권 코드를 반환하는 함수
  const getSecurityCode = (item) => {
    if (item === "한국투자증권") return "STOCKA001";
    if (item === "미래에셋증권") return 502;
    if (item === "NH투자증권") return 503;
    if (item === "KB증권") return 504;
    if (item === "하나금융투자") return 505;
    // 다른 증권사 추가 가능
  };

  // 코드와 이름 매핑 객체
  const bankCodeMapping = {
    130: "하나은행",
    110: "신한은행",
    100: "국민은행",
    120: "우리은행",
    140: "IBK기업은행",
    150: "농협은행",
    160: "외환은행",
    170: "SC제일은행",
    180: "씨티은행",
    190: "대구은행",
    200: "부산은행",
  };

  const cardCodeMapping = {
    600: "하나카드",
    100: "신한카드",
    200: "국민카드",
    1100: "우리카드",
    400: "현대카드",
    500: "롯데카드",
    300: "삼성카드",
    700: "NH농협카드",
    800: "외환카드",
    900: "씨티카드",
    1000: "수협카드",
  };

  const loanCodeMapping = {
    101: "주택담보대출",
    102: "신용대출",
    // 추가 대출 코드와 이름
  };

  const insuranceCodeMapping = {
    100: "삼성화재",
    200: "현대해상",
    300: "메리츠화재",
    400: "DB손해보험",
    500: "롯데손해보험",
    600: "KB손해보험",
    700: "MG손해보험",
    800: "흥국화재",
    900: "동양화재",
    1000: "한화손해보험",
    1100: "하나손해보험",
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    if (e.target.value !== "직접 선택") {
      setCustomDate(null);
    }
  };

  const handleDateChange = (date) => {
    setCustomDate(date);
  };

  const renderDateInfo = () => {
    if (selectedOption === "전체") {
      return (
        <span>
          <span style={{ fontWeight: "600", color: "#009178" }}>전체 내역</span>
          이 공유돼요
        </span>
      );
    } else if (selectedOption === "이번달부터") {
      return (
        <span>
          <span style={{ fontWeight: "600", color: "#009178" }}>
            {dayjs().format("YYYY년 MM월 01일")}
          </span>
          &nbsp;내역부터 공유돼요
        </span>
      );
    } else if (selectedOption === "지난달부터") {
      return (
        <span>
          <span style={{ fontWeight: "600", color: "#009178" }}>
            {dayjs().subtract(1, "month").format("YYYY년 MM월 01일")}
          </span>
          &nbsp;내역부터 공유돼요
        </span>
      );
    } else if (selectedOption === "3개월 전부터") {
      return (
        <span>
          <span style={{ fontWeight: "600", color: "#009178" }}>
            {dayjs().subtract(3, "month").format("YYYY년 MM월 01일")}
          </span>
          &nbsp;내역부터 공유돼요
        </span>
      );
    } else if (selectedOption === "직접 선택" && customDate) {
      return (
        <span>
          <span style={{ fontWeight: "600", color: "#009178" }}>
            {customDate.format("YYYY년 MM월 DD일")}
          </span>
          &nbsp;내역부터 공유돼요
        </span>
      );
    } else {
      return <span>공유 시작일을 선택해주세요</span>;
    }
  };

  // 카테고리와 자산을 출력하는 함수
  const renderAssets = () => {
    if (!myDataApiData) return null;

    const categories = {
      account: "은행",
      card: "카드",
      loan: "대출",
      insurance: "보험",
      security: "증권",
    };

    return Object.keys(categories).map((category) => {
      const institutions = myDataApiData?.[category];
      // 자산이 없거나 카테고리가 존재하지 않으면 렌더링하지 않음
      if (!Array.isArray(institutions) || institutions.length === 0) {
        return null;
      }

      return (
        <div
          key={category}
          className="category-section"
          style={{ marginBottom: "30px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3
              style={{
                marginLeft: "54px",
                marginTop: "5px",
                color: "#333333",
              }}
            >
              {categories[category]}
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "54px",
              }}
            >
              <CustomCheckbox
                id="selectAll"
                onChange={() => handleCategorySelectAll(category)}
                checked={
                  (selections[category] || []).length === institutions.length
                } // 빈 배열 처리
                icon={<CheckCircleOutlineIcon />}
                checkedIcon={<CheckCircleIcon />}
              />
              <label
                htmlFor="selectAll"
                style={{
                  marginLeft: "8px",
                  fontSize: "16px",
                  color: "#000000",
                  cursor: "pointer",
                }}
              >
                전체 선택
              </label>
            </div>
          </div>

          {institutions.map((institution) => {
            // 카테고리에 따라 사용되는 key 값 설정
            const key =
              category === "security"
                ? institution.securityAccount // 증권 계좌의 경우 securityAccount 사용
                : institution[`${category}Id`] || institution[`${category}No`]; // 다른 카테고리의 경우 기존 방식

            // 코드 매핑을 통한 이름 가져오기
            let institutionName = "";

            // console.log("institution:", institution);
            // console.log("category:", category);
            if (category === "account") {
              const bankCode = institution.bankCode; // institution에서 bankCode 가져오기
              institutionName = bankCodeMapping[bankCode] || "알 수 없는 은행";
            } else if (category === "card") {
              const cardCode = institution.cardCode; // institution에서 cardCode 가져오기
              // console.log("cardCode:", cardCode);
              // console.log("cardCodeMapping:", cardCodeMapping);
              // console.log(
              //   "cardCodeMapping[cardCode]:",
              //   cardCodeMapping[cardCode]
              // );
              institutionName = cardCodeMapping[cardCode] || "알 수 없는 카드";
            } else if (category === "loan") {
              const loanCode = institution.loanType; // institution에서 loanCode 가져오기
              institutionName = loanCode || "알 수 없는 대출";
            } else if (category === "insurance") {
              const insuranceCode = institution.insuranceCode; // institution에서 insuranceCode 가져오기
              institutionName =
                insuranceCodeMapping[insuranceCode] || "알 수 없는 보험";
            } else if (category === "security") {
              // 증권의 경우 별도의 로직 또는 기존 방식 사용
              institutionName = institution.securityName || "알 수 없는 증권";
            } else {
              // 기타 카테고리의 경우 기존 방식 유지
              institutionName =
                institution[`${category}Name`] ||
                institution.accountName ||
                institution.cardName ||
                institution.loanName ||
                institution.insuranceName ||
                institution.securityName;
            }

            return (
              <div key={key}>
                <Accordion defaultActiveKey={key}>
                  <Accordion.Item eventKey={key}>
                    <Accordion.Header style={{ backgroundColor: "#ffffff" }}>
                      {institutionName}
                    </Accordion.Header>
                    <Accordion.Body
                      style={{ backgroundColor: "rgb(46 81 57 / 7%)" }}
                    >
                      <div
                        key={key}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          borderBottom: "1px solid #d9d9d9",
                          padding: "8px",
                        }}
                      >
                        <CustomCheckbox
                          id={key}
                          checked={(selections[category] || []).includes(key)} // 선택 상태 확인
                          onChange={() =>
                            handleItemClick2(category, key, institution)
                          } // 선택된 key 전달
                          icon={<CheckCircleOutlineIcon />}
                          checkedIcon={<CheckCircleIcon />}
                        />
                        <label htmlFor={key} style={{ cursor: "pointer" }}>
                          {institution.accountName ||
                            institution.cardName ||
                            institution.loanName ||
                            institution.insuranceName ||
                            institution.securityName}
                        </label>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            );
          })}
        </div>
      );
    });
  };

  const checkImg = `${process.env.PUBLIC_URL}/img/check-img.png`;

  // 연결된 기관 및 자산 개수 계산
  const getTotalAssetsAndInstitutions = () => {
    if (!myDataApiData) return { institutions: 0, assets: 0 };

    const categories = ["account", "card", "loan", "insurance", "security"];

    // 자산이 있는 카테고리(기관)를 계산
    const totalInstitutions = categories.reduce((count, category) => {
      if (
        Array.isArray(myDataApiData[category]) &&
        myDataApiData[category].length > 0
      ) {
        return count + 1; // 자산이 있으면 카운트 증가
      }
      return count;
    }, 0);

    // 총 자산 개수 계산
    const totalAssets = categories.reduce((total, category) => {
      if (Array.isArray(myDataApiData[category])) {
        return total + myDataApiData[category].length;
      }
      return total;
    }, 0);

    return { institutions: totalInstitutions, assets: totalAssets };
  };

  useEffect(() => {
    if (!myDataApiData || !swiperRef.current) return;

    swiperRef.current.on("slideChange", () => {
      const category =
        Object.keys(myDataApiData)[swiperRef.current.activeIndex];

      if (category) {
        const selectedItems = selections[category] || [];
        const allItems = myDataApiData[category]?.map(
          (item) => item[`${category}Id`] || item[`${category}No`]
        );

        const isAllSelected = selectedItems.length === allItems.length;

        // 전체 선택 상태 동기화
        if (isAllSelected) {
          setSelections((prev) => ({
            ...prev,
            [category]: allItems,
          }));
        }
      }
    });
  }, [myDataApiData, selections]);

  const fetchTransactionData = async () => {
    // console.log("selections(transaction):", selections);
    setLoadingTransactions(true);
    // console.log("selections(transaction before):", selections);
    const data = prepareTransactionData();
    // console.log("selections(transaction after):", selections);
    const combinedData = {
      requestData: data, // requestData로 data 객체 설정
      myDataDTO: myDataApiData, // myDataDTO로 myDataApiData 객체 설정
    };
    console.log("combinedData:", combinedData);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/hanafamily/transaction/request",
        combinedData
      );
      console.log("거래 내역 조회 응답:", response.data);
      setTransactionData(response.data);

      navigate("/jointassets");
    } catch (error) {
      console.error("거래 내역 조회 실패:", error);
      message.error("거래 내역 조회 실패. 다시 시도해주세요.");
    } finally {
      setLoadingTransactions(false);
    }
  };

  const prepareTransactionData = () => {
    console.log("selections:", selections);
    const data = {
      userNo: Number(user.userNo),
      accountNo: selections.account,
      cardNo: selections.card,
      loanId: selections.loan,
      insuranceId: selections.insurance,
      securityAccount: selections.security,
    };

    console.log("거래 내역 조회 API 데이터:", data);

    return data;
  };

  useEffect(() => {
    if (transactionData.length > 0) {
      console.log("거래 내역 데이터:", transactionData);
    }
  }, [transactionData]);

  const mydataImg = `${process.env.PUBLIC_URL}/img/mydata-loading.png`;
  return (
    <div className="assets-join-content-container">
      <div className="assets-join-content">
        {/* Stepper */}
        <div className="assets-join-steps">
          <Steps current={current} items={items} labelPlacement="vertical" />
        </div>

        <Swiper
          modules={[Navigation]}
          onSlideChange={handleSlideChange}
          slidesPerView={1}
          allowTouchMove={false}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="stepper-swiper"
        >
          {/* 첫 번째 슬라이드: 약관 동의 */}
          <SwiperSlide>
            <div className="terms-content">
              <h3 style={{ marginLeft: "54px" }}>약관 동의</h3>
              <Accordion className="accordion">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <CustomCheckbox
                      id="term1"
                      checked={termsAccepted.term1}
                      onChange={handleCheckboxChange}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                      onClick={(e) => e.stopPropagation()} // 라벨 클릭이 체크박스에 영향을 미치지 않도록 설정
                    />
                    <label
                      htmlFor="term1"
                      style={{
                        color: termsAccepted.term1 ? "#009178" : "#000000",
                        fontSize: "18px",
                        fontWeight: "600",
                      }}
                      onClick={(e) => e.stopPropagation()} // 라벨 클릭이 체크박스에 영향을 미치지 않도록 설정
                    >
                      (필수) 마이데이터 서비스 이용약관
                    </label>
                  </Accordion.Header>
                  <Accordion.Body
                    className="scrollable-content"
                    style={{ backgroundColor: "#eeeef5" }}
                  >
                    <TermsContent1></TermsContent1>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <CustomCheckbox
                      id="term2"
                      checked={termsAccepted.term2}
                      onChange={handleCheckboxChange}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                      onClick={(e) => e.stopPropagation()} // 라벨 클릭이 체크박스에 영향을 미치지 않도록 설정
                    />
                    <label
                      htmlFor="term2"
                      style={{
                        color: termsAccepted.term2 ? "#009178" : "#000000",
                        fontSize: "18px",
                        fontWeight: "600",
                      }}
                      onClick={(e) => e.stopPropagation()} // 라벨 클릭이 체크박스에 영향을 미치지 않도록 설정
                    >
                      (필수) 개인정보(신용)정보 수집 및 이용 동의
                    </label>
                  </Accordion.Header>
                  <Accordion.Body
                    className="scrollable-content"
                    style={{ backgroundColor: "#eeeef5" }}
                  >
                    <TermsContent2></TermsContent2>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              {/* 문자인증 관련 UI 주석 처리
              <div style={{ marginTop: "20px" }}>
                <h3>휴대폰 인증</h3>
                <div style={{ display: "flex", marginBottom: "10px" }}>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="휴대폰 번호 입력"
                    style={{
                      width: "60%",
                      padding: "10px",
                      marginRight: "10px",
                      border: "1px solid #d9d9d9",
                      borderRadius: "4px",
                    }}
                  />
                  <Button
                    onClick={sendVerificationCode}
                    loading={loadingVerification}
                    disabled={isVerificationSent}
                    style={{ width: "30%" }}
                  >
                    {isVerificationSent ? "코드 발송 완료" : "인증코드 발송"}
                  </Button>
                </div>

                {isVerificationSent && (
                  <div style={{ display: "flex", marginBottom: "10px" }}>
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="인증 코드 입력"
                      style={{
                        width: "60%",
                        padding: "10px",
                        marginRight: "10px",
                        border: "1px solid #d9d9d9",
                        borderRadius: "4px",
                      }}
                    />
                    <Button
                      onClick={verifyCode}
                      loading={loadingVerification}
                      disabled={isPhoneVerified}
                      style={{ width: "30%" }}
                    >
                      {isPhoneVerified ? "인증 완료" : "인증하기"}
                    </Button>
                  </div>
                )}
              </div>
              */}

              {/* <div
                style={{
                  marginTop: 24,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Tooltip
                  title={!isNextEnabled ? "약관 동의를 모두 해야 합니다." : ""}
                >
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: isNextEnabled ? "#009178" : "#d9d9d9",
                      cursor: isNextEnabled ? "pointer" : "not-allowed",
                      width: "150px",
                      height: "40px",
                    }}
                    onClick={next}
                    disabled={!isNextEnabled}
                  >
                    다음
                  </Button>
                </Tooltip>
              </div> */}

              <div
                style={{
                  marginTop: 24,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {current > 0 && (
                  <Button
                    style={{
                      margin: "0 8px",
                      width: "150px",
                      height: "40px",
                      fontSize: "16px",
                      borderColor: "#009178",
                      color: "#009178",
                      fontWeight: "bold",
                    }}
                    onClick={prev}
                  >
                    이전
                  </Button>
                )}
                {current !== steps.length - 1 && (
                  <Tooltip
                    title={
                      !isNextEnabled ? "약관 동의를 모두 해야 합니다." : ""
                    }
                  >
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: isNextEnabled ? "#009178" : "#d9d9d9",
                        borderColor: isNextEnabled ? "#009178" : "#d9d9d9",
                        cursor: isNextEnabled ? "pointer" : "not-allowed",
                        width: "150px",
                        height: "40px",
                        fontSize: "16px",
                      }}
                      onClick={next}
                      disabled={!isNextEnabled}
                    >
                      다음
                    </Button>
                  </Tooltip>
                )}
                {current === steps.length - 1 && (
                  <Button
                    type="primary"
                    style={{
                      margin: "0 8px",
                      width: "150px",
                      height: "40px",
                      fontSize: "16px",
                      borderColor: "#009178",
                      backgroundColor: "#009178",
                    }}
                    onClick={() => message.success("Processing complete!")}
                  >
                    Done
                  </Button>
                )}
              </div>
            </div>
          </SwiperSlide>

          {/* 두 번째 슬라이드: 컨텐츠 */}
          <SwiperSlide>
            <div className="select-company-content">
              <h3 style={{ marginLeft: "54px" }}>
                연결할 기관을
                <br />
                카테고리별로 선택해주세요
              </h3>
              <div className="tabs-and-selections">
                <div className="tabs">
                  {Object.keys(tabsData).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabClick(tab)}
                      className={currentTab === tab ? "tab active" : "tab"}
                      style={{
                        padding: "3px 25px",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        backgroundColor:
                          currentTab === tab ? "#009178" : "#fff",
                        color: currentTab === tab ? "#fff" : "#000",
                        cursor: "pointer",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        transform:
                          currentTab === tab ? "scale(1.05)" : "scale(1)",
                        boxShadow:
                          currentTab === tab
                            ? "0 4px 12px rgba(0, 0, 0, 0.15)"
                            : "none",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.1)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform =
                          currentTab === tab ? "scale(1.05)" : "scale(1)")
                      }
                      onMouseDown={(e) =>
                        (e.currentTarget.style.transform = "scale(0.95)")
                      }
                      onMouseUp={(e) =>
                        (e.currentTarget.style.transform = "scale(1.1)")
                      }
                    >
                      {categoryTranslation[tab]}{" "}
                      {/* 카테고리 이름을 한국어로 변환 */}
                    </button>
                  ))}
                </div>

                <div className="select-all-container">
                  <Button
                    onClick={handleSelectAll}
                    type="primary"
                    style={{
                      backgroundColor: "#00765f",
                      transition: "transform 0.3s ease",
                      transform: "scale(1)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                    onMouseDown={(e) =>
                      (e.currentTarget.style.transform = "scale(0.95)")
                    }
                    onMouseUp={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                  >
                    {selections[currentTab].length ===
                    tabsData[currentTab].length
                      ? "선택 해제"
                      : "모두 선택"}
                  </Button>
                </div>

                <div className="items-grid">
                  {tabsData[currentTab].map((item) => (
                    <div
                      key={item.name}
                      className={`item ${
                        selections[currentTab].includes(item.name)
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => handleItemClick(item)}
                      style={{
                        overflow: "hidden",
                        width: "100px",
                        height: "100px",
                        borderRadius: "8px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        cursor: "pointer",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        transform: selections[currentTab].includes(item.name)
                          ? "scale(1.05)"
                          : "scale(1)",
                        boxShadow: selections[currentTab].includes(item.name)
                          ? "0 4px 12px rgba(0, 0, 0, 0.15)"
                          : "none",
                        border: selections[currentTab].includes(item.name)
                          ? "3px solid #00765f" // 선택된 경우의 border
                          : "1px solid #ccc", // 선택되지 않은 경우 기본 border
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.1)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = selections[
                          currentTab
                        ].includes(item.name)
                          ? "scale(1.05)"
                          : "scale(1)")
                      }
                      onMouseDown={(e) =>
                        (e.currentTarget.style.transform = "scale(0.95)")
                      }
                      onMouseUp={(e) =>
                        (e.currentTarget.style.transform = "scale(1.1)")
                      }
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        style={{
                          width: "50px", // 이미지의 최대 크기 제한
                          height: "50px",
                          objectFit: "contain", // 이미지가 넘어가지 않도록 맞춤
                          marginBottom: "10px",
                        }}
                      />
                      <p>{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  marginTop: 24,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {current > 0 && (
                  <Button
                    style={{
                      margin: "0 8px",
                      width: "150px",
                      height: "40px",
                      fontSize: "16px",
                      borderColor: "#009178",
                      color: "#009178",
                      fontWeight: "bold",
                    }}
                    onClick={prev}
                  >
                    이전
                  </Button>
                )}
                {current !== steps.length - 1 && (
                  <Tooltip
                    title={
                      !isNextEnabled ? "약관 동의를 모두 해야 합니다." : ""
                    }
                  >
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: isNextEnabled ? "#009178" : "#d9d9d9",
                        borderColor: isNextEnabled ? "#009178" : "#d9d9d9",
                        cursor: isNextEnabled ? "pointer" : "not-allowed",
                        width: "150px",
                        height: "40px",
                        fontSize: "16px",
                      }}
                      onClick={next}
                      disabled={current === 0 && !isNextEnabled}
                    >
                      다음
                    </Button>
                  </Tooltip>
                )}
                {current === steps.length - 1 && (
                  <Button
                    type="primary"
                    style={{
                      margin: "0 8px",
                      width: "150px",
                      height: "40px",
                      fontSize: "16px",
                      borderColor: "#009178",
                      backgroundColor: "#009178",
                    }}
                    onClick={() => message.success("Processing complete!")}
                  >
                    Done
                  </Button>
                )}
              </div>
            </div>
          </SwiperSlide>
          {/* 본인 인증을 위한 슬라이드 */}
          <SwiperSlide>
            <div>
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
            </div>
          </SwiperSlide>
          {/* 네 번째 슬라이드 */}
          <SwiperSlide>
            <div className="select-account-content">
              <p style={{ marginLeft: "54px" }}>
                총 {getTotalAssetsAndInstitutions().institutions}개 기관의{" "}
                {getTotalAssetsAndInstitutions().assets}개 자산 연결 가능 !
              </p>
              <h3 style={{ marginLeft: "54px", marginBottom: "20px" }}>
                연결할 자산을 모두 선택해주세요
              </h3>
              {renderAssets()}
              <div
                className="select-account-share-date"
                style={{ marginTop: "50px" }}
              >
                <p style={{ marginLeft: "54px" }}>
                  공유 데이터의 자산 및 공유 범위는 수정할 수 있어요
                </p>
                <h3 style={{ marginLeft: "54px" }}>
                  선택한 자산의 데이터 공유 시작일을 선택해주세요
                </h3>
                <div
                  style={{
                    backgroundColor: "#f0f8ff",
                    padding: "20px",
                    borderRadius: "10px",
                    marginBottom: "20px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "90%",
                  }}
                >
                  <h4 style={{ margin: "0" }}>{renderDateInfo()}</h4>
                </div>
                <div
                  style={{
                    backgroundColor: "#f5f5f5",
                    borderRadius: "10px",
                    padding: "20px",
                    margin: "20px auto",
                    width: "90%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    <label>
                      <input
                        type="radio"
                        value="전체"
                        checked={selectedOption === "전체"}
                        onChange={handleOptionChange}
                      />
                      전체
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="이번달부터"
                        checked={selectedOption === "이번달부터"}
                        onChange={handleOptionChange}
                      />
                      이번달부터
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="지난달부터"
                        checked={selectedOption === "지난달부터"}
                        onChange={handleOptionChange}
                      />
                      지난달부터
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="3개월 전부터"
                        checked={selectedOption === "3개월 전부터"}
                        onChange={handleOptionChange}
                      />
                      3개월 전부터
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="직접 선택"
                        checked={selectedOption === "직접 선택"}
                        onChange={handleOptionChange}
                      />
                      직접 선택
                    </label>
                    {selectedOption === "직접 선택" && (
                      <DatePicker
                        value={customDate}
                        onChange={handleDateChange}
                        style={{ marginTop: "10px" }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginRight: "50px",
                }}
              >
                <Button
                  onClick={next}
                  style={{
                    width: "130px",
                    height: "40px",
                    backgroundColor: "#009178",
                    color: "#fff",
                  }}
                >
                  다음
                </Button>
              </div>
            </div>
          </SwiperSlide>

          {/* 마지막 슬라이드: 컨텐츠 */}
          <SwiperSlide>
            <div
              className="step-content"
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "20px",
              }}
            >
              <Typography
                variant="h5"
                style={{ marginBottom: "20px", fontWeight: "500" }}
              >
                가입이 완료되었습니다!
              </Typography>

              <img
                src={hanafamilyImg}
                alt="hanafamily"
                style={{
                  width: "600px",
                  marginBottom: "20px",
                  marginRight: "50px",
                }}
              />
              <Link
                underline="none"
                onClick={fetchTransactionData}
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  color: "#fff",
                }}
              >
                <p
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    animation: "bounce 1s ease-in-out infinite",
                    border: "2px solid #0fb895",
                    padding: "15px",
                    borderRadius: "10px",
                    background: "#0fb895",
                  }}
                >
                  내 자산 확인하기
                </p>
              </Link>
            </div>
          </SwiperSlide>
        </Swiper>

        {/* 거래 내역 로딩 상태에 따른 처리 */}
        {loadingTransactions && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <CircularProgress size={40} thickness={4} />
            <Typography variant="h6" style={{ marginTop: "10px" }}>
              거래 내역을 불러오는 중입니다...
            </Typography>
          </div>
        )}

        {/* 거래 내역 데이터가 있을 때 출력 */}
        {transactionData.length > 0 && (
          <div className="transaction-list">
            <Typography variant="h6" style={{ marginTop: "20px" }}>
              거래 내역
            </Typography>
            <ul>
              {transactionData.map((transaction) => (
                <li key={transaction.id}>
                  {transaction.date} - {transaction.amount}원 -{" "}
                  {transaction.description}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* MUI 로딩 모달 */}
      <Modal
        open={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
          }}
        >
          {isLoading && (
            <>
              <img
                src={mydataImg}
                alt="mydata-loading"
                style={{ width: "200px", marginBottom: "20px" }}
              />
              <SyncLoader
                color="#00765f"
                cssOverride={{}}
                loading
                margin={8}
                size={15}
                speedMultiplier={0.8}
              />
              <Typography variant="h6" color="textSecondary" sx={{ mt: 4 }}>
                자산 연결 중입니다. 잠시만 기다려 주세요.
              </Typography>
            </>
          )}
          {isComplete && (
            <>
              <img
                src={checkImg}
                alt="check-img"
                style={{
                  width: "150px",
                  animation: "bounce 1s ease-in-out infinite",
                }}
              />
              <Typography variant="h6" color="textSecondary" sx={{ mt: 4 }}>
                연결하였습니다!
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default AssetsJoinContent;
