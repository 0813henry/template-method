import type { Order } from "../models/Order";
import { OrderStatus } from "../models/Order";
import type { Customer } from "../models/Customer";

/**
 * PATRÓN TEMPLATE METHOD
 *
 * Clase abstracta que define el esqueleto del algoritmo de procesamiento de pedidos.
 *
 * Este patrón permite:
 * - Definir la estructura del algoritmo en un método (template method)
 * - Delegar algunos pasos a las subclases
 * - Reutilizar código común
 * - Garantizar que el flujo sea consistente
 *
 * Principios aplicados:
 * - DRY (Don't Repeat Yourself)
 * - Open/Closed Principle
 * - Template Method Pattern
 */
export abstract class OrderProcessor {
  /**
   * TEMPLATE METHOD
   *
   * Este es el método plantilla que define el algoritmo completo.
   * Define el esqueleto del procesamiento de pedidos y llama a los métodos
   * en el orden correcto. Algunos métodos son implementados aquí (comunes),
   * otros son abstractos (específicos de cada procesador).
   *
   * FINAL: Este método NO debe ser sobrescrito por las subclases.
   */
  public processOrder(order: Order, customer: Customer): boolean {
    console.log(`\n=== Procesando pedido ${order.id} ===`);

    try {
      // 1. Hook: Preparación previa (opcional para subclases)
      this.beforeProcessing(order, customer);

      // 2. Paso común: Validar pedido
      if (!this.validateOrder(order)) {
        return false;
      }

      // 3. Paso común: Verificar disponibilidad
      if (!this.checkInventory(order)) {
        return false;
      }

      // 4. Paso común: Calcular descuentos
      const discount = this.calculateDiscount(order, customer);

      // 5. Paso abstracto: Procesar pago (específico de cada método)
      if (!this.processPayment(order, customer, discount)) {
        return false;
      }

      // 6. Paso común: Generar factura
      this.generateInvoice(order, customer, discount);

      // 7. Paso abstracto: Enviar confirmación específica (opcional)
      this.sendPaymentConfirmation(order, customer);

      // 8. Paso común: Notificar al cliente
      this.notifyCustomer(order, customer);

      // 9. Hook: Finalización (opcional para subclases)
      this.afterProcessing(order, customer);

      order.status = OrderStatus.COMPLETED;
      console.log(`\n🎉 Pedido ${order.id} procesado exitosamente\n`);
      return true;
    } catch (error) {
      console.error(`❌ Error procesando pedido ${order.id}:`, error);
      order.status = OrderStatus.FAILED;
      return false;
    }
  }

  // ============================================================
  // MÉTODOS COMUNES (implementados en la clase base)
  // ============================================================

  /**
   * Validar la estructura y datos básicos del pedido
   * Este método es común para todos los procesadores
   */
  protected validateOrder(order: Order): boolean {
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
    return true;
  }

  /**
   * Verificar disponibilidad de productos en inventario
   * Este método es común para todos los procesadores
   */
  protected checkInventory(order: Order): boolean {
    console.log("📦 Verificando disponibilidad de productos...");

    for (const item of order.items) {
      // Simulación de verificación de inventario
      if (item.quantity > 100) {
        console.error(`❌ Stock insuficiente para ${item.productName}`);
        order.status = OrderStatus.FAILED;
        return false;
      }
    }

    console.log("✅ Productos disponibles");
    return true;
  }

  /**
   * Calcular descuentos según el tipo de cliente
   * Este método es común para todos los procesadores
   */
  protected calculateDiscount(order: Order, customer: Customer): number {
    console.log("💰 Calculando descuentos...");

    let discount = 0;
    if (customer.isPremium) {
      discount = order.totalAmount * 0.15; // 15% para premium
      console.log(`✅ Descuento premium aplicado: $${discount.toFixed(2)}`);
    } else {
      discount = order.totalAmount * 0.05; // 5% para regular
      console.log(`✅ Descuento regular aplicado: $${discount.toFixed(2)}`);
    }

    return discount;
  }

  /**
   * Generar factura del pedido
   * Este método es común para todos los procesadores
   */
  protected generateInvoice(
    order: Order,
    _customer: Customer,
    discount: number
  ): void {
    console.log("📄 Generando factura...");

    const finalAmount = order.totalAmount - discount;

    console.log(`✅ Factura generada: INV-${order.id}`);
    console.log(`   Subtotal: $${order.totalAmount.toFixed(2)}`);
    console.log(`   Descuento: -$${discount.toFixed(2)}`);
    console.log(`   Total: $${finalAmount.toFixed(2)}`);
  }

  /**
   * Enviar notificación general al cliente
   * Este método es común para todos los procesadores
   */
  protected notifyCustomer(order: Order, customer: Customer): void {
    console.log("📧 Enviando notificación al cliente...");
    console.log(`✅ Email enviado a ${customer.email}`);
    console.log(`   Asunto: Tu pedido ${order.id} ha sido procesado`);
  }

  // ============================================================
  // MÉTODOS ABSTRACTOS (deben ser implementados por subclases)
  // ============================================================

  /**
   * Procesar el pago según el método específico
   * ABSTRACTO: Cada subclase implementa su lógica de pago
   */
  protected abstract processPayment(
    order: Order,
    customer: Customer,
    discount: number
  ): boolean;

  /**
   * Enviar confirmación específica del método de pago
   * ABSTRACTO: Cada subclase puede personalizar la confirmación
   */
  protected abstract sendPaymentConfirmation(
    order: Order,
    customer: Customer
  ): void;

  // ============================================================
  // HOOKS (métodos opcionales que subclases pueden sobrescribir)
  // ============================================================

  /**
   * Hook ejecutado antes de iniciar el procesamiento
   * Las subclases pueden sobrescribir este método para agregar lógica adicional
   */
  protected beforeProcessing(_order: Order, _customer: Customer): void {
    // Implementación por defecto vacía
    // Las subclases pueden sobrescribir si necesitan hacer algo antes
  }

  /**
   * Hook ejecutado después de completar el procesamiento
   * Las subclases pueden sobrescribir este método para agregar lógica adicional
   */
  protected afterProcessing(_order: Order, _customer: Customer): void {
    // Implementación por defecto vacía
    // Las subclases pueden sobrescribir si necesitan hacer algo después
  }
}
