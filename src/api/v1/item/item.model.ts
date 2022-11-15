import { ItemEquipmentType, ItemGrade, ItemType } from "@prisma/client";

export interface Item {
  id: number;
  type: ItemType;

  name: string;
  grade: ItemGrade;
  description: string;

  equipmentType: ItemEquipmentType;

  hairId: number | null | undefined;
  headId: number | null | undefined;
  headAccId: number | null | undefined;
  chestId: number | null | undefined;
  spineId: number | null | undefined;
  spine2Id: number | null | undefined;
  armsId: number | null | undefined;
  legsId: number | null | undefined;

  leftWeaponId: number | null;
  rightWeaponId: number | null;

  leftShieldId: number | null;

  createdAt: Date;
  updatedAt: Date;
}

export interface ItemViewModel {
  id: number;
  type: ItemType;
  grade: ItemGrade;
  name: string;
  description: string;
  equipmentType: ItemEquipmentType;
}
