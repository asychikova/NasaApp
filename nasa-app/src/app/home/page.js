"use client";
import React from "react";
import styles from "@/Styles/home.module.css"; 

function mySubmit(e) {
  e.preventDefault();
  console.log("Make the fetch req, aka go to route");
}

const SearchBar = () => {
  return (
    <form className={styles.searchBar} onSubmit={mySubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Ex. Milky way, Earth ..."
      />
      <input
        type="image"
        src="/icons8-search.svg"
        alt="Submit"
        style={{
          width: "50px",
          height: "50px",
          border: "none",
          cursor: "pointer",
        }}
      />
    </form>
  );
};

const HomeContainer = () => {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.slogan}>
        “The beauty of the cosmos captured on canvas”
      </h1>
      <SearchBar />
    </div>
  );
};

export default HomeContainer;
