import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Nav from "../components/Nav";
import "./globals.css";

export default function Root({ children }) {
  return (
    <html lang="en">
      <body style={{ background: "#D9D9D9" }}>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
