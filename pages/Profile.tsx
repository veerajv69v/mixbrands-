import React from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, orders } = useShop();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const myOrders = orders.filter(o => o.userId === user?.id).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-slate-900 text-white rounded-3xl p-8 mb-12 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        <div className="w-24 h-24 bg-indigo-500 rounded-full flex items-center justify-center text-4xl font-bold">
          {user?.name.charAt(0)}
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-black">{user?.name}</h1>
          <p className="text-gray-300">{user?.email}</p>
          <div className="mt-4 inline-block bg-white/10 px-4 py-1 rounded-full text-sm font-medium">
            Member since 2024
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-6">Order History</h2>
      
      {myOrders.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
          <Package size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-slate-500">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {myOrders.map(order => (
            <div key={order.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-b border-gray-200">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Order Placed</p>
                  <p className="text-sm font-medium text-slate-900">{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Total</p>
                  <p className="text-sm font-medium text-slate-900">${order.total.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Order #</p>
                  <p className="text-sm font-medium text-slate-900">{order.id}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map(item => (
                    <div key={item.cartId} className="flex items-center space-x-4">
                      <img src={item.images[0]} alt="" className="w-16 h-16 object-cover rounded-lg bg-gray-100" />
                      <div>
                        <p className="font-bold text-slate-900">{item.name}</p>
                        <p className="text-sm text-slate-500">Size: {item.selectedSize} | Qty: {item.quantity}</p>
                      </div>
                      <div className="flex-1 text-right">
                         <span className="font-medium text-slate-900">${item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
                   <div className="flex items-center text-green-600 font-bold text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      {order.status.toUpperCase()}
                   </div>
                   <button className="text-indigo-600 font-medium text-sm hover:underline">View Invoice</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
