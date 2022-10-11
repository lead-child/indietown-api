require("dotenv").config();
import express from "express";
import cors from "cors";
import { exceptionHandler } from "./common/exception.handler";
import * as authController from "./auth/auth.controller";

const app = express();
app.use(express.json());
app.use(cors());
app.use(exceptionHandler);

app.get("/api/v1/auth/login", authController.login);
app.get("/api/v1/auth/register", authController.register);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
