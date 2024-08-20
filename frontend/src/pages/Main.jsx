import React from "react";
import Header from "../components/common/Header";
import HomeSlider from "../components/Home/HomeSlider";
import HomeSection2 from "../components/Home/HomeSection2";
import HomeSection3 from "../components/Home/HomeSection3";
import Footer from "../components/common/Footer";

function Main() {
  return (
    <div>
      <Header></Header>
      <HomeSlider></HomeSlider>
      <HomeSection2></HomeSection2>
      <HomeSection3></HomeSection3>
      <Footer></Footer>
    </div>
  );
}

export default Main;
