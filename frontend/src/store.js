import { jwtDecode } from "jwt-decode";
import { configureStore, createSlice } from "@reduxjs/toolkit";

// 사용자 정보 및 로그인 상태를 관리할 슬라이스npm 정의
export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    token: null,
    userInfo: null,
  },
  reducers: {
    // 로그인 성공시 호출할 액션
    setLoginSuccess: (state, action) => {
      const decodedToken = jwtDecode(action.payload.token); // JWT 디코딩
      state.userInfo = {
        userId: decodedToken.userId,
        userName: decodedToken.userName,
        userNo: decodedToken.userNo,
        familyId: decodedToken.familyId || null,
      }; // 디코딩한 정보에서 사용자 ID와 이름을 추출
      state.token = action.payload.token; // JWT 토큰을 상태에 저장
      state.isLoggedIn = true;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo)); // 사용자 정보를 로컬스토리지에 저장
      localStorage.setItem("token", state.token); // JWT 토큰을 로컬스토리지에 저장
    },
    // 로그아웃 시 호출할 액션
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
    },
    // 가족 ID를 설정하는 액션
    setFamilyId: (state, action) => {
      if (state.userInfo) {
        state.userInfo.familyId = action.payload;
        // 업데이트된 userInfo를 로컬스토리지에 저장
        localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
      }
    },
  },
});

// 생성된 액션들을 외부에서 사용할 수 있도록 export
export const { setLoginSuccess, logout, setFamilyId } = userSlice.actions;

// 초기 상태를 localStorage에서 불러와 설정
const preloadedState = {
  user: {
    userInfo: JSON.parse(localStorage.getItem("userInfo") || "null"),
    token: localStorage.getItem("token") || null,
    isLoggedIn: !!localStorage.getItem("token"),
  },
};

// 스토어를 생성하고 슬라이스의 리듀서를 스토어에 연결
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
  preloadedState,
});

export default store;
