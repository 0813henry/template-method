# Diagrama de Clases - Template Method Pattern

## 📊 Arquitectura del Sistema

### Diagrama UML

```
┌─────────────────────────────────────────────────────────────┐
│                   <<abstract>>                              │
│                  OrderProcessor                             │
├─────────────────────────────────────────────────────────────┤
│ # order: Order                                              │
│ # customer: Customer                                        │
├─────────────────────────────────────────────────────────────┤
│ + processOrder(order, customer): boolean                    │
│   [TEMPLATE METHOD - Define el flujo completo]             │
│                                                             │
│ # validateOrder(order): boolean                             │
│ # checkInventory(order): boolean                            │
│ # calculateDiscount(order, customer): number                │
│ # processPayment(order, customer, discount): boolean        │
│   [ABSTRACT - Implementado por subclases]                  │
│ # generateInvoice(order, customer, discount): void          │
│ # sendPaymentConfirmation(order, customer): void            │
│   [ABSTRACT - Implementado por subclases]                  │
│ # notifyCustomer(order, customer): void                     │
│ # beforeProcessing(order, customer): void [HOOK]            │
│ # afterProcessing(order, customer): void [HOOK]             │
└─────────────────────────────────────────────────────────────┘
                            △
                            │ hereda
            ┌───────────────┼───────────────┐
            │               │               │
┌───────────▼──────┐ ┌──────▼──────┐ ┌─────▼───────────┐
│ CreditCard       │ │   PayPal    │ │ BankTransfer    │
│ OrderProcessor   │ │OrderProcessor│ │ OrderProcessor  │
├──────────────────┤ ├─────────────┤ ├─────────────────┤
│                  │ │             │ │                 │
├──────────────────┤ ├─────────────┤ ├─────────────────┤
│ + processPayment │ │+ processPay │ │+ processPayment │
│   (): boolean    │ │  ment():bool│ │  (): boolean    │
│   [Cargo directo]│ │  [Redirect] │ │  [Instrucciones]│
│                  │ │             │ │                 │
│ + sendPayment    │ │+ sendPayment│ │+ sendPayment    │
│   Confirmation() │ │Confirmation │ │  Confirmation() │
│   [Email cargo]  │ │ [Recibo PP] │ │  [Email instr.] │
│                  │ │             │ │                 │
│ + beforeProcess  │ │+ beforeProc │ │+ afterProcess   │
│   ing()          │ │  essing()   │ │  ing()          │
│   [Validar       │ │ [Verificar  │ │ [Recordatorio]  │
│    seguridad]    │ │  cuenta]    │ │                 │
└──────────────────┘ └─────────────┘ └─────────────────┘
```

## 🏗️ Componentes del Patrón

### 1. Clase Abstracta (OrderProcessor)

**Responsabilidad**: Define el esqueleto del algoritmo

**Métodos:**

| Tipo          | Método                      | Descripción                  | Implementación                 |
| ------------- | --------------------------- | ---------------------------- | ------------------------------ |
| **Template**  | `processOrder()`            | Define el flujo completo     | Clase base (NO sobrescribible) |
| **Concreto**  | `validateOrder()`           | Valida estructura del pedido | Clase base                     |
| **Concreto**  | `checkInventory()`          | Verifica stock               | Clase base                     |
| **Concreto**  | `calculateDiscount()`       | Calcula descuentos           | Clase base                     |
| **Abstracto** | `processPayment()`          | Procesa pago específico      | **Subclases**                  |
| **Concreto**  | `generateInvoice()`         | Genera factura               | Clase base                     |
| **Abstracto** | `sendPaymentConfirmation()` | Confirmación específica      | **Subclases**                  |
| **Concreto**  | `notifyCustomer()`          | Notifica por email           | Clase base                     |
| **Hook**      | `beforeProcessing()`        | Pre-procesamiento opcional   | Subclases (opcional)           |
| **Hook**      | `afterProcessing()`         | Post-procesamiento opcional  | Subclases (opcional)           |

### 2. Clases Concretas

