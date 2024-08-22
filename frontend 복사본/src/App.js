import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Assets from "./pages/Assets/AssetsHome";
import Auth from "./pages/Auth";
import AssetsJoin from "./pages/Assets/AssetsJoin";

function About() {
  return <h2>About Page</h2>;
}

function Contact() {
  return <h2>Contact Page</h2>;
}

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/assetsjoin" element={<AssetsJoin />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
