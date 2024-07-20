/*
  Warnings:

  - The primary key for the `td_user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `td_user_email` on the `td_user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `td_user_username` on the `td_user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `td_user_passwoerd` on the `td_user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `td_user_phone` on the `td_user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(15)`.
  - You are about to alter the column `td_user_api_key` on the `td_user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `td_user_api_secret` on the `td_user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `td_user_timezone_code` on the `td_user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Changed the type of `td_user_id` on the `td_user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "td_user" DROP CONSTRAINT "td_user_pkey",
DROP COLUMN "td_user_id",
ADD COLUMN     "td_user_id" UUID NOT NULL,
ALTER COLUMN "td_user_email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "td_user_username" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "td_user_passwoerd" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "td_user_phone" SET DATA TYPE VARCHAR(15),
ALTER COLUMN "td_user_api_key" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "td_user_api_secret" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "td_user_created_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "td_user_updated_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "td_user_deleted_at" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "td_user_timezone_code" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "td_user_pkey" PRIMARY KEY ("td_user_id");

-- CreateTable
CREATE TABLE "TDWalletType" (
    "td_wallet_type_id" UUID NOT NULL,
    "td_wallet_type_name" VARCHAR(255) NOT NULL,
    "td_wallet_type_created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "td_wallet_type_updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "td_wallet_type_deleted_at" TIMESTAMPTZ,

    CONSTRAINT "TDWalletType_pkey" PRIMARY KEY ("td_wallet_type_id")
);

-- CreateTable
CREATE TABLE "td_wallet" (
    "td_wallet_id" UUID NOT NULL,
    "td_wallet_user_id" UUID NOT NULL,
    "td_wallet_type_id" UUID NOT NULL,
    "td_wallet_balance" MONEY NOT NULL,
    "td_wallet_created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "td_wallet_updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "td_wallet_deleted_at" TIMESTAMPTZ,

    CONSTRAINT "td_wallet_pkey" PRIMARY KEY ("td_wallet_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TDWalletType_td_wallet_type_name_key" ON "TDWalletType"("td_wallet_type_name");

-- AddForeignKey
ALTER TABLE "td_wallet" ADD CONSTRAINT "td_wallet_td_wallet_type_id_fkey" FOREIGN KEY ("td_wallet_type_id") REFERENCES "TDWalletType"("td_wallet_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "td_wallet" ADD CONSTRAINT "td_wallet_td_wallet_user_id_fkey" FOREIGN KEY ("td_wallet_user_id") REFERENCES "td_user"("td_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
