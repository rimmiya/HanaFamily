import React from "react";
import Header from "../../components/common/Header";
import TogetherAccountTitle from "../../components/TogetherAccount/TogetherAccountTitle";
import TogetherAccountSettingContent from "../../components/TogetherAccount/TogetherAccountSettingContent";
import Footer from "../../components/common/Footer";

function TogetherAccountSetting() {
  return (
    <div style={{ background: "#f1f1f1" }}>
      <Header></Header>
      <TogetherAccountTitle></TogetherAccountTitle>
      <TogetherAccountSettingContent></TogetherAccountSettingContent>
      <Footer></Footer>
    </div>
  );
}

export default TogetherAccountSetting;
