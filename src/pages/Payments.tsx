import React, { useState, useEffect } from 'react';
import { orderService } from '../services/orderService';
import { Order } from '../types/order';
import { formatDate } from '../utils/orderUtils';

const Payments: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPayments();
  }, []);

  useEffect(() => {
    filterPayments();
  }, [orders, selectedStatus]);

  const loadPayments = async () => {
    try {
      setLoading(true);
      const data = await orderService.getAll();
      setOrders(data);
    } catch (err) {
      setError('Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  const filterPayments = () => {
    if (selectedStatus === 'all') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(o => o.status === selectedStatus));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white';
      case 'pending':
        return 'bg-yellow-500 text-white';
      case 'processing':
        return 'bg-blue-500 text-white';
      case 'cancelled':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const calculateStats = () => {
    const totalRevenue = orders
      .filter(o => o.status === 'completed')
      .reduce((sum, order) => sum + order.totalAmount, 0);

    const completedPayments = orders.filter(o => o.status === 'completed').length;
    const pendingPayments = orders.filter(o => o.status === 'pending').length;
    const avgOrderValue = orders.length > 0 ? totalRevenue / completedPayments : 0;

    return { totalRevenue, completedPayments, pendingPayments, avgOrderValue };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-white">Loading payments...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payments ({filteredOrders.length})</h1>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {error && <div className="bg-red-500 text-white px-4 py-2 rounded-lg mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Total Revenue</h3>
          <p className="text-white text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Completed Payments</h3>
          <p className="text-white text-2xl font-bold">{stats.completedPayments}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Pending Payments</h3>
          <p className="text-white text-2xl font-bold">{stats.pendingPayments}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Average Order Value</h3>
          <p className="text-white text-2xl font-bold">${stats.avgOrderValue.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-400">
                  No payments found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">#{order.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{order.customerName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-300">{order.customerEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">${order.totalAmount.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{formatDate(order.createdAt)}</div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
