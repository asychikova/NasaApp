"use client";

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe(
  "pk_test_51PlypHP3r7cZXzMpSDpvbcW5IjRlp06U0CL2J7nXnGO5MW1KZubfqAe1ZDbdKe81hHM5TnCr6QEJDBGLtwVsqMNJ00RveYs9SM"
);

function CheckoutFormContent() {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // totalPrice from query params
    const price = searchParams.get("totalPrice");
    if (price) {
      setTotalPrice(parseFloat(price));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const stripe = await stripePromise;

    try {
      // payment intent from server
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalPrice * 100 }), //amount in cents
      });
      const { clientSecret } = await response.json();

      // Stripe.js to handle the payment
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: {
            number: paymentDetails.cardNumber,
            exp_month: parseInt(paymentDetails.expiryDate.split("/")[0], 10),
            exp_year: parseInt(paymentDetails.expiryDate.split("/")[1], 10),
            cvc: paymentDetails.cvv,
          },
        },
      });

      if (error) {
        setError("Payment failed: " + error.message);
        console.error("Payment error:", error);
      } else {
        router.push("/confirmation");
      }
    } catch (error) {
      setError("Payment processing error: " + error.message);
      console.error("Payment processing error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Checkout</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form
        onSubmit={handleSubmit}
        className="w-50 mx-auto bg-white p-4 rounded">
        <div className="mb-4">
          <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
        </div>
        <div className="mb-3">
          <label htmlFor="cardNumber" className="form-label">
            Card Number
          </label>
          <input
            type="text"
            className="form-control"
            id="cardNumber"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={handleChange}
            placeholder="Card Number"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="expiryDate" className="form-label">
            Expiry Date
          </label>
          <input
            type="text"
            className="form-control"
            id="expiryDate"
            name="expiryDate"
            value={paymentDetails.expiryDate}
            onChange={handleChange}
            placeholder="MM/YY"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cvv" className="form-label">
            CVV
          </label>
          <input
            type="text"
            className="form-control"
            id="cvv"
            name="cvv"
            value={paymentDetails.cvv}
            onChange={handleChange}
            placeholder="CVV"
            required
          />
        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary">
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
}

export default function CheckoutForm() {
  return <CheckoutFormContent />;
}
