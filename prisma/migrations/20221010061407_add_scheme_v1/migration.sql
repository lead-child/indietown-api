/*
  Warnings:

  - Added the required column `accountId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hairId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `headId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `accountId` INTEGER NOT NULL,
    ADD COLUMN `hairId` INTEGER NOT NULL,
    ADD COLUMN `headId` INTEGER NOT NULL,
    ADD COLUMN `level` INTEGER NOT NULL DEFAULT 1,
    MODIFY `name` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `Account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `accessToken` VARCHAR(191) NULL,
    `refreshToken` VARCHAR(191) NULL,
    `lastLoggedIn` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Account_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('NONE', 'USABLE', 'EQUIP') NOT NULL DEFAULT 'NONE',
    `name` VARCHAR(255) NOT NULL,
    `grade` ENUM('COMMON', 'RARE', 'EPIC', 'UNIQUE') NOT NULL DEFAULT 'COMMON',
    `description` VARCHAR(255) NOT NULL,
    `equipmentType` ENUM('NONE', 'HEAD', 'TORSO', 'LEGS', 'WEAPON', 'SHIELD') NOT NULL DEFAULT 'NONE',
    `headId` INTEGER NULL,
    `headAccId` INTEGER NULL,
    `hairId` INTEGER NULL,
    `chestId` INTEGER NULL,
    `spineId` INTEGER NULL,
    `spine2Id` INTEGER NULL,
    `armsId` INTEGER NULL,
    `legsId` INTEGER NULL,
    `leftWeaponId` INTEGER NULL,
    `rightWeaponId` INTEGER NULL,
    `leftShieldId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserWallet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `balanceCash` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `balanceFreeCash` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `UserWallet_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserInventoryItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `itemId` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserEquipment` (
    `userId` INTEGER NOT NULL,
    `headItemId` INTEGER NULL,
    `torsoItemId` INTEGER NULL,
    `legsItemId` INTEGER NULL,
    `leftWeaponItemId` INTEGER NULL,
    `rightWeaponItemId` INTEGER NULL,
    `leftShieldItemId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `UserEquipment_userId_key`(`userId`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quiz` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `level` ENUM('EASY', 'NORMAL', 'HARD') NOT NULL,
    `category` ENUM('KOREAN', 'ENGLISH', 'MATH', 'COMMON_SENSE', 'NUNSENSE') NOT NULL,
    `question` VARCHAR(255) NOT NULL,
    `answerChoices` JSON NOT NULL,
    `answerChoiceIndex` INTEGER NOT NULL,
    `answerScore` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
