import type { Order } from "../models/Order";
import { OrderStatus } from "../models/Order";
import type { Customer } from "../models/Customer";
import { OrderProcessor } from "./OrderProcessor";

/**
 * Procesador de pedidos con pago por Tarjeta de Crédito
 *
 * Extiende OrderProcessor e implementa solo la lógica específica
 * de procesamiento de tarjetas de crédito.
 *
 * Ventajas:
 * - Solo implementa lo que es diferente (processPayment)
 * - Reutiliza toda la lógica común de la clase base
 * - No hay código duplicado
 */
export class CreditCardOrderProcessor extends OrderProcessor {
  /**
   * Implementación específica para procesar pagos con tarjeta de crédito
   */
  protected processPayment(
    order: Order,
    customer: Customer,
    discount: number
  ): boolean {
    console.log("💳 Procesando pago con tarjeta de crédito...");

    const finalAmount = order.totalAmount - discount;

    // Validaciones específicas de tarjeta de crédito
    if (finalAmount > 5000) {
      console.log("🔐 Monto alto detectado - Requiere verificación adicional");
      console.log("🔐 Verificando límite de crédito...");

      if (finalAmount > customer.creditLimit) {
        console.error("❌ Límite de crédito insuficiente");
        order.status = OrderStatus.FAILED;
        return false;
      }
    }

    // Simular procesamiento de tarjeta
    console.log(
      `✅ Cargo de $${finalAmount.toFixed(2)} procesado exitosamente`
    );
    console.log(
      "✅ Autorización bancaria: AUTH-" +
        Math.random().toString(36).substr(2, 9).toUpperCase()
    );

    order.status = OrderStatus.PAYMENT_PROCESSED;
    return true;
  }

  /**
   * Confirmación específica para pagos con tarjeta
   */
  protected sendPaymentConfirmation(_order: Order, _customer: Customer): void {
    console.log("📧 Enviando confirmación de cargo a tarjeta...");
    console.log(
      `✅ Confirmación enviada: El cargo aparecerá en su estado de cuenta`
    );
  }

  /**
   * Hook: Lógica adicional antes de procesar (opcional)
   */
  protected beforeProcessing(_order: Order, _customer: Customer): void {
    console.log("🔒 Verificando datos de seguridad de tarjeta...");
    console.log("✅ Validación de seguridad completada");
  }
}
