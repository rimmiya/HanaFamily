import React from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import AssetsJoinTitle from "../../components/Assets/AssetsJoinTitle";
import AssetsJoinContent from "../../components/Assets/AssetsJoinContent";

function AssetsJoin() {
  return (
    <div>
      <Header></Header>
      <AssetsJoinTitle></AssetsJoinTitle>
      <AssetsJoinContent></AssetsJoinContent>
      <Footer></Footer>
    </div>
  );
}
export default AssetsJoin;
