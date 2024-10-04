import React from "react";
import Header from "../../components/common/Header";
import AccountBookTitle from "../../components/AccountBook/AccountBookTitle";
import HouseHoldAccount from "../../components/JointAssets/HouseHoldAccount";
import CategoryBudget from "../../components/AccountBook/CategoryBudget";
import FamilyCalendar from "../../components/JointAssets/FamilyCalendar";
import FamilyConsumptionPattern from "../../components/JointAssets/FamilyConsumptionPattern";
import Footer from "../../components/common/Footer";

function AccountBook() {
  return (
    <div>
      <Header></Header>
      <AccountBookTitle></AccountBookTitle>
      <div>
        <div
          style={{
            width: "80%",
            display: "flex",
            marginLeft: "auto",
            marginRight: "auto",
            gap: "20px",
            paddingTop: "20px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", width: "50%" }}
          >
            <HouseHoldAccount></HouseHoldAccount>
            <FamilyConsumptionPattern></FamilyConsumptionPattern>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "50%" }}
          >
            <CategoryBudget></CategoryBudget>
          </div>
        </div>
        <div
          style={{
            width: "80%",
            display: "flex",
            marginLeft: "auto",
            marginRight: "auto",
            gap: "20px",
            paddingTop: "20px",
          }}
        >
          <FamilyCalendar></FamilyCalendar>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default AccountBook;
