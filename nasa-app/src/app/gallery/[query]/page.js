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

import { useAtom } from "jotai";

import Link from "next/link";
import Image from "next/image";

import "../../HomeGalleryPage.css";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchNasaImages } from "@/products";
import {
  handlePrevPage,
  handleNextPage,
  handlePageClick,
} from "@/helper/pagination";
import SearchBar from "@/components/SearchBar";
import { searchTermAtom, currentPageAtom } from "@/global state/atom";

export default function GalleryPage({ params }) {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [totalPages, setTotalPages] = useState(1);
  const totalRecords = 30;

  const [query, setQuery] = useAtom(searchTermAtom); //setQuery to update the search term
  const perPage = 3;

  if (params) {
    useEffect(() => {
      setQuery(params.query);
    }, [params.query, setQuery]);
  }

  //useEffect listen for changes to currentPage and query and triggers data fetch
  //query is managed locally
  //effect fetch data based on currentPage and query states
  useEffect(() => {
    async function getImages() {
      const data = await fetchNasaImages(currentPage, perPage, query);
      // By getting the products from src/products.js
      console.log(data);

      setImages(data);
      setTotalPages(Math.ceil(totalRecords / perPage));
    }
    getImages();
  }, [currentPage, query]);

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
          <button
            className="page-link"
            onClick={() => handlePageClick(i, setCurrentPage)}>
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

  const textToggleStyle = {
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    display: "-webkit-box",
  };

  const [openCards, setOpenCards] = useState({});

  // console.log(openCards);
  const toggleSingleCard = (id) => {
    setOpenCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <div className="container mt-5">
      <SearchContainer />
      <div className="row">
        {images.map((image, index) => {
          console.log(encodeURIComponent(JSON.stringify(image)));
          return (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <Link
                  href={`/carddetail/${encodeURIComponent(
                    JSON.stringify(image)
                  )}`}
                  passHref>
                  <Image
                    width={500} // 500 pixels wide
                    height={350}
                    src={image.imageUrl}
                    className="card-img-top"
                    alt={image.name}
                  />
                </Link>
                <div className="card-body">
                  <Link
                    href={`/carddetail/${encodeURIComponent(
                      JSON.stringify(image)
                    )}`}
                    passHref>
                    <h5 className="card-title fs-5">
                      {image.name}
                      {image.discounted ? (
                        <button
                          type="button"
                          class="btn btn-sm"
                          style={{
                            background: "orange",
                            margin: "10px",
                            color: "white",
                          }}>
                          Discounted!
                        </button>
                      ) : (
                        ""
                      )}
                    </h5>
                  </Link>
                  <p
                    className="card-text"
                    style={openCards[image.id] ? null : textToggleStyle}>
                    {image.description}
                  </p>

                  {image.description.length > 75 ? (
                    <span
                      className="btn btn-secondary btn-sm"
                      onClick={() => toggleSingleCard(image.id)}>
                      {openCards[image.id] ? "Show Less" : "Show More"}
                    </span>
                  ) : null}

                  <p className="card-text">
                    <small className="text-muted">ID: {image.id}</small>
                  </p>
                  {image.categories.map((item) => {
                    return (
                      <Link
                        href={`/gallery/${item}`}
                        passHref
                        className="categoryTag"
                        style={{ fontSize: "small", textDecoration: "none" }}>
                        {item}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <nav aria-label="Page navigation">{renderPagination()}</nav>
    </div>
  );
}
