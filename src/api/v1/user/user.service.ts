import { ItemEquipmentType, ItemType, Prisma } from "@prisma/client";
import { BadRequestException, NotFoundException } from "@src/common/exception";
import prisma from "@src/prisma";
import {
  UserEquipment,
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
          headItem: {
            select: { item: { select: { headId: true, headAccId: true } } },
          },
          torsoItem: {
            select: {
              item: {
                select: {
                  chestId: true,
                  spineId: true,
                  spine2Id: true,
                  armsId: true,
                },
              },
            },
          },
          legsItem: { select: { item: { select: { legsId: true } } } },
          leftWeaponItem: {
            select: { item: { select: { leftWeaponId: true } } },
          },
          rightWeaponItem: {
            select: { item: { select: { rightWeaponId: true } } },
          },
          leftShieldItem: {
            select: { item: { select: { leftShieldId: true } } },
          },
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
      headId: user?.equipment?.headItem?.item?.headId,
      headAccId: user?.equipment?.headItem?.item?.headAccId,
      chestId: user?.equipment?.torsoItem?.item?.chestId,
      spineId: user?.equipment?.torsoItem?.item?.spineId,
      spine2Id: user?.equipment?.torsoItem?.item?.spine2Id,
      armsId: user?.equipment?.torsoItem?.item?.armsId,
      legsId: user?.equipment?.legsItem?.item?.legsId,
      leftWeaponId: user?.equipment?.leftWeaponItem?.item?.leftWeaponId,
      rightWeaponId: user?.equipment?.rightWeaponItem?.item?.rightWeaponId,
      leftShieldId: user?.equipment?.leftShieldItem?.item?.leftShieldId,
    },
  };
};

