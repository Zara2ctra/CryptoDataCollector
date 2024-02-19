/*
  Warnings:

  - You are about to drop the column `createdAt` on the `CryptocurrencyPrice` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `CryptocurrencyPrice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CryptocurrencyPrice" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
