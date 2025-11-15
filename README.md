# 🎓 Patrón de Diseño: Template Method

## 📚 Descripción del Patrón

El **Template Method** es un patrón de diseño de comportamiento que define el esqueleto de un algoritmo en una operación, delegando algunos pasos a las subclases. Este patrón permite que las subclases redefinan ciertos pasos de un algoritmo sin cambiar su estructura.

### Propósito

- Definir la estructura de un algoritmo una vez y permitir que las subclases proporcionen implementaciones específicas de ciertos pasos
- Evitar duplicación de código manteniendo el código común en la clase base
- Garantizar que el orden de ejecución del algoritmo permanezca consistente

### Cuándo Usar

- Cuando tienes varias clases que implementan algoritmos similares con solo pequeñas variaciones
- Cuando quieres controlar el orden de ejecución de los pasos de un algoritmo
- Cuando deseas evitar duplicación de código entre clases relacionadas

## 🎯 Caso de Estudio

### Problema Planteado

Una **empresa de comercio electrónico** necesita implementar un sistema para procesar diferentes tipos de pedidos según el método de pago elegido por el cliente. El proceso general de todos los pedidos es similar:

1. Validar los datos del pedido
2. Verificar disponibilidad de productos en inventario
3. Calcular descuentos según el tipo de cliente
4. **Procesar el pago** (varía según el método)
5. Generar factura
6. Notificar al cliente

La empresa acepta tres métodos de pago:

- 💳 **Tarjeta de Crédito**: Requiere validación de límite de crédito
- 💰 **PayPal**: Requiere autorización mediante redirección
- 🏦 **Transferencia Bancaria**: Requiere generar instrucciones de pago

### Desafío

Sin un patrón de diseño adecuado, el código tendría:

- **Duplicación masiva**: Los pasos 1, 2, 3, 5 y 6 se repetirían en cada procesador
- **Mantenimiento difícil**: Cambiar la lógica de descuentos requeriría modificar 3+ archivos
- **Inconsistencias**: Alto riesgo de que los procesadores tengan comportamientos diferentes
- **Baja escalabilidad**: Agregar un nuevo método de pago significa copiar ~120 líneas de código

### Solución con Template Method

El patrón Template Method resuelve este problema:

- **Clase abstracta `OrderProcessor`**: Define el algoritmo completo en `processOrder()`
- **Métodos comunes implementados**: Validación, inventario, descuentos, facturación, notificación
- **Métodos abstractos**: Solo `processPayment()` debe ser implementado por cada subclase
- **Resultado**: Código limpio, sin duplicación, fácil de mantener y extender

## 📋 Contenido del Proyecto

Este proyecto educativo incluye:

### 📁 Implementación Completa

- `src/with-pattern/` - **Solución con Template Method** (código limpio y mantenible)
- `src/without-pattern/` - **Código sin patrón** (para comparación educativa)
- `src/App.tsx` - Interfaz interactiva para ejecutar y comparar ambas versiones

## 🔍 Diagrama de Clases

Para ver el diagrama UML completo del sistema, consulta: **[DIAGRAMA-CLASES.md](./DIAGRAMA-CLASES.md)**

### Vista Rápida de la Arquitectura

```
         OrderProcessor (Abstract)
                 │
    ┌────────────┼────────────┐
    │            │            │
CreditCard   PayPal   BankTransfer
Processor   Processor   Processor
```

**Métodos del Template:**

1. ✅ **Comunes** (implementados en clase base): validate, checkInventory, calculateDiscount, generateInvoice, notify
2. 🔶 **Abstractos** (implementados por subclases): processPayment, sendConfirmation
3. 🎯 **Template** (define el flujo): processOrder()

## 🚀 Guía de Inicio Rápido

### Instalación

```bash
npm install
```

### Ejecutar Aplicación

```bash
npm run dev
```

Abre `http://localhost:5173` para ver:

- ⚖️ **Comparación lado a lado** de ambas implementaciones
- 📊 **Diagramas visuales** del patrón
- 📈 **Métricas de código** en tiempo real
- 🎯 **Ejecución interactiva** de ambas versiones

