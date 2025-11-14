import { useState } from "react";
import "./App.css";

type Section = "home" | "without" | "with" | "comparison" | "diagram";

function App() {
  const [currentSection, setCurrentSection] = useState<Section>("home");
  const [outputWithout, setOutputWithout] = useState<string>("");
  const [outputWith, setOutputWith] = useState<string>("");
  const [isRunning, setIsRunning] = useState(false);

  const runWithoutPattern = () => {
    setIsRunning(true);
    setOutputWithout("Ejecutando versión SIN patrón Template Method...\n\n");

    setTimeout(() => {
      import("./without-pattern/index").then((module) => {
        const originalLog = console.log;
        const originalError = console.error;
        let capturedOutput = "";

        console.log = (...args) => {
          capturedOutput += args.join(" ") + "\n";
          originalLog(...args);
        };
        console.error = (...args) => {
          capturedOutput += "❌ " + args.join(" ") + "\n";
          originalError(...args);
        };

        module.runWithoutPattern();

        console.log = originalLog;
        console.error = originalError;

        setOutputWithout(capturedOutput);
        setIsRunning(false);
      });
    }, 100);
  };

  const runWithPattern = () => {
    setIsRunning(true);
    setOutputWith("Ejecutando versión CON patrón Template Method...\n\n");

    setTimeout(() => {
      import("./with-pattern/index").then((module) => {
        const originalLog = console.log;
        const originalError = console.error;
        let capturedOutput = "";

        console.log = (...args) => {
          capturedOutput += args.join(" ") + "\n";
          originalLog(...args);
        };
        console.error = (...args) => {
          capturedOutput += "❌ " + args.join(" ") + "\n";
          originalError(...args);
        };

        module.runWithPattern();

        console.log = originalLog;
        console.error = originalError;

        setOutputWith(capturedOutput);
        setIsRunning(false);
      });
    }, 100);
  };

  const runComparison = () => {
    setIsRunning(true);
    setOutputWithout("Ejecutando SIN patrón...\n\n");
    setOutputWith("Ejecutando CON patrón...\n\n");

    setTimeout(() => {
      import("./without-pattern/index").then((module) => {
        const originalLog = console.log;
        const originalError = console.error;
        let capturedOutput = "";

        console.log = (...args) => {
          capturedOutput += args.join(" ") + "\n";
          originalLog(...args);
        };
        console.error = (...args) => {
          capturedOutput += "❌ " + args.join(" ") + "\n";
          originalError(...args);
        };

        module.runWithoutPattern();

        console.log = originalLog;
        console.error = originalError;

        setOutputWithout(capturedOutput);
      });

      import("./with-pattern/index").then((module) => {
        const originalLog = console.log;
        const originalError = console.error;
        let capturedOutput = "";

        console.log = (...args) => {
          capturedOutput += args.join(" ") + "\n";
          originalLog(...args);
        };
        console.error = (...args) => {
          capturedOutput += "❌ " + args.join(" ") + "\n";
          originalError(...args);
        };

        module.runWithPattern();

        console.log = originalLog;
        console.error = originalError;

        setOutputWith(capturedOutput);
        setIsRunning(false);
      });
    }, 100);
  };

  const handleNavigate = (section: Section) => {
    setCurrentSection(section);

    // Auto-ejecutar cuando navegamos a una sección
    if (section === "without") {
      runWithoutPattern();
    } else if (section === "with") {
      runWithPattern();
    } else if (section === "comparison") {
      runComparison();
    }
  };

  return (
    <div className="app">
      {/* Header con navegación */}
      <header className="header">
        <div className="header-content">
          <h1 className="main-title">🎓 Template Method Pattern</h1>
          <p className="subtitle">
            Caso de Estudio: Sistema de Procesamiento de Pedidos
          </p>
        </div>

        <nav className="navigation">
          <button
            className={`nav-btn ${currentSection === "home" ? "active" : ""}`}
            onClick={() => setCurrentSection("home")}
          >
            🏠 Inicio
          </button>
          <button
            className={`nav-btn ${
              currentSection === "without" ? "active" : ""
            }`}
            onClick={() => handleNavigate("without")}
            disabled={isRunning}
          >
            ❌ Sin Patrón
          </button>
          <button
            className={`nav-btn ${currentSection === "with" ? "active" : ""}`}
            onClick={() => handleNavigate("with")}
            disabled={isRunning}
          >
            ✅ Con Patrón
          </button>
          <button
            className={`nav-btn ${
              currentSection === "comparison" ? "active" : ""
            }`}
            onClick={() => handleNavigate("comparison")}
            disabled={isRunning}
          >
            ⚖️ Comparación
          </button>
          <button
            className={`nav-btn ${
              currentSection === "diagram" ? "active" : ""
            }`}
            onClick={() => setCurrentSection("diagram")}
          >
            📐 Diagrama UML
          </button>
        </nav>
      </header>

      {/* Contenido principal */}
      <main className="main-content">
        {/* HOME - Descripción del problema */}
        {currentSection === "home" && (
          <div className="home-section">
            <div className="hero">
              <h2>🎯 Caso de Estudio</h2>
              <p className="lead">
                Una empresa de comercio electrónico necesita implementar un
                sistema para procesar diferentes tipos de pedidos según el
                método de pago elegido por el cliente.
              </p>
            </div>

            <div className="problem-container">
              <div className="problem-card">
                <h3>📋 El Problema</h3>
                <p>El proceso general de todos los pedidos es similar:</p>
                <ol className="process-list">
                  <li>✅ Validar los datos del pedido</li>
                  <li>
                    📦 Verificar disponibilidad de productos en inventario
                  </li>
                  <li>💰 Calcular descuentos según el tipo de cliente</li>
                  <li>
                    💳 <strong>Procesar el pago</strong> (varía según el método)
                  </li>
                  <li>📄 Generar factura</li>
                  <li>📧 Notificar al cliente</li>
                </ol>
              </div>

              <div className="payment-methods">
                <h3>💳 Métodos de Pago Soportados</h3>
                <div className="methods-grid">
                  <div className="method-card">
                    <div className="method-icon">💳</div>
                    <h4>Tarjeta de Crédito</h4>
                    <p>Validación de límite de crédito</p>
                  </div>
                  <div className="method-card">
                    <div className="method-icon">💰</div>
                    <h4>PayPal</h4>
                    <p>Autorización mediante redirección</p>
                  </div>
                  <div className="method-card">
                    <div className="method-icon">🏦</div>
                    <h4>Transferencia Bancaria</h4>
                    <p>Generación de instrucciones</p>
                  </div>
                </div>
              </div>

              <div className="challenge-card">
                <h3>⚠️ Desafío</h3>
                <p>Sin un patrón de diseño adecuado, el código tendría:</p>
                <ul className="challenge-list">
                  <li>
                    🔄 <strong>Duplicación masiva:</strong> Los pasos 1, 2, 3, 5
                    y 6 se repetirían en cada procesador
                  </li>
                  <li>
                    🔧 <strong>Mantenimiento difícil:</strong> Cambiar la lógica
                    de descuentos requeriría modificar 3+ archivos
                  </li>
                  <li>
                    ⚠️ <strong>Inconsistencias:</strong> Alto riesgo de
                    comportamientos diferentes
                  </li>
                  <li>
                    📈 <strong>Baja escalabilidad:</strong> Agregar un nuevo
                    método de pago significa copiar ~120 líneas de código
                  </li>
                </ul>
              </div>

              <div className="solution-card">
                <h3>💡 Solución: Template Method</h3>
                <p>
                  El patrón Template Method resuelve este problema definiendo el
                  esqueleto del algoritmo en una clase base y permitiendo que
                  las subclases implementen solo los pasos específicos.
                </p>

                <div className="benefits-grid">
                  <div className="benefit">
                    <span className="benefit-icon">✨</span>
                    <span>Código limpio y sin duplicación</span>
                  </div>
                  <div className="benefit">
                    <span className="benefit-icon">🎯</span>
                    <span>Un solo punto de cambio</span>
                  </div>
                  <div className="benefit">
                    <span className="benefit-icon">🔒</span>
                    <span>Comportamiento consistente</span>
                  </div>
                  <div className="benefit">
                    <span className="benefit-icon">🚀</span>
                    <span>Fácil de extender</span>
                  </div>
                </div>

                <div className="cta">
                  <p>
                    👆 Usa la navegación superior para explorar las
                    implementaciones
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SIN PATRÓN */}
        {currentSection === "without" && (
          <div className="section-content">
            <div className="section-header">
              <h2>❌ Implementación Sin Patrón</h2>
              <p>Tres clases independientes con código duplicado</p>
            </div>

            <div className="problems-grid">
              <div className="problem-box">
                <h4>🔄 Código Duplicado</h4>
                <p>~180 líneas repetidas (40%)</p>
              </div>
              <div className="problem-box">
                <h4>🔧 Difícil Mantenimiento</h4>
                <p>3 puntos de modificación</p>
              </div>
              <div className="problem-box">
                <h4>⚠️ Alto Riesgo de Bugs</h4>
                <p>Inconsistencias entre clases</p>
              </div>
              <div className="problem-box">
                <h4>📈 Baja Escalabilidad</h4>
                <p>Copiar ~120 líneas por método</p>
              </div>
            </div>

            <div className="code-structure">
              <h3>📁 Estructura del Código</h3>
              <pre className="structure-tree">
                {`without-pattern/
├── CreditCardOrderProcessor.ts    (~120 líneas)
│   ├── validateOrder()             ← DUPLICADO
│   ├── checkInventory()            ← DUPLICADO
│   ├── calculateDiscount()         ← DUPLICADO
│   ├── processCreditCardPayment()
│   ├── generateInvoice()           ← DUPLICADO
│   └── notifyCustomer()            ← DUPLICADO
│
├── PayPalOrderProcessor.ts        (~120 líneas)
│   ├── validateOrder()             ← DUPLICADO
│   ├── checkInventory()            ← DUPLICADO
│   ├── calculateDiscount()         ← DUPLICADO
│   ├── processPayPalPayment()
│   ├── generateInvoice()           ← DUPLICADO
│   └── notifyCustomer()            ← DUPLICADO
│
└── BankTransferOrderProcessor.ts  (~120 líneas)
    ├── validateOrder()             ← DUPLICADO
    ├── checkInventory()            ← DUPLICADO
    ├── calculateDiscount()         ← DUPLICADO
    ├── processBankTransferPayment()
    ├── generateInvoice()           ← DUPLICADO
    └── notifyCustomer()            ← DUPLICADO`}
              </pre>
            </div>

            <div className="output-section">
              <h3>🖥️ Ejecución</h3>
              <div className="output-panel">
                <pre className="output-text">
                  {outputWithout ||
                    "Haz clic en 'Ejecutar' para ver el resultado..."}
                </pre>
              </div>
              <button
                className="execute-btn"
                onClick={runWithoutPattern}
                disabled={isRunning}
              >
                {isRunning ? "⏳ Ejecutando..." : "▶️ Ejecutar Sin Patrón"}
              </button>
            </div>
          </div>
        )}

        {/* CON PATRÓN */}
        {currentSection === "with" && (
          <div className="section-content">
            <div className="section-header">
              <h2>✅ Implementación Con Template Method</h2>
              <p>Código limpio con herencia y reutilización</p>
            </div>

            <div className="benefits-grid-section">
              <div className="benefit-box">
                <h4>✨ Sin Duplicación</h4>
                <p>0 líneas duplicadas</p>
              </div>
              <div className="benefit-box">
                <h4>🎯 Fácil Mantenimiento</h4>
                <p>1 punto de modificación</p>
              </div>
              <div className="benefit-box">
                <h4>🔒 Consistencia</h4>
                <p>Comportamiento uniforme</p>
              </div>
              <div className="benefit-box">
                <h4>🚀 Alta Escalabilidad</h4>
                <p>~30 líneas por método nuevo</p>
              </div>
            </div>

            <div className="pattern-diagram">
              <h3>🏗️ Arquitectura del Patrón</h3>
              <div className="diagram-box">
                <pre className="diagram-text">
                  {`         OrderProcessor (Abstract)
                 │
    ┌────────────┼────────────┐
    │            │            │
CreditCard   PayPal   BankTransfer
Processor   Processor   Processor

Template Method: processOrder()
├─ 1. validateOrder()        [Común ✓]
├─ 2. checkInventory()       [Común ✓]
├─ 3. calculateDiscount()    [Común ✓]
├─ 4. processPayment()       [Abstracto - Específico]
├─ 5. generateInvoice()      [Común ✓]
└─ 6. notifyCustomer()       [Común ✓]`}
                </pre>
              </div>
            </div>

            <div className="code-structure">
              <h3>📁 Estructura del Código</h3>
              <pre className="structure-tree">
                {`with-pattern/
├── OrderProcessor.ts               (~90 líneas)
│   ├── processOrder()              ← TEMPLATE METHOD
│   ├── validateOrder()             ← Común
│   ├── checkInventory()            ← Común
│   ├── calculateDiscount()         ← Común
│   ├── processPayment()            ← Abstracto
│   ├── generateInvoice()           ← Común
│   └── notifyCustomer()            ← Común
│
├── CreditCardOrderProcessor.ts     (~30 líneas)
│   └── processPayment()            ← Solo específico
│
├── PayPalOrderProcessor.ts         (~30 líneas)
│   └── processPayment()            ← Solo específico
│
└── BankTransferOrderProcessor.ts   (~30 líneas)
    └── processPayment()            ← Solo específico

Total: ~180 líneas vs ~360 líneas (50% menos código)`}
              </pre>
            </div>

            <div className="output-section">
              <h3>🖥️ Ejecución</h3>
              <div className="output-panel">
                <pre className="output-text">
                  {outputWith ||
                    "Haz clic en 'Ejecutar' para ver el resultado..."}
                </pre>
              </div>
              <button
                className="execute-btn success"
                onClick={runWithPattern}
                disabled={isRunning}
              >
                {isRunning ? "⏳ Ejecutando..." : "▶️ Ejecutar Con Patrón"}
              </button>
            </div>
          </div>
        )}

        {/* COMPARACIÓN */}
        {currentSection === "comparison" && (
          <div className="section-content">
            <div className="section-header">
              <h2>⚖️ Comparación Lado a Lado</h2>
              <p>Ejecución simultánea de ambas implementaciones</p>
            </div>

            <div className="metrics-comparison">
              <div className="metric-card">
                <h4>Líneas de Código</h4>
                <div className="metric-values">
                  <span className="value-bad">~360</span>
                  <span className="vs">vs</span>
                  <span className="value-good">~180</span>
                </div>
                <p className="metric-result">50% menos código</p>
              </div>

              <div className="metric-card">
                <h4>Código Duplicado</h4>
                <div className="metric-values">
                  <span className="value-bad">180 líneas</span>
                  <span className="vs">vs</span>
                  <span className="value-good">0 líneas</span>
                </div>
                <p className="metric-result">100% eliminado</p>
              </div>

              <div className="metric-card">
                <h4>Puntos de Cambio</h4>
                <div className="metric-values">
                  <span className="value-bad">3 archivos</span>
                  <span className="vs">vs</span>
                  <span className="value-good">1 archivo</span>
                </div>
                <p className="metric-result">67% más fácil</p>
              </div>

              <div className="metric-card">
                <h4>Nuevo Método de Pago</h4>
                <div className="metric-values">
                  <span className="value-bad">~120 líneas</span>
                  <span className="vs">vs</span>
                  <span className="value-good">~30 líneas</span>
                </div>
                <p className="metric-result">75% menos esfuerzo</p>
              </div>
            </div>

            <div className="comparison-outputs">
              <div className="output-column">
                <h3>❌ Sin Patrón</h3>
                <div className="output-panel">
                  <pre className="output-text">
                    {outputWithout || "Ejecutando..."}
                  </pre>
                </div>
              </div>

              <div className="output-column">
                <h3>✅ Con Patrón</h3>
                <div className="output-panel">
                  <pre className="output-text">
                    {outputWith || "Ejecutando..."}
                  </pre>
                </div>
              </div>
            </div>

            <button
              className="execute-btn comparison"
              onClick={runComparison}
              disabled={isRunning}
            >
              {isRunning ? "⏳ Ejecutando..." : "▶️ Ejecutar Comparación"}
            </button>
          </div>
        )}

        {/* DIAGRAMA UML */}
        {currentSection === "diagram" && (
          <div className="section-content">
            <div className="section-header">
              <h2>📐 Diagrama de Clases UML</h2>
              <p>Arquitectura completa del patrón Template Method</p>
            </div>

            <div className="uml-container">
              <div className="uml-diagram">
                <pre className="uml-text">
                  {`┌─────────────────────────────────────────┐
│   «abstract»                            │
│   OrderProcessor                        │
├─────────────────────────────────────────┤
│ # order: Order                          │
│ # customer: Customer                    │
├─────────────────────────────────────────┤
│ + processOrder(): void          [🎯 Template Method]
│ # validateOrder(): boolean      [✓ Concrete]
│ # checkInventory(): boolean     [✓ Concrete]
│ # calculateDiscount(): number   [✓ Concrete]
│ # processPayment(): void        [⚪ Abstract]
│ # generateInvoice(): void       [✓ Concrete]
│ # notifyCustomer(): void        [✓ Concrete]
│ # sendConfirmation(): void      [⚪ Abstract]
└─────────────────────────────────────────┘
                   △
                   │
         ┌─────────┼─────────┐
         │         │         │
┌────────┴───┐ ┌───┴────┐ ┌──┴─────────┐
│CreditCard  │ │PayPal  │ │BankTransfer│
│Processor   │ │Processor│ │Processor   │
├────────────┤ ├────────┤ ├────────────┤
│+process    │ │+process│ │+process    │
│ Payment()  │ │ Payment│ │ Payment()  │
│+send       │ │+send   │ │+send       │
│ Confirm()  │ │ Confirm│ │ Confirm()  │
└────────────┘ └────────┘ └────────────┘`}
                </pre>
              </div>

              <div className="method-types">
                <h3>Tipos de Métodos</h3>
                <div className="method-grid">
                  <div className="method-type">
                    <span className="icon">🎯</span>
                    <h4>Template Method</h4>
                    <p>
                      <code>processOrder()</code>
                    </p>
                    <p className="desc">Define el algoritmo completo</p>
                  </div>
                  <div className="method-type">
                    <span className="icon">✓</span>
                    <h4>Métodos Concretos</h4>
                    <p>
                      <code>validateOrder()</code>
                    </p>
                    <p>
                      <code>checkInventory()</code>
                    </p>
                    <p>
                      <code>calculateDiscount()</code>
                    </p>
                    <p className="desc">Implementados en clase base</p>
                  </div>
                  <div className="method-type">
                    <span className="icon">⚪</span>
                    <h4>Métodos Abstractos</h4>
                    <p>
                      <code>processPayment()</code>
                    </p>
                    <p>
                      <code>sendConfirmation()</code>
                    </p>
                    <p className="desc">Implementados por subclases</p>
                  </div>
                </div>
              </div>

              <div className="execution-flow">
                <h3>Flujo de Ejecución</h3>
                <ol className="flow-list">
                  <li>
                    <strong>processOrder()</strong> - Método plantilla inicia
                  </li>
                  <li>
                    <strong>validateOrder()</strong> - Validación común
                  </li>
                  <li>
                    <strong>checkInventory()</strong> - Verificación común
                  </li>
                  <li>
                    <strong>calculateDiscount()</strong> - Cálculo común
                  </li>
                  <li>
                    <strong>processPayment()</strong> - ⚡ Implementación
                    específica
                  </li>
                  <li>
                    <strong>generateInvoice()</strong> - Generación común
                  </li>
                  <li>
                    <strong>sendConfirmation()</strong> - ⚡ Implementación
                    específica
                  </li>
                  <li>
                    <strong>notifyCustomer()</strong> - Notificación común
                  </li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>🎓 Ejemplo educativo del patrón Template Method | 2025</p>
      </footer>
    </div>
  );
}

export default App;
