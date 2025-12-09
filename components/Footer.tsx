import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-black tracking-tighter text-white mb-6 block">MIX<span className="text-indigo-500">BRANDS</span></span>
            <p className="text-slate-400 text-sm leading-relaxed">
              Redefining street culture with premium footwear and AI-powered styling.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Shop</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><Link to="/shop" className="hover:text-white transition">New Arrivals</Link></li>
              <li><Link to="/shop" className="hover:text-white transition">Best Sellers</Link></li>
              <li><Link to="/shop" className="hover:text-white transition">Running</Link></li>
              <li><Link to="/shop" className="hover:text-white transition">Lifestyle</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><Link to="/" className="hover:text-white transition">Help Center</Link></li>
              <li><Link to="/" className="hover:text-white transition">Returns</Link></li>
              <li><Link to="/" className="hover:text-white transition">Size Guide</Link></li>
              <li><Link to="/" className="hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><Link to="/" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">© 2024 Mix Brands. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-slate-400">
            {/* Social icons placeholders */}
            <span>Insta</span>
            <span>Twitter</span>
            <span>Face</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
