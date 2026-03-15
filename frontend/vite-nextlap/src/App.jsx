import React, { useState, useEffect } from 'react'
import axios from 'axios'
// We don't need GoogleLogin here if it's already inside your Navbar component
import Navbar from '../components/Navbar/Navbar'
import LaptopCard from '../components/LaptopCard/LaptopCard'; // Fixed path

function App() {
  const [laptops, setLaptops] = useState([])
  const [cart, setCart] = useState([])
  const [userToken, setUserToken] = useState(localStorage.getItem('token'))

  // 1. Fetch Laptops from Django
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/laptops/')
      .then(res => setLaptops(res.data))
      .catch(err => console.error("Check if Django is running!", err))
  }, [])

  // 2. Handle Google Login Success
const handleLoginSuccess = async (googleResponse) => {
  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/auth/google/",
      {
        access_token: googleResponse.credential
      }
    );

    const token = res.data.key;
    localStorage.setItem("token", token);
    setUserToken(token);

    alert("Successfully logged in to NextLap!");
  } catch (err) {
    console.error("Login Error:", err.response?.data);
  }
};

  // 3. Add to Cart Logic
  const handleAddToCart = async (laptop) => {
    if (!userToken) {
      alert("Please login first to add items to your cart!");
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/cart/', 
        { product_id: laptop.id, quantity: 1 },
        { headers: { Authorization: `Token ${userToken}` } }
      );
      setCart([...cart, laptop]);
      alert(`${laptop.name} added to cart!`);
    } catch (err) {
      console.error("Cart Error:", err);
    }
  };

  return (
    <>
      
      <div className="min-h-screen bg-gray-50">
      <Navbar 
        userToken={userToken} 
        onLoginSuccess={handleLoginSuccess} // Fixed name
        cartCount={cart.length} 
      />
      
      <header className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-gray-900">Premium Laptops</h2>
        <p className="text-gray-500 mt-2 text-lg">Curated performance for your next project.</p>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {laptops.length > 0 ? (
            laptops.map(laptop => (
              <LaptopCard 
                key={laptop.id} 
                laptop={laptop} 
                onAdd={handleAddToCart} // Fixed name
              />
            ))
          ) : (
            <p className="col-span-full text-center py-20 text-gray-400 italic">
              No laptops found. Add some in the Django Admin!
            </p>
          )}
        </div>
      </main>
    </div>

    
    
    </>
    
  )
}

export default App