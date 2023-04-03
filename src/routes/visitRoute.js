import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { visitSchema } from "../schemas/visitSchema.js";
import visitControl from "../controllers/visitControl.js";
import authValidation from "../middlewares/authMiddleware.js";
import docValidate from "../middlewares/docAuthMiddleware.js";

const visitRoute = Router();

visitRoute.post(
  "/insert",
  authValidation,
  validateSchema(visitSchema),
  visitControl.create
);

visitRoute.get("/patient-visits", authValidation, visitControl.findVisits);

visitRoute.get("/doctor-visits", docValidate, visitControl.findVisitsAsDoc);

export default visitRoute;
