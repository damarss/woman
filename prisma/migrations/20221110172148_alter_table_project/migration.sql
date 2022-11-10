/*
  Warnings:

  - You are about to alter the column `start` on the `meet` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `archived` on the `project` table. All the data in the column will be lost.
  - Added the required column `isArchived` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `meet` MODIFY `start` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `project` DROP COLUMN `archived`,
    ADD COLUMN `isArchived` BOOLEAN NOT NULL;
