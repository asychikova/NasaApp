//Navbar styling
import 'bootstrap/dist/css/bootstrap.min.css'; 
import React from 'react';
import Link from 'next/link';
import './globals.css'; //basic styles will be here

export default function Nav({ children }) {
  return (
        <nav className="navbar navbar-expand navbar-light bg-light"> 
          <div className="container">
            <Link className="navbar-brand" href="/home">Cosmic Canvas</Link>
            <div className="navbar" id="navbarNav">
              <ul className="navbar-nav"> 
                <li className="nav-item">
                <Link className="nav-link me-2" href="/categories">Categories</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link me-2" href="/gallery">Gallery</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link me-2" href="/wishlist">Wishlist</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-outline-dark me-2" href="/auth/login">Sign In</Link> 
                </li>
                <li className="nav-item">
                  <Link className="btn btn-dark" href="/auth/register">Register</Link> 
                </li>
              </ul>
            </div>
          </div>
        </nav>
  );
}
