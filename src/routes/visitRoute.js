import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { visitSchema } from "../schemas/visitSchema.js";
import visitControl from "../controllers/visitControl.js";

const visitRoute = Router();

visitRoute.post("/insert", validateSchema(visitSchema), visitControl.create);

export default visitRoute;
