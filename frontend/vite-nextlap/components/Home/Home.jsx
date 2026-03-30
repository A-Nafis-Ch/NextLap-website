import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For clicking the card
import api from './api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // We use the new 'products/' endpoint
    api.get('products/')
      .then((res) => {
        // Handle both paginated (res.data.results) and non-paginated (res.data) responses
        const data = res.data.results || res.data;
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const addToCart = async (e, productId) => {
    e.stopPropagation(); // Prevents clicking the button from also clicking the card
    try {
      await api.post('cart/', { product_id: productId, quantity: 1 });
      alert("Added to NextLap cart!");
    } catch (err) {
      alert("Please login first!");
    }
  };

  if (loading) return <div className="text-center py-20 font-bold text-gray-500 text-xl">Scanning Inventory...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-black text-gray-900 mb-8 uppercase tracking-tighter">
        Latest Gear
      </h2>

      {/* THE UNIFORM GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
        {products.map((product) => (
          <div 
            key={product.id} 
            onClick={() => navigate(`/laptop/${product.id}`)} // Fixed navigation
            className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col h-full hover:shadow-xl transition-all cursor-pointer"
          >
            {/* Image Box (Fixed Aspect Ratio) */}
            <div className="relative w-full aspect-[4/3] bg-gray-50 rounded-xl overflow-hidden mb-4 flex items-center justify-center p-4">
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500" 
              />
              <span className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-gray-500 uppercase">
                {product.brand}
              </span>
            </div>

            {/* Product Info */}
            <div className="flex flex-col flex-grow">
              <h3 className="font-bold text-gray-900 text-lg leading-tight line-clamp-2 h-12 mb-2">
                {product.name}
              </h3>
              
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
                <p className="text-xl font-black text-red-600">
                  ${product.price}
                </p>
                <button 
                  onClick={(e) => addToCart(e, product.id)}
                  className="bg-gray-900 text-white p-2.5 rounded-xl hover:bg-red-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}