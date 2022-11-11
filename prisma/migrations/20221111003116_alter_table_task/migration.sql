/*
  Warnings:

  - You are about to alter the column `start` on the `meet` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `penanggungJawabId` on the `task` table. All the data in the column will be lost.
  - You are about to drop the `usertask` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `supervisorId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_penanggungJawabId_fkey`;

-- DropForeignKey
ALTER TABLE `usertask` DROP FOREIGN KEY `UserTask_taskId_fkey`;

-- DropForeignKey
ALTER TABLE `usertask` DROP FOREIGN KEY `UserTask_userId_fkey`;

-- AlterTable
ALTER TABLE `meet` MODIFY `start` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `penanggungJawabId`,
    ADD COLUMN `supervisorId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `usertask`;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_supervisorId_fkey` FOREIGN KEY (`supervisorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
