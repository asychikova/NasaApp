"use client";
import { useEffect, useState } from 'react';

async function fetchCardDetails(id) {
  const response = await fetch(`https://images-api.nasa.gov/search?q=${id}&media_type=image`);
  const data = await response.json();
  return data;
}

export default function CardDetailPage({ params }) {
  const { id } = params;
  const [card, setCard] = useState({});
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    async function getCardDetails() {
      const data = await fetchCardDetails(id);
      const cardDetails = data.collection.items[0].data[0] || {};
      const image = data.collection.items[0].links ? data.collection.items[0].links[0].href : '';

      setCard(cardDetails);
      setImageUrl(image);
    }
    getCardDetails();
  }, [id]);

  return (
    <div className="container mt-5">
      <div className="card d-flex flex-row">
        <img src={imageUrl} className="card-img-left" alt={card.title || 'Image'} />
        <div className="card-body">
          <h5 className="card-title">{card.title}</h5>
          <p className="card-text">{card.description_508}</p>
          <p className="card-text">{card.description}</p>
          <p className="card-text"> Keywords: {card.keywords}</p>
          <p className="card-text">Center: {card.center}</p>
          <p className="card-text"><small className="text-muted">ID: {card.nasa_id}</small></p>
        </div>
      </div>
    </div>
  );
}
