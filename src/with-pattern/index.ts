import type { Order } from "./models/Order";
import { OrderStatus } from "./models/Order";
import type { Customer } from "./models/Customer";
import { OrderProcessorFactory } from "./services/OrderProcessorFactory";
import { PayPalOrderProcessor } from "./services/PayPalOrderProcessor";
import { BankTransferOrderProcessor } from "./services/BankTransferOrderProcessor";

/**
 * Demostración del sistema CON patrón Template Method
 *
 * Ventajas:
 * - Sin código duplicado
 * - Fácil de mantener (un solo lugar para cambios comunes)
 * - Flujo consistente garantizado
 * - Fácil de extender con nuevos métodos de pago
 * - Sigue principios SOLID
 */

// Datos de prueba
const customer: Customer = {
  id: "CUST001",
  name: "Juan Pérez",
  email: "juan.perez@empresa.com",
  isPremium: true,
  creditLimit: 10000,
};

const order1: Order = {
  id: "ORD001",
  customerId: customer.id,
  items: [
    {
      productId: "P001",
      productName: "Laptop Dell XPS 15",
      quantity: 2,
      unitPrice: 1200,
    },
    {
      productId: "P002",
      productName: "Mouse Logitech MX Master",
      quantity: 5,
      unitPrice: 25,
    },
  ],
  totalAmount: 2525,
  status: OrderStatus.PENDING,
  createdAt: new Date(),
  paymentMethod: "credit-card",
};

const order2: Order = {
  id: "ORD002",
  customerId: customer.id,
  items: [
    {
      productId: "P003",
      productName: "Monitor Samsung 4K",
      quantity: 1,
      unitPrice: 350,
    },
  ],
  totalAmount: 350,
  status: OrderStatus.PENDING,
  createdAt: new Date(),
  paymentMethod: "paypal",
};

const order3: Order = {
  id: "ORD003",
  customerId: customer.id,
  items: [
    {
      productId: "P004",
      productName: "Teclado Mecánico RGB",
      quantity: 3,
      unitPrice: 150,
    },
  ],
  totalAmount: 450,
  status: OrderStatus.PENDING,
  createdAt: new Date(),
  paymentMethod: "bank-transfer",
};

export function runWithPattern() {
  console.log(
    "╔════════════════════════════════════════════════════════════════╗"
  );
  console.log(
    "║   SISTEMA DE PROCESAMIENTO DE PEDIDOS - CON TEMPLATE METHOD   ║"
  );
  console.log(
    "╚════════════════════════════════════════════════════════════════╝"
  );
  console.log("\n✅ VENTAJAS DE ESTE ENFOQUE:");
  console.log("   • Sin código duplicado");
  console.log("   • Un solo punto de modificación para lógica común");
  console.log("   • Flujo consistente garantizado");
  console.log("   • Fácil de extender con nuevos métodos de pago");
  console.log("   • Cumple principios SOLID (Open/Closed, DRY)");
  console.log("\n");

  // Enfoque 1: Usando el Factory (Recomendado)
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📌 ENFOQUE 1: Usando Factory Pattern (Recomendado)");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  OrderProcessorFactory.processOrder(order1, customer);

  // Enfoque 2: Instanciando directamente (cuando conoces el tipo)
  console.log(
    "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  );
  console.log("📌 ENFOQUE 2: Instanciación directa");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  const paypalProcessor = new PayPalOrderProcessor();
  paypalProcessor.processOrder(order2, customer);

  const bankProcessor = new BankTransferOrderProcessor();
  bankProcessor.processOrder(order3, customer);

  console.log(
    "\n════════════════════════════════════════════════════════════════"
  );
  console.log("📊 RESUMEN DE VENTAJAS:");
  console.log(`   • Total de pedidos procesados: 3`);
  console.log(`   • Código duplicado: 0 líneas`);
  console.log(`   • Mantenibilidad: ALTA`);
  console.log(`   • Extensibilidad: ALTA`);
  console.log(`   • Líneas de código por procesador: ~30 (vs ~120 sin patrón)`);
  console.log("\n💡 Para agregar un nuevo método de pago:");
  console.log("   1. Crear nueva clase que extienda OrderProcessor");
  console.log(
    "   2. Implementar solo processPayment() y sendPaymentConfirmation()"
  );
  console.log(
    "   3. ¡Listo! Toda la lógica común se reutiliza automáticamente"
  );
  console.log(
    "════════════════════════════════════════════════════════════════\n"
  );
}
