import React from "react";
import "../../style/AssetsTitle.css";

function AccountBookTitle() {
  return (
    <div style={style.container}>
      <div className="assets-title">
        <div className="left-assets-title">
          <h2>가계부</h2>
          <p>소비내역 확인하고, 가족 일정관리 까지 함께해요</p>
        </div>
      </div>
    </div>
  );
}

const style = {
  container: {
    background: "rgb(238,174,202)",
    background:
      "linear-gradient(261deg, rgba(147,129,255,0.758140756302521) 0%, rgba(0,188,156,0.5) 40%, rgba(93,175,251,0.5077205882352942) 80%)",
    width: "100%",
    fontFamily: "CustomFont",
    minHeight: "200px",
    display: "flex",
  },
};
export default AccountBookTitle;
