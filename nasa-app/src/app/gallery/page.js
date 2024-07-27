"use client";
import "./GalleryPage.css";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

async function fetchNasaImages(page = 1, perPage = 3) {
  const response = await fetch(
    `https://images-api.nasa.gov/search?q=galaxy&media_type=image&page=${page}&page_size=${perPage}`,
    {}
  );
  const data = await response.json();
  return data;
}

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const totalRecords = 10;
  const perPage = 3;

  useEffect(() => {
    async function getImages() {
      const data = await fetchNasaImages(currentPage, perPage);
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
  }, [currentPage]);

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

  return (
    <div className="container mt-5">
      <div className="row">
        {images.map((image, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <img src={image.imageUrl} />
              <div className="card-body">
                <h5 className="card-title">{image.name}</h5>
                <p className="card-text">{image.description}</p>
                <p className="card-text">
                  <small className="text-muted">ID: {image.id}</small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <nav>{renderPagination()}</nav>
    </div>
  );
}
