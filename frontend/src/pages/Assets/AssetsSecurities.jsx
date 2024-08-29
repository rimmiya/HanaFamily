import React from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import AssetsMainMenu from "../../components/Assets/AssetsMenu";
import AssetsSecuritiesContent from "../../components/Assets/AssetsSecuritiesContent";

function AssetsAccount() {
  return (
    <div>
      <Header></Header>
      <AssetsMainMenu></AssetsMainMenu>
      <AssetsSecuritiesContent></AssetsSecuritiesContent>
      <Footer></Footer>
    </div>
  );
}
export default AssetsAccount;
