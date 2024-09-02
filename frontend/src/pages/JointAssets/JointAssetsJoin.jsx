import React from "react";
import Header from "../../components/common/Header";
import JointAssetsTitle from "../../components/JointAssets/JointAssetsTitle";
import JointAssetsJoinContent from "../../components/JointAssets/JointAssetsJoin/JointAssetsJoinContent";
import Footer from "../../components/common/Footer";

function JointAssetsJoin() {
  return (
    <div>
      <Header></Header>
      <JointAssetsTitle></JointAssetsTitle>
      <JointAssetsJoinContent></JointAssetsJoinContent>
      <Footer></Footer>
    </div>
  );
}

export default JointAssetsJoin;
