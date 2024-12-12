/*
  Warnings:

  - You are about to drop the column `procuct_active` on the `products` table. All the data in the column will be lost.
  - The primary key for the `sessions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `session_userid` on the `sessions` table. All the data in the column will be lost.
  - Added the required column `session_id` to the `Sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `procuct_active`,
    ADD COLUMN `product_active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `sessions` DROP PRIMARY KEY,
    DROP COLUMN `session_userid`,
    ADD COLUMN `session_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`session_id`);
