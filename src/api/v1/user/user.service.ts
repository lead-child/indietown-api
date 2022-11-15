import { BadRequestException, NotFoundException } from "@src/common/exception";
import prisma from "@src/prisma";
import {
  UserEquipmentDetail,
  UserInventoryItem,
  UserWithEquipmentId,
} from "./user.model";

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

export const getUserInventoryItems = async (
  userId: number
): Promise<UserInventoryItem[]> => {
  const userItems = await prisma.userInventoryItem.findMany({
    where: { userId: userId, amount: { gt: 0 } },
    select: {
      id: true,
      userId: true,
      item: {
        select: {
          id: true,
          type: true,
          name: true,
          grade: true,
          description: true,
          equipmentType: true,
        },
      },
      amount: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return userItems.map((userItem) => {
    return {
      id: userItem.id,
      item: userItem.item && {
        id: userItem.item.id,
        type: userItem.item.type,
        equipmentType: userItem.item.equipmentType,
        name: userItem.item.name,
        grade: userItem.item.grade,
        description: userItem.item.description,
      },
      amount: userItem.amount,
    };
  });
};

export const getUserEquipment = async (
  userId: number
): Promise<UserEquipmentDetail> => {
  const equipment = await prisma.userEquipment.findFirst({
    where: { userId: userId },
    select: {
      headItem: {
        select: {
          id: true,
          type: true,
          grade: true,
          name: true,
          description: true,
          equipmentType: true,
        },
      },
      torsoItem: {
        select: {
          id: true,
          type: true,
          grade: true,
          name: true,
          description: true,
          equipmentType: true,
        },
      },
      legsItem: {
        select: {
          id: true,
          type: true,
          grade: true,
          name: true,
          description: true,
          equipmentType: true,
        },
      },
      leftWeaponItem: {
        select: {
          id: true,
          type: true,
          grade: true,
          name: true,
          description: true,
          equipmentType: true,
        },
      },
      rightWeaponItem: {
        select: {
          id: true,
          type: true,
          grade: true,
          name: true,
          description: true,
          equipmentType: true,
        },
      },
      leftShieldItem: {
        select: {
          id: true,
          type: true,
          grade: true,
          name: true,
          description: true,
          equipmentType: true,
        },
      },
    },
  });

  return {
    headItem:
      (equipment?.headItem && {
        id: equipment.headItem.id,
        type: equipment.headItem.type,
        grade: equipment.headItem.grade,
        name: equipment.headItem.name,
        description: equipment.headItem.description,
        equipmentType: equipment.headItem.equipmentType,
      }) ||
      null,
    torsoItem:
      (equipment?.torsoItem && {
        id: equipment.torsoItem.id,
        type: equipment.torsoItem.type,
        grade: equipment.torsoItem.grade,
        name: equipment.torsoItem.name,
        description: equipment.torsoItem.description,
        equipmentType: equipment.torsoItem.equipmentType,
      }) ||
      null,
    legsItem:
      (equipment?.legsItem && {
        id: equipment.legsItem.id,
        type: equipment.legsItem.type,
        grade: equipment.legsItem.grade,
        name: equipment.legsItem.name,
        description: equipment.legsItem.description,
        equipmentType: equipment.legsItem.equipmentType,
      }) ||
      null,
    leftWeaponItem:
      (equipment?.leftWeaponItem && {
        id: equipment.leftWeaponItem.id,
        type: equipment.leftWeaponItem.type,
        grade: equipment.leftWeaponItem.grade,
        name: equipment.leftWeaponItem.name,
        description: equipment.leftWeaponItem.description,
        equipmentType: equipment.leftWeaponItem.equipmentType,
      }) ||
      null,
    rightWeaponItem:
      (equipment?.rightWeaponItem && {
        id: equipment.rightWeaponItem.id,
        type: equipment.rightWeaponItem.type,
        grade: equipment.rightWeaponItem.grade,
        name: equipment.rightWeaponItem.name,
        description: equipment.rightWeaponItem.description,
        equipmentType: equipment.rightWeaponItem.equipmentType,
      }) ||
      null,
    leftShieldItem:
      (equipment?.leftShieldItem && {
        id: equipment.leftShieldItem.id,
        type: equipment.leftShieldItem.type,
        grade: equipment.leftShieldItem.grade,
        name: equipment.leftShieldItem.name,
        description: equipment.leftShieldItem.description,
        equipmentType: equipment.leftShieldItem.equipmentType,
      }) ||
      null,
  };
};
