import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Trash2, Plus } from 'lucide-react';
import { generateProductDescription } from '../services/geminiService';
import { Product } from '../types';

export const Admin: React.FC = () => {
  const { user, products, addProduct, deleteProduct } = useShop();
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  
  // Form State
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '', brand: '', price: 0, category: '', description: '', images: [], sizes: [8, 9, 10, 11]
  });
  const [loadingAI, setLoadingAI] = useState(false);
  const [keywords, setKeywords] = useState('');

  React.useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const handleGenerateDescription = async () => {
    if (!newProduct.name || !newProduct.brand) {
      alert("Please enter Name and Brand first");
      return;
    }
    setLoadingAI(true);
    const desc = await generateProductDescription(newProduct.name, newProduct.brand, keywords);
    setNewProduct(prev => ({ ...prev, description: desc }));
    setLoadingAI(false);
  };

  const handleSaveProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    
    const product: Product = {
      id: `p${Date.now()}`,
      name: newProduct.name!,
      brand: newProduct.brand || 'Generic',
      price: Number(newProduct.price),
      description: newProduct.description || 'No description',
      images: ['https://picsum.photos/800/800?random=' + Date.now()], // Mock image
      sizes: newProduct.sizes || [8, 9, 10, 11],
      category: newProduct.category || 'Lifestyle',
      stock: 10,
      featured: false
    };
    
    addProduct(product);
    setIsAdding(false);
    setNewProduct({ name: '', brand: '', price: 0, category: '', description: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-slate-900">Admin Dashboard</h1>
        <button 
          onClick={() => setIsAdding(!isAdding)} 
          className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          <Plus size={20} />
          <span>Add Product</span>
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-indigo-100 mb-10 animate-fade-in">
          <h2 className="text-xl font-bold mb-4">New Product Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <input 
                placeholder="Product Name" 
                className="w-full p-3 border rounded-lg"
                value={newProduct.name}
                onChange={e => setNewProduct({...newProduct, name: e.target.value})}
              />
              <input 
                placeholder="Brand" 
                className="w-full p-3 border rounded-lg"
                value={newProduct.brand}
                onChange={e => setNewProduct({...newProduct, brand: e.target.value})}
              />
              <input 
                type="number" 
                placeholder="Price" 
                className="w-full p-3 border rounded-lg"
                value={newProduct.price || ''}
                onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
              />
               <input 
                placeholder="Category (e.g. Running)" 
                className="w-full p-3 border rounded-lg"
                value={newProduct.category}
                onChange={e => setNewProduct({...newProduct, category: e.target.value})}
              />
            </div>
            <div className="space-y-4">
              <textarea 
                placeholder="Description" 
                rows={5}
                className="w-full p-3 border rounded-lg"
                value={newProduct.description}
                onChange={e => setNewProduct({...newProduct, description: e.target.value})}
              />
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                <p className="text-sm text-indigo-800 font-bold mb-2 flex items-center">
                  <Sparkles size={16} className="mr-2" /> AI Helper
                </p>
                <div className="flex gap-2">
                  <input 
                    placeholder="Keywords for AI (e.g. retro, fast, chunky)" 
                    className="flex-1 p-2 border rounded text-sm"
                    value={keywords}
                    onChange={e => setKeywords(e.target.value)}
                  />
                  <button 
                    onClick={handleGenerateDescription}
                    disabled={loadingAI}
                    className="bg-indigo-600 text-white text-sm px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {loadingAI ? 'Generating...' : 'Generate'}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-4">
            <button onClick={() => setIsAdding(false)} className="px-6 py-2 text-slate-500 hover:bg-gray-100 rounded-lg">Cancel</button>
            <button onClick={handleSaveProduct} className="px-6 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800">Save Product</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-bold text-slate-700">Product</th>
              <th className="px-6 py-4 font-bold text-slate-700">Brand</th>
              <th className="px-6 py-4 font-bold text-slate-700">Category</th>
              <th className="px-6 py-4 font-bold text-slate-700">Price</th>
              <th className="px-6 py-4 font-bold text-slate-700">Stock</th>
              <th className="px-6 py-4 font-bold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <img src={p.images[0]} alt="" className="w-10 h-10 rounded bg-gray-200 object-cover" />
                    <span className="font-medium text-slate-900">{p.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">{p.brand}</td>
                <td className="px-6 py-4 text-slate-600">{p.category}</td>
                <td className="px-6 py-4 font-medium text-slate-900">${p.price}</td>
                <td className="px-6 py-4 text-slate-600">{p.stock}</td>
                <td className="px-6 py-4">
                  <button onClick={() => deleteProduct(p.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
