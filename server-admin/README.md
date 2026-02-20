# Kinal Sports - Administration Server

> **Nota**: Este proyecto fue desarrollado con fines didácticos como parte de un curso de arquitectura de microservicios. Forma parte de una serie de servicios independientes que conforman la aplicación completa "Kinal Sports".

## Descripción

Microservicio de administración para la plataforma Kinal Sports. Este servicio maneja la gestión de campos deportivos, reservas de canchas, equipos deportivos y torneos. Proporciona una API RESTful completa para la administración de las instalaciones deportivas.

Implementa arquitectura modular con Express.js y MongoDB como base de datos.

## Funcionalidades Principales

### Gestión de Campos Deportivos
- Creación y actualización de campos con imágenes
- Consulta de campos disponibles
- Activación/desactivación de campos
- Validación de datos de campos
- Almacenamiento de imágenes en Cloudinary

### Gestión de Reservas
- Consulta de reservas por estado y filtros
- Confirmación de reservas
- Cancelación de reservas
- Validación de conflictos de horarios
- Verificación de disponibilidad de campos

### Gestión de Equipos
- Registro de equipos deportivos con logo
- Actualización de información de equipos
- Gestión de managers de equipos
- Cambio de estado de equipos (activo/inactivo)
- Consulta de equipos por filtros

### Gestión de Torneos
- Creación y actualización de torneos
- Consulta de torneos activos
- Cambio de estado de torneos
- Eliminación lógica de torneos
- Sistema de participación de equipos

### Seguridad
- Validación JWT para rutas protegidas
- Rate limiting por endpoint
- Protección con Helmet
- CORS configurado
- Validación de datos con express-validator
- Manejo global de errores

## Tecnologías Utilizadas

### Backend
- **Framework**: Express.js 5.x
- **Runtime**: Node.js
- **Lenguaje**: JavaScript (ES6 Modules)

### Base de Datos
- **ODM**: Mongoose 9.x
- **Base de Datos**: MongoDB
- **Esquemas**: Validación con Mongoose Schemas

### Seguridad
- **JWT**: jsonwebtoken
- **Headers**: helmet
- **CORS**: cors
- **Rate Limiting**: express-rate-limit

### Servicios Externos
- **Almacenamiento**: Cloudinary (imágenes de campos y equipos)
- **File Upload**: Multer con multer-storage-cloudinary

### Validación y Logging
- **Validación**: express-validator
- **Logging**: Morgan
- **UUID**: uuid v13

### Utilidades
- **Variables de entorno**: dotenv
- **Desarrollo**: nodemon

## Endpoints API

Base URL: `http://localhost:{PORT}/kinalSports/v1`

### Campos Deportivos (`/fields`)

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `GET` | `/fields` | Obtener todos los campos | No |
| `GET` | `/fields/:id` | Obtener campo por ID | No |
| `POST` | `/fields` | Crear nuevo campo (con imagen) | Sí |
| `PUT` | `/fields/:id` | Actualizar campo | Sí |
| `PUT` | `/fields/:id/activate` | Activar campo | Sí |
| `PUT` | `/fields/:id/deactivate` | Desactivar campo | Sí |

### Reservas (`/reservations`)

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `GET` | `/reservations` | Obtener reservas con filtros | Sí |
| `GET` | `/reservations/:id` | Obtener reserva por ID | Sí |
| `PUT` | `/reservations/:id/confirm` | Confirmar reserva | Sí |
| `PUT` | `/reservations/:id/cancel` | Cancelar reserva | Sí |

### Equipos (`/teams`)

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `GET` | `/teams` | Obtener todos los equipos | No |
| `GET` | `/teams/:id` | Obtener equipo por ID | No |
| `POST` | `/teams` | Crear nuevo equipo (con logo) | Sí |
| `PUT` | `/teams/:id` | Actualizar equipo | Sí |
| `PUT` | `/teams/:id/activate` | Activar equipo | Sí |
| `PUT` | `/teams/:id/deactivate` | Desactivar equipo | Sí |
| `PUT` | `/teams/:id/manager` | Cambiar manager del equipo | Sí |

