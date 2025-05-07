import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
function navbar() {
  return (
    <Navbar
      expand="lg"
      className="shadow-sm sticky-top"
      style={{ backgroundColor: "rgb(150, 153, 151)" }}
    >
      <Container className="d-flex justify-content-between align-items-center text-large fw-bold">
        <Nav className="me-auto">
          <Nav.Link href="#">Men</Nav.Link>
          <Nav.Link href="#">Women</Nav.Link>
          <Nav.Link href="#">Kids</Nav.Link>
          <Nav.Link href="#">Sale</Nav.Link>
        </Nav>

        <Navbar.Brand className="mx-auto order-0 fw-bold">
        E-Shop
        </Navbar.Brand>

        <div className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
          <Form className="d-flex" style={{ width: "300px" }}>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2 fw-bold"
              style={{ fontSize: "1.1rem" }}
            />
            <Button variant="dark">Search</Button>
          </Form>
          <Button variant="outline-dark" className="d-flex align-items-center">
            <FaHeart />
          </Button>
          <Button variant="outline-dark" className="d-flex align-items-center">
            <FaShoppingCart />
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}

export default navbar;
