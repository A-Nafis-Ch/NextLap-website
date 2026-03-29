import React from "react";
import { useCart } from "../../CartContext/CartContext";
import { Link } from "react-router-dom";

export default function LaptopCard({ laptop }) {
  const { addToCart } = useCart();

  return (
    <Link to={`/laptop/${laptop.id}`} className="group">
      <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
        <img src={laptop.image} alt={laptop.name} className="rounded-lg" />
        <h3 className="mt-4 font-bold group-hover:text-blue-600">
          {laptop.name}
        </h3>
        <p className="text-gray-500">BDT {laptop.price}</p>
      </div>
    </Link>
  );
}
