import React from 'react';
import { Order } from '../types/order';
import { calculateDiscountedPrice } from '../utils/priceUtils';
import { getStatusColor, formatDate } from '../utils/orderUtils';

interface OrderDetailsModalProps {
  order: Order;
  onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Order Details #{order.id}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Customer Name</p>
              <p className="text-white">{order.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-white">{order.customerEmail}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Phone</p>
              <p className="text-white">{order.customerPhone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Status</p>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-400">Order Date</p>
              <p className="text-white">{formatDate(order.createdAt)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Last Updated</p>
              <p className="text-white">{formatDate(order.updatedAt)}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Order Items</h3>
            <div className="bg-gray-700 rounded-lg overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-600">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-300">Product</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-300">Qty</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-300">Price</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-300">Discount</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-300">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-600">
                  {order.items.map((item, index) => {
                    const itemPrice = calculateDiscountedPrice(item.price, item.discount);
                    const itemTotal = itemPrice * item.quantity;
                    return (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-white">{item.productName}</td>
                        <td className="px-4 py-2 text-sm text-gray-300">{item.quantity}</td>
                        <td className="px-4 py-2 text-sm text-gray-300">${item.price.toFixed(2)}</td>
                        <td className="px-4 py-2 text-sm text-green-500">{item.discount}%</td>
                        <td className="px-4 py-2 text-sm font-medium text-white">${itemTotal.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-700">
            <span className="text-lg font-semibold">Total Amount</span>
            <span className="text-2xl font-bold text-green-500">${order.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
