import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // 월별 보기
import timeGridPlugin from "@fullcalendar/timegrid"; // 시간별 보기
import interactionPlugin from "@fullcalendar/interaction"; // 클릭 및 드래그 등의 인터랙션
import bootstrapPlugin from "@fullcalendar/bootstrap"; // FullCalendar에서 Bootstrap 플러그인 사용
import {
  Modal,
  Button,
  Select,
  Input,
  DatePicker,
  Switch,
  message,
} from "antd"; // Ant Design 사용
import dayjs from "dayjs"; // 날짜 처리를 위한 dayjs 사용
import axios from "axios"; // HTTP 요청을 위한 axios 사용
import "../../style/CustomCalendar.css"; // 커스텀 CSS 파일
import "bootstrap/dist/css/bootstrap.min.css"; // 기본 Bootstrap CSS
import "bootswatch/dist/minty/bootstrap.min.css"; // Minty 테마 추가
import "@fortawesome/fontawesome-free/css/all.min.css"; // Font Awesome 임포트
import koLocale from "@fullcalendar/core/locales/ko";
import { Description } from "@mui/icons-material";
import { hexToRgb } from "@mui/material";
import { height } from "@mui/system";

const { Option } = Select;

function FamilyCalendar({ initialData = [] }) {
  const [data, setData] = useState(initialData);
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null); // 수정할 일정
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newEventName, setNewEventName] = useState("");
  const [newEventAmount, setNewEventAmount] = useState("");
  const [newEventType, setNewEventType] = useState("일정");
  const [isEditing, setIsEditing] = useState(false); // 수정 모드인지 여부
  const [newEventContent, setNewEventContent] = useState(""); // 내용 상태
  const [newEventDate, setNewEventDate] = useState(dayjs()); // 시작 날짜 상태
  const [newEventEndDate, setNewEventEndDate] = useState(null); // 종료 날짜 상태
  const [isEndDateEnabled, setIsEndDateEnabled] = useState(false); // 종료일 활성화 토글 상태
  const [filter, setFilter] = useState("전체");
  const [modalContent, setModalContent] = useState(null); // 클릭된 일정의 내용을 저장
  const [newBudget, setNewBudget] = useState(""); // 예산 상태
  const [newCategory, setNewCategory] = useState(1); // 카테고리 상태

  const user = useSelector((state) => state.user.userInfo);

  // 가족 일정을 가져오는 함수 (조회)
  const fetchSchedules = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/schedules/family/${user.familyId}`
      );
      setSchedules(response.data); // 서버에서 가져온 일정 데이터를 상태로 설정
    } catch (error) {
      console.error("일정을 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchSchedules(); // 컴포넌트가 마운트될 때 일정을 가져옴
  }, []);

  // 모달 열기/닫기
  const handleOk = async () => {
    if (isEditing) {
      await updateSchedule(); // 일정 수정
    } else {
      await addSchedule(); // 일정 추가
    }
    setIsModalVisible(false);
    resetForm(); // 폼 초기화
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    resetForm();
  };

  // 일정 추가 함수 (백엔드로 일정 추가 요청)
  const addSchedule = async () => {
    const newSchedule = {
      title: newEventName,
      description: newEventContent,
      startDate: newEventDate.format("YYYY-MM-DD"),
      endDate:
        isEndDateEnabled && newEventEndDate
          ? newEventEndDate.format("YYYY-MM-DD")
          : null,
      userNo: user.userNo, // 로그인된 사용자 ID
      familyId: user.familyId, // 가족 ID
      budget: newBudget,
      categoryId: newCategory,
    };
    console.log("newSchedule", newSchedule);
    try {
      await axios.post("http://localhost:8080/api/schedules/add", newSchedule);
      message.success("일정이 추가되었습니다!");
      fetchSchedules(); // 일정 추가 후 다시 일정 목록을 가져옴
    } catch (error) {
      console.error("일정 추가 중 오류 발생:", error);
    }
  };

  // 일정 수정 함수 (백엔드로 수정 요청)
  const updateSchedule = async () => {
    const updatedSchedule = {
      ...selectedSchedule,
      title: newEventName,
      description: newEventContent,
      startDate: newEventDate.format("YYYY-MM-DD"),
      endDate:
        isEndDateEnabled && newEventEndDate
          ? newEventEndDate.format("YYYY-MM-DD")
          : null,
      budget: newBudget,
      categoryId: newCategory,
    };

    try {
      await axios.put(
        `http://localhost:8080/api/schedules/update/${selectedSchedule.scheduleId}`,
        updatedSchedule
      );
      message.success("일정이 수정되었습니다!");
      fetchSchedules(); // 수정 후 일정 목록을 다시 가져옴
    } catch (error) {
      console.error("일정 수정 중 오류 발생:", error);
    }
  };

  // 일정 삭제 함수 (백엔드로 삭제 요청)
  const deleteSchedule = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/schedules/delete/${selectedSchedule.scheduleId}`
      );
      message.success("일정이 삭제되었습니다!");
      fetchSchedules(); // 삭제 후 일정 목록을 다시 가져옴
      setIsModalVisible(false);
      resetForm();
    } catch (error) {
      console.error("일정 삭제 중 오류 발생:", error);
    }
  };

  // 폼 초기화 함수
  const resetForm = () => {
    setNewEventName("");
    setNewEventContent("");
    setNewEventDate(dayjs());
    setNewEventEndDate(null);
    setIsEndDateEnabled(false);
    setIsEditing(false);
    setSelectedSchedule(null);
    setNewBudget(0);
    setNewCategory(1);
  };

  // FullCalendar에서 사용하는 이벤트 데이터 형식으로 변환
  const events = schedules.map((schedule) => ({
    id: schedule.scheduleId,
    title: schedule.title,
    description: schedule.description,
    start: schedule.startDate,
    end: schedule.endDate || schedule.startDate,
    budget: schedule.budget,
    category: schedule.categoryId,
  }));

  // 캘린더에서 날짜 클릭 시 일정 추가 모달 열기
  const handleDateClick = (info) => {
    setNewEventDate(dayjs(info.date));
    setIsModalVisible(true);
  };

  // 캘린더에서 일정 클릭 시 수정 모드로 모달 열기
  const handleEventClick = (info) => {
    const clickedSchedule = schedules.find(
      (schedule) => schedule.scheduleId.toString() === info.event.id
    );
    setSelectedSchedule(clickedSchedule);
    setNewEventName(clickedSchedule.title);
    setNewEventContent(clickedSchedule.description);
    setNewEventDate(dayjs(clickedSchedule.startDate));
    if (clickedSchedule.endDate) {
      setNewEventEndDate(dayjs(clickedSchedule.endDate));
      setIsEndDateEnabled(true);
    }
    setIsEditing(true);
    setIsModalVisible(true);
    setNewBudget(clickedSchedule.budget);
    setNewCategory(clickedSchedule.categoryId);
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
        onClick={handleDateClick}
        style={styles.addButton}
        shape="circle"
      >
        +
      </Button>

      <Modal
        title={isEditing ? "일정 수정" : "일정 추가"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          isEditing && (
            <Button key="delete" type="danger" onClick={deleteSchedule}>
              삭제
            </Button>
          ),
          <Button key="cancel" onClick={handleCancel}>
            취소
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            {isEditing ? "수정" : "추가"}
          </Button>,
        ]}
      >
        <div style={{ margin: "10px" }}>
          <Input
            type="text"
            value={newEventName}
            placeholder="일정 이름"
            onChange={(e) => setNewEventName(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <Input.TextArea
            value={newEventContent}
            placeholder="일정 설명"
            onChange={(e) => setNewEventContent(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
        </div>
        <div style={{ margin: "10px" }}>
          <span>시작일</span>
          <DatePicker
            value={newEventDate}
            onChange={(date) => setNewEventDate(date)}
            style={{ marginTop: "10px", marginBottom: "10px", width: "100%" }}
          />
        </div>
        <div style={{ margin: "10px" }}>
          <span>종료일: </span>
          <Switch
            checked={isEndDateEnabled}
            onChange={(checked) => setIsEndDateEnabled(checked)}
          />
        </div>
        {isEndDateEnabled && (
          <div style={{ margin: "10px" }}>
            <DatePicker
              value={newEventEndDate}
              onChange={(date) => setNewEventEndDate(date)}
              style={{ marginBottom: "10px", width: "100%" }}
              placeholder="종료일 선택"
            />
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ marginLeft: "10px" }}>
            <span>카테고리 </span>
            <Select
              value={newCategory}
              onChange={(value) => setNewCategory(value)}
              style={{ width: "100px" }}
            >
              <Option value={1}>식비</Option>
              <Option value={2}>카페/간식</Option>
              <Option value={3}>의료/건강</Option>
              <Option value={4}>술/유흥</Option>
              <Option value={5}>의복/미용</Option>
              <Option value={6}>자동차</Option>
              <Option value={7}>교통</Option>
              <Option value={8}>주거/통신</Option>
              <Option value={9}>생활</Option>
              <Option value={10}>문화/여가</Option>
              <Option value={11}>여행/숙박</Option>
              <Option value={12}>교육</Option>
              <Option value={13}>육아</Option>
              <Option value={14}>기타</Option>
              <Option value={15}>경조사</Option>
            </Select>
          </div>
          <div>
            <span style={{ marginRight: "10px" }}>예산</span>
            <Input
              type="number"
              value={newBudget}
              placeholder="예산"
              onChange={(e) => setNewBudget(parseInt(e.target.value, 10) || 0)}
              style={{
                width: "200px",
                marginRight: "10px",
              }}
            />
            <span>원</span>
          </div>
        </div>
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
    width: "100%",
    height: "100%",
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
