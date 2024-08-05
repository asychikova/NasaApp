"use client";
import React, { useEffect } from "react";
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
  const [serverTime, setServerTime] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const prevStateRef = useRef();

  useEffect(() => {
    prevStateRef.current = serverTime;
  }, [serverTime]);

  const prevState = prevStateRef.current;

  useEffect(() => {
    if (serverTime && serverTime !== prevState) {
      setCurrentTime(userLocationTime(serverTime));
    }
  }, [serverTime, prevState]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    //"https://nasa-app-server-p2d3.onrender.com/user/register"
    try {
      const resp = await fetch(
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
        setServerTime(result.MongoServerTime);
        setError(result.message + " " + currentTime);
        console.log("Error registering user");
      }
    } catch (error) {
      console.log("Error in user registration:");
      console.log(error);
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
