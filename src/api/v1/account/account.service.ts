import prisma from "@src/prisma";
import { Account } from "./account.model";

export const findAccountById = async (id: number): Promise<Account | null> => {
  const account = await prisma.account.findUnique({
    where: { id },
  });

  if (!account) {
    return null;
  }

  return {
    id: account.id,
    email: account.email,
    password: account.password,
    lastLoggedIn: account.lastLoggedIn,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
    deletedAt: account.deletedAt,
  };
};
