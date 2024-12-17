/*
  Warnings:

  - Added the required column `order_product_qty` to the `OrdersProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ordersproducts` ADD COLUMN `order_product_qty` INTEGER NOT NULL;
