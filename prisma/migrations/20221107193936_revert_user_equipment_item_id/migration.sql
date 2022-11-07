/*
  Warnings:

  - You are about to alter the column `headItemId` on the `UserEquipment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(8)` to `Int`.
  - You are about to alter the column `torsoItemId` on the `UserEquipment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(8)` to `Int`.
  - You are about to alter the column `legsItemId` on the `UserEquipment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(8)` to `Int`.
  - You are about to alter the column `leftWeaponItemId` on the `UserEquipment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(8)` to `Int`.
  - You are about to alter the column `rightWeaponItemId` on the `UserEquipment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(8)` to `Int`.
  - You are about to alter the column `leftShieldItemId` on the `UserEquipment` table. The data in that column could be lost. The data in that column will be cast from `VarChar(8)` to `Int`.

*/
-- AlterTable
ALTER TABLE `UserEquipment` MODIFY `headItemId` INTEGER NULL,
    MODIFY `torsoItemId` INTEGER NULL,
    MODIFY `legsItemId` INTEGER NULL,
    MODIFY `leftWeaponItemId` INTEGER NULL,
    MODIFY `rightWeaponItemId` INTEGER NULL,
    MODIFY `leftShieldItemId` INTEGER NULL;
