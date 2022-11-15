-- AddForeignKey
ALTER TABLE `UserInventoryItem` ADD CONSTRAINT `UserInventoryItem_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
