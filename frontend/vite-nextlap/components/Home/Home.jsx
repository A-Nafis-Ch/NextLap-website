import { useEffect, useState } from 'react';
import api from './api';

export default function Home() {
  const [laptops, setLaptops] = useState([]);

  useEffect(() => {
    api.get('laptops/').then((res) => setLaptops(res.data));
  }, []);

  const addToCart = async (laptopId) => {
    try {
      await api.post('cart/', { product_id: laptopId, quantity: 1 });
      alert("Added to NextLap cart!");
    } catch (err) {
      alert("Please login first!");
    }
  };

  return (
    <div className="product-grid">
      {laptops.map(laptop => (
        <div key={laptop.id} className="card">
          <img src={laptop.image} alt={laptop.name} />
          <h3>{laptop.name}</h3>
          <button onClick={() => addToCart(laptop.id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}