#### CreditCardOrderProcessor

- Implementa procesamiento de tarjeta de crédito
- Valida límite de crédito
- Realiza cargo directo
- ~30 líneas de código

#### PayPalOrderProcessor

- Implementa procesamiento PayPal
- Genera URL de autorización
- Maneja redirección
- ~30 líneas de código

#### BankTransferOrderProcessor

- Implementa transferencia bancaria
- Genera instrucciones de pago
- Programa seguimiento
- ~30 líneas de código

## 🔄 Flujo de Ejecución

```
Cliente llama a: processor.processOrder(order, customer)
         │
         ▼
┌────────────────────────────────────────────────┐
│  TEMPLATE METHOD: processOrder()               │
│  (Definido en OrderProcessor - NO modificable) │
└────────────────────────────────────────────────┘
         │
         ├─► 1. beforeProcessing() [HOOK - Opcional]
         │        └─► CreditCard: Valida seguridad
         │        └─► PayPal: Verifica cuenta
         │        └─► BankTransfer: (no implementa)
         │
         ├─► 2. validateOrder() [COMÚN]
         │        └─► Valida items, monto, etc.
         │
         ├─► 3. checkInventory() [COMÚN]
         │        └─► Verifica stock disponible
         │
         ├─► 4. calculateDiscount() [COMÚN]
         │        └─► 15% premium, 5% regular
         │
         ├─► 5. processPayment() [ABSTRACTO - Específico]
         │        ├─► CreditCard: Cargo directo
         │        ├─► PayPal: Redirección
         │        └─► BankTransfer: Instrucciones
         │
         ├─► 6. generateInvoice() [COMÚN]
         │        └─► Crea factura con descuentos
         │
         ├─► 7. sendPaymentConfirmation() [ABSTRACTO - Específico]
         │        ├─► CreditCard: Email de cargo
         │        ├─► PayPal: Recibo PayPal
         │        └─► BankTransfer: Instrucciones
         │
         ├─► 8. notifyCustomer() [COMÚN]
         │        └─► Email de confirmación
         │
         └─► 9. afterProcessing() [HOOK - Opcional]
                  └─► BankTransfer: Programa recordatorio
```

## 📊 Modelos de Datos

### Order

```typescript
interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
  paymentMethod: "credit-card" | "paypal" | "bank-transfer";
}
```

### Customer

```typescript
interface Customer {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  creditLimit: number;
}
```

### OrderItem

```typescript
interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}
```

## 🎯 Ventajas del Diseño

### ✅ Sin Duplicación

- Los pasos comunes (1, 2, 3, 6, 8) están implementados una sola vez
- Reducción del 75% en código (~450 líneas → ~250 líneas)

### ✅ Fácil Mantenimiento

- Cambiar lógica de descuentos: modificar 1 método vs 3 clases
- Un solo punto de verdad para cada funcionalidad

### ✅ Extensibilidad

- Agregar nuevo método de pago: crear clase de ~30 líneas
- No necesita modificar código existente (Open/Closed Principle)

### ✅ Consistencia Garantizada

- El flujo es siempre el mismo para todos los procesadores
- Imposible saltarse pasos o ejecutarlos en orden incorrecto

## 🔧 Extensión del Sistema

Para agregar un nuevo método de pago (ej: Criptomonedas):

```typescript
export class CryptoOrderProcessor extends OrderProcessor {
  protected processPayment(
    order: Order,
    customer: Customer,
    discount: number
  ): boolean {
    // Lógica específica de criptomonedas
    const wallet = generateWalletAddress();
    const amount = order.totalAmount - discount;
    console.log(`Transferir ${amount} BTC a ${wallet}`);
    return true;
  }

  protected sendPaymentConfirmation(order: Order, customer: Customer): void {
    console.log("Confirmación de blockchain enviada");
  }
}
```

**¡Solo 10-15 líneas de código nuevo!**

---

**Autor:** Demostración de Patrones de Diseño  
**Patrón:** Template Method (Gang of Four)  
**Fecha:** Noviembre 2025
