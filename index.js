import webRoutes from "./src/routes/web/index.js"
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { PORT } from "./src/config/config.js";
import cors from "cors"

const app = express();

// Middlewares
app.use(cors({
    credentials: true,
    origin: "http://localhost:5175",
    httpOnly: false
}
))
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

// Rutas
app.use("/web", webRoutes)

// Lanzar el servidor
app.listen(PORT, (err) => {
    if(err) {
        console.error(`Error in running: ${err.message}`);
        return;
    }
    console.clear()
    console.log(`🚀 Server running on port: ${PORT}`);
});
