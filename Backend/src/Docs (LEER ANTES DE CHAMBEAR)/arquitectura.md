# Arquitectura del Proyecto

Este sistema backend está diseñado utilizando el framework Spring Boot, estructurado por dominio para promover la modularidad y la mantenibilidad.

## Estructura general

El proyecto sigue una arquitectura monolítica modularizada. Cada módulo representa un dominio funcional específico (Curso, Usuario, etc.).

### Tecnologías utilizadas
- **Java 17**
- **Spring Boot**
- **Spring Data JPA**
- **Postgre-SQL**
- **Lombok**
- **Maven**

### Organización por paquetes

- `controller` – Define los endpoints REST.
- `service` – Contiene la lógica de negocio.
- `repository` – Interfaces para el acceso a datos.
- `model` – Entidades JPA que representan las tablas.
- `DataTransferObjects` – DTOs usados para entrada y salida de datos.

## Flujo de solicitud

1. El cliente realiza una solicitud HTTP a través de un controlador (`@RestController`).
2. El controlador delega la lógica al servicio correspondiente.
3. El servicio interactúa con el repositorio si es necesario acceder a la base de datos.
4. La respuesta se construye y se devuelve al cliente.
5. 