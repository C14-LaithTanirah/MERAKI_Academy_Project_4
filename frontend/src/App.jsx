import React from "react";
import "./App.css";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import Login from "./components/shared components/Login";
import Register from "./components/shared components/Register";
import Navbar from "./components/shared components/Navbar";
import Category from "./components/role 1 interface/Category";
import Fotter from "./components/shared components/Fotter";
import Prodacts from "./components/role 1 interface/Prodacts";
import Cart from "./components/role 1 interface/Cart";
import ProductPage from "./components/role 1 interface/ProductPage";
import SearchPage from "./components/role 1 interface/searchPage";
import AdminDashboard from "./components/role 2 interface/AdminDashboard";
const App = () => {
  const [navbarToggel, setNavbarToggel] = useState(false);
  return (
    <div
      className="custom-bg text-large fw-bold"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      {navbarToggel && <Navbar />}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/category" element={<Category setNavbarToggel={setNavbarToggel} />}></Route>
          <Route path="/prodects" element={<Prodacts setNavbarToggel={setNavbarToggel} />}></Route>
          <Route path="/cart" element={<Cart setNavbarToggel={setNavbarToggel} />}></Route>
          <Route path="/productPage" element={<ProductPage setNavbarToggel={setNavbarToggel} />}></Route>
          <Route path="/searchPage" element={<SearchPage setNavbarToggel={setNavbarToggel} />}></Route>
          <Route path="/adminDashboard" element={<AdminDashboard />}></Route>
        </Routes>
      </main>
      <Fotter />
    </div>
  );
};

export default App;
