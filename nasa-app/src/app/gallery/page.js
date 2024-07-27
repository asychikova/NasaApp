/*
User enters "Milky Way" in search bar
->
searchTerm hold the user input "Milky Way"
->
handleSearch updates query with value of searchTerm "Milky Way" and reset pagination to first page
->
useEffect fetch images based on updated query "Milky Way" and current page
->
images and pagination updated and displayed 
*/

"use client";

import Link from "next/link";
import "./GalleryPage.css";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

async function fetchNasaImages(page = 1, perPage = 3, query = "galaxy") {
  const response = await fetch(
    `https://images-api.nasa.gov/search?q=${query}&media_type=image&page=${page}&page_size=${perPage}`,
    {}
  );
  const data = await response.json();
  return data;
}

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
          width: "45px",
          height: "45px",
          padding: "1%",
          border: "none",
          cursor: "pointer",
        }}
      />
    </form>
  );
};

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const totalRecords = 30;

  const [query, setQuery] = useState("galaxy"); //setQuery to update the search term
  const perPage = 3;

  //useEffect listen for changes to currentPage and query and triggers data fetch
  //query is managed locally
  //effect fetch data based on currentPage and query states
  useEffect(() => {
    async function getImages() {
      const data = await fetchNasaImages(currentPage, perPage, query);
      const items = data.collection.items || [];
      const imageData = items.map((item) => ({
        id: item.data[0].nasa_id,
        name: item.data[0].title,
        description: item.data[0].description_508,
        imageUrl: item.links ? item.links[0].href : "",
      }));
      setImages(imageData);
      setTotalPages(Math.ceil(totalRecords / perPage));
    }
    getImages();
  }, [currentPage, query]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  //update local query state with setQuery
  //reset pagination to the first page
  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
    setCurrentPage(1);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${i === currentPage ? "active" : ""}`}>
          <button className="page-link" onClick={() => handlePageClick(i)}>
            {i}
          </button>
        </li>
      );
    }

    return (
      <ul className="pagination pgn justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={handlePrevPage}
            disabled={currentPage === 1}>
            Previous
          </button>
        </li>
        {pages}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}>
          <button
            className="page-link"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}>
            Next
          </button>
        </li>
      </ul>
    );
  };

  const SearchContainer = () => {
    return (
      <div className="homeContainer">
        <h1 className="slogan">
          “The beauty of the cosmos captured on canvas”
        </h1>
        <SearchBar onSearch={handleSearch} />
      </div>
    );
  };

  return (
    <div className="container mt-5">
      <SearchContainer />
      <div className="row">
        {images.map((image, index) => (
          <div key={index} className="col-md-4 mb-4">
            <Link href={`/carddetail/${image.id}`} passHref>
              <div className="card">
                <img
                  src={image.imageUrl}
                  className="card-img-top"
                  alt={image.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{image.name}</h5>
                  <p className="card-text">{image.description}</p>
                  <p className="card-text">
                    <small className="text-muted">ID: {image.id}</small>
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <nav aria-label="Page navigation">{renderPagination()}</nav>
    </div>
  );
}
