import React, { useState, useEffect } from "react";
import { BsPlusLg } from "react-icons/bs";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux"; // 로그인한 유저 정보 가져오기
import { setFamilyId } from "../../store"; // familyId 업데이트 액션 임포트
import axios from "axios";
import "../../style/JointAssetsList.css";

function JointAssetsList() {
  const byeoldol = `${process.env.PUBLIC_URL}/img/byeoldol.png`;
  const byeolnim = `${process.env.PUBLIC_URL}/img/byeolnim.png`;

  const [inviteePhone, setInviteePhone] = useState("");
  const [relationship, setRelationship] = useState("");
  const [open, setOpen] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]); // 가족 구성원 목록 상태 추가

  const user = useSelector((state) => state.user.userInfo); // 로그인한 유저 정보 가져오기
  const dispatch = useDispatch(); // Redux 액션 디스패치

  // Kakao SDK를 로드하는 useEffect
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js";
    script.async = true;
    document.body.appendChild(script);

    // 컴포넌트가 언마운트될 때 스크립트 제거
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // 가족 구성원 목록 가져오기 (familyId로 조회)
  useEffect(() => {
    const fetchFamilyMembers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/family/members?familyId=${user.familyId}`
        );

        // 백엔드에서 받은 데이터를 확인하고 familyMembers 배열을 추출
        if (response.data && response.data.familyMembers) {
          setFamilyMembers(response.data.familyMembers);
        } else {
          setFamilyMembers([]); // familyMembers가 없을 경우 빈 배열로 설정
        }

        console.log("가족 구성원 목록:", response.data.familyMembers);
      } catch (error) {
        console.error("가족 구성원 불러오기 실패:", error);
        setFamilyMembers([]); // 에러 발생 시 빈 배열로 설정
      }
    };

    if (user && user.familyId) {
      console.log("가족 구성원 목록 불러오기");
      fetchFamilyMembers();
    }
  }, [user]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRelationshipChange = (event) => {
    setRelationship(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setInviteePhone(event.target.value);
  };

  // Kakao 메시지 보내기 함수
  const sendKakaoMessage = (inviteLink) => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("0e88ff459e255f30bdbdedb15e4478d6"); // Kakao SDK 초기화
    }

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "초대장이 도착했습니다!",
        description: "초대 링크를 통해 가입하세요.",
        imageUrl: "https://example.com/image.png", // 이미지가 있을 경우 설정
        link: {
          webUrl: inviteLink,
          mobileWebUrl: inviteLink,
        },
      },
      buttons: [
        {
          title: "초대장 확인하기",
          link: {
            webUrl: inviteLink,
            mobileWebUrl: inviteLink,
          },
        },
      ],
    });
  };

  const handleSendInvitation = async () => {
    try {
      // 초대장 발급 API 호출
      const response = await axios.post(
        "http://localhost:8080/api/invitations/send",
        {
          userNo: user.userNo, // 발급자의 ID 설정 (로그인 사용자의 ID)
          inviteePhone: inviteePhone,
        }
      );

      const { inviteKey, familyId } = response.data; // familyId 반환

      // 초대장 링크 생성
      const inviteLink = `http://localhost:3000/familyjoinredirect?inviteKey=${inviteKey}`;

      // 가족 ID 업데이트
      dispatch(setFamilyId(familyId));

      // 카카오 메시지 전송
      sendKakaoMessage(inviteLink);

      // 모달 닫기
      handleClose();
    } catch (error) {
      console.error("초대장 발급 및 전송 중 오류 발생:", error);
    }
  };

  return (
    <div className="joint-assets-list-container">
      <div className="joint-assets-list-content">
        <div className="joint-assets-list-title">
          <h4 style={{ fontFamily: "CustomFont" }}>함께하는 가족</h4>
          <div className="joint-assets-list">
            {/* 가족 구성원 목록 */}
            {familyMembers.map((member) => (
              <div
                key={member.userNo}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    marginBottom: "10px",
                    overflow: "hidden",
                    borderRadius: "50%",
                    backgroundColor: "#ffffff",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <img
                    src={member.profileImageUrl || byeoldol} // 멤버 프로필 이미지
                    alt={member.userName}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="joint-assets-list-name">{member.userName}</div>
              </div>
            ))}

            {/* 초대하기 버튼 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={handleOpen}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  marginBottom: "10px",
                  overflow: "hidden",
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  alignContent: "center",
                }}
              >
                <BsPlusLg
                  style={{
                    width: "70%",
                    height: "auto",
                    objectFit: "cover",
                    marginLeft: "auto",
                    marginRight: "auto",
                    color: "#009178",
                  }}
                />
              </div>
              <div className="joint-assets-list-name">초대하기</div>
            </div>
            {/* 가족 관리 버튼 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer", // 커서 변경
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  marginBottom: "10px",
                  overflow: "hidden",
                  borderRadius: "50%",
                  backgroundColor: "#ffffff",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  class="material-symbols-outlined"
                  style={{
                    width: "70%",
                    height: "auto",
                    fontSize: "55px",
                    objectFit: "cover",
                    marginLeft: "auto",
                    marginRight: "auto",
                    color: "#009178",
                  }}
                >
                  settings
                </span>
              </div>
              <div className="joint-assets-list-name">가족 관리</div>
            </div>
          </div>
        </div>
      </div>

      {/* 모달 */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            borderRadius: "10px",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <h2 id="modal-title">가족 초대하기</h2>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              bgcolor: "#f7f7f7",
              p: 2,
              borderRadius: "10px",
            }}
          >
            <TextField
              label="전화번호"
              placeholder="010-0000-0000"
              variant="outlined"
              fullWidth
              value={inviteePhone}
              onChange={handlePhoneChange}
            />
            {/* <Select
              value={relationship}
              onChange={handleRelationshipChange}
              displayEmpty
              variant="outlined"
              fullWidth
            >
              <MenuItem value="" disabled>
                관계를 선택해주세요
              </MenuItem>
              <MenuItem value="parent">부모님</MenuItem>
              <MenuItem value="sibling">형제/자매</MenuItem>
              <MenuItem value="child">자녀</MenuItem>
            </Select> */}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
            }}
          >
            <Button variant="outlined" onClick={handleClose}>
              취소
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendInvitation}
            >
              초대하기
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default JointAssetsList;
