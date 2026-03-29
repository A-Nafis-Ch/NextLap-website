import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Column 1: Brand & Description */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-white rounded-lg p-1">
              <img src="/NextLogo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-xl font-black tracking-tight">NextLap</h2>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your premier destination for high-performance laptops. 
            Curated for developers, designers, and power users.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-red-500 mb-4">Shop</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-white transition">All Laptops & Accessories</Link></li>
            <li><Link to="/profile" className="hover:text-white transition">My Account</Link></li>
            <li><Link to="/cart" className="hover:text-white transition">View Cart</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact & Social */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-red-500 mb-4">Contact Us</h3>
          <address className="not-italic text-sm text-gray-400 space-y-2">
            <p>51/C, Block-D, Road-4, Bashundhara R/A</p>
            <p>Email: abdullahnafis256@gmail.com</p>
            <div className="pt-4 flex items-center gap-4">
              {/* Facebook Link */}
              <a 
                href="https://www.facebook.com/share/1FnMaSwTMJ/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
            </div>
          </address>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} NextLap. All rights reserved. Built for Performance.
      </div>
    </footer>
  );
}