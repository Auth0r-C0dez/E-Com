import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero(){
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-teal-400 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Discover great products, delivered fast</h1>
        <p className="mb-6 max-w-2xl mx-auto">Beautiful UI, modern animations, and seamless checkout.</p>
        <Link to="/products" className="inline-block bg-white text-indigo-600 font-semibold px-6 py-3 rounded">Shop Now</Link>
      </div>
    </div>
  );
}
