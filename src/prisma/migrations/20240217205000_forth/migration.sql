/*
  Warnings:

  - You are about to drop the column `description` on the `Cryptocurrency` table. All the data in the column will be lost.
  - You are about to drop the column `symbol` on the `Cryptocurrency` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Cryptocurrency_symbol_key";

-- AlterTable
ALTER TABLE "Cryptocurrency" DROP COLUMN "description",
DROP COLUMN "symbol";
