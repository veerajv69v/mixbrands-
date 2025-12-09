import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Filter } from 'lucide-react';

export const Shop: React.FC = () => {
  const { products } = useShop();
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priceSort, setPriceSort] = useState<'asc' | 'desc' | 'none'>('none');

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products
    .filter(p => categoryFilter === 'All' || p.category === categoryFilter)
    .sort((a, b) => {
      if (priceSort === 'asc') return a.price - b.price;
      if (priceSort === 'desc') return b.price - a.price;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
        <h1 className="text-4xl font-black text-slate-900 mb-4 md:mb-0">Shop All</h1>
        
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
            <Filter size={18} className="text-slate-400" />
            <select 
              value={categoryFilter} 
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-sm font-medium text-slate-700 cursor-pointer"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
            <span className="text-sm text-slate-400">Sort by:</span>
            <select 
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value as any)}
              className="bg-transparent border-none focus:ring-0 text-sm font-medium text-slate-700 cursor-pointer"
            >
              <option value="none">Featured</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <Link to={`/product/${product.id}`} key={product.id} className="group flex flex-col">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden mb-4 relative border border-gray-100">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              {product.originalPrice && (
                <span className="absolute top-2 right-2 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded">
                  SALE
                </span>
              )}
            </div>
            <div className="mt-auto">
              <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition">{product.name}</h3>
              <p className="text-sm text-slate-500">{product.brand} - {product.category}</p>
              <div className="flex items-center mt-2 space-x-2">
                <span className="font-semibold text-slate-900">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">${product.originalPrice}</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-slate-400">No products found for this category.</p>
        </div>
      )}
    </div>
  );
};
