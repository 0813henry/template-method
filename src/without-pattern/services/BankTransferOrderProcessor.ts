import type { Order } from "../models/Order";
import { OrderStatus } from "../models/Order";
import type { Customer } from "../models/Customer";

/**
 * Procesador de pedidos con pago por transferencia bancaria
 * SIN patrón Template Method - código duplicado
 */
export class BankTransferOrderProcessor {
  processOrder(order: Order, customer: Customer): boolean {
    console.log(
      `\n=== Procesando pedido ${order.id} con Transferencia Bancaria ===`
    );

    // 1. Validar pedido (CÓDIGO DUPLICADO - igual que otros)
    console.log("📋 Validando pedido...");
    if (!order.items || order.items.length === 0) {
      console.error("❌ Error: El pedido no tiene items");
      order.status = OrderStatus.FAILED;
      return false;
    }

    if (order.totalAmount <= 0) {
      console.error("❌ Error: El monto total es inválido");
      order.status = OrderStatus.FAILED;
      return false;
    }
    order.status = OrderStatus.VALIDATED;
    console.log("✅ Pedido validado correctamente");

    // 2. Verificar disponibilidad (CÓDIGO DUPLICADO - igual que otros)
    console.log("📦 Verificando disponibilidad de productos...");
    for (const item of order.items) {
      if (item.quantity > 100) {
        console.error(`❌ Stock insuficiente para ${item.productName}`);
        order.status = OrderStatus.FAILED;
        return false;
      }
    }
    console.log("✅ Productos disponibles");

    // 3. Calcular descuentos (CÓDIGO DUPLICADO - igual que otros)
    console.log("💰 Calculando descuentos...");
    let discount = 0;
    if (customer.isPremium) {
      discount = order.totalAmount * 0.15;
      console.log(`✅ Descuento premium aplicado: $${discount.toFixed(2)}`);
    } else {
      discount = order.totalAmount * 0.05;
      console.log(`✅ Descuento regular aplicado: $${discount.toFixed(2)}`);
    }

    // 4. Procesar pago - ESPECÍFICO para transferencia bancaria
    console.log("🏦 Procesando transferencia bancaria...");
    const finalAmount = order.totalAmount - discount;

    // Validación específica de transferencia
    console.log("📋 Generando instrucciones de transferencia");
    console.log("🏦 Banco: Banco Empresarial");
    console.log(`💰 Monto a transferir: $${finalAmount.toFixed(2)}`);
    console.log(`📝 Referencia: ORD-${order.id}`);
    console.log(
      "⏰ El pedido quedará pendiente hasta recibir la transferencia"
    );

    order.status = OrderStatus.PAYMENT_PROCESSED;
    console.log("✅ Instrucciones de pago generadas");

    // 5. Generar factura (CÓDIGO DUPLICADO - igual que otros)
    console.log("📄 Generando factura...");
    console.log(`✅ Factura generada: INV-${order.id}`);
    console.log(`   Monto: $${finalAmount.toFixed(2)}`);

    // 6. Enviar notificación (CÓDIGO DUPLICADO - igual que otros)
    console.log("📧 Enviando notificación al cliente...");
    console.log(`✅ Email enviado a ${customer.email}`);

    order.status = OrderStatus.COMPLETED;
    console.log(`\n🎉 Pedido ${order.id} procesado exitosamente\n`);
    return true;
  }
}
