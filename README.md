# Spike 2: Estado Reactivo Local y Binding de UI

Este repositorio contiene el segundo **Spike** de investigación para el proyecto **Colectividad Helénica Resistencia**. Luego de validar la arquitectura *E2E* en el primer spike, este sandbox se enfoca exclusivamente en la capa de presentación, explorando las capacidades de **Angular Signals** para gestionar la reactividad local del componente.

**Objetivo**
Validar empíricamente el uso de la API de **Angular Signals** (`signal`, `computed`, `effect`) como el mecanismo principal para la gestión de estados locales y la sincronización de *bindings* de interfaz de usuario. El propósito es asegurar un desacoplamiento efectivo entre la lógica de estado y la representación en el *template*, optimizando el ciclo de detección de cambios.

**Alcance y Casos de Uso**
El spike se centra en replicar el ciclo de vida del botón **Call-to-Action (CTA)** de afiliación, implementando una máquina de estados local que atraviesa tres etapas:
1.  **Estado Inicial (Idle):** Botón de afiliación prominente.
2.  **Estado Pendiente (Pending):** Tras la interacción, el botón cambia a un estado de "Cancelar" con estilos visuales atenuados y mensajes de confirmación.
3.  **Reversión de Estado:** Validación de la lógica de retorno al estado inicial mediante reactividad declarativa.

**Conceptos Técnicos Investigados**
* **Angular Signals:** Uso de `WritableSignal` para estados mutables y `computed()` para derivar automáticamente propiedades de la UI (textos, colores y clases).
* **Modern Control Flow:** Implementación de la nueva sintaxis de Angular (`@if` / `@else`) para el renderizado condicional de elementos.
* **Integración con Ionic:** Binding dinámico de **CSS Custom Properties** y directivas de componentes (`[color]`, `[fill]`) basados en el estado del *signal*.
* **Interpolación CSS:** Uso de transiciones para cambios de estado suaves y visualmente coherentes.

## Arquitectura y Decisiones
A diferencia del Spike anterior, este entorno es puramente *Frontend*. Se omite la integración con el backend para priorizar la velocidad de experimentación en la lógica de componentes.
* **Simulación de Datos:** Uso de archivos JSON locales en `assets/mock/` para emular respuestas de API.
* **Enfoque Declarativo:** Se prioriza el uso de *Signals* sobre la gestión manual de suscripciones con RxJS (`BehaviorSubject`), siguiendo las recomendaciones actuales de arquitectura para Angular.

## Conclusiones y Cuarentena
Este laboratorio sirve como base para definir el estándar de desarrollo de componentes en el MVP. Se documentará la fricción encontrada con la detección de cambios de Ionic y la eficiencia de `computed()` para resolver lógicas de UI complejas sin efectos secundarios imprevistos.