### Torneos (`/tournaments`)

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `GET` | `/tournaments` | Obtener todos los torneos | No |
| `GET` | `/tournaments/:id` | Obtener torneo por ID | No |
| `POST` | `/tournaments` | Crear nuevo torneo | Sí |
| `PUT` | `/tournaments/:id` | Actualizar torneo | Sí |
| `PUT` | `/tournaments/:id/start` | Iniciar torneo | Sí |
| `PUT` | `/tournaments/:id/finish` | Finalizar torneo | Sí |
| `DELETE` | `/tournaments/:id` | Eliminar torneo | Sí |

### Salud (`/health`)

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `GET` | `/health` | Estado del servicio | No |

### Modelos de Request

#### Crear Campo (`POST /fields`)
```json
{
  "name": "Cancha Principal",
  "description": "Cancha de fútbol profesional",
  "type": "futbol",
  "capacity": 100,
  "pricePerHour": 150.00,
  "image": "archivo.jpg" // form-data
}
```

#### Crear Equipo (`POST /teams`)
```json
{
  "name": "Tigres FC",
  "managerId": "user-id-123",
  "members": ["userId1", "userId2"],
  "category": "Senior",
  "description": "Equipo profesional",
  "logo": "archivo.jpg" // form-data
}
```

#### Confirmar Reserva (`PUT /reservations/:id/confirm`)
```json
{
  "date": "2026-03-15",
  "startTime": "10:00",
  "endTime": "12:00",
  "fieldId": "field-id-123"
}
```

#### Crear Torneo (`POST /tournaments`)
```json
{
  "name": "Copa Primavera 2026",
  "description": "Torneo de temporada primavera",
  "startDate": "2026-04-01",
  "endDate": "2026-05-30",
  "category": "Senior",
  "maxTeams": 16,
  "registrationDeadline": "2026-03-25"
}
```

## 📁 Estructura del Proyecto

```
server-admin/
├── configs/
│   ├── app.js                        # Configuración principal del servidor
│   ├── cors.configuration.js         # Configuración de CORS
│   ├── db.js                         # Conexión a MongoDB
│   ├── helmet.configuration.js       # Configuración de Helmet
│   └── rateLimit.configuration.js    # Rate limiting
│
├── middlewares/
│   ├── check-validators.js           # Verificación de validadores
│   ├── delete-file-on-error.js       # Limpieza de archivos en errores
│   ├── field-validator.js            # Validadores de campos
│   ├── file-uploader.js              # Subida de archivos a Cloudinary
│   ├── handle-errors.js              # Manejo global de errores
│   ├── reservation-conflict.js       # Validación de conflictos de reservas
│   ├── reservation-time-validation.js # Validación de horarios
│   ├── reservation-validators.js     # Validadores de reservas
│   ├── team-validators.js            # Validadores de equipos
│   ├── tournament-validators.js      # Validadores de torneos
│   ├── validate-JWT.js               # Validación de tokens JWT
│   └── validate-role.js              # Validación de roles
│
├── src/
│   ├── fields/                       # Módulo de campos deportivos
│   │   ├── field.controller.js       # Controladores
│   │   ├── field.model.js            # Modelo de datos
│   │   ├── field.routes.js           # Rutas
│   │   └── field.service.js          # Lógica de negocio
│   │
│   ├── reservations/                 # Módulo de reservas
│   │   ├── reservation.controller.js
│   │   ├── reservation.model.js
│   │   ├── reservation.routes.js
│   │   └── reservation.service.js
│   │
│   ├── teams/                        # Módulo de equipos
│   │   ├── team.controller.js
│   │   ├── team.model.js
│   │   ├── team.routes.js
│   │   └── team.service.js
│   │
│   └── tournaments/                  # Módulo de torneos
│       ├── tournaments.controller.js
│       ├── tournaments.model.js
│       ├── tournaments.routes.js
│       └── tournaments.service.js
│
├── helpers/                          # Utilidades generales
├── index.js                          # Punto de entrada
├── package.json                      # Dependencias y scripts
├── pnpm-lock.yaml                    # Lock file de pnpm
└── README.md
```

