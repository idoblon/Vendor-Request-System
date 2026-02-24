import { OrderStatus } from '../types/order';

export const ORDER_STATUSES: OrderStatus[] = ['pending', 'processing', 'completed', 'cancelled'];

export const CATEGORIES = ['Electronics', 'Accessories', 'Clothing', 'Food', 'Books', 'Other'];

export const ITEMS_PER_PAGE = 10;

export const LOW_STOCK_THRESHOLD = 10;
