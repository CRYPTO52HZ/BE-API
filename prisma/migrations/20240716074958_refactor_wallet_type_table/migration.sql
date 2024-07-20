/*
  Warnings:

  - You are about to drop the `TDWalletType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "td_wallet" DROP CONSTRAINT "td_wallet_td_wallet_type_id_fkey";

-- DropTable
DROP TABLE "TDWalletType";

-- CreateTable
CREATE TABLE "td_wallet_type" (
    "td_wallet_type_id" UUID NOT NULL,
    "td_wallet_type_name" VARCHAR(255) NOT NULL,
    "td_wallet_type_created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "td_wallet_type_updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "td_wallet_type_deleted_at" TIMESTAMPTZ,

    CONSTRAINT "td_wallet_type_pkey" PRIMARY KEY ("td_wallet_type_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "td_wallet_type_td_wallet_type_name_key" ON "td_wallet_type"("td_wallet_type_name");

-- AddForeignKey
ALTER TABLE "td_wallet" ADD CONSTRAINT "td_wallet_td_wallet_type_id_fkey" FOREIGN KEY ("td_wallet_type_id") REFERENCES "td_wallet_type"("td_wallet_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;
