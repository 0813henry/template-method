import type { Order } from "../models/Order";
import type { Customer } from "../models/Customer";
import { OrderProcessor } from "./OrderProcessor";
import { CreditCardOrderProcessor } from "./CreditCardOrderProcessor";
import { PayPalOrderProcessor } from "./PayPalOrderProcessor";
import { BankTransferOrderProcessor } from "./BankTransferOrderProcessor";

/**
 * Factory para crear procesadores de pedidos según el método de pago
 *
 * Patrón Factory Method combinado con Template Method
 * Permite crear el procesador adecuado sin conocer la clase concreta
 */
export class OrderProcessorFactory {
  /**
   * Crea y retorna el procesador adecuado según el método de pago
   */
  static createProcessor(
    paymentMethod: Order["paymentMethod"]
  ): OrderProcessor {
    switch (paymentMethod) {
      case "credit-card":
        return new CreditCardOrderProcessor();

      case "paypal":
        return new PayPalOrderProcessor();

      case "bank-transfer":
        return new BankTransferOrderProcessor();

      default:
        throw new Error(`Método de pago no soportado: ${paymentMethod}`);
    }
  }

  /**
   * Método de conveniencia para procesar un pedido directamente
   */
  static processOrder(order: Order, customer: Customer): boolean {
    const processor = this.createProcessor(order.paymentMethod);
    return processor.processOrder(order, customer);
  }
}
