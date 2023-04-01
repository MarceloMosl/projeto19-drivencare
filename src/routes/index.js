import { Router } from "express";
import userRouter from "./userRoute.js";
import visitRoute from "./visitRoute.js";
import doctorRouter from "./doctorRoute.js";

const router = Router();

router.use("/patient", userRouter);
router.use("/doctor", doctorRouter);
router.use("/visit", visitRoute);

export default router;
