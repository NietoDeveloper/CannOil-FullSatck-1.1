/*
  Warnings:

  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `categoryId` INTEGER NOT NULL DEFAULT 1;

-- Nếu cần, cập nhật các hàng hiện có để đặt categoryId thành một giá trị hợp lệ
UPDATE `Product` SET `categoryId` = 1 WHERE `categoryId` IS NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
