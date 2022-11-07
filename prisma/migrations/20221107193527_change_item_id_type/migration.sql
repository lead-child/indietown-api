-- AlterTable
ALTER TABLE `Item` MODIFY `headId` VARCHAR(8) NULL,
    MODIFY `headAccId` VARCHAR(8) NULL,
    MODIFY `hairId` VARCHAR(8) NULL,
    MODIFY `chestId` VARCHAR(8) NULL,
    MODIFY `spineId` VARCHAR(8) NULL,
    MODIFY `spine2Id` VARCHAR(8) NULL,
    MODIFY `armsId` VARCHAR(8) NULL,
    MODIFY `legsId` VARCHAR(8) NULL,
    MODIFY `leftWeaponId` VARCHAR(8) NULL,
    MODIFY `rightWeaponId` VARCHAR(8) NULL,
    MODIFY `leftShieldId` VARCHAR(8) NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `hairId` VARCHAR(8) NOT NULL,
    MODIFY `headId` VARCHAR(8) NOT NULL;

-- AlterTable
ALTER TABLE `UserEquipment` MODIFY `headItemId` VARCHAR(8) NULL,
    MODIFY `torsoItemId` VARCHAR(8) NULL,
    MODIFY `legsItemId` VARCHAR(8) NULL,
    MODIFY `leftWeaponItemId` VARCHAR(8) NULL,
    MODIFY `rightWeaponItemId` VARCHAR(8) NULL,
    MODIFY `leftShieldItemId` VARCHAR(8) NULL;
