import { Request, Response } from "express";
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
  res: Response<LoginResponseData>
) {
  const { email, password } = req.body;
  const { accessToken } = await authService.login(email, password);

  res.status(200).json({
    accessToken: accessToken,
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
  res: Response<RegisterResponseData>
) {
  const { email, password, passwordConfirm } = req.body;
  const { accessToken } = await authService.register(
    email,
    password,
    passwordConfirm
  );

  res.status(200).json({
    accessToken: accessToken,
  });
}
