import React, { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import "../../style/JointAssetsList.css";

function JointAssetsList() {
  const byeoldol = `${process.env.PUBLIC_URL}/img/byeoldol.png`;
  const byeolnim = `${process.env.PUBLIC_URL}/img/byeolnim.png`;

  // 모달 상태 관리
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [relationship, setRelationship] = useState("");

  const handleRelationshipChange = (event) => {
    setRelationship(event.target.value);
  };

  return (
    <div className="joint-assets-list-container">
      <div className="joint-assets-list-content">
        <div className="joint-assets-list-title">
          <h2 style={{ fontSize: "24px" }}>함께하는 가족</h2>
          <div className="joint-assets-list">
            {/* 별돌 */}
            <div
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
                  src={byeoldol}
                  alt={`avatar`}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="joint-assets-list-name">별돌</div>
            </div>

            {/* 별님 */}
            <div
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
                  src={byeolnim}
                  alt={`avatar`}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="joint-assets-list-name">별님</div>
            </div>

            {/* 초대하기 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer", // 커서 변경
              }}
              onClick={handleOpen} // 클릭 이벤트 추가
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
          </div>
        </div>
      </div>

      {/* 모달 추가 */}
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
            <TextField label="이름" placeholder="example" variant="outlined" />
            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              <TextField
                label="전화번호"
                placeholder="example"
                variant="outlined"
                fullWidth
              />
              -
              <TextField
                label="전화번호"
                placeholder="example"
                variant="outlined"
                fullWidth
              />
              -
              <TextField
                label="전화번호"
                placeholder="example"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Select
              value={relationship}
              onChange={handleRelationshipChange}
              displayEmpty
              variant="outlined"
              fullWidth
            >
              <MenuItem value="" disabled>
                Please select
              </MenuItem>
              <MenuItem value="parent">부모님</MenuItem>
              <MenuItem value="sibling">형제/자매</MenuItem>
              <MenuItem value="child">자녀</MenuItem>
            </Select>
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
            <Button variant="contained" color="primary">
              초대하기
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default JointAssetsList;
