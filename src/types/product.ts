export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  category: string;
  stock: number;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: string;
  discount: string;
  category: string;
  stock: string;
  image: File | null;
}
