import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const app = express();

const prisma = new PrismaClient();

app.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.send(users);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
