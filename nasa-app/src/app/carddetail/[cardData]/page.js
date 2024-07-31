/*
Adding to Cart:
    user selects a canvas size and click "Add to Cart".
    cardDetailPage creates item object with selected details and saves it in localStorage.
Viewing Cart:
    cart component gets items from localStorage and displays them.
    users can remove items and see the total price.
Managing State:
    cart state is managed in both components using useState and useEffect hooks.
    local storage is used to persist cart data across page reloads.
*/
"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function CardDetailPage({ params }) {
  const parsedCard = JSON.parse(decodeURIComponent(params.cardData));
  const [card, setCard] = useState(parsedCard);
  // console.log(parsedCard);
  const [selectedCanvas, setSelectedCanvas] = useState("Canvas 18X24");
  const canvasPrices = {
    "Canvas 18X24": 80,
    "Canvas 24X36": 110,
    "Canvas 30X40": 140,
    "Canvas 40X48": 200,
  };

  let price = canvasPrices[selectedCanvas] || 0; //price for selected canvas
  if (card.discounted) {
    const discountPercent = card.categories.length;
    price = price - price * discountPercent * 0.1;
  }
  const handleAddToCart = (card) => {
    const item = {
      ...card,
      price: price,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(item);
    localStorage.setItem("cart", JSON.stringify(existingCart));

    alert(`Added ${card.title} - ${selectedCanvas} to cart`);
  };

  const handleBuyNow = () => {
    alert(`Purchasing ${card.title} - ${selectedCanvas}`);
  };

  return (
    <div className="container mt-5">
      <div className="card" id="customFlex">
      <Image
          width={750} // 500 pixels wide
          height={550}
          src={card.imageUrl}
          className="card-img-left"
          alt={card.title || "Image"}
        />
        <div className="card-body">
          <h5 className="card-title">
            {card.name}
            {card.discounted ? (
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
          <p className="card-text">{card.description_508}</p>
          <p className="card-text">{card.description}</p>
          <p className="card-text">
            Categories:{" "}
            {card.categories.map((item) => {
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
          </p>

          <p className="card-text">
            <small className="text-muted">ID: {card.id}</small>
          </p>
          <div>
            <h5>Select Canvas Size</h5>
            {Object.keys(canvasPrices).map((size) => (
              <div style={{ marginBottom: "10px" }} key={size}>
                <input
                  type="radio"
                  id={size}
                  name="canvasSize"
                  value={size}
                  checked={selectedCanvas === size}
                  onChange={(e) => setSelectedCanvas(e.target.value)}
                  style={{ marginRight: "5px" }}
                />
                <label htmlFor={size} style={{ marginRight: "5px" }}>
                  {size}
                </label>
                {selectedCanvas === size ? (
                  <>
                    {card.discounted ? (
                      <>
                        <span
                          style={{
                            color: "red",
                            textDecoration: "line-through",
                          }}>
                          {canvasPrices[size]} CAD
                        </span>
                        <span style={{ color: "#198754", padding: "3px" }}>
                          {price} CAD {card.categories.length * 10}% off!
                        </span>
                      </>
                    ) : (
                      <span style={{ color: "grey" }}>
                        {canvasPrices[size]} CAD
                      </span>
                    )}
                  </>
                ) : (
                  <span style={{ color: "grey" }}>
                    {canvasPrices[size]} CAD
                  </span>
                )}
              </div>
            ))}
          </div>
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={() => handleAddToCart(card)}
              className="btn btn-secondary me-2">
              Add to Cart
            </button>
            <button onClick={handleBuyNow} className="btn btn-success">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}