/*
    cart state is initialized by loading data from localStorage.
    items are added to cart, the cart in localStorage is updated.
    items are removed, cart state and localStorage are both updated to reflect the changes.
*/
"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkAuthentication() {
      try {
      //const response = await fetch("http://localhost:3004/cart", {
      const response = await fetch("https://nasa-app-server-p2d3.onrender.com/cart", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          setIsAuthenticated(true);
          //fetch cart from local storage
          const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
          setCart(savedCart);
        } else {
          throw new Error("Not authenticated");
        }
      } catch (error) {
        console.error("Error:", error);
        setIsAuthenticated(false);
        router.push("/auth/login");
      }
    }
    checkAuthentication();
  }, [router]);
  
  const handleRemoveItem = (index) => {
    // current cart get from local storage
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    // new cart array without the item at given index
    const updatedCart = currentCart.filter((_, i) => i !== index);
    // local storage update with new cart array
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    // update cart state with the new cart array
    setCart(updatedCart);
  };

  const calculateTotalPrice = () => {
    let total = 0; // total to 0
    // go through each item in the cart
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i]; // current item
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
      ) : (
        <div>
          <div className="row">
            {cart.map((item, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card">
                  <Link
                    href={`/carddetail/${encodeURIComponent(
                      JSON.stringify(item)
                    )}`}
                    passHref>
                    <Image
                      width={500} // 500 pixels wide
                      height={350}
                      src={item.imageUrl}
                      alt={item.title}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  </Link>
                  <div className="card-body">
                    <Link
                      href={`/carddetail/${encodeURIComponent(
                        JSON.stringify(item)
                      )}`}
                      passHref>
                      <h5 className="card-title fs-5">{item.name}</h5>
                    </Link>
                    <p className="card-text">{item.canvasSize}</p>
                    <p className="card-text">Price: {item.price} CAD</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveItem(index)}>
                      Remove
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
