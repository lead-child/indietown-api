require("dotenv").config();
import express from "express";
import cors from "cors";
import { exceptionHandler } from "./common/exception.handler";
import * as authController from "./auth/auth.controller";
import { async } from "./common/async";

const app = express();
app.use(express.json());
app.use(cors());
app.post("/api/v1/auth/login", async(authController.login));
app.post("/api/v1/auth/register", async(authController.register));
app.use(exceptionHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
