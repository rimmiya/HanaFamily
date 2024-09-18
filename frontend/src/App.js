import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Assets from "./pages/Assets/AssetsHome";
import Auth from "./pages/Auth";
import AssetsJoin from "./pages/Assets/AssetsJoin";
import AssetsMain from "./pages/Assets/AssetsMain";
import AssetsAccount from "./pages/Assets/AssetsAccount";
import AssetsSecurities from "./pages/Assets/AssetsSecurities";
import AssetsLoan from "./pages/Assets/AssetsLoan";
import AssetsInsurance from "./pages/Assets/AssetsInsurance";
import JointAssets from "./pages/JointAssets/JointAssets";
import JointAssetsJoin from "./pages/JointAssets/JointAssetsJoin";
import FamilyJoinRedirect from "./pages/JointAssets/FamilyJoinRedirect";
import InviteSuccess from "./components/JointAssets/InviteSuccess";
import InviteFailed from "./components/JointAssets/InviteFailed";
import TogetherAccount from "./pages/TogetherAccount/TogetherAccount";
import TogetherAccountJoin from "./pages/TogetherAccount/TogetherAccountJoin";
import ConfirmationAccount from "./pages/TogetherAccount/ConfirmationAccount";
import TogetherAccountSetting from "./pages/TogetherAccount/TogetherAccountSetting";
import AccountBook from "./pages/AccountBook/AccountBook";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/assetsjoin" element={<AssetsJoin />} />
        <Route path="/assetsmain" element={<AssetsMain />} />
        <Route path="/assetsaccount" element={<AssetsAccount />} />
        <Route path="/assetssecurities" element={<AssetsSecurities />} />
        <Route path="/assetsloan" element={<AssetsLoan />} />
        <Route path="/assetsinsurance" element={<AssetsInsurance />} />
        <Route path="/jointassets" element={<JointAssets />} />
        <Route path="/jointassetsjoin" element={<JointAssetsJoin />} />
        <Route path="/invite-success" element={<InviteSuccess />} />
        <Route path="/invite-failed" element={<InviteFailed />} />
        <Route path="/familyjoinredirect" element={<FamilyJoinRedirect />} />
        <Route path="/togetheraccount" element={<TogetherAccount />} />
        <Route path="/togetheraccountjoin" element={<TogetherAccountJoin />} />
        <Route path="/confirmationaccount" element={<ConfirmationAccount />} />
        <Route
          path="/togetheraccountsetting"
          element={<TogetherAccountSetting />}
        />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
