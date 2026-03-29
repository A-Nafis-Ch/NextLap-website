import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar/Navbar";
import LaptopCard from "../components/LaptopCard/LaptopCard"; // Fixed path
import ProductDetail from "../components/ProductDetail/ProductDetail";
import Profile from "../components/Profile/Profile";
import Footer from "../components/Footer/Footer";

import { jwtDecode } from "jwt-decode";

function App() {
  const navigate = useNavigate();
  const [laptops, setLaptops] = useState([]);
  const [cart, setCart] = useState([]);
  const [userToken, setUserToken] = useState(localStorage.getItem("token"));
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')) || null);

  // 1. Fetch Laptops from Django
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/laptops/")
      .then((res) => setLaptops(res.data))
      .catch((err) => console.error("Check if Django is running!", err));
  }, []);

  // 2. Handle Google Login Success
  const handleLoginSuccess = async (googleResponse) => {
    try {
      // 1. Decode the Google Credential to get name/picture for the UI
      const decoded = jwtDecode(googleResponse.credential);
      const userData = {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      };

      // 2. Send the token to Django to authenticate the session
      const res = await axios.post("http://127.0.0.1:8000/api/auth/google/", {
        access_token: googleResponse.credential,
      });

      // 3. Save everything to LocalStorage so it persists on refresh
      const token = res.data.key;
      localStorage.setItem("token", token);
      localStorage.setItem("userInfo", JSON.stringify(userData));

      // 4. Update React State to trigger UI change
      setUserToken(token);
      setUserInfo(userData);

      alert(`Welcome back, ${userData.name}!`);
    } catch (err) {
      // Check specifically for Django response errors or general network errors
      console.error("Login Error:", err.response?.data || err.message);
      alert("Login failed. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear from browser storage
    localStorage.removeItem('userInfo'); // Clear from browser storage
    setUserToken(null); // Clear React state (triggers UI update)
    setUserInfo(null);
    setCart([]); // Optional: Clear cart on logout
    alert("Logged out successfully!");
  };

  // 3. Add to Cart Logic
  const handleAddToCart = async (laptop) => {
    if (!userToken) {
      alert("Please login first to add items to your cart!");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/cart/",
        { product_id: laptop.id, quantity: 1 },
        { headers: { Authorization: `Token ${userToken}` } },
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
          onLoginSuccess={handleLoginSuccess}
          onLogout={handleLogout} // Fixed name
          cartCount={cart.length}
        />

        <header className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-4xl font-bold text-gray-900">Premium Laptops</h2>
          <p className="text-gray-500 mt-2 text-lg">
            Curated performance for your next project.
          </p>
        </header>

        <main className="max-w-7xl mx-auto px-6 pb-20">
          <Routes>
            {/* ROUTE 1: The Grid View (Home) */}
            <Route
              path="/"
              element={
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {laptops.length > 0 ? (
                    laptops.map((laptop) => (
                      <LaptopCard
                        key={laptop.id}
                        laptop={laptop}
                        onAdd={handleAddToCart}
                      />
                    ))
                  ) : (
                    <p className="col-span-full text-center py-20 text-gray-400 italic">
                      No laptops found.
                    </p>
                  )}
                </div>
              }
            />

            {/* ROUTE 2: The Detail View */}
            <Route
              path="/laptop/:id"
              element={
                <ProductDetail onAdd={handleAddToCart} userToken={userToken}/>
              }
            />
            <Route path="/profile" element={<Profile userInfo={userInfo} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
