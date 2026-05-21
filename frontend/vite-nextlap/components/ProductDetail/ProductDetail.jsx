import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductDetail({ userToken, onAdd }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState(""); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Auth Guard Check
    if (!userToken) {
      toast.warn("This is a premium gallery. Please login to view product details!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      const timeout = setTimeout(() => {
        navigate("/");
      }, 2500);

      return () => clearTimeout(timeout);
    }

    // 2. Fetch Product Data
    setLoading(true);
    axios
      .get(`http://127.0.0.1:8000/api/products/${id}/`)
      .then((res) => {
        setProduct(res.data);
        setActiveImg(res.data.image);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details", err);
        toast.error("Failed to load product details.");
        setLoading(false);
      });
  }, [id, userToken, navigate]);

  // Handle fallback screens safely
  if (!userToken) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <ToastContainer />
        <div className="text-gray-400 animate-pulse text-lg">Redirecting to login...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        <p className="text-gray-500 font-medium animate-pulse">Loading premium gear specifications...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-500 font-medium">
        Product data could not be retrieved. Please try again later.
      </div>
    );
  }

  // Combine the main image and extra images into one list for the gallery
  const allPhotos = [product.image, ...(product.images?.map(imgObj => imgObj.image) || [])];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <ToastContainer />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* LEFT: Photo Gallery Section */}
        <div className="flex flex-col gap-6">
          {/* Main Large Display with subtle reflection & drop-shadow */}
          <div className="w-full aspect-[4/3] bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100 flex items-center justify-center p-8 relative group">
            <img 
              src={activeImg} 
              alt={product.name} 
              className="max-w-full max-h-full object-contain transition-all duration-500 ease-out transform group-hover:scale-105"
            />
          </div>

          {/* Thumbnails Grid */}
          <div className="flex gap-3 overflow-x-auto py-2 custom-scrollbar">
            {allPhotos.map((photoUrl, index) => (
              <button
                key={index}
                onClick={() => setActiveImg(photoUrl)}
                className={`relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 bg-white p-2 flex items-center justify-center ${
                  activeImg === photoUrl 
                  ? "border-red-600 ring-4 ring-red-50 shadow-md transform -translate-y-1" 
                  : "border-gray-100 opacity-70 hover:opacity-100 hover:border-gray-300"
                }`}
              >
                <img src={photoUrl} alt={`View ${index}`} className="max-w-full max-h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Product Info Section */}
        <div className="flex flex-col h-full justify-center lg:pt-4">
          <span className="text-red-600 font-black uppercase tracking-widest text-xs mb-3 px-3 py-1 bg-red-50 rounded-full w-max">
            {product.brand}
          </span>
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-4 tracking-tight">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-6">
            <p className="text-4xl font-black text-gray-900 tracking-tight">
              ৳ {Number(product.price).toLocaleString('en-BD')}
            </p>
            {product.stock > 0 ? (
              <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-green-200">
                In Stock
              </span>
            ) : (
              <span className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-red-200">
                Out of Stock
              </span>
            )}
          </div>

          <div className="mb-10 bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Technical Description</h3>
            <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
              {product.description}
            </p>
          </div>

          <button 
            onClick={() => onAdd(product)}
            disabled={product.stock <= 0}
            className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3 tracking-wide ${
              product.stock > 0 
              ? "bg-red-600 text-white hover:bg-red-700 active:scale-[0.98] hover:shadow-red-200 cursor-pointer" 
              : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {product.stock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductDetail;