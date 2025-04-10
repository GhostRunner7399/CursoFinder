# Decisiones Técnicas

Este documento resume las decisiones clave tomadas durante el desarrollo del backend.

## 1. Spring Boot como framework principal
- Se eligió Spring Boot por su integración completa con JPA, seguridad, controladores REST y su comunidad robusta.

## 2. Separación por dominio
- Cada módulo funcional (Curso, Usuario, Matricula) está separado en paquetes para mantener independencia lógica y facilitar el mantenimiento.

## 3. Uso de DTOs
- Se usan Data Transfer Objects para desacoplar las entidades del modelo de datos de la estructura expuesta por la API REST.

## 4. Lombok
- Se utiliza Lombok para generar automáticamente getters, setters, y constructores, reduciendo el boilerplate.

## 5. JPA/Hibernate
- La persistencia de datos se gestiona con Spring Data JPA, utilizando anotaciones estándar para relaciones y mapeo de entidades.

## 6. Estilo RESTful
- Todos los controladores siguen una convención REST clara basada en recursos, evitando verbos en las rutas.

## 7. Mapeo explícito de relaciones
- Se implementan relaciones bidireccionales donde es necesario y se manejan las cascadas con precisión para evitar errores de integridad.