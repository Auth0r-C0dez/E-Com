import React from 'react';
import Hero from '../components/Hero';

export default function Home(){
  return (
    <div>
      <Hero />
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <p className="text-gray-600">Browse our curated selection of popular items.</p>
      </section>
    </div>
  );
}
