import React from "react";
import Header from "../../components/common/Header";
import TogetherAccountTitle from "../../components/TogetherAccount/TogetherAccountTitle";
import TogetherAccountJoinContent from "../../components/TogetherAccount/TogetherAccountJoinContent";
import Footer from "../../components/common/Footer";

function TogetherAccountJoin() {
  return (
    <div>
      <Header></Header>
      <TogetherAccountTitle></TogetherAccountTitle>
      <TogetherAccountJoinContent></TogetherAccountJoinContent>
      <Footer></Footer>
    </div>
  );
}

export default TogetherAccountJoin;
