import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Modal, Button, Select, Input, DatePicker } from "antd"; // Ant Design의 Modal, Button, Select, Input, DatePicker 사용
import dayjs from "dayjs"; // 날짜 처리를 위한 dayjs 사용
import "../../style/CustomCalendar.css"; // 커스텀 CSS 파일

const { Option } = Select;

function FamilyCalendar({ initialData = [] }) {
  const [data, setData] = useState(initialData);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newEventName, setNewEventName] = useState("");
  const [newEventAmount, setNewEventAmount] = useState("");
  const [newEventType, setNewEventType] = useState("일정");
  const [newEventDate, setNewEventDate] = useState(dayjs()); // 추가된 날짜 상태
  const [filter, setFilter] = useState("전체");
  const [modalContent, setModalContent] = useState(null); // 클릭된 일정의 내용을 저장

  // 모달을 띄우고 닫는 함수
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (modalContent) {
      // 일정 클릭으로 열린 모달을 닫을 때
      setModalContent(null);
    } else {
      // 새로운 일정 추가 모달을 닫을 때
      addEvent();
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
      name: newEventName,
      value: parseInt(newEventAmount, 10) || 0,
      type: newEventType,
      date: newEventDate.toDate(),
    };

    setData([...data, newEvent]);
    setNewEventName("");
    setNewEventAmount("");
  };

  // 선택된 날짜와 일치하는 데이터를 필터링
  const filteredData = data.filter(
    (item) => filter === "전체" || item.type === filter
  );

  const displayData = filteredData.filter(
    (item) =>
      item.date.getFullYear() === selectedDate.getFullYear() &&
      item.date.getMonth() === selectedDate.getMonth() &&
      item.date.getDate() === selectedDate.getDate()
  );

  // 캘린더 타일에 스타일을 적용하고, 오늘 날짜에 대한 특별한 표시를 추가
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const eventsOnDate = filteredData.filter(
        (item) =>
          item.date.getFullYear() === date.getFullYear() &&
          item.date.getMonth() === date.getMonth() &&
          item.date.getDate() === date.getDate()
      );

      return (
        <div className="events">
          {eventsOnDate.map((event, index) => (
            <div
              key={index}
              className="event"
              style={{
                color:
                  event.type === "수입"
                    ? "red"
                    : event.type === "지출"
                    ? "blue"
                    : "#000",
                fontWeight: "bold",
                marginTop: "2px",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                setModalContent(event);
                showModal();
              }}
            >
              {event.type === "수입" || event.type === "지출"
                ? `${
                    event.type === "수입" ? "+" : "-"
                  }${event.value.toLocaleString()}`
                : event.name}
            </div>
          ))}
        </div>
      );
    }
  };

  // 필터링 버튼에 대한 핸들러
  const handleFilterChange = (value) => {
    setFilter(value);
  };

  return (
    <div style={styles.container}>
      <h3 style={{ fontFamily: "CustomFont" }}>가족 일정 관리</h3>
      <div style={styles.filterContainer}>
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
      </div>

      <div style={styles.calendarContainer}>
        <Calendar
          onClickDay={setSelectedDate}
          value={selectedDate}
          tileContent={tileContent}
          tileClassName={({ date, view }) =>
            view === "month" &&
            date.getTime() === new Date().setHours(0, 0, 0, 0)
              ? "highlight-today"
              : ""
          }
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
            <p>이름: {modalContent.name}</p>
            <p>
              금액:{" "}
              {modalContent.value ? modalContent.value.toLocaleString() : "N/A"}
              원
            </p>
            <p>타입: {modalContent.type}</p>
            <p>
              날짜:{" "}
              {modalContent.date.toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
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
    // alignItems: "center",
    backgroundColor: "#f0f8ff",
    borderRadius: "10px",
    padding: "20px",
    position: "relative",
    // width: "45%",
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
