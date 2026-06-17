import dotenv from "dotenv";
import path from "path";

// Forzamos la ruta absoluta de la raíz para asegurarnos de que Laragon/Node siempre encuentren el archivo

const result = dotenv.config({
    path: path.resolve(process.cwd(), ".env")
});
// console.log("PORT:", process.env.PORT);
// console.log("DATABASE_URL:", process.env.DATABASE_URL);
// console.log("JWT_ACCESS_TOKEN_SECRET:", process.env.JWT_ACCESS_TOKEN_SECRET);
// console.log("JWT_REFRESH_TOKEN_SECRET:", process.env.JWT_REFRESH_TOKEN_SECRET);

export const env = {
    port: process.env.PORT || 5000,
    databaseUrl: process.env.DATABASE_URL,

    // Mapeo directo de tus secretos del .env
    jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,

    // CORREGIDO: Nombres idénticos a los que tienes en tu archivo .env
    accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
    refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",

    nodeEnv: process.env.NODE_ENV || "development",
    resendApiKey: process.env.RESEND_API_KEY,

    uploadMaxSize: process.env.UPLOAD_MAX_SIZE || 5242880, // 5MB en bytes
};

// console.log("ENV OBJ:", env);
// Control Senior de Seguridad: Si las llaves no cargaron, detenemos el servidor de inmediato avisando el por qué
if (!env.jwtAccessTokenSecret || !env.jwtRefreshTokenSecret) {
    console.error("❌ ERROR CRÍTICO: Las variables secretas de JWT no se cargaron correctamente desde el .env");
    process.exit(1);
}