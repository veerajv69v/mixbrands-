import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, ArrowLeft, Truck, ShieldCheck } from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart } = useShop();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <button onClick={() => navigate('/shop')} className="text-indigo-600 hover:underline">Back to Shop</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product, selectedSize);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button onClick={() => navigate(-1)} className="flex items-center text-slate-500 hover:text-slate-900 mb-8 transition">
        <ArrowLeft size={20} className="mr-2" /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition duration-700" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-indigo-600 transition">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">{product.brand}</span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-sm text-slate-500">{product.category}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">{product.name}</h1>
          <div className="flex items-end space-x-4 mb-8">
            <span className="text-3xl font-bold text-slate-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xl text-slate-400 line-through mb-1">${product.originalPrice}</span>
            )}
          </div>

          <div className="prose prose-slate mb-8 text-gray-600 leading-relaxed">
            <p>{product.description}</p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <label className="font-bold text-slate-900">Select Size (US)</label>
              <button className="text-sm text-indigo-600 hover:underline">Size Guide</button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 rounded-lg border font-medium transition ${
                    selectedSize === size
                      ? 'border-indigo-600 bg-indigo-600 text-white'
                      : 'border-gray-200 text-slate-700 hover:border-indigo-600'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-4 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={`flex-1 py-4 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 transition ${
                selectedSize
                  ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ShoppingBag size={24} />
              <span>{selectedSize ? 'Add to Cart' : 'Select Size'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-100">
            <div className="flex items-center space-x-3 text-slate-600">
              <Truck size={24} className="text-indigo-600" />
              <span className="text-sm">Free shipping over $150</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-600">
              <ShieldCheck size={24} className="text-indigo-600" />
              <span className="text-sm">Authenticity Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
