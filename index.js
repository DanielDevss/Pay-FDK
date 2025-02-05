import { PORT } from "./config.js"
import webRoutes from "./src/routes/web/index.js"

import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(cookieParser())
app.use(express.json())
app.use(morgan("combined"))

app.use("/web", webRoutes)

// Lanzar el servidor
app.listen(PORT, (err) => {
    if(err) {
        console.error(`Error in running: ${err.message}`);
        return;
    }
    console.log(`🚀 Server running on port: ${PORT}`);
});