-- AddForeignKey
ALTER TABLE `UserEquipment` ADD CONSTRAINT `UserEquipment_headItemId_fkey` FOREIGN KEY (`headItemId`) REFERENCES `Item`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEquipment` ADD CONSTRAINT `UserEquipment_torsoItemId_fkey` FOREIGN KEY (`torsoItemId`) REFERENCES `Item`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserEquipment` ADD CONSTRAINT `UserEquipment_legsItemId_fkey` FOREIGN KEY (`legsItemId`) REFERENCES `Item`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
