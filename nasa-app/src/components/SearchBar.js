// SearchBar.js
"use client";
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="searchBar" onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        placeholder="Ex. Milky way, Earth ..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <input
        type="image"
        src="/icons8-search.svg"
        alt="Submit"
        style={{
          width: "3rem",
          height: "3rem",
          padding: "1%",
          border: "none",
          cursor: "pointer",
        }}
      />
    </form>
  );
};

export default SearchBar;
