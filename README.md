# Conversor de Monedas

Este proyecto es una aplicación web interactiva desarrollada en JavaScript que permite calcular la conversión de un monto en Pesos Chilenos (CLP) a distintas monedas e indicadores económicos (Dólar, Euro, UF) consultando la API en tiempo real de mindicador.cl. Además, renderiza un gráfico interactivo con el historial de la moneda seleccionada durante los últimos 10 días.

---

## Descripción de la Solución

1. Consumo de API (Fetch API + async/await):
   - Se realiza una petición a https://mindicador.cl/api/{tipo_moneda} para obtener el valor actualizado y la serie histórica.

2. Manejo de Errores (try...catch):
   - Se implementa control de excepciones para capturar fallos en la red o respuestas no válidas de la API, desplegando un mensaje de error directo en la interfaz sin romper la ejecución.

3. Cálculo y Renderizado:
   - Se valida la entrada del usuario y se calcula el valor equivalente dividiendo el monto en CLP entre el valor del indicador más reciente (data.serie[0].valor).

4. Gráfico Histórico (Chart.js):
   - Se obtienen los primeros 10 registros del arreglo serie, se invierte su orden para organizarlos de manera cronológica y se visualizan en un gráfico de líneas (<canvas>). Se gestiona la destrucción previa de la instancia del gráfico para evitar duplicados al seleccionar otra moneda.

---

## Tabla de Cumplimiento de Requerimientos

| Requerimiento | Puntaje | Estado |
| :--- | :---: | :---: |
| Obtención de tipos de cambio desde mindicador.cl con fetch | 1 pt | Cumplido |
| Cálculo correcto del cambio renderizado en el DOM | 3 pts | Cumplido |
| Implementación de múltiples monedas en el select | 3 pts | Cumplido |
| Uso de try...catch y despliegue de errores en el DOM | 2 pts | Cumplido |
| Gráfico de historial de los últimos 10 días (Chart.js) | 1 pt | Cumplido |

---

## Estructura del Proyecto

```text
.
├── index.html     # Estructura HTML5, formulario y canvas para gráfico
├── style.css      # Estilos visuales con interfaz oscura (Dark Theme)
└── script.js      # Lógica de conversión, consumo de API, control de errores y Chart.js
