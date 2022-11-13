/*
  Warnings:

  - You are about to alter the column `headId` on the `Item` table. The data in that column could be lost. The data in that column will be cast from `VarChar(8)` to `Int`.
  - You are about to alter the column `headAccId` on the `Item` table. The data in that column could be lost. The data in that column will be cast from `VarChar(8)` to `Int`.
  - You are about to alter the column `hairId` on the `Item` table. The data in that column could be lost. The data in that column will be cast from `VarChar(8)` to `Int`.
  - You are about to alter the column `chestId` on the `Item` table. The data in that column could be lost. The data in that column will be cast from `VarChar(8)` to `Int`.
  - You are about to alter the column `spineId` on the `Item` table. The data in that column could be lost. The data in that column will be cast from `VarChar(8)` to `Int`.
  - You are about to alter the column `spine2Id` on the `Item` table. The data in that column could be lost. The data in that column will be cast from `VarChar(8)` to `Int`.
  - You are about to alter the column `armsId` on the `Item` table. The data in that column could be lost. The data in that column will be cast from `VarChar(8)` to `Int`.
  - You are about to alter the column `legsId` on the `Item` table. The data in that column could be lost. The data in that column will be cast from `VarChar(8)` to `Int`.
  - You are about to alter the column `leftWeaponId` on the `Item` table. The data in that column could be lost. The data in that column will be cast from `VarChar(8)` to `Int`.
  - You are about to alter the column `rightWeaponId` on the `Item` table. The data in that column could be lost. The data in that column will be cast from `VarChar(8)` to `Int`.
  - You are about to alter the column `leftShieldId` on the `Item` table. The data in that column could be lost. The data in that column will be cast from `VarChar(8)` to `Int`.
  - You are about to alter the column `hairId` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(8)` to `Int`.
  - You are about to alter the column `headId` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(8)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Item` MODIFY `headId` INTEGER NULL,
    MODIFY `headAccId` INTEGER NULL,
    MODIFY `hairId` INTEGER NULL,
    MODIFY `chestId` INTEGER NULL,
    MODIFY `spineId` INTEGER NULL,
    MODIFY `spine2Id` INTEGER NULL,
    MODIFY `armsId` INTEGER NULL,
    MODIFY `legsId` INTEGER NULL,
    MODIFY `leftWeaponId` INTEGER NULL,
    MODIFY `rightWeaponId` INTEGER NULL,
    MODIFY `leftShieldId` INTEGER NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `hairId` INTEGER NOT NULL,
    MODIFY `headId` INTEGER NOT NULL;
