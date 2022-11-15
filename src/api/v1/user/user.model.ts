import { ItemViewModel } from "../item/item.model";

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

export interface UserEquipmentDetail {
  headItem: UserEqipmentItem | null;
  torsoItem: UserEqipmentItem | null;
  legsItem: UserEqipmentItem | null;
  leftWeaponItem: UserEqipmentItem | null;
  rightWeaponItem: UserEqipmentItem | null;
  leftShieldItem: UserEqipmentItem | null;
}

export interface UserEqipmentItem {
  id: number;
  item: ItemViewModel;
}

export interface UserInventoryItem {
  id: number;
  item: ItemViewModel | null;
  amount: number;
}
