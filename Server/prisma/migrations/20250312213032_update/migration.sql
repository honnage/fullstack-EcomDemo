/*
  Warnings:

  - You are about to drop the column `cartToTal` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `orderById` on the `order` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cartTotal` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentcy` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderedById` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripePaymentId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_orderById_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `cartToTal`,
    DROP COLUMN `orderById`,
    ADD COLUMN `amount` INTEGER NOT NULL,
    ADD COLUMN `cartTotal` DOUBLE NOT NULL,
    ADD COLUMN `currentcy` VARCHAR(191) NOT NULL,
    ADD COLUMN `orderedById` INTEGER NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL,
    ADD COLUMN `stripePaymentId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_orderedById_fkey` FOREIGN KEY (`orderedById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
