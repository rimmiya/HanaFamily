import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Navigation } from "swiper/modules";
import { Button, message, Steps, Tooltip, Modal, Spin, theme } from "antd";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "../../style/AssetsJoinContent.css";
import Accordion from "react-bootstrap/Accordion";

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
    title: "Third",
  },
  {
    title: "Last",
  },
];

const tabsData = {
  card: [
    {
      name: "하나은행",
      imageUrl: `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`,
    },
    {
      name: "Card Item 2",
      imageUrl: `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`,
    },
    {
      name: "Card Item 3",
      imageUrl: `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`,
    },
  ],
  bank: [
    {
      name: "Bank Item 1",
      imageUrl: `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`,
    },
    {
      name: "Bank Item 2",
      imageUrl: `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`,
    },
    {
      name: "Bank Item 3",
      imageUrl: `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`,
    },
  ],
  securities: [
    {
      name: "Securities Item 1",
      imageUrl: `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`,
    },
    {
      name: "Securities Item 2",
      imageUrl: `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`,
    },
    {
      name: "Securities Item 3",
      imageUrl: `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`,
    },
  ],
  insurance: [
    {
      name: "Insurance Item 1",
      imageUrl: `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`,
    },
    {
      name: "Insurance Item 2",
      imageUrl: `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`,
    },
    {
      name: "Insurance Item 3",
      imageUrl: `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`,
    },
  ],
  telco: [
    {
      name: "Telco Item 1",
      imageUrl: `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`,
    },
    {
      name: "Telco Item 2",
      imageUrl: `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`,
    },
    {
      name: "Telco Item 3",
      imageUrl: `${process.env.PUBLIC_URL}/img/img-hana-symbol.png`,
    },
  ],
};
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
  // 다른 카테고리 추가 가능
};

function AssetsJoinContent() {
  const [current, setCurrent] = useState(0);
  const swiperRef = useRef(null);

  const [termsAccepted, setTermsAccepted] = useState({
    term1: false,
    term2: false,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isNextEnabled = termsAccepted.term1 && termsAccepted.term2;

  const next = () => {
    if (!isNextEnabled) {
      message.warning("약관 동의를 모두 해야 합니다.");
    } else if (current === 0) {
      // 약관 동의 슬라이드일 때 모달 띄우기
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

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        setIsModalVisible(false);
        if (swiperRef.current && current < steps.length - 1) {
          swiperRef.current.slideNext();
        }
      }, 1000); // 모달이 닫히기 전 잠시 멈춤
    }, 2000); // 로딩 시간 설정 (2초)
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

  const [currentTab, setCurrentTab] = useState("card");
  const [selections, setSelections] = useState({
    card: [],
    bank: [],
    securities: [],
    insurance: [],
    telco: [],
  });

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
  };

  const handleItemClick = (item) => {
    setSelections((prev) => {
      const selectedItems = prev[currentTab];
      const isSelected = selectedItems.includes(item);

      return {
        ...prev,
        [currentTab]: isSelected
          ? selectedItems.filter((selected) => selected !== item)
          : [...selectedItems, item],
      };
    });
  };

  // 모두 선택 핸들러
  const handleSelectAll = () => {
    const allSelected =
      selections[currentTab].length === tabsData[currentTab].length;
    setSelections((prev) => ({
      ...prev,
      [currentTab]: allSelected ? [] : [...tabsData[currentTab]],
    }));
  };

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

  const handleInstitutionSelectAll = (category, institutionName) => {
    const institution = data[category].find(
      (inst) => inst.name === institutionName
    );
    const allItems = institution.items;
    setSelections((prev) => ({
      ...prev,
      [category]: selections[category].includes(allItems[0])
        ? selections[category].filter((item) => !allItems.includes(item))
        : [...selections[category], ...allItems],
    }));
  };

  return (
    <div className="assets-join-content-container">
      <div className="assets-join-content">
        {/* Stepper */}
        <div className="assets-join-steps">
          <Steps current={current} items={items} labelPlacement="vertical" />
        </div>

        {/* Swiper */}
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
                  <Accordion.Body>hello</Accordion.Body>
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
                  <Accordion.Body>hello</Accordion.Body>
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
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="select-all-container">
                  <Button onClick={handleSelectAll} type="primary">
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
                        selections[currentTab].includes(item) ? "selected" : ""
                      }`}
                      onClick={() => handleItemClick(item)}
                      style={{ overflow: "hidden" }}
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

          {/* 세 번째 슬라이드: 컨텐츠 */}
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
                    Done
                  </Button>
                )}
              </div>
            </div>
          </SwiperSlide>

          {/* 마지막 슬라이드: 컨텐츠 */}
          <SwiperSlide>
            <div className="step-content">가입완료</div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* 모달 */}
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

export default AssetsJoinContent;
