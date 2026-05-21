import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar/Navbar";
import LaptopCard from "../components/LaptopCard/LaptopCard"; 
import ProductDetail from "../components/ProductDetail/ProductDetail";
import Profile from "../components/Profile/Profile";
import Footer from "../components/Footer/Footer";

import { jwtDecode } from "jwt-decode";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [laptops, setLaptops] = useState([]);
  const [cart, setCart] = useState([]);
  const [userToken, setUserToken] = useState(localStorage.getItem("token"));
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || null,
  );

  // Filter the products based on the search query
  const filteredProducts = laptops.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // 1. Fetch Laptops from Django
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products/")
      .then((res) => setLaptops(res.data))
      .catch((err) => {
        console.error("Check if Django is running!", err);
        toast.error("🔌 Connection error: Unable to reach the server.");
      });
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
      const res = await axios.post("http://127.0.0.1:8000/api/google-login/", {
        token: googleResponse.credential,
        access_token: googleResponse.credential,
      });

      // 3. Save everything to LocalStorage so it persists on refresh
      const token = res.data.key;
      localStorage.setItem("token", token);
      localStorage.setItem("userInfo", JSON.stringify(userData));

      // 4. Update React State to trigger UI change
      setUserToken(token);
      setUserInfo(userData);

      // 🎉 Success Toast
      toast.success(`⚡ Welcome back, ${userData.name}! Login successful.`, {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      toast.error("❌ Login failed. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("userInfo"); 
    setUserToken(null); 
    setUserInfo(null);
    setCart([]); 

    // 🚪 Info Toast
    toast.info("Logged out successfully. See you next time!", {
      position: "top-right",
      autoClose: 2500,
    });
  };

  // 3. Add to Cart Logic
  const handleAddToCart = async (laptop) => {
    if (!userToken) {
      toast.warn("🔒 Please login first to add items to your cart!", {
        position: "top-center",
      });
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/cart/",
        { product_id: laptop.id, quantity: 1 },
        { headers: { Authorization: `Token ${userToken}` } },
      );
      setCart([...cart, laptop]);

      // 🛒 Cart Added Toast
      toast.success(`🛒 ${laptop.name} added to cart!`, {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (err) {
      console.error("Cart Error:", err);
      toast.error("Failed to add item to your cart.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Navbar
          setSearchQuery={setSearchQuery} 
          userToken={userToken}
          userInfo={userInfo}
          onLoginSuccess={handleLoginSuccess}
          onLogout={handleLogout} 
          cartCount={cart.length}
        />

        <header className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Premium Laptops & Accessories
          </h2>
          <p className="text-gray-500 mt-2 text-lg">
            Curated performance for your next project.
          </p>
        </header>

        <main className="max-w-7xl mx-auto px-6 pb-20">
          <Routes>
            {/* ROUTE 1: The Grid View (Home) */}
            <Route
              path="/"
              element = {
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {laptops.length > 0 ? (
                    filteredProducts.map((laptop) => (
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
              element = {
                <ProductDetail onAdd={handleAddToCart} userToken={userToken} />
              }
            />
            <Route path="/profile" element={<Profile userInfo={userInfo} />} />
          </Routes>
        </main>
        <Footer />
      </div>

      {/* 🔔 GLOBAL TOAST CONTAINER */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;