/*
  Warnings:

  - You are about to drop the column `orderedById` on the `order` table. All the data in the column will be lost.
  - Added the required column `orderById` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_orderedById_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `orderedById`,
    ADD COLUMN `orderById` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_orderById_fkey` FOREIGN KEY (`orderById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
