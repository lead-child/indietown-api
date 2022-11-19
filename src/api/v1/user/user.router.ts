import { Router } from "express";
import async from "express-async-handler";
import { authenticator } from "@src/middleware/authentication";
import * as controller from "./user.controller";

const router = Router();
router.use(async(authenticator));

router.post("/", async(controller.createUser));
router.post("/inventory/items/:id/equip", async(controller.equipItem));
router.post("/inventory/items/:id/unequip", async(controller.unequipItem));

router.get("/", async(controller.getUser));
router.get("/inventory", async(controller.getUserInventoryById));
router.get("/:id", async(controller.getUserById));

export { router as userRouter };
