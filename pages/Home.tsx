import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Home: React.FC = () => {
  const { products } = useShop();
  const featured = products.filter(p => p.featured).slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=2000&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
            STYLE <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">& SELF-CARE</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light max-w-2xl mx-auto">
            A curated collection where premium sneakers meet luxury skincare. Redefine your daily ritual.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/shop" className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-gray-100 transition transform hover:scale-105 flex items-center justify-center">
              Shop All <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link to="/shop" className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition flex items-center justify-center">
              New Drops
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Curated Selection", desc: "Handpicked sneakers and top-tier skincare.", icon: "✨" },
            { title: "Authenticity Guaranteed", desc: "Every product verified by experts.", icon: "✓" },
            { title: "Global Shipping", desc: "We deliver lifestyle worldwide.", icon: "✈" }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 font-bold">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900">Trending Essentials</h2>
            <p className="text-slate-500 mt-2">The most sought-after styles and formulas.</p>
          </div>
          <Link to="/shop" className="text-indigo-600 font-medium hover:text-indigo-700 flex items-center">
            View All <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map(product => (
            <Link to={`/product/${product.id}`} key={product.id} className="group">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 mb-4 relative">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                {product.stock < 15 && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Low Stock
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>
              <p className="text-slate-500">{product.brand}</p>
              <p className="text-indigo-600 font-semibold mt-1">${product.price}</p>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Newsletter / CTA */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join the Mix</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Sign up for our newsletter to get early access to sneaker drops, skincare restocks, and exclusive interviews.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-6 py-3 rounded-full bg-white/10 text-white border border-white/20 focus:outline-none focus:border-indigo-500 w-full sm:w-96"
            />
            <button className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};