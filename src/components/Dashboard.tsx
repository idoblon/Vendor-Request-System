import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { orderService } from '../services/orderService';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>
          <p className="text-white text-2xl font-bold">{value}</p>
        </div>
        <div className={`text-3xl ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [products, orders] = await Promise.all([
        productService.getAll(),
        orderService.getAll(),
      ]);

      const totalSales = orders
        .filter(o => o.status === 'completed')
        .reduce((sum, order) => sum + order.totalAmount, 0);

      const pendingOrders = orders.filter(o => o.status === 'pending').length;

      setStats({
        totalSales,
        totalProducts: products.length,
        totalOrders: orders.length,
        pendingOrders,
      });
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-white">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Sales" 
          value={`$${stats.totalSales.toFixed(2)}`}
          color="text-blue-500"
          icon={
            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          } 
        />
        <StatCard 
          title="Products" 
          value={stats.totalProducts}
          color="text-teal-500"
          icon={
            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
              <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          } 
        />
        <StatCard 
          title="Orders" 
          value={stats.totalOrders}
          color="text-yellow-500"
          icon={
            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4z" clipRule="evenodd" />
            </svg>
          } 
        />
        <StatCard 
          title="Pending Orders" 
          value={stats.pendingOrders}
          color="text-pink-500"
          icon={
            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          } 
        />
      </div>
      
      <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Average Order Value</p>
            <p className="text-white text-xl font-bold">
              ${stats.totalOrders > 0 ? (stats.totalSales / stats.totalOrders).toFixed(2) : '0.00'}
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Completed Orders</p>
            <p className="text-white text-xl font-bold">
              {stats.totalOrders - stats.pendingOrders}
            </p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Completion Rate</p>
            <p className="text-white text-xl font-bold">
              {stats.totalOrders > 0 
                ? `${(((stats.totalOrders - stats.pendingOrders) / stats.totalOrders) * 100).toFixed(1)}%`
                : '0%'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
