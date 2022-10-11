import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../prisma";
import { UnauthroizeException } from "../common/exception";

interface AccessTokenPayload {
  accountId: number;
}

export async function login(email: string, password: string) {
  const account = await prisma.account.findUnique({
    where: {
      email: email,
    },
  });

  if (!account) {
    throw new UnauthroizeException(
      "auth.invalid_email_or_password",
      "이메일 또는 비밀번호가 올바르지 않습니다."
    );
  }

  const passwordValid = await bcrypt.compare(password, account.password);
  if (!passwordValid) {
    throw new UnauthroizeException(
      "auth.invalid_email_or_password",
      "이메일 또는 비밀번호가 올바르지 않습니다."
    );
  }

  const payload: AccessTokenPayload = {
    accountId: account.id,
  };

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return {
    accessToken,
  };
}

export async function register(
  email: string,
  password: string,
  passwordConfirm: string
) {
  if (password !== passwordConfirm) {
    throw new UnauthroizeException(
      "auth.password_not_match",
      "비밀번호가 일치하지 않습니다."
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const account = await prisma.account.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  });

  const payload: AccessTokenPayload = {
    accountId: account.id,
  };

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return {
    accessToken,
  };
}

export async function authenticate(
  accessToken: string,
  refreshToken: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        return reject(err);
      }

      return resolve(true);
    });
  });
}