export const getUserInventoryItems = async (
  userId: number
): Promise<UserInventoryItem[]> => {
  const inventoryItems = await prisma.userInventoryItem.findMany({
    where: { userId },
    select: {
      id: true,
      userId: true,
      itemId: true,
      amount: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return inventoryItems.map((item) => {
    return {
      id: item.id,
      itemId: item.itemId,
      amount: item.amount,
    };
  });
};

export const getUserEquipment = async (
  userId: number
): Promise<UserEquipment> => {
  const equipment = await prisma.userEquipment.findFirst({
    where: { userId: userId },
    select: {
      headItemId: true,
      torsoItemId: true,
      legsItemId: true,
    },
  });

  return {
    headItemId: equipment?.headItemId,
    torsoItemId: equipment?.torsoItemId,
    legsItemId: equipment?.legsItemId,
  };
};

export const equipItem = (userId: number, itemId: number) => {
  return prisma.$transaction((tx) => txEquipItem(tx, userId, itemId));
};

export const unequipItem = (userId: number, itemId: number) => {
  return prisma.$transaction((tx) => txUnequipItem(tx, userId, itemId));
};

export const txEquipItem = async (
  tx: Prisma.TransactionClient,
  userId: number,
  inventoryItemId: number
) => {
  const inventoryItem = await tx.userInventoryItem.findFirst({
    select: {
      id: true,
      amount: true,
      item: { select: { equipmentType: true } },
    },
    where: {
      id: inventoryItemId,
      userId: userId,
      item: { type: ItemType.EQUIP },
    },
  });

  if (!inventoryItem || !inventoryItem.item) {
    throw new NotFoundException(
      "user.inventory_item.not_found",
      "아이템을 찾을 수 없습니다."
    );
  }

  if (inventoryItem.amount === 0) {
    throw new NotFoundException(
      "user.inventory_item.already_equipped",
      "이미 장착한 아이템입니다."
    );
  }

  const userEquipment = await tx.userEquipment.findFirst({
    where: { userId },
  });

  // 기존 장비 착용 해제
  if (userEquipment) {
    let unequipItemId: number | null = null;

    switch (inventoryItem.item.equipmentType) {
      case ItemEquipmentType.HEAD:
        if (userEquipment.headItemId != null)
          unequipItemId = userEquipment.headItemId;
        break;
      case ItemEquipmentType.TORSO:
        if (userEquipment.torsoItemId != null)
          unequipItemId = userEquipment.torsoItemId;
        break;
      case ItemEquipmentType.LEGS:
        if (userEquipment.legsItemId != null)
          unequipItemId = userEquipment.legsItemId;
        break;
      case ItemEquipmentType.LEFT_WEAPON:
        if (userEquipment.leftWeaponItemId != null)
          unequipItemId = userEquipment.leftWeaponItemId;
        break;
      case ItemEquipmentType.RIGHT_WEAPON:
        if (userEquipment.rightWeaponItemId != null)
          unequipItemId = userEquipment.rightWeaponItemId;
        break;
      case ItemEquipmentType.SHIELD:
        if (userEquipment.leftShieldItemId != null)
          unequipItemId = userEquipment.leftShieldItemId;
        break;
    }

    if (unequipItemId) {
      await txUnequipItem(tx, userId, unequipItemId);
    }
  }

  await tx.userInventoryItem.update({
    where: { id: inventoryItemId },
    data: {
      amount: 0,
    },
  });

  var payload = {
    ...(inventoryItem.item.equipmentType === ItemEquipmentType.HEAD && {
      headItemId: inventoryItemId,
    }),
    ...(inventoryItem.item.equipmentType === ItemEquipmentType.TORSO && {
      torsoItemId: inventoryItemId,
    }),
    ...(inventoryItem.item.equipmentType === ItemEquipmentType.LEGS && {
      legsItemId: inventoryItemId,
    }),
    ...(inventoryItem.item.equipmentType === ItemEquipmentType.LEFT_WEAPON && {
      leftWeaponItemId: inventoryItemId,
    }),
    ...(inventoryItem.item.equipmentType === ItemEquipmentType.RIGHT_WEAPON && {
      rightWeaponItemId: inventoryItemId,
    }),
    ...(inventoryItem.item.equipmentType === ItemEquipmentType.SHIELD && {
      leftShieldItemId: inventoryItemId,
    }),
  };

  await tx.userEquipment.upsert({
    where: { userId: userId },
    create: {
      userId: userId,
      ...payload,
    },
    update: payload,
  });
};

export const txUnequipItem = async (
  tx: Prisma.TransactionClient,
  userId: number,
  inventoryItemId: number
) => {
  const inventoryItem = await tx.userInventoryItem.findFirst({
    select: {
      id: true,
      amount: true,
      item: { select: { equipmentType: true } },
    },
    where: {
      id: inventoryItemId,
      userId: userId,
      item: { type: ItemType.EQUIP },
    },
  });

  if (!inventoryItem || !inventoryItem.item) {
    throw new NotFoundException(
      "user.inventory_item.not_found",
      "아이템을 찾을 수 없습니다."
    );
  }

  if (inventoryItem.amount === 1) {
    throw new BadRequestException(
      "user.inventory_item.not_equipped",
      "장착중인 아이템이 아닙니다."
    );
  }

  await tx.userInventoryItem.update({
    where: { id: inventoryItemId },
    data: {
      amount: 1,
    },
  });

  await tx.userEquipment.update({
    where: { userId: userId },
    data: {
      ...(inventoryItem.item.equipmentType === ItemEquipmentType.HEAD && {
        headItemId: null,
      }),
      ...(inventoryItem.item.equipmentType === ItemEquipmentType.TORSO && {
        torsoItemId: null,
      }),
      ...(inventoryItem.item.equipmentType === ItemEquipmentType.LEGS && {
        legsItemId: null,
      }),
      ...(inventoryItem.item.equipmentType ===
        ItemEquipmentType.LEFT_WEAPON && {
        leftWeaponItemId: null,
      }),
      ...(inventoryItem.item.equipmentType ===
        ItemEquipmentType.RIGHT_WEAPON && {
        rightWeaponItemId: null,
      }),
      ...(inventoryItem.item.equipmentType === ItemEquipmentType.SHIELD && {
        leftShieldItemId: null,
      }),
    },
  });
};