## 💡 Análisis del Problema

### ❌ Sin Template Method

**Problemas identificados:**

| Problema             | Impacto                     | Ejemplo                                                                        |
| -------------------- | --------------------------- | ------------------------------------------------------------------------------ |
| **Código Duplicado** | ~180 líneas repetidas (40%) | Los métodos `validateOrder()`, `checkInventory()`, etc. se repiten en 3 clases |
| **Mantenimiento**    | 3 puntos de modificación    | Cambiar lógica de descuentos = editar 3 archivos                               |
| **Inconsistencias**  | Alto riesgo de bugs         | Desarrollador actualiza 2 clases pero olvida la tercera                        |
| **Escalabilidad**    | Bajo                        | Nuevo método de pago = copiar ~120 líneas                                      |

**Ejemplo de duplicación:**

```typescript
// CreditCardProcessor.ts
validateOrder(order) {
  if (!order.items || order.items.length === 0) return false;
  if (order.totalAmount <= 0) return false;
  return true;
}

// PayPalProcessor.ts - CÓDIGO DUPLICADO
validateOrder(order) {
  if (!order.items || order.items.length === 0) return false;
  if (order.totalAmount <= 0) return false;
  return true;
}

// BankTransferProcessor.ts - CÓDIGO DUPLICADO
validateOrder(order) {
  if (!order.items || order.items.length === 0) return false;
  if (order.totalAmount <= 0) return false;
  return true;
}
```

### ✅ Con Template Method

**Solución:**

```typescript
// OrderProcessor.ts - UNA SOLA VEZ
protected validateOrder(order: Order): boolean {
  if (!order.items || order.items.length === 0) return false;
  if (order.totalAmount <= 0) return false;
  return true;
}

// Todas las subclases heredan este método
// NO hay duplicación
```

**Beneficios:**

| Aspecto                    | Sin Patrón         | Con Template Method | Mejora             |
| -------------------------- | ------------------ | ------------------- | ------------------ |
| **Líneas de código**       | ~450               | ~250                | 44% menos          |
| **Código duplicado**       | 180 líneas         | 0 líneas            | 100% eliminado     |
| **Puntos de cambio**       | 3 archivos         | 1 archivo           | 67% más fácil      |
| **Agregar método de pago** | ~120 líneas nuevas | ~30 líneas nuevas   | 75% menos esfuerzo |
| **Riesgo de bugs**         | Alto               | Bajo                | -                  |

## 🏗️ Estructura del Proyecto

### 1️⃣ Sin Patrón Template Method (`src/without-pattern/`)

- ❌ Código duplicado en múltiples clases
- ❌ Difícil de mantener
- ❌ Riesgo de inconsistencias
- ❌ Baja extensibilidad

### 2️⃣ Con Patrón Template Method (`src/with-pattern/`)

- ✅ Sin código duplicado
- ✅ Fácil de mantener
- ✅ Flujo consistente garantizado
- ✅ Alta extensibilidad

## 🚀 Inicio Rápido

### Instalación

```bash
npm install
```

### Ejecutar la Aplicación Web

```bash
npm run dev
```

Abre tu navegador en `http://localhost:5173` y podrás:

- Ejecutar ambas versiones con un click
- Comparar visualmente las diferencias
- Ver la salida detallada de cada implementación

## 📊 Comparación Rápida

| Aspecto                    | Sin Patrón        | Con Template Method |
| -------------------------- | ----------------- | ------------------- |
| **Líneas por procesador**  | ~120 líneas       | ~30 líneas          |
| **Código duplicado**       | 40% (~180 líneas) | 0%                  |
| **Puntos de modificación** | 3 clases          | 1 clase base        |
| **Mantenibilidad**         | ❌ Baja           | ✅ Alta             |
| **Extensibilidad**         | ❌ Baja           | ✅ Alta             |
| **Consistencia**           | ⚠️ No garantizada | ✅ Garantizada      |

## 🏗️ Estructura del Proyecto

