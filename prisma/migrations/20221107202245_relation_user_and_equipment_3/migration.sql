-- AddForeignKey
ALTER TABLE `UserEquipment` ADD CONSTRAINT `UserEquipment_leftWeaponItemId_fkey` FOREIGN KEY (`leftWeaponItemId`) REFERENCES `Item`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEquipment` ADD CONSTRAINT `UserEquipment_rightWeaponItemId_fkey` FOREIGN KEY (`rightWeaponItemId`) REFERENCES `Item`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEquipment` ADD CONSTRAINT `UserEquipment_leftShieldItemId_fkey` FOREIGN KEY (`leftShieldItemId`) REFERENCES `Item`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
