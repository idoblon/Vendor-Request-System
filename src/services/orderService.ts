import { Order, OrderStatus } from '../types/order';

const STORAGE_KEY = 'vrs_orders';

const mockOrders: Order[] = [
  {
    id: '1',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+1234567890',
    items: [
      { productId: '1', productName: 'Laptop Pro 15', quantity: 1, price: 1299.99, discount: 10 },
      { productId: '2', productName: 'Wireless Mouse', quantity: 2, price: 29.99, discount: 0 },
    ],
    totalAmount: 1229.97,
    status: 'pending',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerPhone: '+1234567891',
    items: [
      { productId: '3', productName: 'USB-C Hub', quantity: 3, price: 49.99, discount: 15 },
    ],
    totalAmount: 127.47,
    status: 'processing',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 43200000).toISOString(),
  },
  {
    id: '3',
    customerName: 'Bob Johnson',
    customerEmail: 'bob@example.com',
    customerPhone: '+1234567892',
    items: [
      { productId: '1', productName: 'Laptop Pro 15', quantity: 2, price: 1299.99, discount: 10 },
    ],
    totalAmount: 2339.98,
    status: 'completed',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

const getStoredOrders = (): Order[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockOrders));
    return mockOrders;
  }
  return JSON.parse(stored);
};

const saveOrders = (orders: Order[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
};

export const orderService = {
  getAll: async (): Promise<Order[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getStoredOrders()), 300);
    });
  },

  getById: async (id: string): Promise<Order | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orders = getStoredOrders();
        resolve(orders.find(o => o.id === id) || null);
      }, 300);
    });
  },

  getByStatus: async (status: OrderStatus): Promise<Order[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orders = getStoredOrders();
        resolve(orders.filter(o => o.status === status));
      }, 300);
    });
  },

  create: async (data: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orders = getStoredOrders();
        const newOrder: Order = {
          ...data,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        orders.push(newOrder);
        saveOrders(orders);
        resolve(newOrder);
      }, 300);
    });
  },

  updateStatus: async (id: string, status: OrderStatus): Promise<Order> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const orders = getStoredOrders();
        const index = orders.findIndex(o => o.id === id);
        if (index === -1) {
          reject(new Error('Order not found'));
          return;
        }
        orders[index] = {
          ...orders[index],
          status,
          updatedAt: new Date().toISOString(),
        };
        saveOrders(orders);
        resolve(orders[index]);
      }, 300);
    });
  },

  delete: async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const orders = getStoredOrders();
        const filtered = orders.filter(o => o.id !== id);
        if (filtered.length === orders.length) {
          reject(new Error('Order not found'));
          return;
        }
        saveOrders(filtered);
        resolve();
      }, 300);
    });
  },

  search: async (query: string): Promise<Order[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orders = getStoredOrders();
        const lowerQuery = query.toLowerCase();
        resolve(
          orders.filter(o =>
            o.customerName.toLowerCase().includes(lowerQuery) ||
            o.customerEmail.toLowerCase().includes(lowerQuery) ||
            o.id.includes(lowerQuery)
          )
        );
      }, 300);
    });
  },
};
