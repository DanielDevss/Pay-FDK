import { readdirSync } from "fs"
import { Router } from "express";

const router = Router();

// Read all files in the web folder
const readFiles = readdirSync(`./src/routes/api`)
.map(file => file.split(".")
.shift())
.filter(file => file !== "index");

readFiles.forEach(async file => {
    const route = await import(`./${file}.js`);
    router.use(`/${file}`, route.default);
});

export default router;