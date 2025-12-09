import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User as UserIcon, LogOut, Menu, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Navbar: React.FC = () => {
  const { cart, user, logout, toggleCart } = useShop();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-black tracking-tighter text-slate-900">MIX<span className="text-indigo-600">BRANDS</span></span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-slate-600 hover:text-indigo-600 font-medium transition">Home</Link>
            <Link to="/shop" className="text-slate-600 hover:text-indigo-600 font-medium transition">Shop</Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-indigo-600 font-medium">Admin Panel</Link>
            )}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <button onClick={toggleCart} className="relative p-2 text-slate-600 hover:text-indigo-600 transition">
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-indigo-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2 text-slate-600 hover:text-indigo-600">
                  <UserIcon size={20} />
                  <span className="text-sm font-medium">{user.name.split(' ')[0]}</span>
                </Link>
                <button onClick={handleLogout} className="text-slate-400 hover:text-red-500">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden md:block text-sm font-medium text-slate-900 hover:text-indigo-600">
                Log in
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/shop" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>Shop</Link>
            {user ? (
              <>
                <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                {user.role === 'admin' && <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50" onClick={() => setIsMenuOpen(false)}>Admin</Link>}
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-red-50">Log Out</button>
              </>
            ) : (
              <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>Log In</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
