import { Router } from "express";
import async from "express-async-handler";
import { authenticator } from "@src/middleware/authentication";
import * as controller from "./wallet.controller";

const router = Router();
router.use(async(authenticator));

router.post("/charge", async(controller.chargeCash));
router.post("/spend", async(controller.spendCash));

export { router as walletRouter };
