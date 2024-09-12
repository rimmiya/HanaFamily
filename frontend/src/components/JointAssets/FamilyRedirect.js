import React from "react";

function FamilyRedirect() {
  const letterImg = `${process.env.PUBLIC_URL}/img/email-envelope-inbox-shape-social-media-notification-icon-speech-bubbles-3d-cartoon-banner-website-ui-pink-background-3d-rendering-illustration.png`;
  return (
    <div
      style={{
        width: "100%",
        minHeight: "250px",
        background: "rgb(74,192,168)",
        background:
          "linear-gradient(0deg, rgba(74,192,168,0.4340730042016807) 18%, rgba(148,190,117,0.5545211834733893) 52%)",
      }}
    >
      <div
        style={{
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "200px",
        }}
      >
        <img src={letterImg} alt="letter" style={{ width: "200px" }} />
        <h3 style={{ color: "#363b3a" }}>
          함께 관리를 위해 로그인이 필요합니다
        </h3>
      </div>
    </div>
  );
}

export default FamilyRedirect;
