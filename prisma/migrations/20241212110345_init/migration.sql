-- CreateTable
CREATE TABLE `Users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(45) NOT NULL,
    `user_password` VARCHAR(191) NOT NULL,
    `user_createdat` DATETIME(3) NULL,
    `user_role` VARCHAR(191) NULL,

    UNIQUE INDEX `Users_user_name_key`(`user_name`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sessions` (
    `session_id` VARCHAR(191) NOT NULL,
    `session_userid` INTEGER NOT NULL,
    `session_expiresAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`session_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Products` (
    `product_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_name` VARCHAR(191) NOT NULL,
    `product_description` TEXT NOT NULL,
    `product_price` INTEGER NOT NULL,
    `product_stock` INTEGER NOT NULL,
    `procuct_active` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carts` (
    `cart_id` INTEGER NOT NULL AUTO_INCREMENT,
    `cart_user_id` INTEGER NOT NULL,
    `cart_product_id` INTEGER NOT NULL,
    `cart_qty` INTEGER NOT NULL,
    `cart_timestamp` DATETIME(3) NOT NULL,

    PRIMARY KEY (`cart_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orders` (
    `order_id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrdersProducts` (
    `op_order_id` INTEGER NOT NULL,
    `op_product_id` INTEGER NOT NULL,

    PRIMARY KEY (`op_order_id`, `op_product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Carts` ADD CONSTRAINT `Carts_cart_user_id_fkey` FOREIGN KEY (`cart_user_id`) REFERENCES `Users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carts` ADD CONSTRAINT `Carts_cart_product_id_fkey` FOREIGN KEY (`cart_product_id`) REFERENCES `Products`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdersProducts` ADD CONSTRAINT `OrdersProducts_op_order_id_fkey` FOREIGN KEY (`op_order_id`) REFERENCES `Orders`(`order_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrdersProducts` ADD CONSTRAINT `OrdersProducts_op_product_id_fkey` FOREIGN KEY (`op_product_id`) REFERENCES `Products`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
