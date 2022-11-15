import { ItemEquipmentType, ItemGrade, ItemType } from "@prisma/client";
import { Item } from "../item/item.model";

export interface UserWithEquipmentId {
  id: number;
  name: string;
  level: number;
  headId: number;
  hairId: number;
  equipment: {
    headId: number | null | undefined;
    headAccId: number | null | undefined;
    chestId: number | null | undefined;
    spineId: number | null | undefined;
    spine2Id: number | null | undefined;
    armsId: number | null | undefined;
    legsId: number | null | undefined;
    leftWeaponId: number | null | undefined;
    rightWeaponId: number | null | undefined;
    leftShieldId: number | null | undefined;
  };
}

export interface UserInventoryItem {
  id: number;
  userId: number;

  item:
    | {
        id: number;
        type: ItemType;
        grade: ItemGrade;
        name: string;
        description: string;
        equipmentType: ItemEquipmentType;
      }
    | null
    | undefined;
  amount: number;

  createdAt: Date;
  updatedAt: Date;
}
