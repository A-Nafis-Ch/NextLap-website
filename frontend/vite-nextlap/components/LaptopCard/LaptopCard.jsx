import React from 'react';
import { useCart } from "../../CartContext/CartContext";

export default function LaptopCard({ laptop }) {
  const { addToCart } = useCart();

  return (
    <div className="border p-4 rounded shadow bg-white">
      <img src={laptop.image} alt={laptop.name} className="w-full h-48 object-cover" />
      <h2 className="text-xl font-bold">{laptop.name}</h2>
      <p className="text-gray-600 font-bold">৳{laptop.price}</p>
      <button 
        onClick={() => addToCart(laptop)}
        className="bg-red-500 text-white px-4 py-2 mt-2 rounded hover:bg-red-700"
      >
        Add to Cart
      </button>
    </div>
  );
}