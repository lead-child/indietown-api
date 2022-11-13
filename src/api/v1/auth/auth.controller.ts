import { Request, Response } from "express";
import { ApiDataResponse } from "@src/common/response";
import * as authService from "./auth.service";

interface LoginRequestData {
  email: string;
  password: string;
}

interface LoginResponseData {
  accessToken: string;
}

export async function login(
  req: Request<{}, {}, LoginRequestData>,
  res: Response<ApiDataResponse<LoginResponseData>>
) {
  const { email, password } = req.body;
  const { accessToken } = await authService.login(email, password);

  res.status(200).json({
    data: {
      accessToken: accessToken,
    },
  });
}

interface RegisterRequestData {
  email: string;
  password: string;
  passwordConfirm: string;
}

interface RegisterResponseData {
  accessToken: string;
}

export async function register(
  req: Request<{}, {}, RegisterRequestData>,
  res: Response<ApiDataResponse<RegisterResponseData>>
) {
  const { email, password, passwordConfirm } = req.body;
  const { accessToken } = await authService.register(
    email,
    password,
    passwordConfirm
  );

  res.status(200).json({
    data: {
      accessToken: accessToken,
    },
  });
}
