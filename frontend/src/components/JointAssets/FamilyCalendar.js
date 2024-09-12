import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // 월별 보기
import timeGridPlugin from "@fullcalendar/timegrid"; // 시간별 보기
import interactionPlugin from "@fullcalendar/interaction"; // 클릭 및 드래그 등의 인터랙션
import bootstrapPlugin from "@fullcalendar/bootstrap"; // FullCalendar에서 Bootstrap 플러그인 사용
import { Modal, Button, Select, Input, DatePicker, Switch } from "antd"; // Ant Design 사용
import dayjs from "dayjs"; // 날짜 처리를 위한 dayjs 사용
import "../../style/CustomCalendar.css"; // 커스텀 CSS 파일
import "bootstrap/dist/css/bootstrap.min.css"; // 기본 Bootstrap CSS
import "bootswatch/dist/minty/bootstrap.min.css"; // Minty 테마 추가
import "@fortawesome/fontawesome-free/css/all.min.css"; // Font Awesome 임포트
import koLocale from "@fullcalendar/core/locales/ko";

const { Option } = Select;

function FamilyCalendar({ initialData = [] }) {
  const [data, setData] = useState(initialData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newEventName, setNewEventName] = useState("");
  const [newEventAmount, setNewEventAmount] = useState("");
  const [newEventType, setNewEventType] = useState("일정");
  const [newEventDate, setNewEventDate] = useState(dayjs()); // 시작 날짜 상태
  const [newEventEndDate, setNewEventEndDate] = useState(null); // 종료 날짜 상태
  const [isEndDateEnabled, setIsEndDateEnabled] = useState(false); // 종료일 활성화 토글 상태
  const [filter, setFilter] = useState("전체");
  const [modalContent, setModalContent] = useState(null); // 클릭된 일정의 내용을 저장

  // 모달을 띄우고 닫는 함수
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (modalContent) {
      setModalContent(null); // 일정 클릭으로 열린 모달을 닫을 때
    } else {
      addEvent(); // 새로운 일정 추가 모달을 닫을 때
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setModalContent(null); // 모달 취소 시 내용 초기화
  };

  // 새 이벤트를 추가하는 함수
  const addEvent = () => {
    if (newEventName.trim() === "") return;

    const newEvent = {
      title: newEventName,
      value: parseInt(newEventAmount, 10) || 0,
      type: newEventType,
      startDate: newEventDate.format("YYYY-MM-DD"), // 시작일
      endDate:
        isEndDateEnabled && newEventEndDate
          ? newEventEndDate.format("YYYY-MM-DD")
          : null, // 종료일, 종료일이 활성화된 경우에만 설정
    };

    setData([...data, newEvent]);
    setNewEventName("");
    setNewEventAmount("");
    setNewEventEndDate(null); // 종료일 초기화
    setIsEndDateEnabled(false); // 종료일 활성화 토글 초기화
  };

  // 필터링된 이벤트만 캘린더에 표시
  const filteredData = data.filter(
    (item) => filter === "전체" || item.type === filter
  );

  // FullCalendar에서 사용하는 이벤트 데이터 형식으로 변환
  const events = filteredData.map((item) => ({
    title:
      item.type === "수입" || item.type === "지출"
        ? `${item.type === "수입" ? "+" : "-"}${item.value.toLocaleString()}`
        : item.title,
    start: item.startDate,
    end: item.endDate || item.startDate, // 종료일이 있으면 종료일을 사용, 없으면 시작일만 사용
    backgroundColor:
      item.type === "수입" ? "red" : item.type === "지출" ? "blue" : "#13aec3",
  }));

  // 필터링 버튼에 대한 핸들러
  const handleFilterChange = (value) => {
    setFilter(value);
  };

  // FullCalendar에서 날짜 클릭 시 발생하는 이벤트
  const handleDateClick = (info) => {
    setNewEventDate(dayjs(info.date));
    showModal();
  };

  // FullCalendar에서 이벤트 클릭 시 모달에 상세 정보 표시
  const handleEventClick = (info) => {
    const clickedEvent = data.find(
      (event) =>
        event.startDate === info.event.startStr &&
        event.title === info.event.title
    );
    setModalContent(clickedEvent);
    showModal();
  };

  return (
    <div style={styles.container}>
      <h3 style={{ fontFamily: "CustomFont" }}>가족 일정 관리</h3>
      {/* <div style={styles.filterContainer}>
        <Select
          defaultValue="전체"
          onChange={handleFilterChange}
          style={styles.filterSelect}
        >
          <Option value="전체">전체</Option>
          <Option value="수입">수입</Option>
          <Option value="지출">지출</Option>
          <Option value="일정">일정</Option>
        </Select>
      </div> */}

      <div style={styles.calendarContainer}>
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            bootstrapPlugin,
          ]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          themeSystem="bootstrap"
          locale={koLocale} // 한국어 로케일 적용
        />
      </div>

      <Button
        type="primary"
        onClick={showModal}
        style={styles.addButton}
        shape="circle"
      >
        +
      </Button>

      <Modal
        title={modalContent ? "일정 세부사항" : "일정 추가"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {modalContent ? (
          <div>
            <p>이름: {modalContent.title}</p>
            <p>
              금액:{" "}
              {modalContent.value ? modalContent.value.toLocaleString() : "N/A"}
              원
            </p>
            <p>타입: {modalContent.type}</p>
            <p>시작일: {dayjs(modalContent.startDate).format("YYYY-MM-DD")}</p>
            {modalContent.endDate && (
              <p>종료일: {dayjs(modalContent.endDate).format("YYYY-MM-DD")}</p>
            )}
          </div>
        ) : (
          <>
            <Input
              type="text"
              value={newEventName}
              placeholder="Event Name"
              onChange={(e) => setNewEventName(e.target.value)}
              style={styles.input}
            />
            <Input
              type="number"
              value={newEventAmount}
              placeholder="Amount"
              onChange={(e) => setNewEventAmount(e.target.value)}
              style={styles.input}
            />
            <Select
              defaultValue="일정"
              onChange={(value) => setNewEventType(value)}
              style={styles.input}
            >
              <Option value="수입">수입</Option>
              <Option value="지출">지출</Option>
              <Option value="일정">일정</Option>
            </Select>
            <DatePicker
              value={newEventDate}
              onChange={(date) => setNewEventDate(date)}
              style={styles.input}
            />
            <div style={{ marginBottom: "10px" }}>
              <span>종료일 사용: </span>
              <Switch
                checked={isEndDateEnabled}
                onChange={(checked) => setIsEndDateEnabled(checked)}
              />
            </div>
            {isEndDateEnabled && (
              <DatePicker
                value={newEventEndDate}
                onChange={(date) => setNewEventEndDate(date)}
                style={styles.input}
                placeholder="종료일 선택"
              />
            )}
          </>
        )}
      </Modal>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f0f8ff",
    borderRadius: "10px",
    padding: "20px",
    position: "relative",
    background: "#ffffff",
    borderRadius: "20px",
  },
  filterContainer: {
    marginBottom: "20px",
    textAlign: "center",
  },
  filterSelect: {
    width: "200px",
  },
  calendarContainer: {
    width: "100%",
  },
  addButton: {
    position: "absolute",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#ff6666",
    border: "none",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
};

export default FamilyCalendar;
