import { Request, Response, NextFunction } from "express";
import {
  DomainException,
  BadRequestException,
  UnauthroizeException,
  NotFoundException,
  IntervalServerException,
} from "./exception";
import { ApiErrorResponse } from "./response";

export function exceptionHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof DomainException) {
    const statusCode = getHttpStatusCode(err);
    const response: ApiErrorResponse = {
      code: err.code,
      message: err.message,
      debug: err.debug,
    };

    return res.status(statusCode).json(response);
  }

  return res.status(500).json({
    code: "INTERNAL_SERVER_ERROR",
    message: "서버 오류가 발생했습니다.",
  });
}

function getHttpStatusCode(err: DomainException) {
  if (err instanceof BadRequestException) {
    return 400;
  } else if (err instanceof UnauthroizeException) {
    return 401;
  } else if (err instanceof NotFoundException) {
    return 404;
  } else if (err instanceof IntervalServerException) {
    return 500;
  }

  return 500;
}
