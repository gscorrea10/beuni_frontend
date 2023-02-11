import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/global.css';

interface Product {
  name: string;
  image: string;
  price: number;
  total_stock: number;
}

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined,
  );

  const handleSelectedProduct = (product: Product | null) => {
    setSelectedProduct(product || undefined);
  };

  return (
    <Router>
      <Navbar />
      <Dashboard
        selectedProductName={selectedProduct}
        setSelectedProductName={handleSelectedProduct}
      />
    </Router>
  );
};

export default App;
