"use client";
//  React Bootstrap's Dropdown component, relies on client-side JavaScript to function correctly.
import { Dropdown } from "react-bootstrap";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import styles from "@/Styles/navbar.module.css";

export default function NavBar({ children }) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/gallery" className="fw-bold">Cosmic Canvas</Navbar.Brand>
        <div className={styles.rightShift}>
          <Dropdown>
            <Dropdown.Toggle className="btn-dark">
              Categories
            </Dropdown.Toggle>
            <Dropdown.Menu className={styles.dropdownBg}>
              <Dropdown.Item className={styles.whiteFont} href="#/action-1">
                Galaxies
              </Dropdown.Item>
              <Dropdown.Item className={styles.whiteFont} href="#/action-2">
                Nebula
              </Dropdown.Item>
              <Dropdown.Item className={styles.whiteFont} href="#/action-3">
                Black Holes
              </Dropdown.Item>
              <Dropdown.Item className={styles.whiteFont} href="#/action-2">
                Planets
              </Dropdown.Item>
              <Dropdown.Item className={styles.whiteFont} href="#/action-2">
                Space Crafts
              </Dropdown.Item>
              <Dropdown.Item className={styles.whiteFont} href="#/action-2">
                Earth
              </Dropdown.Item>
              <Dropdown.Item className={styles.whiteFont} href="#/action-2">
                Sun
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className={styles.navContainer}>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "200px" }}
            navbarScroll></Nav>
          <span className={styles.customPadding}>
            <Nav.Link href="/gallery">Gallery</Nav.Link>
          </span>
          <span className={styles.customPadding}>
            {" "}
            <Nav.Link href="/wishlist">Wishlist</Nav.Link>
          </span>
          <span className={styles.customPadding}>
            {" "}
            <Nav.Link href="/feedback">Feedback</Nav.Link>
          </span>
          <span className="nav-item">
            <Link
              className="w-100 btn btn-outline-dark me-2"
              href="/auth/login">
              Sign In
            </Link>
          </span>
          <span className={`nav-item ${styles.customPadding}`}>
            <Link className="w-100 btn btn-dark" href="/auth/register">
              Register
            </Link>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
