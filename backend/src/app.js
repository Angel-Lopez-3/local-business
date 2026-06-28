import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.routes.js";
import roleRoutes from "./routes/role.routes.js";
import userRoutes from "./routes/user.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import sectorRoutes from "./routes/sector.routes.js";
import businessRoutes from "../src/routes/business.routes.js";
import businessImageRoutes from "../src/routes/business-image.routes.js";
import favoriteRoutes from "./routes/favorite.routes.js";
import reviewsRoutes from "./routes/review.routes.js";
import reportRoutes from "./routes/report.routes.js";
import serviceRoutes from "./routes/service.routes.js";

import { errorHandler } from "./middlewares/error.middleware.js";

/*
|--------------------------------------------------------------------------
| PARCHE GLOBAL PARA BIGINT
|--------------------------------------------------------------------------
| Prisma devuelve los campos BIGINT como tipo BigInt de JavaScript.
| JSON no sabe serializar BigInt automáticamente.
|
| Este parche convierte cualquier BigInt a string al enviar respuestas.
|
| Ejemplo:
|   1n -> "1"
*/
BigInt.prototype.toJSON = function () {
   return this.toString();
};

/*
|--------------------------------------------------------------------------
| INSTANCIA PRINCIPAL DE EXPRESS
|--------------------------------------------------------------------------
| Punto central de la aplicación.
| Aquí se registran:
|
| - Middlewares globales
| - Archivos estáticos
| - Rutas de la API
| - Manejo global de errores
*/
const app = express();

/*
|--------------------------------------------------------------------------
| MIDDLEWARES GLOBALES
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| HELMET
|--------------------------------------------------------------------------
| Agrega cabeceras HTTP de seguridad.
|
| Protege contra:
| - Clickjacking
| - Algunas formas de XSS
| - Sniffing de contenido
| - Exposición innecesaria de información del servidor
*/
app.use(helmet());

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
| Permite solicitudes desde el frontend.
|
| origin:
|   URL autorizada para consumir la API.
|
| credentials:
|   Permite envío de cookies y credenciales.
*/
app.use(
   cors({
      origin: "http://localhost:5173",
      credentials: true,
   })
);

/*
|--------------------------------------------------------------------------
| MORGAN
|--------------------------------------------------------------------------
| Logger HTTP.
|
| Muestra en consola:
| - Método HTTP
| - Ruta
| - Código de respuesta
| - Tiempo de ejecución
|
| Muy útil durante desarrollo.
*/
app.use(morgan("dev"));

/*
|--------------------------------------------------------------------------
| EXPRESS.JSON
|--------------------------------------------------------------------------
| Convierte automáticamente el body JSON
| recibido en req.body.
|
| Ejemplo:
| {
|   email: "...",
|   password: "..."
| }
*/
app.use(express.json());

/*
|--------------------------------------------------------------------------
| COOKIE PARSER
|--------------------------------------------------------------------------
| Permite leer cookies desde req.cookies.
|
| Se utiliza principalmente para:
| - Refresh Tokens
| - Sesiones futuras
| - Cookies seguras
*/
app.use(cookieParser());

/*
|--------------------------------------------------------------------------
| ARCHIVOS ESTÁTICOS
|--------------------------------------------------------------------------
| Expone públicamente la carpeta uploads.
|
| Ejemplo:
| uploads/users/profiles/foto.jpg
|
| Se podrá acceder mediante:
| /uploads/users/profiles/foto.jpg
*/
app.use(
   "/uploads",
   express.static(
      path.join(
         process.cwd(),
         "uploads"
      )
   )
);

/*
|--------------------------------------------------------------------------
| RUTAS DE LA API
|--------------------------------------------------------------------------
| Cada módulo registra aquí sus endpoints.
*/
app.use("/api/auth", authRoutes);

app.use("/api/roles", roleRoutes);

app.use("/api/users", userRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/sectors", sectorRoutes);

app.use("/api/businesses", businessRoutes);
app.use("/api/business-images", businessImageRoutes);
app.use("/api/favorites",favoriteRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/services",serviceRoutes);



/*
|--------------------------------------------------------------------------
| MANEJADOR GLOBAL DE ERRORES
|--------------------------------------------------------------------------
| Debe registrarse después de las rutas.
|
| Captura:
| - AppError
| - Errores de Prisma
| - Errores de validación
| - Errores inesperados
|
| Centraliza todas las respuestas de error.
*/
app.use(errorHandler);

export default app;

/*
==============================================================================
ARQUITECTURA GENERAL DEL BACKEND
==============================================================================

Flujo de una petición:

Cliente
   ↓
Ruta
   ↓
Middleware(s)
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Prisma
   ↓
MySQL


Responsabilidad de cada capa:

Routes
- Definen los endpoints.
- Aplican middlewares.
- Redirigen al controller correspondiente.

Middlewares
- Autenticación.
- Roles y permisos.
- Validaciones.
- Uploads.
- Seguridad.

Controllers
- Reciben la petición.
- Obtienen parámetros y body.
- Llaman a los services.
- Devuelven la respuesta HTTP.

Services
- Contienen la lógica de negocio.
- Validan reglas del sistema.
- Coordinan repositorios.

Repositories
- Única capa que accede a Prisma.
- Realiza consultas a la base de datos.

Validators
- Validan los datos de entrada usando Zod.

Mappers
- Transforman los datos antes de enviarlos al cliente.
- Ocultan información sensible.
- Adaptan respuestas según el rol.

Uploads
- Gestionan almacenamiento de imágenes y archivos.

Config
- Variables de entorno.
- JWT.
- Prisma.
- Configuración general.

Objetivo:
Mantener una arquitectura modular, escalable,
segura y fácil de mantener.
==============================================================================
*/