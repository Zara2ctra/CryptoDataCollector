/*
  Warnings:

  - Added the required column `currentPrice` to the `Cryptocurrency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cryptocurrency" ADD COLUMN     "currentPrice" DOUBLE PRECISION NOT NULL;
