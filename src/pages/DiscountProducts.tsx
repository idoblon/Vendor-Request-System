import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { Product } from '../types/product';
import { calculateDiscountedPrice, calculateSavings } from '../utils/priceUtils';
import { LOW_STOCK_THRESHOLD } from '../constants';

const DiscountProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDiscountProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setFilteredProducts(
        products.filter(p =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  const loadDiscountProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getDiscounted();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      setError('Failed to load discount products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-white">Loading discount products...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Discount Products ({filteredProducts.length})</h1>
        <input
          type="text"
          placeholder="Search discount products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
        />
      </div>

      {error && <div className="bg-red-500 text-white px-4 py-2 rounded-lg mb-4">{error}</div>}

      {filteredProducts.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-8 text-center text-gray-400">
          No discount products available
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {product.discount}% OFF
                </div>
                {product.stock < LOW_STOCK_THRESHOLD && (
                  <div className="absolute top-2 left-2 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                    Low Stock
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-2">{product.category}</p>
                <p className="text-gray-500 text-xs mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-gray-400 line-through text-sm">${product.price.toFixed(2)}</span>
                  <span className="text-green-500 font-bold text-xl">
                    ${calculateDiscountedPrice(product.price, product.discount).toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-500">
                    (Save ${calculateSavings(product.price, product.discount).toFixed(2)})
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <span>Stock: {product.stock}</span>
                  <span>ID: {product.id}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiscountProducts;
