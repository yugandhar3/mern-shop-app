import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaShoppingCart, FaList } from 'react-icons/fa'; // Import the cart icon
import Badge from 'react-bootstrap/Badge';
import "./style.css";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux"

function Header() {
  const { cartData } = useSelector((state) => state.cart);
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" ><h4>Shop</h4></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features"></Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/checkout-success">
              <FaList size={20} />
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              <FaShoppingCart size={20} />
              <Badge bg="danger" className="cart-badge">
                {cartData.length}
              </Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
