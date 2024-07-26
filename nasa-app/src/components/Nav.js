//Navbar styling
"use client";
//  React Bootstrap's Dropdown component, relies on client-side JavaScript to function correctly.
import { Dropdown } from "react-bootstrap";
import Link from "next/link";
import "@/app/globals.css";
//basic styles will be here

export default function Nav({ children }) {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" href="/gallery">
          Cosmic Canvas
        </Link>
        <div className="navbar" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Dropdown>
                <Dropdown.Toggle className="btn-dark">
                  Categories
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-bg">
                  <Dropdown.Item className="white-font" href="#/action-1">
                    Galaxies
                  </Dropdown.Item>
                  <Dropdown.Item className="white-font" href="#/action-2">
                    Nebula
                  </Dropdown.Item>
                  <Dropdown.Item className="white-font" href="#/action-3">
                    Black Holes
                  </Dropdown.Item>
                  <Dropdown.Item className="white-font" href="#/action-2">
                    Planets
                  </Dropdown.Item>
                  <Dropdown.Item className="white-font" href="#/action-2">
                    Space Crafts
                  </Dropdown.Item>
                  <Dropdown.Item className="white-font" href="#/action-2">
                    Earth
                  </Dropdown.Item>
                  <Dropdown.Item className="white-font" href="#/action-2">
                    Sun
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className="nav-item">
              <Link className="nav-link me-2" href="/gallery">
                Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link me-2" href="/wishlist">
                Wishlist
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-outline-dark me-2" href="/auth/login">
                Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-dark" href="/auth/register">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
