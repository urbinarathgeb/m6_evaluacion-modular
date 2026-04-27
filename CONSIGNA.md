# Evaluación final del módulo 6

## Aplicación API RESTful

### Objetivo

Desarrollar una API RESTful funcional que resuelva una problemática

### Descripción

Los estudiantes deberán ser capaces de integrar los conocimientos vistos en clase construyendo una API RESTful que resuelva alguna problemática.

### Instrucciones

- Desarrollar la descripción del proyecto.
- Justificación del proyecto.
- Creación del proyecto en `Node.js` y `Express`.
- Generación de archivos `JSON`.
- Implementar métodos `HTTP`.
- Manejar códigos HTTP y errores.

### Instrucciones específicas

#### 1- Descripción del proyecto en slides

- Explicar qué problema resuelva la API.
- Temática libre: tienda, productos, jugadores de fútbol, películas, etc.

#### 2- Justificación del proyecto en slides

- Fundamentar el uso de `Node.js` y `Express`.

#### 3- Creación del proyecto en Node.js y Express

- Configurar el proyecto en modo desarrollo y producción.
- Incluir archivo package.json.

#### 4- Generación de archivo de datos JSON

- Incluir archivo `JSON` que contenga información de base de datos con la que se trabajará la API. Es importante que tengan el campo `id` y como mínimo 5 campos.

#### 5- Implementar métodos HTTP y explicarlos en slides

- Dos métodos `GET`: Obtener todos los elementos del `JSON` (o parte de ellos como los 10 primeros) y otro para obtener un elemento específico con el `id`.
- Método `POST`para agregar nuevos elementos al archivo `JSON`.
- Método `DELETE`para eliminar un elemento.

#### 6- Manejo de códigos HTTP

- Agregar códigos de estado `HTTP` `res.status()` en cada uno de los métodos.
- Implementar manejo de errores con `try...catch` / `if...else` para registrar errores en consola.