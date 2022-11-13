import { Router } from "express";

import { authRouter } from "./auth/auth.router";
import { mathpidRouter } from "./mathpid/mathpid.router";
import { userRouter } from "./user/user.router";

const router = Router();
router.use("/auth", authRouter);
router.use("/mathpid", mathpidRouter);
router.use("/user", userRouter);

export { router as apiRouter };
