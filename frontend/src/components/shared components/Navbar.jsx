import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useState } from "react";
function navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [search, setsearch] = useState("");
  const userName = token ? jwtDecode(token).author : "";
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <Navbar
      expand="lg"
      className="shadow-sm sticky-top"
      style={{ backgroundColor: "rgb(150, 153, 151)" }}
    >
      <Container className="d-flex justify-content-between align-items-center text-large fw-bold">
      <Button
            variant="outline-dark"
            className="d-flex align-items-center"
            onClick={() => {
              navigate(-1);
            }}
          >
            <IoMdArrowRoundBack />
          </Button>
        <Navbar.Brand className="mx-auto order-0 fw-bold">
          <FaUser /> {userName}{" "}
        </Navbar.Brand>

        <Navbar.Brand
          className="mx-auto order-0 fw-bold"
          onClick={() => {
            navigate("/category");
          }}
        >
          E-Shop
        </Navbar.Brand>

        <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
          <Form className="d-flex" style={{ width: "300px" }}>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2 fw-bold"
              style={{ fontSize: "1.1rem" }}
              onChange={(e) => {
                setsearch(e.target.value);
              }}
            />
            <Button
              onClick={() => {
                localStorage.setItem("search", search);
                navigate("/searchPage");
                refreshPage();
              }}
              variant="dark"
            >
              Search
            </Button>
          </Form>
          <Button
            variant="outline-dark"
            className="d-flex align-items-center"
            onClick={() => {
              navigate("/cart");
            }}
          >
            <FaShoppingCart />
          </Button>
          <Button
            variant="outline-dark"
            className="d-flex align-items-center"
            onClick={() => {
              navigate("/");
              localStorage.clear();
            }}
          >
            <IoLogOut />
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}

export default navbar;