```
template-method/
├── README.md                      # Este archivo
├── src/
│   ├── without-pattern/           # Implementación SIN patrón
│   │   ├── models/
│   │   │   ├── Order.ts
│   │   │   └── Customer.ts
│   │   ├── services/
│   │   │   ├── CreditCardOrderProcessor.ts
│   │   │   ├── PayPalOrderProcessor.ts
│   │   │   └── BankTransferOrderProcessor.ts
│   │   └── index.ts
│   │
│   ├── with-pattern/              # Implementación CON patrón
│   │   ├── models/
│   │   │   ├── Order.ts
│   │   │   └── Customer.ts
│   │   ├── services/
│   │   │   ├── OrderProcessor.ts              # ⭐ Clase abstracta base
│   │   │   ├── CreditCardOrderProcessor.ts
│   │   │   ├── PayPalOrderProcessor.ts
│   │   │   ├── BankTransferOrderProcessor.ts
│   │   │   └── OrderProcessorFactory.ts
│   │   └── index.ts
│   │
│   ├── App.tsx                    # Interfaz web interactiva
│   └── main.tsx
└── package.json
```

## 💡 Caso de Uso: Sistema de Procesamiento de Pedidos

El proyecto implementa un sistema empresarial realista de procesamiento de pedidos con tres métodos de pago:

- 💳 **Tarjeta de Crédito:** Validación de límite, cargo directo
- 💰 **PayPal:** Autorización externa, redirección
- 🏦 **Transferencia Bancaria:** Generación de instrucciones

### Flujo de Procesamiento

```
1. Validar Pedido
2. Verificar Disponibilidad de Inventario
3. Calcular Descuentos (premium/regular)
4. Procesar Pago (método específico)
5. Generar Factura
6. Enviar Notificación al Cliente
```

**El problema:** Los pasos 1, 2, 3, 5 y 6 son **idénticos** para todos los métodos de pago, solo el paso 4 cambia.

## 🎯 ¿Qué es el Patrón Template Method?

El **Template Method** es un patrón de diseño de comportamiento que:

1. Define el **esqueleto de un algoritmo** en un método (template method)
2. Permite que las subclases **sobrescriban pasos específicos** sin cambiar la estructura
3. Promueve la **reutilización de código** y garantiza **consistencia**

### Diagrama del Patrón

```
┌─────────────────────────────────────┐
│   OrderProcessor (Abstract)         │
│  ─────────────────────────────      │
│  + processOrder() [Template Method] │ ← Define el flujo
│  # validateOrder()      [Común]     │
│  # processPayment()     [Abstracto] │ ← Cada clase lo implementa
│  # generateInvoice()    [Común]     │
└─────────────────────────────────────┘
           ▲           ▲           ▲
           │           │           │
    ┌──────┘           │           └──────┐
┌───┴────┐      ┌──────┴──────┐    ┌─────┴────┐
│ Credit │      │   PayPal    │    │   Bank   │
│  Card  │      │  Processor  │    │ Transfer │
└────────┘      └─────────────┘    └──────────┘
```

## 📚 Aprende Más

### Recursos Adicionales

- [Refactoring Guru - Template Method](https://refactoring.guru/design-patterns/template-method)
- [Gang of Four - Design Patterns](https://en.wikipedia.org/wiki/Design_Patterns)

## 🛠️ Tecnologías Utilizadas

- **TypeScript** - Tipado estático y orientación a objetos
- **React** - Interfaz web interactiva
- **Vite** - Build tool moderno y rápido

## 🎓 Objetivos de Aprendizaje

Después de revisar este proyecto, deberías poder:

1. ✅ Identificar cuándo usar el patrón Template Method
2. ✅ Implementar el patrón correctamente
3. ✅ Distinguir entre métodos abstractos, concretos y hooks
4. ✅ Entender los beneficios en mantenibilidad y extensibilidad
5. ✅ Aplicar principios SOLID con el patrón

## 🤝 Contribuir

Si encuentras errores o tienes sugerencias de mejora:

1. Haz un fork del proyecto
2. Crea una rama para tu feature
3. Haz commit de tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible para todos.

```
