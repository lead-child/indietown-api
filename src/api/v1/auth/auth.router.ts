import { Router } from "express";
import { async } from "@src/common/async";
import * as authController from "./auth.controller";

const router = Router();

router.post("/login", async(authController.login));
router.post("/register", async(authController.register));

export { router as authRouter };
