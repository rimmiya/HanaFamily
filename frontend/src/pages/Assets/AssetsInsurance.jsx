import React from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import AssetsMainMenu from "../../components/Assets/AssetsMenu";
import AssetsInsuranceContent from "../../components/Assets/AssetsInsuranceContent";

function AssetsLoan() {
  return (
    <div>
      <Header></Header>
      <AssetsMainMenu></AssetsMainMenu>
      <AssetsInsuranceContent></AssetsInsuranceContent>
      <Footer></Footer>
    </div>
  );
}
export default AssetsLoan;
