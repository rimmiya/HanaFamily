import React from "react";
import "../../style/AssetsTitle.css";

function TogetherAccountTitle() {
  return (
    <div style={style.container}>
      <div className="assets-title">
        <div className="left-assets-title">
          <h2>함께 적금</h2>
          <p>목표 금액까지 함께 모아 더 빨리, 더 크게,</p>
        </div>
      </div>
    </div>
  );
}

const style = {
  container: {
    background: "rgb(238,174,202)",
    background:
      "linear-gradient(90deg, rgba(148,187,233,0.5585818042813455) 0%, rgba(189,181,219,0.5157683486238532) 45%, rgba(238,174,202,0.5463493883792049) 100%)",
    width: "100%",
    fontFamily: "CustomFont",
    minHeight: "200px",
    display: "flex",
  },
};
export default TogetherAccountTitle;
