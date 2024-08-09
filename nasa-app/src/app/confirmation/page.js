"use client";

import React from "react";

export default function Confirmation() {
  return (
    <div className="container mt-5">
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase. Your payment has been processed successfully.</p>
      <a href="/" className="btn btn-primary">Return to Home</a>
    </div>
  );
}
