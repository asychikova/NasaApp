/*
    cart state is initialized by loading data from localStorage.
    items are added to cart, the cart in localStorage is updated.
    items are removed, cart state and localStorage are both updated to reflect the changes.
*/
"use client";
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  const handleRemoveItem = (index) => {
    // current cart get from local storage
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    //new cart array without the item at given index
    const updatedCart = [];
    for (let i = 0; i < currentCart.length; i++) {
      if (i !== index) {
        updatedCart.push(currentCart[i]);
      }
    }
    // local storage update with new cart array
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    //update cart state with the new cart array
    setCart(updatedCart);
  };

  const calculateTotalPrice = () => {
    let total = 0; //total to 0
    // go through each item in the cart
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i]; //current item
      // + item's price to total if price exists, otherwise add 0
      if (item.price) {
        total += item.price;
      }
    }
    return total;
  };

  return (
    <div className="container mt-5">
  <h1>Cart</h1>
  <div className="mt-4 mb-3">
        <h4>Total Price: ${calculateTotalPrice().toFixed(2)}</h4>
        <button className="btn btn-primary">Continue Checkout</button>
      </div>
  {cart.length === 0 ? (
    <p>Your cart is empty.</p>
  ) :(
    <div>
      <div className="row">
        {cart.map((item, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="card-img-top" 
                style={{ height: '200px', objectFit: 'cover' }} 
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.canvasSize}</p>
                <p className="card-text">Price: {item.price} CAD</p>
                <button className="btn btn-danger" onClick={() => handleRemoveItem(index)}>Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}
</div>

  );
}
