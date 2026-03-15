import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

export default function Navbar({ userToken, onLoginSuccess, cartCount }) {
  return (
    <nav className="bg-red-500 border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-lg">
          <img src="./public/NextLogo.png" alt="" />
        </div>
        <h1 className="text-xl font-black text-gray-900 tracking-tight">NextLap</h1>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="relative">
          <span className="text-white font-medium">Cart</span>
          <span className="ml-1 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs font-bold">
            {cartCount}
          </span>
        </div>

        {!userToken ? (
          <GoogleLogin 
            onSuccess={onLoginSuccess} 
            onError={() => console.log('Login Failed')}
          />
        ) : (
          <button className="text-sm font-semibold text-white-500 hover:text-black-900">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}