"use client";

import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Feedback() {
  const [feedback, setFeedback] = useState('');
  const [fromName, setFromName] = useState('');

  const handleInputChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //send the email using EmailJS to anna.dmsv@gmail.com
    const serviceID = 'service_0fo1uuh';
    const templateID = 'template_wej18st';
    const userID = 'EgQkYhWp-tQW000Pg';

    const templateParams = {
      from_name: fromName,
      message: feedback,
    };

    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Feedback sent successfully!');
        setFeedback('');
        setFromName(''); 
      })
      .catch((err) => {
        console.error('FAILED...', err);
        alert('Failed to send feedback. Please try again.');
      });
  };

  return (
    <div className="container mt-5">
  <h1 className="text-center">Feedback</h1>
  <p className="text-center">Please provide your feedback below:</p>
  <div className="w-50 mx-auto bg-white p-4 rounded">
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          id="from_name"
          value={fromName}
          onChange={(e) => setFromName(e.target.value)}
          placeholder="Your name"
          required
        />
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          id="feedback"
          value={feedback}
          onChange={handleInputChange}
          placeholder="Enter your feedback"
          rows="4"
          required
        />
      </div>
      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form>
  </div>

  <div className="mt-5">
    <h2 className="text-center">About Us</h2>
    <div className="row mt-4 justify-content-center">
      <div className="col-md-5 mb-5">
        <div className="card text-center">
          <img
            src="/a.jpg"
            className="card-img-top"
            style={{ width: '100%', height: 'auto',  objectFit: 'cover' }}
            alt="Anna Sychikova"
          />
          <div className="card-body">
            <h5 className="card-title">Anna Sychikova</h5>
            <p className="card-text">
              <strong>GitHub:</strong> <a href="https://github.com/asychikova" target="_blank" rel="noopener noreferrer">github.com/asychikova</a>
            </p>
            <p className="card-text">
              <strong>Skills:</strong> React, JavaScript, Bootstrap, Node.js
            </p>
            <p className="card-text">
              <strong>Hobbies:</strong> Coding, Squash
            </p>
          </div>
        </div>
      </div>
      <div className="col-md-5 mb-5">
        <div className="card text-center">
          <img
            src="/h.jpg"
            className="card-img-top"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            alt="Harkaran Singh"
          />
          <div className="card-body">
            <h5 className="card-title">Harkaran Singh</h5>
            <p className="card-text">
              <strong>GitHub:</strong> <a href="https://github.com/Mr-Khaira" target="_blank" rel="noopener noreferrer">github.com/Mr-Khaira</a>
            </p>
            <p className="card-text">
              <strong>Skills:</strong> React, JavaScript, Bootstrap, Node.js
            </p>
            <p className="card-text">
              <strong>Hobbies:</strong> Coding, Reading
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
  }  