## Configuración

### Requisitos Previos
- Node.js 18+ (recomendado Node.js 20+)
- pnpm 10+ (Package Manager)
- MongoDB 6+
- Cuenta de Cloudinary (para almacenamiento de imágenes)

### Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
# Servidor
PORT=3000

# Base de Datos
MONGO_URI=mongodb://localhost:27017/kinal_sports_admin

# JWT
JWT_SECRET=tu-secreto-jwt-seguro-aqui
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Instalación

1. **Clonar el repositorio**
```bash
cd server-admin
```

2. **Instalar dependencias con pnpm**
```bash
pnpm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

4. **Iniciar MongoDB**
```bash
# Usando Docker
docker-compose up -d

# O iniciar el servicio local
sudo systemctl start mongod
```

5. **Ejecutar en modo desarrollo**
```bash
pnpm run dev
```

El servidor estará disponible en `http://localhost:3000` (o el puerto configurado)

### Scripts Disponibles

```bash
# Desarrollo con hot reload
pnpm run dev

# Producción
node index.js
```

## Arquitectura

El proyecto sigue una arquitectura modular por características:

- **configs/**: Configuraciones centralizadas del servidor
- **middlewares/**: Middlewares reutilizables (validación, autenticación, errores)
- **src/**: Módulos funcionales organizados por dominio
  - Cada módulo contiene: model, controller, service, routes
  - Separación clara de responsabilidades
- **helpers/**: Utilidades y funciones auxiliares

## Validaciones

El servidor implementa múltiples capas de validación:

1. **Validación de esquemas** (Mongoose Schemas)
2. **Validación de entrada** (express-validator)
3. **Validación de conflictos** (reservas, horarios)
4. **Validación JWT** (autenticación)
5. **Validación de roles** (autorización)

## Manejo de Errores

Sistema centralizado de manejo de errores:

- **Errores de validación**: 400 Bad Request
- **Errores de autenticación**: 401 Unauthorized
- **Errores de autorización**: 403 Forbidden
- **Recursos no encontrados**: 404 Not Found
- **Conflictos**: 409 Conflict
- **Errores del servidor**: 500 Internal Server Error

## Integración con Microservicios

Este servicio se integra con:

- **Authentication Service**: Validación de tokens JWT
- **PostgreSQL Database**: Base de datos de usuarios (indirecta)
- **MongoDB**: Base de datos propia del servicio
- **Cloudinary**: Almacenamiento de imágenes

## Seguridad

### Medidas Implementadas

- ✅ Helmet para headers de seguridad
- ✅ CORS configurado con orígenes permitidos
- ✅ Rate limiting para prevenir abuso
- ✅ Validación JWT en rutas protegidas
- ✅ Validación de roles y permisos
- ✅ Sanitización de entradas
- ✅ Límite de tamaño de payload (10mb)
- ✅ Validación de tipos de archivo
- ✅ Manejo seguro de errores (sin exposición de stack traces)

## Testing

```bash
# Placeholder para futuros tests
pnpm test
```

## Health Check

Verificar el estado del servidor:

```bash
curl http://localhost:3000/kinalSports/v1/health
```

Respuesta esperada:
```json
{
  "status": "healthy",
  "service": "Kinal Sports Admin Server"
}
```

## Contribución

Este proyecto es parte de un curso educativo. Desarrollo y contribuciones por:

- **Autor**: Braulio Echeverría
- **Curso**: IN6AV - Kinal Guatemala 2026
- **Catedrático**: PEM

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## Notas del Proyecto

- ✨ Proyecto desarrollado con fines educativos
- 🎓 Parte del curso de arquitectura de microservicios
- 🏗️ Implementa patrones de diseño y mejores prácticas
- 🔧 Preparado para entorno de producción con configuraciones adecuadas
- 📚 Documentación completa para aprendizaje

## Recursos Adicionales

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [JWT Best Practices](https://jwt.io/introduction)

---

**Kinal Sports** - Sistema de Gestión Deportiva
Desarrollado por Braulio Echeverría - IN6AV 2026
