import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Navigation } from "swiper/modules";
import { Button, message, Steps, Tooltip, Modal, Spin, DatePicker } from "antd";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Accordion from "react-bootstrap/Accordion";
import "../../../style/JointAssetsJoinContent.css";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

// Material-UI의 체크박스 아이콘 커스텀
const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  "& .MuiSvgIcon-root": {
    borderRadius: "50%",
    color: "#9e9e9e",
  },
  "&.Mui-checked .MuiSvgIcon-root": {
    color: "#009178",
  },
}));

const steps = [
  {
    title: "약관동의",
  },
  {
    title: "자산 연결",
  },
  {
    title: "완료",
  },
];

const data = {
  card: [
    {
      name: "신한카드",
      items: ["명세서 정보", "대출 정보", "포인트 정보", "S20-PINK(체크)"],
    },
    {
      name: "하나카드",
      items: ["명세서 정보", "대출 정보"],
    },
  ],
  securities: [
    {
      name: "한국투자증권",
      items: ["위탁계좌 6882575201", "위탁계좌 4688574401"],
    },
    {
      name: "미래에셋증권",
      items: ["종합 628524827400", "종합 628524827401"],
    },
  ],
};

function JointAssetsJoinContent() {
  const [current, setCurrent] = useState(0);
  const swiperRef = useRef(null);
  const [termsAccepted, setTermsAccepted] = useState({
    term1: false,
    term2: false,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("전체");
  const [customDate, setCustomDate] = useState(null);

  const isNextEnabled = termsAccepted.term1 && termsAccepted.term2;

  const next = () => {
    if (!isNextEnabled) {
      message.warning("약관 동의를 모두 해야 합니다.");
    } else if (current === 0) {
      swiperRef.current.slideNext();
    } else if (swiperRef.current && current < steps.length - 1) {
      showModal();
    }
  };

  const prev = () => {
    if (swiperRef.current && current > 0) {
      swiperRef.current.slidePrev();
    }
  };

  const handleSlideChange = (swiper) => {
    setCurrent(swiper.activeIndex);
  };

  const handleCheckboxChange = (e) => {
    setTermsAccepted((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.checked,
    }));
  };

  const showModal = () => {
    setIsModalVisible(true);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        setIsModalVisible(false);
        if (swiperRef.current && current < steps.length - 1) {
          swiperRef.current.slideNext();
        }
      }, 1000);
    }, 2000);
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

  const [selections, setSelections] = useState({
    card: [],
    bank: [],
    securities: [],
    insurance: [],
    telco: [],
  });

  const handleItemClick2 = (category, item) => {
    setSelections((prev) => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter((i) => i !== item)
        : [...prev[category], item],
    }));
  };

  const handleCategorySelectAll = (category) => {
    const allItems = data[category].flatMap((inst) => inst.items);
    setSelections((prev) => ({
      ...prev,
      [category]:
        selections[category].length === allItems.length ? [] : allItems,
    }));
  };

  const currentDate = dayjs().format("YYYY년 MM월 DD일");

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

  return (
    <div className="assets-join-content-container">
      <div className="assets-join-content">
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
                      onClick={(e) => e.stopPropagation()}
                    />
                    <label
                      htmlFor="term1"
                      style={{
                        color: termsAccepted.term1 ? "#009178" : "#000000",
                        fontSize: "18px",
                        fontWeight: "600",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      (필수) 마이데이터 서비스 이용약관
                    </label>
                  </Accordion.Header>
                  <Accordion.Body>약관 내용</Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <CustomCheckbox
                      id="term2"
                      checked={termsAccepted.term2}
                      onChange={handleCheckboxChange}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleIcon />}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <label
                      htmlFor="term2"
                      style={{
                        color: termsAccepted.term2 ? "#009178" : "#000000",
                        fontSize: "18px",
                        fontWeight: "600",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      (필수) 개인정보(신용)정보 수집 및 이용 동의
                    </label>
                  </Accordion.Header>
                  <Accordion.Body>약관 내용</Accordion.Body>
                </Accordion.Item>
              </Accordion>

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

          <SwiperSlide>
            <div className="select-account-content">
              <p style={{ marginLeft: "54px" }}>
                총 15개 기관의 45개 자산 연결 가능 !
              </p>
              <h3 style={{ marginLeft: "54px" }}>
                연결할 자산을 모두 선택해주세요
              </h3>
              {Object.keys(data).map((category) => (
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
                    <h3 style={{ marginLeft: "54px", marginTop: "5px" }}>
                      {category.toUpperCase()}
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
                          selections[category].length ===
                          data[category].flatMap((inst) => inst.items).length
                        }
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

                  {data[category].map((institution) => (
                    <div key={institution.name}>
                      <Accordion defaultActiveKey={institution.name}>
                        <Accordion.Item eventKey={institution.name}>
                          <Accordion.Header
                            style={{ backgroundColor: "#ffffff" }}
                          >
                            {institution.name}
                          </Accordion.Header>
                          <Accordion.Body
                            style={{ backgroundColor: "#f0f8ff" }}
                          >
                            {institution.items.map((item) => (
                              <div
                                key={item}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  borderBottom: "1px solid #d9d9d9",
                                  padding: "8px",
                                }}
                              >
                                <CustomCheckbox
                                  id={item}
                                  checked={selections[category].includes(item)}
                                  onChange={() =>
                                    handleItemClick2(category, item)
                                  }
                                  icon={<CheckCircleOutlineIcon />}
                                  checkedIcon={<CheckCircleIcon />}
                                />
                                <label
                                  htmlFor={item}
                                  style={{ cursor: "pointer" }}
                                >
                                  {item}
                                </label>
                              </div>
                            ))}
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  ))}
                </div>
              ))}
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
                {current !== steps.length - 2 && (
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
                {current === steps.length - 2 && (
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
                    onClick={next}
                    disabled={current === 0 && !isNextEnabled}
                  >
                    공유하기
                  </Button>
                )}
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="step-content">가입완료</div>
            <Link to="/jointassets">함께 관리</Link>
          </SwiperSlide>
        </Swiper>
      </div>

      <Modal
        visible={isModalVisible}
        footer={null}
        closable={false}
        centered
        bodyStyle={{ textAlign: "center" }}
      >
        <Spin spinning={isLoading} tip="로딩 중..." size="large" />
      </Modal>
    </div>
  );
}
export default JointAssetsJoinContent;
