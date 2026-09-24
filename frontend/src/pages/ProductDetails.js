import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

export default function ProductDetails(){
  const {id} = useParams();
  const [product,setProduct]=useState(null);

  useEffect(()=>{
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  },[id]);

  if(!product) return <div className="container mx-auto px-4 py-12">Loading...</div>

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img src={product.imageUrl} alt={product.name} className="w-full h-96 object-cover rounded" />
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl text-indigo-600 mt-4">${product.price}</p>
          <p className="mt-6 text-gray-700">{product.description}</p>
        </div>
      </div>
    </section>
  )
}
