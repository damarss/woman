/*
  Warnings:

  - You are about to alter the column `start` on the `meet` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `meet` MODIFY `start` DATETIME NOT NULL,
    MODIFY `description` LONGTEXT NULL;
