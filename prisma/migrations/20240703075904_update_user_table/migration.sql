/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `td_user` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `td_user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "td_user" DROP COLUMN "deletedAt",
DROP COLUMN "isActive",
ADD COLUMN     "td_user_deleted_at" TIMESTAMP(3),
ADD COLUMN     "td_user_is_active" BOOLEAN NOT NULL DEFAULT false;
