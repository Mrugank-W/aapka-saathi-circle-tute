export interface Vendor {
  uid: string;
  name: string;
  phone: string;
  stallName: string;
  saathiCreditLimit: number;
  saathiCreditBalance: number;
  wasteCreditsBalance: number;
}

export interface Product {
  productId: string;
  name: string;
  price: number;
  unit: string;
  imageURL: string;
  category: string;
}

export interface Order {
  orderId: string;
  vendorId: string;
  items: OrderItem[];
  totalCost: number;
  wasteCreditsUsed: number;
  status: 'pending' | 'confirmed' | 'assigned' | 'delivered';
  timestamp: any;
  driverId?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
}

export interface MFCUser {
  uid: string;
  name: string;
  email: string;
  role: 'manager' | 'driver';
}

export interface WastePickup {
  pickupId: string;
  vendorId: string;
  driverId: string;
  weightInKg: number;
  creditsEarned: number;
  timestamp: any;
}

export interface CartItem extends OrderItem {
  imageURL: string;
}