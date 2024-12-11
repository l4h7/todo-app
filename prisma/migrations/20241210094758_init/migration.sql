-- CreateTable
CREATE TABLE `users` (
    `user_name` VARCHAR(45) NOT NULL,
    `user_password` VARCHAR(255) NOT NULL,
    `user_createdat` TIMESTAMP(0) NULL,
    `user_role` VARCHAR(45) NULL,

    PRIMARY KEY (`user_name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
