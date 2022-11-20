import { BadRequestException } from "@src/common/exception";
import prisma from "@src/prisma";

export const chargeCash = async (userId: number, amount: number) => {
  if (amount <= 0) {
    throw new BadRequestException(
      "wallet.invalid_amount",
      "잘못된 금액입니다."
    );
  }

  await prisma.$transaction(async (tx) => {
    await tx.userWallet.upsert({
      where: { userId },
      create: {
        userId: userId,
        balanceCash: amount,
      },
      update: {
        balanceCash: {
          increment: amount,
        },
      },
    });
  });
};

export const spendCash = async (userId: number, amount: number) => {
  if (amount <= 0) {
    throw new BadRequestException(
      "wallet.invalid_amount",
      "잘못된 금액입니다."
    );
  }

  await prisma.$transaction(async (tx) => {
    const wallet = await tx.userWallet.findFirst({
      where: { userId },
    });

    if (!wallet || wallet.balanceCash.toNumber() < amount) {
      throw new BadRequestException(
        "wallet.not_enough_cash",
        "잔액이 부족합니다."
      );
    }

    await tx.userWallet.update({
      where: { userId },
      data: {
        balanceCash: {
          decrement: amount,
        },
      },
    });
  });
};
