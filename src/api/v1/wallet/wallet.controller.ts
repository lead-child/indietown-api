import { ApiDataResponse } from "@src/common/response";
import { Request, Response } from "express";
import * as WalletService from "./wallet.service";

export const chargeCash = async (
  req: Request,
  res: Response<ApiDataResponse<any>>
) => {
  const { amount } = req.body;
  const userId = req.context?.userId!!;

  await WalletService.chargeCash(userId, amount);

  res.status(200).json({
    data: {},
  });
};

export const spendCash = async (
  req: Request,
  res: Response<ApiDataResponse<any>>
) => {
  const { amount } = req.body;
  const userId = req.context?.userId!!;

  await WalletService.spendCash(userId, amount);

  res.status(200).json({
    data: {},
  });
};
