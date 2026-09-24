import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

export default function Products(){
  const [products,setProducts] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  },[]);

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(p => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </section>
  );
}
