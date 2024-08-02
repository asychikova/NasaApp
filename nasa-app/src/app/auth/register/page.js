"use client";
import React from "react";
import { useState } from "react";
import styles from "@/Styles/form.module.css";

export default function Home() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleRegister(e) {
    e.preventDefault();
    setError(""); // Reset any previous errors
    try {
      const resp = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(e),
      });

      if (response.ok) {
        console.log("User registered successfully");
      } else {
        console.log("Error registering user");
      }
    } catch (error) {
      console.log("Error in user registration:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  }
  return (
    <div className="container mt-5">
      <form onSubmit={handleRegister} className="w-25 mx-auto p-5 bg-white">
        <h3 className="text-center mb-4">Create a new account</h3>
        {error && (
          <p className="text-center mb-4" style={{ color: "red" }}>
            {error}
          </p>
        )}
        <div className="d-flex flex-column align-items-center">
          <div className="mb-4" style={{ width: "100%" }}>
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={formData.value}
              onChange={handleChange}
              className={`form-control ${styles.input}`}
              required
            />
          </div>
          <div className="mb-4" style={{ width: "100%" }}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`form-control ${styles.input}`}
              required
            />
          </div>
          <div className="mb-4" style={{ width: "100%" }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`form-control ${styles.input}`}
              required
            />
          </div>
          <button className="btn btn-dark w-100" style={{ margin: "15px" }}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
