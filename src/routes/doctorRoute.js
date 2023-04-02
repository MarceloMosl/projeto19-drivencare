import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import doctorControl from "../controllers/doctorControl.js";
import { changeStatusSchema, docSchema } from "../schemas/doctorSchema.js";
import docValidate from "../middlewares/docAuthMiddleware.js";
import { statusAlterMiddleware } from "../middlewares/statusAlterMiddleware.js";

const doctorRouter = Router();

doctorRouter.post("/sign-up", validateSchema(docSchema), doctorControl.create);
doctorRouter.post("/sign-in", doctorControl.sessionsCreate);
doctorRouter.put(
  "/status-visits",
  docValidate,
  validateSchema(changeStatusSchema),
  statusAlterMiddleware,
  doctorControl.changeStatus
);

export default doctorRouter;
