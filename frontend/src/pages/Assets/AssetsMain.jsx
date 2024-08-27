import React from "react";
import Header from "../../components/common/Header";
import AssetsMainMenu from "../../components/Assets/AssetsMenu";
import AssetsMainContent from "../../components/Assets/AssetsMainContent";
import Footer from "../../components/common/Footer";

function AssetsMain() {
  return (
    <div>
      <Header></Header>
      <AssetsMainMenu></AssetsMainMenu>
      <AssetsMainContent></AssetsMainContent>
      <Footer></Footer>
    </div>
  );
}
export default AssetsMain;
