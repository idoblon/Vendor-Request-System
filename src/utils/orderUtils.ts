import { OrderStatus } from '../types/order';

export const getStatusColor = (status: OrderStatus): string => {
  const colors = {
    pending: 'bg-yellow-500 text-white',
    processing: 'bg-blue-500 text-white',
    completed: 'bg-green-500 text-white',
    cancelled: 'bg-red-500 text-white',
  };
  return colors[status];
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
