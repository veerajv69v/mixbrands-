
import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { Address } from '../types';
import { supabase } from '../services/supabaseClient';

export const Checkout: React.FC = () => {
  const { cart, user, placeOrder } = useShop();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState<Address>({
    street: '', city: '', state: '', zip: '', country: ''
  });
  
  // Add state for names
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (cart.length === 0) {
      navigate('/shop');
      return;
    }

    // Pre-fill names if available
    if (user.name) {
      const parts = user.name.split(' ');
      if (parts.length > 0) setFirstName(parts[0]);
      if (parts.length > 1) setLastName(parts.slice(1).join(' '));
    }
  }, [user, cart, navigate]);

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);

    const productSummary = cart.map(item => `${item.name} (Size: ${item.selectedSize}, Qty: ${item.quantity})`).join(', ');

    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: user?.email || '',
      address: address.street,
      city: address.city,
      zip_code: address.zip,
      selected_product: productSummary,
      total_amount: total
    };

    try {
      // Send data to Supabase 'orders' table
      const { data, error } = await supabase
        .from('orders')
        .insert([payload])
        .select();

      if (error) {
        throw error;
      }
      
      console.log('Order saved to Supabase:', data);
      
      // Proceed with internal app logic (updates local context)
      placeOrder(address);
      navigate('/profile'); 
    } catch (error: any) {
      console.error("Error submitting order to Supabase:", error);
      alert(`There was an issue processing your order: ${error.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const Input = ({ label, value, onChange, placeholder, required = true }: any) => (
    <div className="col-span-1">
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <input
        type="text"
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none"
      />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-slate-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          {/* Steps Indicator */}
          <div className="flex items-center space-x-4 border-b border-gray-200 pb-4">
            <span className={`font-bold ${step === 1 ? 'text-indigo-600' : 'text-slate-400'}`}>1. Shipping</span>
            <span className="text-gray-300">/</span>
            <span className={`font-bold ${step === 2 ? 'text-indigo-600' : 'text-slate-400'}`}>2. Payment</span>
          </div>

          {step === 1 && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="First Name" 
                  value={firstName} 
                  onChange={(e: any) => setFirstName(e.target.value)} 
                  placeholder="Jane" 
                />
                <Input 
                  label="Last Name" 
                  value={lastName} 
                  onChange={(e: any) => setLastName(e.target.value)} 
                  placeholder="Doe" 
                />
                
                <div className="col-span-2">
                   <Input 
                    label="Street Address" 
                    value={address.street} 
                    onChange={(e: any) => setAddress({...address, street: e.target.value})} 
                    placeholder="123 Sneaker St" 
                  />
                </div>
                <Input 
                  label="City" 
                  value={address.city} 
                  onChange={(e: any) => setAddress({...address, city: e.target.value})} 
                  placeholder="New York" 
                />
                <Input 
                  label="State" 
                  value={address.state} 
                  onChange={(e: any) => setAddress({...address, state: e.target.value})} 
                  placeholder="NY" 
                />
                <Input 
                  label="ZIP Code" 
                  value={address.zip} 
                  onChange={(e: any) => setAddress({...address, zip: e.target.value})} 
                  placeholder="10001" 
                />
                <Input 
                  label="Country" 
                  value={address.country} 
                  onChange={(e: any) => setAddress({...address, country: e.target.value})} 
                  placeholder="USA" 
                />
              </div>
              <button 
                onClick={() => setStep(2)}
                disabled={!address.street || !address.city || !address.zip || !firstName || !lastName}
                className="mt-6 w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 disabled:opacity-50 transition"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="p-4 border border-indigo-100 bg-indigo-50 rounded-lg text-indigo-700 mb-6">
                This is a demo store. No payment is required.
              </div>
              <div className="space-y-3">
                 <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-indigo-500">
                   <input type="radio" name="payment" defaultChecked className="text-indigo-600 focus:ring-indigo-500" />
                   <span className="font-medium">Credit Card (Demo)</span>
                 </label>
              </div>
              <div className="flex space-x-4 mt-6">
                <button 
                  onClick={() => setStep(1)}
                  disabled={isSubmitting}
                  className="px-6 py-3 border border-gray-300 text-slate-700 font-bold rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
                <button 
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </>
                  ) : 'Place Order'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-gray-50 p-6 rounded-2xl sticky top-24">
            <h3 className="font-bold text-lg mb-4">Order Summary</h3>
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
              {cart.map(item => (
                <div key={item.cartId} className="flex space-x-3">
                  <img src={item.images[0]} alt="" className="w-16 h-16 rounded-md object-cover bg-white" />
                  <div className="text-sm">
                    <p className="font-bold">{item.name}</p>
                    <p className="text-slate-500">Size {item.selectedSize} x {item.quantity}</p>
                    <p className="font-medium">${item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200 mt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};