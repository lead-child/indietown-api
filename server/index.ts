require("dotenv").config();
import express from "express";
import cors from "cors";
import { async } from "./common/async";
import { exceptionHandler } from "./common/exception.handler";
import * as authController from "./api/auth/auth.controller";
import * as mathpidController from "./api/mathpid/mathpid.controller";
import * as userController from "./api/user/user.controller";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/v1/mathpid/problem", async(mathpidController.getMathpidProblem));

app.post("/api/v1/auth/login", async(authController.login));
app.post("/api/v1/auth/register", async(authController.register));

app.get("/api/v1/user/:id", async(userController.getUserById));

app.use(exceptionHandler);

const port: number = Number.parseInt(process.env.PORT || "3000");
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
