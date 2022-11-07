-- AddForeignKey
ALTER TABLE `UserEquipment` ADD CONSTRAINT `UserEquipment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
