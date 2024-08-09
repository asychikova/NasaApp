"use client";
import React from "react";
import { useState } from "react";
import styles from "@/Styles/form.module.css";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { userName } from "@/global state/atom";

export default function Login() {
  const router = useRouter();

  const [theUserName, setTheUserName] = useAtom(userName);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    //http://localhost:3003/user/login
    //https://nasa-app-server-p2d3.onrender.com/user/login
    try {
      const resp = await fetch(
        //"http://localhost:3004/user/login",
        "https://nasa-app-server-p2d3.onrender.com/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include", //ensure that the browser will accept and store the cookies.
          // Furthermore while incuding credentials, the server must explicitly allow credentials and specify the allowed origin.
        }
      );

      //response text before parsing
      const responseText = await resp.text();
      console.log("Response Text:", responseText);

      if (!resp.ok) {
        //attempt to parse if the response was not ok
        try {
          const result = JSON.parse(responseText);
          setError(result.message);
          console.log("Error logging in user", result.message);
        } catch (jsonError) {
          console.error("Failed to parse error response:", jsonError);
          setError("An unexpected error occurred. Please try again.");
        }
        return;
      }

      //response is ok, parse the JSON
      const result = JSON.parse(responseText);

      // Saving user name for dispaly :-

      localStorage.setItem("username", result.username);
      setTheUserName(result.username);

      setSuccess(result.message);
      //localStorage.setItem("token", result.token);
      console.log("User logged in successfully");

      // So now that the user is logged in, and we have the session,
      // we redirect the user to the home page, since the session is
      // managed by the browser it stays, we do not do anything.

      router.push("/");
    } catch (error) {
      console.log("Error in user login:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <div className="container mt-5">
      <form
        onSubmit={handleLogin}
        className={`${styles.containor} + mx-auto p-5 bg-white`}>
        <h3 className="text-center mb-4">Login to your account</h3>
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
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
