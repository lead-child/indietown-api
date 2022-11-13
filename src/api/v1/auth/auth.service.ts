import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "@src/prisma";
import {
  BadRequestException,
  UnauthroizeException,
} from "@src/common/exception";

export interface AccessTokenPayload {
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

  await prisma.account.update({
    where: {
      id: account.id,
    },
    data: {
      lastLoggedIn: new Date(),
    },
  });

  const payload: AccessTokenPayload = {
    accountId: account.id,
  };

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!!, {
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
    throw new BadRequestException(
      "auth.password_not_match",
      "비밀번호가 일치하지 않습니다."
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const accessToken = await prisma.$transaction(async (tx) => {
    const existsEmail =
      (await tx.account.count({ where: { email: email } })) > 0;

    if (existsEmail) {
      throw new BadRequestException(
        "auth.email_already_exists",
        "이미 존재하는 이메일입니다."
      );
    }

    const account = await tx.account.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    const payload: AccessTokenPayload = {
      accountId: account.id,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!!, {
      expiresIn: "7d",
    });

    return accessToken;
  });

  return {
    accessToken,
  };
}

export interface AuthenticateData {
  accountId: number;
}

export async function authenticate(
  accessToken: string
): Promise<AuthenticateData> {
  return new Promise((resolve, reject) => {
    jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!!,
      (err, payload) => {
        if (err) {
          return reject(err);
        }

        return resolve({
          accountId: (payload as AccessTokenPayload).accountId,
        });
      }
    );
  });
}
