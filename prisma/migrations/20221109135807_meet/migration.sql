-- CreateTable
CREATE TABLE `Meet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(128) NOT NULL,
    `start` DATETIME NOT NULL,
    `duration` INTEGER NOT NULL,
    `link` VARCHAR(255) NOT NULL,
    `description` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
