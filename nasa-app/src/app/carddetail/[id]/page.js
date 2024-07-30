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
import { useEffect, useState } from 'react';

async function fetchCardDetails(id) {
  const response = await fetch(
    `https://images-api.nasa.gov/search?q=${id}&media_type=image`
  );
  const data = await response.json();
  return data;
}

export default function CardDetailPage({ params }) {
  const { id } = params;
  const [card, setCard] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [selectedCanvas, setSelectedCanvas] = useState("Canvas 18X24");

  const canvasPrices = {
    "Canvas 18X24": 80,
    "Canvas 24X36": 110,
    "Canvas 30X40": 140,
    "Canvas 40X48": 200
  };

  useEffect(() => {
    async function getCardDetails() {
      const data = await fetchCardDetails(id);
      const cardDetails = data.collection.items[0].data[0] || {};
      const image = data.collection.items[0].links
        ? data.collection.items[0].links[0].href
        : "";
      setCard(cardDetails);
      setImageUrl(image);
    }
    getCardDetails();
  }, [id]);

  const handleAddToCart = () => {
    const price = canvasPrices[selectedCanvas] || 0; //price for selected canvas
    const item = {
      title: card.title,
      imageUrl,
      canvasSize: selectedCanvas,
      price //price
    };

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    existingCart.push(item);
    localStorage.setItem('cart', JSON.stringify(existingCart));

    alert(`Added ${card.title} - ${selectedCanvas} to cart`);
  };

  const handleBuyNow = () => {
    alert(`Purchasing ${card.title} - ${selectedCanvas}`);
  };

  return (
    <div className="container mt-5">
      <div className="card" id="customFlex">
        <img
          src={imageUrl}
          className="card-img-left"
          alt={card.title || "Image"}
        />
        <div className="card-body">
          <h5 className="card-title">{card.title}</h5>
          <p className="card-text">{card.description_508}</p>
          <p className="card-text">{card.description}</p>
          <p className="card-text">Keywords: {card.keywords}</p>
          <p className="card-text">Center: {card.center}</p>
          <p className="card-text">
            <small className="text-muted">ID: {card.nasa_id}</small>
          </p>
          <div>
            <h5>Select Canvas Size</h5>
            {Object.keys(canvasPrices).map(size => (
              <div style={{ marginBottom: '10px' }} key={size}>
                <input
                  type="radio"
                  id={size}
                  name="canvasSize"
                  value={size}
                  checked={selectedCanvas === size}
                  onChange={(e) => setSelectedCanvas(e.target.value)}
                  style={{ marginRight: '5px' }}
                />
                <label htmlFor={size} style={{ marginRight: '5px' }}>
                  {size}
                </label>
                <span style={{ color: 'grey' }}>
                  {canvasPrices[size]} CAD
                </span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '20px' }}>
            <button onClick={handleAddToCart} className="btn btn-secondary me-2">Add to Cart
            </button>
            <button onClick={handleBuyNow} className="btn btn-success">Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
