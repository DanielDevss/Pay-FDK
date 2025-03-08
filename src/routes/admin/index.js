import { readdirSync } from "fs";
import { Router } from "express";

const router = Router();

const readFiles = readdirSync(`./src/routes/admin`)
  .map((file) => file.split(".").shift())
  .filter((file) => file !== "index");

readFiles.forEach(async (file) => {
  const route = await import(`./${file}.js`);
  router.use(`/${file}`, route.default);
});

export default router;
