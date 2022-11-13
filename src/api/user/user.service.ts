import { BadRequestException, NotFoundException } from "../../common/exception";
import prisma from "../../prisma";
import { UserWithEquipmentId } from "./user.model";

export interface CreateUserCommand {
  accountId: number;
  name: string;
  hairId: number;
  headId: number;
}

export const createUser = async (command: CreateUserCommand) => {
  const { accountId, name, hairId, headId } = command;

  if (!name || name.length < 2) {
    throw new BadRequestException(
      "user.invalid_name",
      "이름은 최소 2글자 이상이어야 합니다."
    );
  }

  const existsName = await prisma.user.count({
    where: { name: { equals: name } },
    take: 1,
  });

  if (existsName) {
    throw new NotFoundException(
      "user.name_already_exists",
      "이미 존재하는 이름입니다."
    );
  }

  const user = await prisma.user.create({
    data: {
      accountId: accountId,
      name: name,
      hairId: hairId,
      headId: headId,
    },
  });

  return user;
};

export const getUserWithEquipmentId = async (
  userId: number
): Promise<UserWithEquipmentId> => {
  const user = await prisma.user.findFirst({
    where: { id: { equals: userId } },
    select: {
      id: true,
      name: true,
      level: true,
      headId: true,
      hairId: true,
      equipment: {
        select: {
          headItem: { select: { headId: true, headAccId: true } },
          torsoItem: {
            select: {
              chestId: true,
              spineId: true,
              spine2Id: true,
              armsId: true,
            },
          },
          legsItem: { select: { legsId: true } },
          leftWeaponItem: { select: { leftWeaponId: true } },
          rightWeaponItem: { select: { rightWeaponId: true } },
          leftShieldItem: { select: { leftShieldId: true } },
        },
      },
    },
  });

  if (!user) {
    throw new NotFoundException(
      "user.user_not_found",
      "유저를 찾을 수 없어요."
    );
  }

  return {
    id: user.id,
    name: user.name,
    level: user.level,
    headId: user.headId,
    hairId: user.hairId,
    equipment: {
      headId: user?.equipment?.headItem?.headId,
      headAccId: user?.equipment?.headItem?.headAccId,
      chestId: user?.equipment?.torsoItem?.chestId,
      spineId: user?.equipment?.torsoItem?.spineId,
      spine2Id: user?.equipment?.torsoItem?.spine2Id,
      armsId: user?.equipment?.torsoItem?.armsId,
      legsId: user?.equipment?.legsItem?.legsId,
      leftWeaponId: user?.equipment?.leftWeaponItem?.leftWeaponId,
      rightWeaponId: user?.equipment?.rightWeaponItem?.rightWeaponId,
      leftShieldId: user?.equipment?.leftShieldItem?.leftShieldId,
    },
  };
};
