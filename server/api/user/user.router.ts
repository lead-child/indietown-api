import { Router } from "express";
import { async } from "../../common/async";
import { authenticator } from "../../middleware/authentication";
import * as controller from "./user.controller";

const router = Router();
router.use(async(authenticator));

router.post("/", async(controller.createUser));
router.get("/:id", async(controller.getUserById));

export { router as userRouter };
