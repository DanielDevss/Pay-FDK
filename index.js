import { corsConfigApi, corsConfigWeb } from "./src/cors/cors.js";
import { PORT } from "./src/config/config.js";
import apiRoutes from "./src/routes/api/index.js"
import adminRoutes from "./src/routes/admin/index.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import express from "express";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import webRoutes from "./src/routes/web/index.js"

const app = express();

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan("combined"))
app.use(fileUpload({
    limits : { fileSize: 5 * 1024 * 1024 },
    abortOnLimit: true,
    useTempFiles: true,
    tempFileDir: "/tmp/"
}))

// Configuración de cors e importación de rutas
app.use('/web', cors(corsConfigWeb), webRoutes)
app.use('/api', cors(corsConfigApi), apiRoutes)
app.use('/admin', adminRoutes)

// Lanzar el servidor
app.listen(PORT, (err) => {
    if(err) {
        console.error(`Error in running: ${err.message}`);
        return;
    }
    console.clear()
    console.log(`🚀 Server running on port: ${PORT}`);
});
