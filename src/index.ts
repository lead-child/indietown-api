require("dotenv").config();
import "module-alias/register";

import express from "express";
import cors from "cors";
import { exceptionHandler } from "./common/exception.handler";
import { apiRouter } from "./api/api.router";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);

app.use(exceptionHandler);

const port: number = Number.parseInt(process.env.PORT || "3000");
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
