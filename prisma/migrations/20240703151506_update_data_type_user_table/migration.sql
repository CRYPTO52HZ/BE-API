/*
  Warnings:

  - You are about to drop the column `td_user_passwoerd` on the `td_user` table. All the data in the column will be lost.
  - Added the required column `td_user_password` to the `td_user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "td_user" DROP COLUMN "td_user_passwoerd",
ADD COLUMN     "td_user_password" VARCHAR(20) NOT NULL;
