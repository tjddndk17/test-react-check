import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import DashBoard from "./views/DashBoard";
import Join from "./views/Join";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import CorpMember from "./views/member/CorpMember";
import CorpMemberDetail from "./views/member/CorpMemberDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<DashBoard />} />
        <Route path="join" element={<Join />} />
        <Route path="login" element={<Login />} />
        <Route path="/member/corpMember" element={<CorpMember />} />
        <Route path="/member/corpMemberDetail" element={<CorpMemberDetail />} />
        <Route element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
