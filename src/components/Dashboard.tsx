import React, { useState, useEffect } from 'react';
import { RingLoader } from 'react-spinners';
import axios from 'axios';

interface Product {
  name: string;
  image: string;
  price: number;
  total_stock: number;
}

interface DashboardProps {
  selectedProductName: Product | undefined;
  setSelectedProductName: (product: Product | null) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  selectedProductName,
  setSelectedProductName,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const apiUrl = 'http://localhost:4000/products';

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((res) => {
        let productArray = res.data;
        if (res.data.products) {
          productArray = res.data.products;
        }
        setProducts(productArray);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiUrl = 'http://localhost:4000/products/name';

    try {
      setLoading(true);

      const response = await axios.post(apiUrl, { name: searchTerm });
      const data = response.data;

      let productArray = data;
      if (data.products) {
        productArray = data.products;
      }
      setProducts(productArray);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  let filteredProducts = products;
  if (selectedProductName) {
    filteredProducts = products.filter(
      (product) => product.name === selectedProductName.name,
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <RingLoader color="#36D7B7" size={125} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-slate-200">
      <div className="w-full max-w-screen-xl ">
        <form onSubmit={handleSearch} className="mb-4">
          <div className="flex items-center ">
            <input
              className="w-64 px-2 py-1 rounded-lg mx-2 "
              type="text"
              placeholder="Pesquisar produto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
              Pesquisar
            </button>
          </div>
        </form>
        <ul className="w-full p-4 bg-white rounded-lg shadow-md grid grid-cols-3 grid-rows-auto gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li
                className="my-4 border-b border-gray-300 cursor-pointer hover:bg-orange-50"
                onClick={() => setSelectedProduct(product)}
              >
                <h3 className="text-lg font-medium">{product.name}</h3>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full"
                />
                {selectedProduct && selectedProduct.name === product.name && (
                  <>
                    <p className="text-sm font-medium">
                      Stock: {product.total_stock}
                    </p>
                    <p className="text-sm font-medium">
                      Price: R$ {product.price.toFixed(4)}
                    </p>
                  </>
                )}
              </li>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
