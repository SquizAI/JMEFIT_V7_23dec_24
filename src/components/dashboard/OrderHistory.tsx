import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Calendar, Package, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { OrderService } from '../../services/orders';

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image?: string;
  }[];
}

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Add error boundary
  if (!user) {
    return null;
  }

  useEffect(() => {
    const loadOrders = async () => {
      if (!user) return;
      
      try {
        const userOrders = await OrderService.getUserOrders(user.id);
        if (!userOrders) {
          throw new Error('Failed to load orders');
        }

        setOrders(userOrders.map(order => ({
          id: order.id,
          date: order.created_at,
          total: order.total_amount,
          status: order.status,
          items: order.order_items.map(item => ({
            id: item.id,
            name: item.products.name,
            quantity: item.quantity,
            price: item.unit_price,
            image: item.products.images?.[0]
          }))
        })));
      } catch (err) {
        console.error('Error loading orders:', err);
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [user]);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-500';
      case 'processing':
        return 'bg-blue-500/20 text-blue-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'cancelled':
        return 'bg-red-500/20 text-red-500';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#3dd8e8]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Order History</h2>
        <Link 
          to="/shop"
          className="text-[#3dd8e8] hover:text-[#34c5d3] transition-colors flex items-center gap-2"
        >
          <ShoppingBag className="w-5 h-5" />
          Shop Now
        </Link>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-black rounded-lg overflow-hidden"
            >
              <div className="p-4 border-b border-zinc-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-4">
                    <Package className="w-5 h-5 text-[#3dd8e8]" />
                    <span className="font-semibold">Order #{order.id.slice(0, 8)}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(order.date).toLocaleDateString()}
                  </div>
                  <span>•</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-4">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-400">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <span className="text-[#3dd8e8] font-semibold">
                        ${(item.quantity * item.price).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  to={`/orders/${order.id}`}
                  className="flex items-center justify-center gap-2 mt-4 text-[#3dd8e8] hover:text-[#34c5d3] transition-colors"
                >
                  View Details
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-400">
          <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No orders yet</p>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;