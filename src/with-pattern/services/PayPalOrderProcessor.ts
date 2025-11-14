import type { Order } from "../models/Order";
import { OrderStatus } from "../models/Order";
import type { Customer } from "../models/Customer";
import { OrderProcessor } from "./OrderProcessor";

/**
 * Procesador de pedidos con pago por PayPal
 *
 * Extiende OrderProcessor e implementa solo la lógica específica
 * de procesamiento de PayPal.
 *
 * Ventajas:
 * - Solo implementa lo que es diferente (processPayment)
 * - Reutiliza toda la lógica común de la clase base
 * - Código mucho más limpio y conciso
 */
export class PayPalOrderProcessor extends OrderProcessor {
  /**
   * Implementación específica para procesar pagos con PayPal
   */
  protected processPayment(
    order: Order,
    _customer: Customer,
    discount: number
  ): boolean {
    console.log("💰 Procesando pago con PayPal...");

    const finalAmount = order.totalAmount - discount;

    // Lógica específica de PayPal
    console.log("🔗 Generando URL de autorización PayPal...");
    const authUrl = `https://paypal.com/checkout/${order.id}`;
    console.log(`🔐 URL generada: ${authUrl}`);

    console.log(
      `🔐 Redirigiendo a PayPal para autorizar $${finalAmount.toFixed(2)}`
    );

    // Simular flujo de PayPal
    console.log("⏳ Esperando autorización del usuario...");
    console.log("✅ Pago autorizado por PayPal");
    console.log(
      "✅ Transaction ID: " +
        Math.random().toString(36).substr(2, 12).toUpperCase()
    );

    order.status = OrderStatus.PAYMENT_PROCESSED;
    return true;
  }

  /**
   * Confirmación específica para pagos con PayPal
   */
  protected sendPaymentConfirmation(_order: Order, customer: Customer): void {
    console.log("📧 Enviando confirmación de PayPal...");
    console.log(`✅ Recibo de PayPal enviado a ${customer.email}`);
    console.log("✅ Puede ver los detalles en su cuenta de PayPal");
  }

  /**
   * Hook: Lógica adicional antes de procesar (opcional)
   */
  protected beforeProcessing(_order: Order, _customer: Customer): void {
    console.log("🔗 Verificando cuenta de PayPal del cliente...");
    console.log("✅ Cuenta de PayPal verificada");
  }
}
