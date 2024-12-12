/*
  Warnings:

  - Added the required column `session_user_id` to the `Sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sessions` ADD COLUMN `session_user_id` INTEGER NOT NULL;
