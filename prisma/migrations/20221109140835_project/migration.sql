/*
  Warnings:

  - You are about to alter the column `start` on the `meet` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `meet` MODIFY `start` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `Proyek` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(128) NOT NULL,
    `startdate` DATE NOT NULL,
    `enddate` DATE NOT NULL,
    `description` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserProyek` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `proyekId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserProyek` ADD CONSTRAINT `UserProyek_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserProyek` ADD CONSTRAINT `UserProyek_proyekId_fkey` FOREIGN KEY (`proyekId`) REFERENCES `Proyek`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
