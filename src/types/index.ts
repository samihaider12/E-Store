export interface Product {
  id: number;
  name: string;
  price: number;
  category: string; // Change from specific types to string
  image: string;
  sizes: string[];
  colors: string[];
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface CustomerData {
  name: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  paymentMethod: 'cod' | 'card';
}

export interface Order {
  id: string;
  customer: CustomerData;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
}

export interface CarouselItem {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}