import type { Order } from "../models/Order";
import { OrderStatus } from "../models/Order";
import type { Customer } from "../models/Customer";
import { OrderProcessor } from "./OrderProcessor";

/**
 * Procesador de pedidos con pago por Transferencia Bancaria
 *
 * Extiende OrderProcessor e implementa solo la lógica específica
 * de procesamiento de transferencias bancarias.
 *
 * Ventajas:
 * - Solo implementa lo que es diferente (processPayment)
 * - Reutiliza toda la lógica común de la clase base
 * - Fácil de entender y mantener
 */
export class BankTransferOrderProcessor extends OrderProcessor {
  /**
   * Implementación específica para procesar pagos con transferencia bancaria
   */
  protected processPayment(
    order: Order,
    _customer: Customer,
    discount: number
  ): boolean {
    console.log("🏦 Procesando transferencia bancaria...");

    const finalAmount = order.totalAmount - discount;

    // Lógica específica de transferencia bancaria
    console.log("📋 Generando instrucciones de transferencia...");
    console.log("─────────────────────────────────────────────");
    console.log("🏦 DATOS PARA TRANSFERENCIA:");
    console.log("   Banco: Banco Empresarial Internacional");
    console.log("   Cuenta: 1234-5678-9012-3456");
    console.log("   SWIFT: EMPBANK2025");
    console.log(`   Monto: $${finalAmount.toFixed(2)}`);
    console.log(`   Referencia: ORD-${order.id}`);
    console.log("   Beneficiario: Empresa Comercial S.A.");
    console.log("─────────────────────────────────────────────");

    console.log(
      "⏰ El pedido quedará pendiente hasta recibir la transferencia"
    );
    console.log("⏰ Tiempo estimado de confirmación: 24-48 horas");

    order.status = OrderStatus.PAYMENT_PROCESSED;
    console.log("✅ Instrucciones de pago generadas exitosamente");

    return true;
  }

  /**
   * Confirmación específica para pagos con transferencia
   */
  protected sendPaymentConfirmation(_order: Order, customer: Customer): void {
    console.log("📧 Enviando instrucciones de transferencia por email...");
    console.log(`✅ Instrucciones enviadas a ${customer.email}`);
    console.log("✅ Se incluye comprobante para descarga");
  }

  /**
   * Hook: Lógica adicional después de procesar (opcional)
   */
  protected afterProcessing(_order: Order, _customer: Customer): void {
    console.log("📅 Programando recordatorio de seguimiento...");
    console.log(
      "✅ Se enviará recordatorio en 24 horas si no se confirma el pago"
    );
  }
}
