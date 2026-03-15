import React from "react";
import ReactDOM from "react-dom/client";   // ✅ must be imported
import App from "./App.jsx";
import "./index.css";
import { CartProvider } from "../CartContext/CartContext.jsx";

import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="494152852818-s4ju0ud2pcoi6rj9tqba0264c9rooj86.apps.googleusercontent.com">
      <CartProvider> {/* Wrap here */}
    <App />
    </CartProvider>
    </GoogleOAuthProvider>
    
  </React.StrictMode>
);