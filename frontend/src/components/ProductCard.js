import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({product}){
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-2">${product.price}</p>
        <Link to={`/products/${product._id}`} className="inline-block mt-3 text-indigo-600">View</Link>
      </div>
    </div>
  );
}
