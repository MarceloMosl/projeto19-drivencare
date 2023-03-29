import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import { userSchemma } from "../schemas/userSchema.js";
import userControl from "../controllers/userControl.js";

const userRouter = Router();

userRouter.post("/sign-up", validateSchema(userSchemma), userControl.create);
