import React, { useState, useEffect } from "react";
import { IoIosNotificationsOutline } from "react-icons/io"; // 종 아이콘
import {
  Badge,
  Button,
  Modal,
  Input,
  DatePicker,
  Checkbox,
  Select,
} from "antd"; // 알림 배지 표시 및 모달
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 훅
import axios from "axios"; // API 호출을 위한 axios
import dayjs from "dayjs"; // 날짜 처리를 위한 dayjs
import { useDispatch, useSelector } from "react-redux";

const { Option } = Select;

const InvitationNotifications = () => {
  const [notifications, setNotifications] = useState([]); // 알림 상태
  const [unreadCount, setUnreadCount] = useState(0); // 읽지 않은 알림 개수
  const [isDropdownVisible, setDropdownVisible] = useState(false); // 알림 드롭다운 표시 상태
  const [isModalVisible, setIsModalVisible] = useState(false); // 모달 표시 상태
  const [participationDetails, setParticipationDetails] = useState({
    savingAccountNo: "",
    userId: "",
    userAccountNo: "",
    familyId: "",
    totalAmount: 0,
    autoTransferDate: null,
    autoTransferAmount: 0,
    autoTransferSmsYn: "N",
    maturitySmsYn: "N",
    startDate: dayjs(),
    successfulTransferYn: 0,
    bonusApplied: false,
  }); // 모달에서 입력할 참여 상세 정보
  const [currentInvitationId, setCurrentInvitationId] = useState(null); // 현재 수락할 저축 초대의 ID
  const [currentSavingAccountNo, setCurrentSavingAccountNo] = useState(""); // 현재 초대받은 저축 계좌번호 저장
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const user = useSelector((state) => state.user.userInfo);

  // 서버에서 알림 데이터를 가져오는 함수
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/notifications/user",
        {
          params: { userNo: user.userNo }, // 실제 로그인된 사용자의 userNo를 넣어줍니다.
        }
      );

      // 알림이 존재하는지 확인하고 처리
      if (response.data && response.data.length > 0) {
        setNotifications(response.data); // 상태에 저장

        // 첫 번째 알림의 invitationId와 savingAccountNo만 저장 (알림이 있을 때만)
        setParticipationDetails((prev) => ({
          ...prev,
          invitationId: response.data[0]?.invitationId,
          savingAccountNo: response.data[0]?.savingAccountNo,
        }));
      } else {
        setNotifications([]); // 알림이 없으면 빈 배열로 설정
      }
    } catch (error) {
      console.error("알림 목록을 불러오는 중 오류 발생:", error);
    }
  };

  // 초대 수락 버튼 클릭 시 모달을 띄우고 invitationId 저장
  const handleAcceptClick = (invitationId, savingAccountNo) => {
    setCurrentInvitationId(invitationId); // 현재 초대 ID 저장
    setCurrentSavingAccountNo(savingAccountNo); // 초대받은 저축 계좌번호 저장
    setParticipationDetails((prev) => ({
      ...prev,
      savingAccountNo, // 저축 계좌번호 저장
      userId: user.userNo, // Redux의 user 정보에서 userId 설정
      familyId: user.familyId, // Redux의 user 정보에서 familyId 설정
    }));
    // 상태로 데이터를 전달
    navigate("/inviteeconfirmaccount", {
      state: { invitationId, savingAccountNo },
    });
    // navigate("/inviteeconfirmaccount");
  };

  // 가족 초대 수락 시 페이지 이동하고 알림 삭제
  const handleFamilyAccept = async (invitationId) => {
    try {
      // 알림 목록을 갱신하고 해당 알림을 없앰
      setNotifications((prev) =>
        prev.filter(
          (notification) => notification.invitationId !== invitationId
        )
      );
      // 가족 초대 수락 후 /assetsjoin 페이지로 이동
      navigate("/assetsjoin");
    } catch (error) {
      console.error("가족 초대 수락 중 오류 발생:", error);
    }
  };

  // 저축 해지
  const handleTerminateSavings = async (savingAccountNo) => {
    try {
      setNotifications((prev) =>
        prev.filter(
          (notification) => notification.savingAccountNo !== savingAccountNo
        )
      );
      navigate("/successsavings");
    } catch (error) {
      console.error("저축 해지 중 오류 발생:", error);
    }
  };

  // 모달에서 입력한 정보를 제출하고 초대 수락 API 요청
  const handleModalOk = async () => {
    try {
      const requestDTO = {
        invitationId: currentInvitationId,
        participationDetails: {
          ...participationDetails,
          savingAccountNo: currentSavingAccountNo, // 저축 계좌번호 추가
          startDate: participationDetails.startDate.format("YYYY-MM-DD"),
          autoTransferSmsYn: participationDetails.autoTransferSmsYn ? "Y" : "N", // 체크박스 상태에 따라 Y/N 설정
          maturitySmsYn: participationDetails.maturitySmsYn ? "Y" : "N", // 체크박스 상태에 따라 Y/N 설정
        },
      };

      await axios.post(
        "http://localhost:8080/api/savings/accept-invitation",
        requestDTO
      );

      // 알림 갱신
      fetchNotifications();
      setIsModalVisible(false); // 모달 닫기
    } catch (error) {
      console.error("저축 초대 수락 중 오류 발생:", error);
    }
  };

  // 모달에서 입력한 정보를 업데이트하는 함수
  const handleInputChange = (field, value) => {
    setParticipationDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 읽지 않은 알림 개수를 계산하는 함수
  const calculateUnreadCount = () => {
    setUnreadCount(notifications.length); // 알림 개수
  };

  useEffect(() => {
    fetchNotifications(); // 알림 조회

    const interval = setInterval(fetchNotifications, 10000); // 5초마다 알림 목록 갱신
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 해제
  }, []);

  useEffect(() => {
    calculateUnreadCount();
  }, [notifications]);

  return (
    <div style={{ position: "relative" }}>
      {/* 종 아이콘과 읽지 않은 알림 수 배지 */}
      <Badge count={unreadCount}>
        <IoIosNotificationsOutline
          size={24}
          onClick={() => setDropdownVisible(!isDropdownVisible)}
          style={{ cursor: "pointer" }}
        />
      </Badge>

      {/* 알림 드롭다운 */}
      {isDropdownVisible && (
        <div style={styles.dropdown}>
          <h4 className="text-center mb-3">알림</h4>
          {notifications.length === 0 ? (
            <p className="text-center">새로운 알림이 없습니다.</p>
          ) : (
            notifications.map((notification, index) => (
              <div key={index} style={styles.notificationItem}>
                <p>{notification.message}</p>
                {notification.type === "savings_invitation" ? (
                  <Button
                    onClick={() =>
                      handleAcceptClick(
                        notification.invitationId,
                        notification.savingAccountNo
                      )
                    }
                  >
                    저축 초대 수락
                  </Button>
                ) : notification.type === "family_invitation" ? (
                  <Button
                    onClick={() =>
                      handleFamilyAccept(notification.invitationId)
                    }
                  >
                    가족 초대 수락
                  </Button>
                ) : notification.type === "savings_terminate" ? (
                  <Button
                    onClick={() =>
                      handleTerminateSavings(notification.savingAccountNo)
                    }
                  >
                    저축 해지
                  </Button>
                ) : null}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  dropdown: {
    position: "absolute",
    top: "35px",
    width: "250px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
    padding: "10px",
    zIndex: 1000,
  },
  notificationItem: {
    marginBottom: "10px",
  },
};

export default InvitationNotifications;
