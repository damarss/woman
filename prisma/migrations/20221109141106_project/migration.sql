/*
  Warnings:

  - You are about to alter the column `start` on the `meet` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `proyek` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userproyek` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `userproyek` DROP FOREIGN KEY `UserProyek_proyekId_fkey`;

-- DropForeignKey
ALTER TABLE `userproyek` DROP FOREIGN KEY `UserProyek_userId_fkey`;

-- AlterTable
ALTER TABLE `meet` MODIFY `start` DATETIME NOT NULL;

-- DropTable
DROP TABLE `proyek`;

-- DropTable
DROP TABLE `userproyek`;

-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(128) NOT NULL,
    `startdate` DATE NOT NULL,
    `enddate` DATE NOT NULL,
    `description` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserProject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `projectId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserProject` ADD CONSTRAINT `UserProject_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserProject` ADD CONSTRAINT `UserProject_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
