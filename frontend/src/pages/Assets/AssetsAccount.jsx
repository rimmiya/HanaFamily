import React from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import AssetsMainMenu from "../../components/Assets/AssetsMenu";
import AssetsAccountContent from "../../components/Assets/AssetsAccountContent";

function AssetsAccount() {
  return (
    <div>
      <Header></Header>
      <AssetsMainMenu></AssetsMainMenu>
      <AssetsAccountContent></AssetsAccountContent>
      <Footer></Footer>
    </div>
  );
}
export default AssetsAccount;
