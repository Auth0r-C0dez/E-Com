import React from 'react';

export default function Footer(){
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-8 text-center">
        <p>© {new Date().getFullYear()} ShopNest. All rights reserved.</p>
      </div>
    </footer>
  );
}
