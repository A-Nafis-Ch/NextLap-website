import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProductDetail({ userToken, onAdd }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [laptop, setLaptop] = useState(null);
  const [activeImg, setActiveImg] = useState(""); // This tracks the big photo

  useEffect(() => {
    if (!userToken) {
      alert("This is a premium gallery. Please login to view laptop details!");
      navigate("/");
      return;
    }

    axios
      .get(`http://127.0.0.1:8000/api/laptops/${id}/`)
      .then((res) => {
        setLaptop(res.data);
        // Set the initial big image to the main laptop image
        setActiveImg(res.data.image);
      })
      .catch((err) => console.error("Error fetching laptop details", err));
  }, [id, userToken, navigate]);

  if (!userToken) return null;
  if (!laptop) return <div className="text-center py-20 text-gray-500">Loading...</div>;

  // Combine the main image and extra images into one list for the gallery
  // We check for 'images' which is the related_name we set in Django
  const allPhotos = [laptop.image, ...(laptop.images?.map(imgObj => imgObj.image) || [])];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* LEFT: Photo Gallery Section */}
        <div className="flex flex-col gap-4">
          {/* Main Large Display */}
          <div className="w-full aspect-[4/3] bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 flex items-center justify-center p-8">
            <img 
              src={activeImg} 
              alt={laptop.name} 
              className="max-w-full max-h-full object-contain transition-all duration-500 transform hover:scale-105"
            />
          </div>

          {/* Thumbnails Grid (The 5+ Photos) */}
          <div className="flex gap-3 overflow-x-auto py-2 custom-scrollbar">
            {allPhotos.map((photoUrl, index) => (
              <button
                key={index}
                onClick={() => setActiveImg(photoUrl)}
                className={`relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                  activeImg === photoUrl 
                  ? "border-red-600 ring-2 ring-red-100 shadow-md" 
                  : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={photoUrl} alt={`View ${index}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Product Info Section */}
        <div className="flex flex-col h-full justify-center">
          <span className="text-red-600 font-bold uppercase tracking-widest text-sm mb-2">{laptop.brand}</span>
          <h1 className="text-5xl font-black text-gray-900 leading-tight mb-4">{laptop.name}</h1>
          
          <div className="flex items-center gap-4 mb-8">
            <p className="text-4xl font-bold text-gray-900">BDT {laptop.price}</p>
            {laptop.stock > 0 ? (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">In Stock</span>
            ) : (
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Out of Stock</span>
            )}
          </div>

          <div className="prose prose-slate mb-10">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {laptop.description}
            </p>
          </div>

          <button 
            onClick={() => onAdd(laptop)}
            disabled={laptop.stock <= 0}
            className={`w-full py-5 rounded-2xl font-black text-xl transition-all shadow-xl flex items-center justify-center gap-3 ${
              laptop.stock > 0 
              ? "bg-red-600 text-white hover:bg-red-700 active:scale-95" 
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {laptop.stock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductDetail;