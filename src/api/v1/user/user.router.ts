import { Router } from "express";
import { async } from "@src/common/async";
import { authenticator } from "@src/middleware/authentication";
import * as controller from "./user.controller";

const router = Router();
router.use(async(authenticator));

router.post("/", async(controller.createUser));
router.get("/:id", async(controller.getUserById));

export { router as userRouter };
