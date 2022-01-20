-- AlterTable
ALTER TABLE `Prospecto` MODIFY `status` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `Prospecto_Docs` (
    `id` VARCHAR(191) NOT NULL,
    `prospectoId` VARCHAR(191) NOT NULL,
    `documento` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
