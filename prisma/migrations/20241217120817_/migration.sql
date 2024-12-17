/*
  Warnings:

  - Added the required column `order_session_id` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `order_session_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_order_session_id_fkey` FOREIGN KEY (`order_session_id`) REFERENCES `Sessions`(`session_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
