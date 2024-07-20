/*
  Warnings:

  - You are about to alter the column `td_wallet_balance` on the `td_wallet` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal`.

*/
-- AlterTable
ALTER TABLE "td_wallet" ALTER COLUMN "td_wallet_balance" SET DATA TYPE DECIMAL;
