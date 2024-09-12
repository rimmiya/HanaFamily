import React from "react";
import Header from "../../components/common/Header";
import TogetherAccountTitle from "../../components/TogetherAccount/TogetherAccountTitle";
import TogetherAccountMain from "../../components/TogetherAccount/TogetherAccountMain";
import Footer from "../../components/common/Footer";

function TogetherAccount() {
  return (
    <div>
      <Header></Header>
      <TogetherAccountTitle></TogetherAccountTitle>
      <TogetherAccountMain></TogetherAccountMain>
      <Footer></Footer>
    </div>
  );
}

export default TogetherAccount;
