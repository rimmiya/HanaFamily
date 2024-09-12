import React from "react";
import Header from "../../components/common/Header";
import JointAssetsTitle from "../../components/JointAssets/JointAssetsTitle";
import JointAssetsList from "../../components/JointAssets/JointAssetsList";
import JointAssetsMainContent from "../../components/JointAssets/JointAssetsMainContent";
import HouseHoldAccount from "../../components/JointAssets/HouseHoldAccount";
import FamilyDashboard from "../../components/JointAssets/FamilyDashboard";
import Footer from "../../components/common/Footer";

function JointAssets() {
  return (
    <div style={{ background: "#f1f1f1" }}>
      <Header></Header>
      <JointAssetsTitle></JointAssetsTitle>

      <FamilyDashboard></FamilyDashboard>

      <Footer></Footer>
    </div>
  );
}
export default JointAssets;
