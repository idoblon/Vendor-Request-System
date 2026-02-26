import { Product } from '../types/product';
import { emailService } from './emailService';
import { LOW_STOCK_THRESHOLD } from '../constants';

const STORAGE_KEY = 'vrs_products';

// Mock products for development
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop Pro 15',
    description: 'High-performance laptop with 16GB RAM',
    price: 1299.99,
    discount: 10,
    category: 'Electronics',
    stock: 25,
    image: 'https://via.placeholder.com/300x200?text=Laptop',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with USB receiver',
    price: 29.99,
    discount: 0,
    category: 'Accessories',
    stock: 150,
    image: 'https://via.placeholder.com/300x200?text=Mouse',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'USB-C Hub',
    description: '7-in-1 USB-C hub with HDMI and card reader',
    price: 49.99,
    discount: 15,
    category: 'Accessories',
    stock: 80,
    image: 'https://via.placeholder.com/300x200?text=USB+Hub',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const getStoredProducts = (): Product[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProducts));
    return mockProducts;
  }
  return JSON.parse(stored);
};

const saveProducts = (products: Product[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const productService = {
  getAll: async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getStoredProducts()), 300);
    });
  },

  getById: async (id: string): Promise<Product | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = getStoredProducts();
        resolve(products.find(p => p.id === id) || null);
      }, 300);
    });
  },

  getDiscounted: async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = getStoredProducts();
        resolve(products.filter(p => p.discount > 0));
      }, 300);
    });
  },

  create: async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = getStoredProducts();
        const newProduct: Product = {
          ...data,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        products.push(newProduct);
        saveProducts(products);
        resolve(newProduct);
      }, 300);
    });
  },

  update: async (id: string, data: Partial<Product>): Promise<Product> => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        const products = getStoredProducts();
        const index = products.findIndex(p => p.id === id);
        if (index === -1) {
          reject(new Error('Product not found'));
          return;
        }
        products[index] = {
          ...products[index],
          ...data,
          updatedAt: new Date().toISOString(),
        };
        saveProducts(products);
        
        // Check for low stock and send alert
        if (products[index].stock < LOW_STOCK_THRESHOLD) {
          await emailService.sendLowStockAlert(products[index], 'admin@vrs.com');
        }
        
        resolve(products[index]);
      }, 300);
    });
  },

  delete: async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const products = getStoredProducts();
        const filtered = products.filter(p => p.id !== id);
        if (filtered.length === products.length) {
          reject(new Error('Product not found'));
          return;
        }
        saveProducts(filtered);
        resolve();
      }, 300);
    });
  },

  search: async (query: string): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = getStoredProducts();
        const lowerQuery = query.toLowerCase();
        resolve(
          products.filter(p =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.description.toLowerCase().includes(lowerQuery) ||
            p.category.toLowerCase().includes(lowerQuery)
          )
        );
      }, 300);
    });
  },

  filterByCategory: async (category: string): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = getStoredProducts();
        resolve(products.filter(p => p.category === category));
      }, 300);
    });
  },
};
