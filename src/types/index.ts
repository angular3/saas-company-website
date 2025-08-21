export interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'manager' | 'admin';
  avatar?: string;
  phone?: string;
  company?: string;
  createdAt: string;
  isActive: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  minQuantity: number;
  category: string;
  specifications: Record<string, string>;
  factoryInfo: {
    name: string;
    location: string;
    rating: number;
  };
  isActive: boolean;
  createdAt: string;
}

export interface GroupPurchase {
  id: string;
  productId: string;
  product: Product;
  managerId: string;
  manager: User;
  title: string;
  description: string;
  targetQuantity: number;
  currentQuantity: number;
  pricePerUnit: number;
  deadline: string;
  status: 'collecting' | 'processing' | 'production' | 'shipping' | 'completed' | 'cancelled';
  participants: PurchaseParticipant[];
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseParticipant {
  id: string;
  userId: string;
  user: User;
  groupPurchaseId: string;
  quantity: number;
  totalAmount: number;
  paymentStatus: 'pending' | 'partial' | 'paid';
  paidAmount: number;
  joinedAt: string;
}

export interface Order {
  id: string;
  groupPurchaseId: string;
  groupPurchase: GroupPurchase;
  orderNumber: string;
  status: 'created' | 'confirmed' | 'production' | 'quality_check' | 'shipping' | 'customs' | 'delivered';
  totalAmount: number;
  paidAmount: number;
  stages: OrderStage[];
  documents: OrderDocument[];
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
}

export interface OrderStage {
  id: string;
  orderId: string;
  stage: string;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  startDate?: string;
  completedDate?: string;
  description: string;
  notes?: string;
}

export interface OrderDocument {
  id: string;
  orderId: string;
  name: string;
  type: 'contract' | 'invoice' | 'payment_receipt' | 'shipping_doc' | 'quality_cert' | 'other';
  url: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface ChatMessage {
  id: string;
  groupPurchaseId: string;
  senderId: string;
  sender: User;
  message: string;
  type: 'text' | 'file' | 'system';
  fileUrl?: string;
  fileName?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  method: 'bank_transfer' | 'card' | 'crypto';
  status: 'pending' | 'confirmed' | 'failed';
  transactionId?: string;
  confirmedBy?: string;
  confirmedAt?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}