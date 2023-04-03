import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { sessionSchema, userSchemma } from "../schemas/userSchema.js";
import userControl from "../controllers/userControl.js";
import authValidation from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.post("/sign-up", validateSchema(userSchemma), userControl.create);
userRouter.post(
  "/sign-in",
  validateSchema(sessionSchema),
  userControl.sessionsCreate
);

userRouter.post("/doctors-list", authValidation, userControl.getDocs);

userRouter.get(
  "/doctor-availability/:doc",
  authValidation,
  userControl.getDoctorAvailability
);

userRouter.get("/history", authValidation, userControl.historyVisits);

export default userRouter;
