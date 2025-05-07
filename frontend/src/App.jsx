import React from "react";
import "./App.css";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import Login from "./components/shared components/Login";
import Register from "./components/shared components/Register";
import Navbar from "./components/shared components/Navbar";
import Category from "./components/role 1 interface/Category";
import Fotter from "./components/shared components/Fotter";
const App = () => {
  return (
    <div
      className="custom-bg text-large fw-bold"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" ,backgroundColor:"white"}}
    >
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/category" element={<Category />}></Route>
        </Routes>
      </main>
      <Fotter />
    </div>
  );
};

export default App;
