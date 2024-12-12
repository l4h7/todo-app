/*
  Warnings:

  - The primary key for the `sessions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `session_id` on the `sessions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `sessions` DROP PRIMARY KEY,
    DROP COLUMN `session_id`,
    ADD PRIMARY KEY (`session_userid`);
