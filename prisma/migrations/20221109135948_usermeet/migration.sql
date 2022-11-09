/*
  Warnings:

  - You are about to alter the column `start` on the `meet` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `meet` MODIFY `start` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `UserMeet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `meetId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserMeet` ADD CONSTRAINT `UserMeet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserMeet` ADD CONSTRAINT `UserMeet_meetId_fkey` FOREIGN KEY (`meetId`) REFERENCES `Meet`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
