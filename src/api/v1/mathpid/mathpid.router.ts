import { Router } from "express";
import { async } from "@src/common/async";
import * as controller from "./mathpid.controller";

const router = Router();
router.get("/problem", async(controller.getMathpidProblem));

export { router as mathpidRouter };
