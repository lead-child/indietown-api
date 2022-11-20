export interface UserWithEquipmentId {
  id: number;
  name: string;
  level: number;
  headId: number;
  hairId: number;
  cash: number;
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

export interface UserEquipment {
  headItem: UserInventoryItem | null | undefined;
  torsoItem: UserInventoryItem | null | undefined;
  legsItem: UserInventoryItem | null | undefined;
}

export interface UserInventoryItem {
  id: number;
  itemId: number;
  amount: number;
}
