import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

export const CartSidebar: React.FC = () => {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity } = useShop();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={toggleCart} />
      
      <div className="fixed inset-y-0 right-0 max-w-md w-full flex">
        <div className="w-full h-full bg-white shadow-xl flex flex-col">
          <div className="flex items-center justify-between px-4 py-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-slate-900">Shopping Cart ({cart.length})</h2>
            <button onClick={toggleCart} className="text-slate-400 hover:text-slate-600">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                <ShoppingBag size={48} className="opacity-20" />
                <p>Your cart is empty.</p>
                <button onClick={toggleCart} className="text-indigo-600 font-medium hover:underline">Start Shopping</button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartId} className="flex space-x-4">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover object-center" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-slate-900">
                        <h3>{item.name}</h3>
                        <p className="ml-4">${item.price * item.quantity}</p>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">{item.brand} | Size {item.selectedSize}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center border border-gray-200 rounded">
                        <button 
                          onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-2 font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button type="button" onClick={() => removeFromCart(item.cartId)} className="font-medium text-red-500 hover:text-red-600">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-gray-100 p-4 space-y-4">
              <div className="flex justify-between text-base font-medium text-slate-900">
                <p>Subtotal</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <p className="text-xs text-slate-500">Shipping and taxes calculated at checkout.</p>
              <button 
                onClick={() => { toggleCart(); navigate('/checkout'); }}
                className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
