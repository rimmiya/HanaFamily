import React from "react";
import Header from "../../components/common/Header";
import TogetherAccountTitle from "../../components/TogetherAccount/TogetherAccountTitle";
import TerminateSavings from "../../components/TogetherAccount/TerminateSavings";
import Footer from "../../components/common/Footer";

function SuccessSavings() {
  return (
    <div>
      <Header></Header>
      <TogetherAccountTitle></TogetherAccountTitle>
      <TerminateSavings></TerminateSavings>
      <Footer></Footer>
    </div>
  );
}

export default SuccessSavings;
