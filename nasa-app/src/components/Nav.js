"use client";
//  React Bootstrap's Dropdown component, relies on client-side JavaScript to function correctly.
import styles from "../Styles/navbar.module.css";

import { Dropdown } from "react-bootstrap";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { usePathname } from "next/navigation";
import { useAtom } from "jotai";
import { userName } from "@/global state/atom";

import handleLogout from "@/helper/logOut";
import LogOut from "@/helper/logOut";

export default function NavBar() {
  const [theUserName, setUserName] = useAtom(userName);

  const currentPath = usePathname();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" className="fw-bold">
          Cosmic Canvas
        </Navbar.Brand>
        <div className={styles.rightShift}>
          <Dropdown>
            <Dropdown.Toggle className="btn-dark">Categories</Dropdown.Toggle>
            <Dropdown.Menu className={styles.dropdownBg}>
              <Dropdown.Item
                className={styles.whiteFont}
                href="/gallery/galaxy">
                Galaxies
              </Dropdown.Item>
              <Dropdown.Item
                className={styles.whiteFont}
                href="/gallery/nebula">
                Nebula
              </Dropdown.Item>
              <Dropdown.Item
                className={styles.whiteFont}
                href="/gallery/black hole">
                Black Holes
              </Dropdown.Item>
              <Dropdown.Item
                className={styles.whiteFont}
                href="/gallery/planet">
                Planets
              </Dropdown.Item>
              <Dropdown.Item
                className={styles.whiteFont}
                href="/gallery/satellite">
                Satellites
              </Dropdown.Item>
              <Dropdown.Item className={styles.whiteFont} href="/gallery/earth">
                Earth
              </Dropdown.Item>
              <Dropdown.Item className={styles.whiteFont} href="/gallery/sun">
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
            <Nav.Link href="/">Gallery</Nav.Link>
          </span>
          <span className={styles.customPadding}>
            {" "}
            <Nav.Link href="/cart">Cart</Nav.Link>
          </span>
          <span className={styles.customPadding}>
            {" "}
            <Nav.Link href="/feedback">Feedback</Nav.Link>
          </span>
          {theUserName ? (
            <>
              <span
                className={styles.customPadding + " fs-7"}
                style={{ whiteSpace: "nowrap" }}>
                Hello, {theUserName}!
              </span>
              <LogOut />
            </>
          ) : (
            <>
              <span className="nav-item">
                <Link
                  className="w-100 btn btn-outline-dark me-2"
                  href="/auth/login"
                  style={{ whiteSpace: "nowrap" }}>
                  Sign In
                </Link>
              </span>
              <span className={`nav-item ${styles.customPadding}`}>
                {currentPath == "/auth/register" ? (
                  <button type="button" className="w-100 btn btn-dark" disabled>
                    Register
                  </button>
                ) : (
                  <Link className="w-100 btn btn-dark" href="/auth/register">
                    Register
                  </Link>
                )}
              </span>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
