import React from "react";
import { useCart } from "../../CartContext/CartContext";
import { Link } from "react-router-dom";

export default function LaptopCard({ laptop }) {
  const { addToCart } = useCart();

  return (
    <Link to={`/laptop/${laptop.id}`} className="group">
      <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition flex flex-col h-full border border-gray-100">
        {/* 1. Fixed Image Container */}
        <div className="relative w-full aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src={laptop.image}
            alt={laptop.name}
            className="max-w-full max-h-full object-contain p-2"
          />
        </div>

        {/* 2. Content Section */}
        <div className="flex flex-col flex-grow mt-4">
          {/* Title: Fixed height to handle 1-line or 2-line names */}
          <h3 className="font-bold text-gray-900 line-clamp-2 h-[3rem] overflow-hidden leading-tight">
            {laptop.name}
          </h3>

          {/* Price: Stays right under the title */}
          <p className="text-red-600 font-bold mt-1">BDT {laptop.price}</p>

          {/* 3. Action Button (Pushed to bottom) */}
          <button className="mt-auto w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-bold hover:bg-red-600 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
