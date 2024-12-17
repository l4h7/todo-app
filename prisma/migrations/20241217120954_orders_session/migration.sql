-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `Orders_order_session_id_fkey`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `Orders_order_user_id_fkey`;

-- AlterTable
ALTER TABLE `orders` MODIFY `order_user_id` INTEGER NULL,
    MODIFY `order_session_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_order_user_id_fkey` FOREIGN KEY (`order_user_id`) REFERENCES `Users`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_order_session_id_fkey` FOREIGN KEY (`order_session_id`) REFERENCES `Sessions`(`session_id`) ON DELETE SET NULL ON UPDATE CASCADE;
