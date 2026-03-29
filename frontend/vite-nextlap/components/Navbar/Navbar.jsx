import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";

export default function Navbar({
  userToken,
  userInfo,
  onLoginSuccess,
  onLogout,
  cartCount,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-red-600 border-b border-red-700 px-6 py-3 flex justify-between items-center sticky top-0 z-50 shadow-md">
      {/* Left: Logo */}
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 overflow-hidden rounded-lg bg-white p-1">
          <img
            src="/NextLogo.png"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-xl font-bold text-black tracking-tight">NextLap</h1>
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {/* Cart Link */}
        <Link to="/cart" className="relative flex items-center group">
          <span className="text-white font-medium group-hover:text-red-100">
            Cart
          </span>
          <span className="ml-2 bg-white text-red-600 px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">
            {cartCount}
          </span>
        </Link>

        {/* Auth / Dropdown Section */}
        {!userToken ? (
          <GoogleLogin
            onSuccess={onLoginSuccess}
            onError={() => console.log("Login Failed")}
          />
        ) : (
          <div className="relative">
            {/* Profile Trigger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-3 focus:outline-none group"
            >
              <img
                src={
                  userInfo?.picture ||
                  "https://ui-avatars.com/api/?name=" + userInfo?.name
                }
                alt="User profile"
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm group-hover:scale-105 transition-transform"
                onError={(e) => {
                  e.target.src =
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                }}
              />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in duration-200">
                {/* User Info Header */}
                <div className="px-4 py-3 border-b border-gray-50">
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {userInfo?.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {userInfo?.email}
                  </p>
                </div>

                {/* Menu Options */}
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Order History
                </Link>

                <div className="border-t border-gray-50 mt-2">
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 font-bold hover:bg-red-50 transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
