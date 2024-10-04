import React from "react";

function Footer() {
  const hanalogo = `${process.env.PUBLIC_URL}/img/img-hana-symbol-white.png`;
  return (
    <section id="Footer" className="w-full h-[300px] bg-[#1a1a1a] text-white">
      <div className="footer-box border-b-[1.5px] border-[#7f7f7f] h-[20%]">
        <div className="footer-top flex h-full justify-around items-center mx-auto">
          <p className="m-0">개인정보처리방침</p>
          <p className="m-0">신용정보활용체제</p>
          <p className="m-0">고객정보취급방침</p>
          <p className="m-0">하나맵</p>
        </div>
      </div>

      <div className="footer-bottom flex flex-col justify-evenly pl-[30px] h-[60%]">
        <img src={hanalogo} alt="HanaFamily" className="w-[250px] h-[50px]" />
        <p className="m-0">서울특별시 중구 을지로 66 02.2002.1110</p>
        <p>Copyright ⓒ 2022 HANA FINANCIAL GROUP. All rights Reserved.</p>
      </div>
    </section>
  );
}

export default Footer;
