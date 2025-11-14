/**
 * Modelo de datos para representar un pedido
 */
export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
  paymentMethod: "credit-card" | "paypal" | "bank-transfer";
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export enum OrderStatus {
  PENDING = "PENDING",
  VALIDATED = "VALIDATED",
  PAYMENT_PROCESSED = "PAYMENT_PROCESSED",
  SHIPPED = "SHIPPED",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}
