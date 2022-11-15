-- DropForeignKey
ALTER TABLE `UserEquipment` DROP FOREIGN KEY `UserEquipment_headItemId_fkey`;

-- DropForeignKey
ALTER TABLE `UserEquipment` DROP FOREIGN KEY `UserEquipment_leftShieldItemId_fkey`;

-- DropForeignKey
ALTER TABLE `UserEquipment` DROP FOREIGN KEY `UserEquipment_leftWeaponItemId_fkey`;

-- DropForeignKey
ALTER TABLE `UserEquipment` DROP FOREIGN KEY `UserEquipment_legsItemId_fkey`;

-- DropForeignKey
ALTER TABLE `UserEquipment` DROP FOREIGN KEY `UserEquipment_rightWeaponItemId_fkey`;

-- DropForeignKey
ALTER TABLE `UserEquipment` DROP FOREIGN KEY `UserEquipment_torsoItemId_fkey`;

-- AddForeignKey
ALTER TABLE `UserEquipment` ADD CONSTRAINT `UserEquipment_headItemId_fkey` FOREIGN KEY (`headItemId`) REFERENCES `UserInventoryItem`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEquipment` ADD CONSTRAINT `UserEquipment_torsoItemId_fkey` FOREIGN KEY (`torsoItemId`) REFERENCES `UserInventoryItem`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEquipment` ADD CONSTRAINT `UserEquipment_legsItemId_fkey` FOREIGN KEY (`legsItemId`) REFERENCES `UserInventoryItem`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEquipment` ADD CONSTRAINT `UserEquipment_leftWeaponItemId_fkey` FOREIGN KEY (`leftWeaponItemId`) REFERENCES `UserInventoryItem`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEquipment` ADD CONSTRAINT `UserEquipment_rightWeaponItemId_fkey` FOREIGN KEY (`rightWeaponItemId`) REFERENCES `UserInventoryItem`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEquipment` ADD CONSTRAINT `UserEquipment_leftShieldItemId_fkey` FOREIGN KEY (`leftShieldItemId`) REFERENCES `UserInventoryItem`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
