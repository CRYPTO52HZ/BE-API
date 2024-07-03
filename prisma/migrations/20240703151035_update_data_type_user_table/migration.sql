/*
  Warnings:

  - You are about to alter the column `td_user_email` on the `td_user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `td_user_username` on the `td_user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `td_user_passwoerd` on the `td_user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `td_user_phone` on the `td_user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(15)`.
  - You are about to alter the column `td_user_api_key` on the `td_user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `td_user_api_secret` on the `td_user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `td_user_timezone_code` on the `td_user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "td_user" ALTER COLUMN "td_user_email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "td_user_username" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "td_user_passwoerd" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "td_user_phone" SET DATA TYPE VARCHAR(15),
ALTER COLUMN "td_user_api_key" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "td_user_api_secret" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "td_user_timezone_code" SET DATA TYPE VARCHAR(255);
