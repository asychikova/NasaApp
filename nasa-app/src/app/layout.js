import 'bootstrap/dist/css/bootstrap.min.css'; 
import React from 'react';
import Nav from './Nav'; 
import './globals.css'; 

export default function Root({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav /> 
        <main>{children}</main>
      </body>
    </html>
  );
}
