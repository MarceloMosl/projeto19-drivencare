import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import doctorControl from "../controllers/doctorControl.js";
import { docSchema } from "../schemas/doctorSchema.js";

const doctorRouter = Router();

doctorRouter.post("/sign-up", validateSchema(docSchema), doctorControl.create);
doctorRouter.post("/sign-in", doctorControl.sessionsCreate);

export default doctorRouter;
