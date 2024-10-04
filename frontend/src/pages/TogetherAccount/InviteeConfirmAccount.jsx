import React from "react";
import Header from "../../components/common/Header";
import TogetherAccountTitle from "../../components/TogetherAccount/TogetherAccountTitle";
import InviteeConfirmationPage from "../../components/TogetherAccount/InviteeConfirmationPage";
import Footer from "../../components/common/Footer";

function InviteeConfirmAccount() {
  return (
    <div>
      <Header></Header>
      <TogetherAccountTitle></TogetherAccountTitle>
      <InviteeConfirmationPage></InviteeConfirmationPage>
      <Footer></Footer>
    </div>
  );
}

export default InviteeConfirmAccount;
