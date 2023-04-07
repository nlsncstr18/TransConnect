import React from "react";
import LoginModal from "./LoginModal";
import DashBoard from "./views/DashBoard";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <>
      <div className="app-main">
        <Router>
          <Routes>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="" element={<LoginModal />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
