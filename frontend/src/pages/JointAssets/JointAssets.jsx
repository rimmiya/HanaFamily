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
    <div>
      <Header></Header>
      <JointAssetsTitle></JointAssetsTitle>
      <div
        style={{
          width: "90%",
          display: "flex",
          justifyContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "34px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: "45%",
          }}
        >
          <JointAssetsMainContent></JointAssetsMainContent>
          <JointAssetsList></JointAssetsList>
        </div>
        <div style={{ width: "45%" }}>
          <HouseHoldAccount></HouseHoldAccount>
        </div>
      </div>
      <FamilyDashboard></FamilyDashboard>
      <Footer></Footer>
    </div>
  );
}
export default JointAssets;
