"use client";
import React from "react";
import { useState } from "react";
import styles from "@/Styles/form.module.css";
import userLocationTime from "@/helper/generalHelpers";

export default function Home() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    //"https://nasa-app-server-p2d3.onrender.com/user/register"
    //http://localhost:3003/user/register
    try {
      const resp = await fetch(
      //"http://localhost:3004/user/register",
      "https://nasa-app-server-p2d3.onrender.com/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await resp.json();
      if (resp.ok) {
        setSuccess(result.message);
        console.log("User registered successfully");
      } else {
        if (result.MongoServerTime) {
          setError(result.message + userLocationTime(result.MongoServerTime));
        } else {
          setError(result.message);
        }
        console.log(result);
        console.log("Error registering user");
      }
    } catch (error) {
      console.log(error);
      console.log("Error in user registration:");
    }
  }
  return (
    <div className="container mt-5">
      <form
        onSubmit={handleRegister}
        className={`${styles.containor} + mx-auto p-5 bg-white`}>
        <h3 className="text-center mb-4">Create a new account</h3>
        {error && (
          <p className="text-center mb-4" style={{ color: "red" }}>
            {error}
          </p>
        )}
        {success && (
          <p className="text-center mb-4" style={{ color: "green" }}>
            {success}
          </p>
        )}
        <div className="d-flex flex-column align-items-center">
          <div className="mb-4" style={{ width: "100%" }}>
            <input
              type="text"
              name="username"
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
