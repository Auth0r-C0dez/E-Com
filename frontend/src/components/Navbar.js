import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(){
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-indigo-600">ShopNest</Link>
        <nav className="space-x-4">
          <Link to="/products" className="text-gray-700 hover:text-indigo-600">Products</Link>
          <Link to="/login" className="text-gray-700 hover:text-indigo-600">Login</Link>
        </nav>
      </div>
    </header>
  );
}
