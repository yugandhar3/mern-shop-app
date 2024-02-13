import React from 'react';
import ProductCatalog from './pages/product/ProductCatalog';
import ShoppingCart from './pages/cart/ShoppingCart';
import CheckoutSuccess from './pages/Payment/CheckoutSuccess';
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (

    <BrowserRouter>

      <Navbar />
      <Routes>
        <Route path="/" element={<ProductCatalog />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
      </Routes>

    </BrowserRouter>

  );
}

export default App;
