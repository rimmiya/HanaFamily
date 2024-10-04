import React from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import AssetsMainMenu from "../../components/Assets/AssetsMenu";
import AssetsLoanContent from "../../components/Assets/AssetsLoanContent";
import JointAssetsTitle from "../../components/JointAssets/JointAssetsTitle";

function AssetsLoan() {
  return (
    <div>
      <Header></Header>
      <JointAssetsTitle></JointAssetsTitle>
      <AssetsMainMenu></AssetsMainMenu>
      <AssetsLoanContent></AssetsLoanContent>
      <Footer></Footer>
    </div>
  );
}
export default AssetsLoan;
