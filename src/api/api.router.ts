import { Router } from "express";
import { apiV1Router } from "./v1/api.v1.router";

const router = Router();
router.use("/v1", apiV1Router);

export { router as apiRouter };
