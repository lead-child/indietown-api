import { NextFunction, Request, Response, Router } from "express";

export const async = (
  asyncFn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return function (req: Request, res: Response, next: NextFunction) {
    asyncFn(req, res, next).catch(next);
  };
};
