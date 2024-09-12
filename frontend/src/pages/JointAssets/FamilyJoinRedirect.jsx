import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import FamilyRedirect from "../../components/JointAssets/FamilyRedirect";
import FamilyJoinAuthPage from "../../components/Auth/FamilyJoinAuthPage";
import Footer from "../../components/common/Footer";

function FamilyJoinRedirect() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const inviteKey = queryParams.get("inviteKey"); // 초대장 키 가져오기
  return (
    <div>
      <Header></Header>
      <FamilyRedirect></FamilyRedirect>
      <FamilyJoinAuthPage inviteKey={inviteKey}></FamilyJoinAuthPage>
      <Footer></Footer>
    </div>
  );
}
export default FamilyJoinRedirect;
