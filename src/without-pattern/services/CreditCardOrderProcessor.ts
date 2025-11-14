import type { Order } from "../models/Order";
import { OrderStatus } from "../models/Order";
import type { Customer } from "../models/Customer";

/**
 * Procesador de pedidos con pago por tarjeta de crédito
 * SIN patrón Template Method - código duplicado
 */
export class CreditCardOrderProcessor {
  processOrder(order: Order, customer: Customer): boolean {
    console.log(
      `\n=== Procesando pedido ${order.id} con Tarjeta de Crédito ===`
    );

    // 1. Validar pedido (CÓDIGO DUPLICADO)
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

    // 2. Verificar disponibilidad (CÓDIGO DUPLICADO)
    console.log("📦 Verificando disponibilidad de productos...");
    for (const item of order.items) {
      // Simulación de verificación
      if (item.quantity > 100) {
        console.error(`❌ Stock insuficiente para ${item.productName}`);
        order.status = OrderStatus.FAILED;
        return false;
      }
    }
    console.log("✅ Productos disponibles");

    // 3. Calcular descuentos (CÓDIGO DUPLICADO)
    console.log("💰 Calculando descuentos...");
    let discount = 0;
    if (customer.isPremium) {
      discount = order.totalAmount * 0.15; // 15% para premium
      console.log(`✅ Descuento premium aplicado: $${discount.toFixed(2)}`);
    } else {
      discount = order.totalAmount * 0.05; // 5% para regular
      console.log(`✅ Descuento regular aplicado: $${discount.toFixed(2)}`);
    }

    // 4. Procesar pago - ESPECÍFICO para tarjeta de crédito
    console.log("💳 Procesando pago con tarjeta de crédito...");
    const finalAmount = order.totalAmount - discount;

    // Validación específica de tarjeta
    if (finalAmount > 5000) {
      console.log("🔐 Requiere verificación adicional para montos altos");
      // Lógica específica de tarjeta
    }

    // Simular procesamiento de tarjeta
    console.log(
      `✅ Cargo de $${finalAmount.toFixed(2)} procesado exitosamente`
    );
    console.log("📧 Enviando confirmación de cargo a email");
    order.status = OrderStatus.PAYMENT_PROCESSED;

    // 5. Generar factura (CÓDIGO DUPLICADO)
    console.log("📄 Generando factura...");
    console.log(`✅ Factura generada: INV-${order.id}`);
    console.log(`   Monto: $${finalAmount.toFixed(2)}`);

    // 6. Enviar notificación (CÓDIGO DUPLICADO)
    console.log("📧 Enviando notificación al cliente...");
    console.log(`✅ Email enviado a ${customer.email}`);

    order.status = OrderStatus.COMPLETED;
    console.log(`\n🎉 Pedido ${order.id} procesado exitosamente\n`);
    return true;
  }
}
