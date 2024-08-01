"use client";
import React from "react";
import styles from "@/Styles/form.module.css";

export default function Home() {
  function handleRegister() {
    console.log("Register the user, call the specific API.");
  }
  return (
    <>
      <form onSubmit={handleRegister} className={styles.mainContainor}>
        <div className={styles.containor}>
          <h3 style={{ alignSelf: "center", paddingBottom: "30px" }}>
            Create a new account
          </h3>
          <label htmlFor="username">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              className={styles.input}
              required
            />
          </label>
          <br />
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className={styles.input}
              required
            />
          </label>
          <br />
          <label htmlFor="password">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className={styles.input}
              required
            />
          </label>
          <button className="w-50 btn btn-dark" style={{ margin: "15px" }}>
            Register
          </button>
        </div>
      </form>
    </>
  );
}
