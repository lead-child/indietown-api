/*
  Warnings:

  - The values [WEAPON] on the enum `Item_equipmentType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Item` MODIFY `equipmentType` ENUM('NONE', 'HEAD', 'TORSO', 'LEGS', 'LEFT_WEAPON', 'RIGHT_WEAPON', 'SHIELD') NOT NULL DEFAULT 'NONE';
