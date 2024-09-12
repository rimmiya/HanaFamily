import React from "react";
import Header from "../../components/common/Header";
import TogetherAccountTitle from "../../components/TogetherAccount/TogetherAccountTitle";
import ConfirmationPage from "../../components/TogetherAccount/ConfirmationPage";
import Footer from "../../components/common/Footer";

function ConfirmationAccount() {
  return (
    <div>
      <Header></Header>
      <TogetherAccountTitle></TogetherAccountTitle>
      <ConfirmationPage></ConfirmationPage>
      <Footer></Footer>
    </div>
  );
}

export default ConfirmationAccount;
