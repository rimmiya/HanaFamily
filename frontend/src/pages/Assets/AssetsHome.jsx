import React from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import AssetsTitle from "../../components/Assets/AssetsTitle";
import AssetsContent from "../../components/Assets/AssetsContent";

function Assets() {
  return (
    <div>
      <Header></Header>
      <AssetsTitle></AssetsTitle>
      <AssetsContent></AssetsContent>
      <Footer></Footer>
    </div>
  );
}
export default Assets;
