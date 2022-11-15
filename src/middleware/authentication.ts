import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UnauthroizeException } from "../common/exception";
import prisma from "@src/prisma";

export const authenticator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req?.headers?.authorization) {
    throw new UnauthroizeException(
      "auth.auth_token_not_found",
      "인증 토큰이 없습니다."
    );
  }

  const token = req.headers.authorization;

  verify(token, process.env.ACCESS_TOKEN_SECRET!!, async (err, decoded) => {
    if (err || !decoded || typeof decoded === "string") {
      next(
        new UnauthroizeException(
          "auth.invalid_auth_token",
          "인증 토큰이 올바르지 않습니다."
        )
      );
      return;
    }

    const accountId = Number.parseInt(decoded.accountId, 10);

    const user = await prisma.user.findFirst({
      select: { id: true },
      where: { accountId: { equals: accountId } },
    });

    if (!user) {
      next(
        new UnauthroizeException(
          "auth.invalid_auth_token",
          "인증 토큰이 올바르지 않습니다."
        )
      );
      return;
    }

    req.context = {
      accountId,
      userId: user.id,
    };

    next();
  });
};
