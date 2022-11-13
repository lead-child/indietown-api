import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UnauthroizeException } from "../common/exception";

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
      throw new UnauthroizeException(
        "auth.invalid_auth_token",
        "인증 토큰이 올바르지 않습니다."
      );
    }

    const accountId = Number.parseInt(decoded.accountId, 10);

    req.context = {
      accountId,
    };

    next();
  });
};
