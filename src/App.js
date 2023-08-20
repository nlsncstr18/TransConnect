import React from "react";
import LoginPage from "./LoginPage";
import DashBoard from "./views/DashBoard";

import About from "./views/projects/projects";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <>
      <div className="app-main">
        <Router>
          <Routes>
            <Route path="/TransConnect" element={<LoginPage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashBoard />} />

            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
