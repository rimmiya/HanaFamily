import React from "react";
import "../../style/Footer.css";

function Footer() {
  const hanalogo = `${process.env.PUBLIC_URL}/img/img-hana-symbol-white.png`;
  return (
    <section id="Footer">
      {/* <h1>Footer</h1> */}
      {/* <p>This is the content of section two.</p> */}
      <div class="footer-box">
        <div class="footer-top">
          <p>개인정보처리방침</p>
          <p>신용정보활용체제</p>
          <p>고객정보취급방침</p>
          <p>하나맵</p>
        </div>
      </div>
      <div class="footer-bottom">
        <img src={hanalogo} alt="HanaFamily" className="img-footer-logo" />
        <p>서울특별시 중구 을지로 66 02.2002.1110</p>
        <p>Copyright ⓒ 2022 HANA FINANCIAL GROUP. All rights Reserved.</p>
      </div>
    </section>
  );
}

export default Footer;
