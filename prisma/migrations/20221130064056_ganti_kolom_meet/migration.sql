/*
  Warnings:

  - You are about to drop the column `end` on the `meet` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `meet` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Meet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Meet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `meet` DROP COLUMN `end`,
    DROP COLUMN `start`,
    ADD COLUMN `endDate` DATETIME NOT NULL,
    ADD COLUMN `startDate` DATETIME NOT NULL;
