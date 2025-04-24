# Convenciones del Proyecto

## Nomenclatura

- Clases de controlador terminan con `Controller`.
- Servicios terminan con `Servicio`.
- Repositorios terminan con `Repository`.
- DTOs terminan con `DTO`.
- Paquetes en minúsculas.
- Entidades en singular: `Curso`, `Usuario`.

## Organización de paquetes

El proyecto está estructurado por dominio funcional. Cada dominio contiene:
- `controller`
- `service`
- `repository`
- `model`
- `dto` o `DataTransferObjects`

## Estilo de código

- Uso de anotaciones de Lombok para reducir código repetitivo.
- Inyección de dependencias con `@Autowired`.
- Mapeo de relaciones entre entidades usando JPA.
- Manejo de datos sensibles o complejos mediante DTOs.

## Buenas prácticas

- No exponer entidades directamente en los controladores.
- Usar DTOs para entrada y salida de datos.
- Validar los datos de entrada con `@Valid` (opcional para futuras mejoras).