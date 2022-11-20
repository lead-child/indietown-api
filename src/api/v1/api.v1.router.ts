import { Router } from "express";

import { authRouter } from "./auth/auth.router";
import { mathpidRouter } from "./mathpid/mathpid.router";
import { userRouter } from "./user/user.router";
import { walletRouter } from "./wallet/wallet.router";

const router = Router();
router.use("/auth", authRouter);
router.use("/mathpid", mathpidRouter);
router.use("/user", userRouter);
router.use("/wallet", walletRouter);

export { router as apiV1Router };
