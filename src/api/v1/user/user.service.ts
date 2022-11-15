import { ItemEquipmentType, ItemType } from "@prisma/client";
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
          item: {
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
      },
      torsoItem: {
        select: {
          id: true,
          item: {
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
      },
      legsItem: {
        select: {
          id: true,
          item: {
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
      },
      leftWeaponItem: {
        select: {
          id: true,
          item: {
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
      },
      rightWeaponItem: {
        select: {
          id: true,
          item: {
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
      },
      leftShieldItem: {
        select: {
          id: true,
          item: {
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
      },
    },
  });

  return {
    headItem:
      (equipment?.headItem?.item && {
        id: equipment.headItem.id,
        item: {
          id: equipment.headItem.item.id,
          type: equipment.headItem.item.type,
          grade: equipment.headItem.item.grade,
          name: equipment.headItem.item.name,
          description: equipment.headItem.item.description,
          equipmentType: equipment.headItem.item.equipmentType,
        },
      }) ||
      null,
    torsoItem:
      (equipment?.torsoItem?.item && {
        id: equipment.torsoItem.id,
        item: {
          id: equipment.torsoItem.item.id,
          type: equipment.torsoItem.item.type,
          grade: equipment.torsoItem.item.grade,
          name: equipment.torsoItem.item.name,
          description: equipment.torsoItem.item.description,
          equipmentType: equipment.torsoItem.item.equipmentType,
        },
      }) ||
      null,
    legsItem:
      (equipment?.legsItem?.item && {
        id: equipment.legsItem.id,
        item: {
          id: equipment.legsItem.item.id,
          type: equipment.legsItem.item.type,
          grade: equipment.legsItem.item.grade,
          name: equipment.legsItem.item.name,
          description: equipment.legsItem.item.description,
          equipmentType: equipment.legsItem.item.equipmentType,
        },
      }) ||
      null,
    leftWeaponItem:
      (equipment?.leftWeaponItem?.item && {
        id: equipment.leftWeaponItem.id,
        item: {
          id: equipment.leftWeaponItem.item.id,
          type: equipment.leftWeaponItem.item.type,
          grade: equipment.leftWeaponItem.item.grade,
          name: equipment.leftWeaponItem.item.name,
          description: equipment.leftWeaponItem.item.description,
          equipmentType: equipment.leftWeaponItem.item.equipmentType,
        },
      }) ||
      null,
    rightWeaponItem:
      (equipment?.rightWeaponItem?.item && {
        id: equipment.rightWeaponItem.id,
        item: {
          id: equipment.rightWeaponItem.item.id,
          type: equipment.rightWeaponItem.item.type,
          grade: equipment.rightWeaponItem.item.grade,
          name: equipment.rightWeaponItem.item.name,
          description: equipment.rightWeaponItem.item.description,
          equipmentType: equipment.rightWeaponItem.item.equipmentType,
        },
      }) ||
      null,
    leftShieldItem:
      (equipment?.leftShieldItem?.item && {
        id: equipment.leftShieldItem.id,
        item: {
          id: equipment.leftShieldItem.item.id,
          type: equipment.leftShieldItem.item.type,
          grade: equipment.leftShieldItem.item.grade,
          name: equipment.leftShieldItem.item.name,
          description: equipment.leftShieldItem.item.description,
          equipmentType: equipment.leftShieldItem.item.equipmentType,
        },
      }) ||
      null,
  };
};

export const equipUserInventoryItem = async (
  userId: number,
  inventoryItemId: number
) => {
  await prisma.$transaction(async (tx) => {
    const inventoryItem = await tx.userInventoryItem.findFirst({
      select: {
        id: true,
        item: { select: { equipmentType: true } },
      },
      where: {
        id: inventoryItemId,
        userId: userId,
        amount: { gt: 0 },
        item: { type: ItemType.EQUIP },
      },
    });

    if (!inventoryItem || !inventoryItem.item) {
      throw new NotFoundException(
        "user.inventory_item.not_found",
        "아이템을 찾을 수 없습니다."
      );
    }

    await tx.userInventoryItem.update({
      where: { id: inventoryItemId },
      data: {
        amount: 0,
      },
    });

    await tx.userEquipment.update({
      where: { userId: userId },
      data: {
        ...(inventoryItem.item.equipmentType === ItemEquipmentType.HEAD && {
          headItemId: inventoryItemId,
        }),
        ...(inventoryItem.item.equipmentType === ItemEquipmentType.TORSO && {
          torsoItemId: inventoryItemId,
        }),
        ...(inventoryItem.item.equipmentType === ItemEquipmentType.LEGS && {
          legsItemId: inventoryItemId,
        }),
        ...(inventoryItem.item.equipmentType ===
          ItemEquipmentType.LEFT_WEAPON && {
          leftWeaponItemId: inventoryItemId,
        }),
        ...(inventoryItem.item.equipmentType ===
          ItemEquipmentType.RIGHT_WEAPON && {
          rightWeaponItemId: inventoryItemId,
        }),
        ...(inventoryItem.item.equipmentType === ItemEquipmentType.SHIELD && {
          leftShieldItemId: inventoryItemId,
        }),
      },
    });
  });
};

export const unequipUserItem = async (
  userId: number,
  inventoryItemId: number
) => {
  await prisma.$transaction(async (tx) => {
    const inventoryItem = await tx.userInventoryItem.findFirst({
      select: {
        id: true,
        item: { select: { equipmentType: true } },
      },
      where: {
        id: inventoryItemId,
        userId: userId,
        amount: { equals: 0 },
        item: { type: ItemType.EQUIP },
      },
    });

    if (!inventoryItem || !inventoryItem.item) {
      throw new NotFoundException(
        "user.inventory_item.not_found",
        "아이템을 찾을 수 없습니다."
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
  });
};
