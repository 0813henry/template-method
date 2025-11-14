import type { Order } from "./models/Order";
import { OrderStatus } from "./models/Order";
import type { Customer } from "./models/Customer";
import { CreditCardOrderProcessor } from "./services/CreditCardOrderProcessor";
import { PayPalOrderProcessor } from "./services/PayPalOrderProcessor";
import { BankTransferOrderProcessor } from "./services/BankTransferOrderProcessor";

/**
 * Demostración del sistema SIN patrón Template Method
 * Problemas:
 * - Código duplicado en múltiples lugares
 * - Difícil de mantener
 * - Errores al modificar un procesador y olvidar los otros
 * - No hay garantía de consistencia en el flujo
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
      productName: "Laptop Dell",
      quantity: 2,
      unitPrice: 1200,
    },
    {
      productId: "P002",
      productName: "Mouse Logitech",
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
      productName: "Monitor Samsung",
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
      productName: "Teclado Mecánico",
      quantity: 3,
      unitPrice: 150,
    },
  ],
  totalAmount: 450,
  status: OrderStatus.PENDING,
  createdAt: new Date(),
  paymentMethod: "bank-transfer",
};

export function runWithoutPattern() {
  console.log(
    "╔════════════════════════════════════════════════════════════════╗"
  );
  console.log(
    "║     SISTEMA DE PROCESAMIENTO DE PEDIDOS - SIN PATRÓN          ║"
  );
  console.log(
    "╚════════════════════════════════════════════════════════════════╝"
  );
  console.log("\n⚠️  PROBLEMAS DE ESTE ENFOQUE:");
  console.log("   • Código duplicado en cada procesador");
  console.log("   • Difícil de mantener y extender");
  console.log("   • Riesgo de inconsistencias entre procesadores");
  console.log("   • Violación del principio DRY (Don't Repeat Yourself)");
  console.log("\n");

  // Procesar con diferentes métodos de pago
  const creditCardProcessor = new CreditCardOrderProcessor();
  creditCardProcessor.processOrder(order1, customer);

  const paypalProcessor = new PayPalOrderProcessor();
  paypalProcessor.processOrder(order2, customer);

  const bankTransferProcessor = new BankTransferOrderProcessor();
  bankTransferProcessor.processOrder(order3, customer);

  console.log(
    "\n════════════════════════════════════════════════════════════════"
  );
  console.log("📊 RESUMEN:");
  console.log(`   • Total de pedidos procesados: 3`);
  console.log(`   • Líneas de código duplicadas: ~60 por procesador`);
  console.log(`   • Mantenibilidad: BAJA`);
  console.log(`   • Extensibilidad: BAJA`);
  console.log(
    "════════════════════════════════════════════════════════════════\n"
  );
}
