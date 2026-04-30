# TimberStock API - Control de Inventario y Cubicación

## Descripción del Proyecto

TimberStock es una API RESTful diseñada para optimizar el control de stock en aserraderos de madera dimensionada. El
sistema resuelve la problemática del cálculo manual de metros cúbicos ($m^3$) y la falta de visibilidad del inventario
diario, permitiendo registrar la producción de paquetes de madera, obtener métricas de volumen automáticas y trazabilidad de
los movimientos de stock.

## Justificación Técnica

Este proyecto utiliza **Node.js** y **Express** por las siguientes razones:

- **Escalabilidad:** Capacidad para manejar múltiples registros de producción en tiempo real.
- **Eficiencia:** Procesamiento asíncrono para el cálculo automático de cubicación antes de la persistencia de datos.
- **Flexibilidad:** Uso de archivos JSON para una estructura de datos ligera y fácil de migrar a bases de datos
  relacionales en el futuro.
- **Middleware de Validación:** Implementación de capas intermedias para asegurar la integridad de los datos de entrada
  antes de ser procesados por la lógica de negocio.

## Características Principales

- **Cálculo Automático:** La API recibe dimensiones y cantidad, calculando instantáneamente los $m^3$.
- **Reportes Diarios:** Capacidad de filtrar la producción total por fecha.
- **Gestión de Estados:** Control de stock desde la producción hasta la venta final.

## Lógica de Negocio

La API automatiza el proceso de ingreso mediante:

1. **Asignación Automática de Stack:** Basado en la dimensión, el sistema asigna el ancho y alto estándar del paquete.
2. **Cálculo de Unidades:** `unit_count = stack_width * stack_height`.
3. **Cálculo de Volumen ($m^3$):** Se extraen las medidas de la dimensión y se multiplican por el total de unidades para
   obtener el metraje cúbico exacto.

## Instalación y Configuración

### Requisitos

- Node.js (versión 16 o superior)
- npm

### Pasos

1. Clonar el repositorio.
2. Instalar dependencias:

```bash
npm install
```

### Ejecutar en modo desarrollo

   ```bash
   npm run dev
   ```

### Ejecutar en modo producción

   ```bash
   npm start
   ```

## API Endpoints

### Inventario (`/api/inventory`)

| Método     | Endpoint                     | Descripción                                                           |
|:-----------|:-----------------------------|:----------------------------------------------------------------------|
| **GET**    | `/api/inventory`             | Obtiene el inventario completo.                                       |
| **GET**    | `/api/inventory/:id`         | Obtiene el detalle de un paquete específico por ID.                    |
| **POST**   | `/api/inventory`             | Registra un nuevo paquete (calcula $m^3$ automáticamente).            |
| **PATCH**  | `/api/inventory/:id/status`  | Actualiza el estado de un stack (`Disponible`, `Vendido`, `Reservado`). |
| **DELETE** | `/api/inventory/:id`         | Elimina un registro del inventario.                                   |

### Stock (`/api/stock`)

| Método     | Endpoint         | Descripción                                                                          |
|:-----------|:-----------------|:-------------------------------------------------------------------------------------|
| **GET**    | `/api/stock`     | Obtiene un resumen consolidado agrupado por dimensiones, estado y configuración de stack. |

## Estructura de Datos (JSON)

### Registro de Inventario
Cada registro en `inventory.json` cuenta con las siguientes propiedades:

- `id`: Identificador único numérico.
- `dimensions`: Medidas nominales (Espesor x Ancho x Largo).
- `stack_width`: Piezas por fila.
- `stack_height`: Piezas por columna.
- `unit_count`: Total de piezas en el paquete (`stack_width` * `stack_height`).
- `total_cubic_meters`: Volumen total en $m^3$ (calculado con precisión).
- `production_date`: Fecha y hora de ingreso (ISO 8601 local).
- `status`: Estado actual (`Disponible`, `Vendido`, `Reservado`).

### Resumen de Stock
El archivo `stock.json` se genera automáticamente y agrupa por:
- `dimensions`, `status`, `stack_width` y `stack_height`.
- Incluye contadores de `total_packages`, `total_m3` y `total_units`.

## Manejo de Errores

La API implementa códigos de estado HTTP estándar para asegurar una integración robusta:

- `200 OK`: Petición exitosa.
- `201 Created`: Recurso creado exitosamente.
- `400 Bad Request`: Datos de entrada inválidos o faltantes.
- `404 Not Found`: El paquete solicitado no existe.
- `500 Internal Server Error`: Error inesperado en el servidor.

---